if (require('electron-squirrel-startup')) {
    process.exit(0);
}

const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');

function decodeRtfContent(content) {
    if (!content) {
        return '';
    }

    let text = content.replace(/\\par[d]?/gi, '\n');

    text = text.replace(/\\'[0-9a-fA-F]{2}/g, match => {
        try {
            return String.fromCharCode(parseInt(match.slice(2), 16));
        } catch (error) {
            return '';
        }
    });

    text = text.replace(/\\[a-z]+\d* ?/gi, '');
    text = text.replace(/[{}]/g, '');

    return text;
}

function loadPdfParse() {
    const module = require('pdf-parse');
    if (typeof module === 'function') {
        return module;
    }
    if (module && typeof module.default === 'function') {
        return module.default;
    }
    throw new Error('pdf-parse module did not export a parser function.');
}

function loadMammoth() {
    const module = require('mammoth');
    if (module && typeof module.extractRawText === 'function') {
        return module;
    }
    if (module && module.default && typeof module.default.extractRawText === 'function') {
        return module.default;
    }
    throw new Error('mammoth module did not expose extractRawText().');
}
const { createWindow, updateGlobalShortcuts } = require('./utils/window');
const { setupGeminiIpcHandlers, stopMacOSAudioCapture, sendToRenderer } = require('./utils/gemini');
const { initializeRandomProcessNames } = require('./utils/processRandomizer');
const { applyAntiAnalysisMeasures } = require('./utils/stealthFeatures');
const { getLocalConfig, writeConfig } = require('./config');

const geminiSessionRef = { current: null };
let mainWindow = null;

// Initialize random process names for stealth
const randomNames = initializeRandomProcessNames();

function createMainWindow() {
    mainWindow = createWindow(sendToRenderer, geminiSessionRef, randomNames);
    return mainWindow;
}

app.whenReady().then(async () => {
    // Apply anti-analysis measures with random delay
    await applyAntiAnalysisMeasures();

    createMainWindow();
    setupGeminiIpcHandlers(geminiSessionRef);
    setupGeneralIpcHandlers();
});

app.on('window-all-closed', () => {
    stopMacOSAudioCapture();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    stopMacOSAudioCapture();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

function setupGeneralIpcHandlers() {
    // Forward manual screenshot trigger to renderer
    ipcMain.on('manual-screenshot-triggered', () => {
        sendToRenderer('manual-screenshot-triggered');
    });
    
    // Config-related IPC handlers
    ipcMain.handle('set-onboarded', async (event) => {
        try {
            const config = getLocalConfig();
            config.onboarded = true;
            writeConfig(config);
            return { success: true, config };
        } catch (error) {
            console.error('Error setting onboarded:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('set-stealth-level', async (event, stealthLevel) => {
        try {
            const validLevels = ['visible', 'balanced', 'ultra'];
            if (!validLevels.includes(stealthLevel)) {
                throw new Error(`Invalid stealth level: ${stealthLevel}. Must be one of: ${validLevels.join(', ')}`);
            }
            
            const config = getLocalConfig();
            config.stealthLevel = stealthLevel;
            writeConfig(config);
            return { success: true, config };
        } catch (error) {
            console.error('Error setting stealth level:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('set-layout', async (event, layout) => {
        try {
            const validLayouts = ['normal', 'compact'];
            if (!validLayouts.includes(layout)) {
                throw new Error(`Invalid layout: ${layout}. Must be one of: ${validLayouts.join(', ')}`);
            }
            
            const config = getLocalConfig();
            config.layout = layout;
            writeConfig(config);
            return { success: true, config };
        } catch (error) {
            console.error('Error setting layout:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('get-config', async (event) => {
        try {
            const config = getLocalConfig();
            return { success: true, config };
        } catch (error) {
            console.error('Error getting config:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('quit-application', async event => {
        try {
            stopMacOSAudioCapture();
            app.quit();
            return { success: true };
        } catch (error) {
            console.error('Error quitting application:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('open-external', async (event, url) => {
        try {
            await shell.openExternal(url);
            return { success: true };
        } catch (error) {
            console.error('Error opening external URL:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('process-resume-file', async (event, payload) => {
        try {
            if (!payload || !payload.name || !payload.data) {
                throw new Error('Invalid file payload.');
            }

            const { name, data, type } = payload;
            const buffer = Buffer.from(data, 'base64');
            const extension = path.extname(name).toLowerCase();

            let extractedText = '';

            if (extension === '.pdf' || type === 'application/pdf') {
                const pdfParse = loadPdfParse();
                const result = await pdfParse(buffer);
                extractedText = result.text || '';
            } else if (
                extension === '.docx' ||
                type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) {
                const mammoth = loadMammoth();
                const result = await mammoth.extractRawText({ buffer });
                extractedText = result.value || '';
            } else if (extension === '.rtf' || type === 'application/rtf' || type === 'text/rtf') {
                const raw = buffer.toString('utf8');
                extractedText = decodeRtfContent(raw);
            } else if (extension === '.txt' || extension === '.md' || (type && type.startsWith('text/'))) {
                extractedText = buffer.toString('utf8');
            } else {
                // Fallback: attempt UTF-8 decoding for other file types
                extractedText = buffer.toString('utf8');
            }

            extractedText = extractedText.replace(/\u0000/g, '').trim();
            if (extractedText.length > 20000) {
                extractedText = extractedText.slice(0, 20000);
            }

            if (!extractedText) {
                throw new Error('No readable text detected in the uploaded file.');
            }

            return { success: true, text: extractedText };
        } catch (error) {
            console.error('Error processing resume file:', error);
            return { success: false, error: error.message || 'Failed to process file.' };
        }
    });

    ipcMain.on('update-keybinds', (event, newKeybinds) => {
        if (mainWindow) {
            updateGlobalShortcuts(newKeybinds, mainWindow, sendToRenderer, geminiSessionRef);
        }
    });

    ipcMain.handle('update-content-protection', async (event, contentProtection) => {
        try {
            if (mainWindow) {

                // Get content protection setting from localStorage via cheddar
                const contentProtection = await mainWindow.webContents.executeJavaScript('cheddar.getContentProtection()');
                mainWindow.setContentProtection(contentProtection);
                console.log('Content protection updated:', contentProtection);
            }
            return { success: true };
        } catch (error) {
            console.error('Error updating content protection:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('get-random-display-name', async event => {
        try {
            return randomNames ? randomNames.displayName : 'System Monitor';
        } catch (error) {
            console.error('Error getting random display name:', error);
            return 'System Monitor';
        }
    });
}

import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { resizeLayout } from '../../utils/windowResize.js';

export class CustomizeView extends LitElement {
    static styles = css`
        * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            cursor: default;
            user-select: none;
            box-sizing: border-box;
        }

        :host {
            display: block;
            padding: 20px;
            margin: 0 auto;
            max-width: 800px;
        }

        .settings-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding-bottom: 24px;
        }

        .settings-section {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 24px;
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
        }

        .settings-section:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
        }

        .section-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 6px;
            padding: 4px;
        }

        .section-icon svg {
            width: 16px;
            height: 16px;
            opacity: 0.9;
        }

        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            letter-spacing: -0.2px;
        }

        .form-grid {
            display: grid;
            gap: 16px;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            align-items: start;
        }

        @media (max-width: 600px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .form-group.full-width {
            grid-column: 1 / -1;
        }

        .form-label {
            font-weight: 600;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }

        .form-description {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.65);
            line-height: 1.5;
            margin-top: 4px;
            user-select: text;
            cursor: text;
        }

        .form-control {
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px 12px;
            border-radius: 8px;
            font-size: 13px;
            transition: all 0.2s ease;
            min-height: 38px;
            font-weight: 400;
            backdrop-filter: blur(10px);
        }

        .form-control:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
            background: rgba(255, 255, 255, 0.08);
        }

        .form-control:hover:not(:focus) {
            border-color: rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.06);
        }

        select.form-control {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 8px center;
            background-repeat: no-repeat;
            background-size: 12px;
            padding-right: 28px;
        }

        textarea.form-control {
            resize: vertical;
            min-height: 60px;
            line-height: 1.4;
            font-family: inherit;
        }

        textarea.form-control::placeholder {
            color: var(--placeholder-color, rgba(255, 255, 255, 0.4));
        }

        .profile-option {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        .current-selection {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.85);
            background: rgba(255, 255, 255, 0.08);
            padding: 3px 8px;
            border-radius: 6px;
            font-weight: 500;
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-left: 8px;
        }

        .current-selection::before {
            content: '●';
            font-size: 8px;
            opacity: 0.8;
        }

        .keybind-input {
            cursor: pointer;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
            text-align: center;
            letter-spacing: 0.5px;
            font-weight: 500;
        }

        .keybind-input:focus {
            cursor: text;
            background: var(--input-focus-background, rgba(0, 122, 255, 0.1));
        }

        .keybind-input::placeholder {
            color: var(--placeholder-color, rgba(255, 255, 255, 0.4));
            font-style: italic;
        }

        .reset-keybinds-button {
            background: rgba(255, 255, 255, 0.08);
            color: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(10px);
        }

        .reset-keybinds-button:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }

        .reset-keybinds-button:active {
            transform: translateY(0);
        }

        .reset-section {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .keybinds-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 12px;
        }

        .keybind-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 8px;
            transition: all 0.2s ease;
            gap: 16px;
        }

        .keybind-row:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .keybind-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .action-name {
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            font-size: 13px;
            letter-spacing: -0.1px;
        }

        .action-description {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.4;
            user-select: text;
            cursor: text;
        }

        .keybind-input-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .settings-note {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            margin-top: 16px;
            padding: 14px 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .settings-note::before {
            content: '💡';
            font-size: 16px;
        }

        .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 12px;
            padding: 14px;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.2s ease;
        }

        .checkbox-group:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
        }

        .checkbox-input {
            width: 18px;
            height: 18px;
            accent-color: rgba(255, 255, 255, 0.8);
            cursor: pointer;
            margin-top: 2px;
            flex-shrink: 0;
        }

        .checkbox-label-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .checkbox-label {
            font-weight: 600;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.95);
            cursor: pointer;
            user-select: none;
            letter-spacing: -0.1px;
        }

        /* Better focus indicators */
        .form-control:focus-visible {
            outline: none;
            border-color: var(--focus-border-color, #007aff);
            box-shadow: 0 0 0 2px var(--focus-shadow, rgba(0, 122, 255, 0.1));
        }

        /* Improved button states */
        .reset-keybinds-button:focus-visible {
            outline: none;
            border-color: var(--focus-border-color, #007aff);
            box-shadow: 0 0 0 2px var(--focus-shadow, rgba(0, 122, 255, 0.1));
        }

        /* Slider styles */
        .slider-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 10px;
            transition: all 0.2s ease;
        }

        .slider-container:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .slider-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .slider-value {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.85);
            background: rgba(255, 255, 255, 0.08);
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
        }

        .slider-input {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: rgba(255, 255, 255, 0.08);
            outline: none;
            border: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .slider-input:hover {
            background: rgba(255, 255, 255, 0.12);
        }

        .slider-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.95);
            cursor: pointer;
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        }

        .slider-input::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.95);
            cursor: pointer;
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
        }

        .slider-input:hover::-webkit-slider-thumb {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .slider-input:hover::-moz-range-thumb {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .slider-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 6px;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
        }
    `;

    static properties = {
        selectedProfile: { type: String },
        selectedLanguage: { type: String },
        selectedScreenshotInterval: { type: String },
        selectedImageQuality: { type: String },
        layoutMode: { type: String },
        keybinds: { type: Object },
        googleSearchEnabled: { type: Boolean },
        backgroundTransparency: { type: Number },
        fontSize: { type: Number },
        onProfileChange: { type: Function },
        onLanguageChange: { type: Function },
        onScreenshotIntervalChange: { type: Function },
        onImageQualityChange: { type: Function },
        onLayoutModeChange: { type: Function },
        advancedMode: { type: Boolean },
        onAdvancedModeChange: { type: Function },
    };

    constructor() {
        super();
        this.selectedProfile = 'interview';
        this.selectedLanguage = 'en-US';
        this.selectedScreenshotInterval = '5';
        this.selectedImageQuality = 'medium';
        this.layoutMode = 'normal';
        this.keybinds = this.getDefaultKeybinds();
        this.onProfileChange = () => {};
        this.onLanguageChange = () => {};
        this.onScreenshotIntervalChange = () => {};
        this.onImageQualityChange = () => {};
        this.onLayoutModeChange = () => {};
        this.onAdvancedModeChange = () => {};

        // Google Search default
        this.googleSearchEnabled = true;

        // Advanced mode default
        this.advancedMode = false;

        // Background transparency default
        this.backgroundTransparency = 0.8;

        // Font size default (in pixels)
        this.fontSize = 20;

        this.loadKeybinds();
        this.loadGoogleSearchSettings();
        this.loadAdvancedModeSettings();
        this.loadBackgroundTransparency();
        this.loadFontSize();
    }

    connectedCallback() {
        super.connectedCallback();
        // Load layout mode for display purposes
        this.loadLayoutMode();
        // Resize window for this view
        resizeLayout();
    }

    getProfiles() {
        return [
            {
                value: 'interview',
                name: 'Job Interview',
                description: 'Get help with answering interview questions',
            },
            {
                value: 'sales',
                name: 'Sales Call',
                description: 'Assist with sales conversations and objection handling',
            },
            {
                value: 'meeting',
                name: 'Business Meeting',
                description: 'Support for professional meetings and discussions',
            },
            {
                value: 'presentation',
                name: 'Presentation',
                description: 'Help with presentations and public speaking',
            },
            {
                value: 'negotiation',
                name: 'Negotiation',
                description: 'Guidance for business negotiations and deals',
            },
            {
                value: 'exam',
                name: 'Exam Assistant',
                description: 'Academic assistance for test-taking and exam questions',
            },
        ];
    }

    getLanguages() {
        return [
            { value: 'en-US', name: 'English (US)' },
            { value: 'en-GB', name: 'English (UK)' },
            { value: 'en-AU', name: 'English (Australia)' },
            { value: 'en-IN', name: 'English (India)' },
            { value: 'de-DE', name: 'German (Germany)' },
            { value: 'es-US', name: 'Spanish (United States)' },
            { value: 'es-ES', name: 'Spanish (Spain)' },
            { value: 'fr-FR', name: 'French (France)' },
            { value: 'fr-CA', name: 'French (Canada)' },
            { value: 'hi-IN', name: 'Hindi (India)' },
            { value: 'pt-BR', name: 'Portuguese (Brazil)' },
            { value: 'ar-XA', name: 'Arabic (Generic)' },
            { value: 'id-ID', name: 'Indonesian (Indonesia)' },
            { value: 'it-IT', name: 'Italian (Italy)' },
            { value: 'ja-JP', name: 'Japanese (Japan)' },
            { value: 'tr-TR', name: 'Turkish (Turkey)' },
            { value: 'vi-VN', name: 'Vietnamese (Vietnam)' },
            { value: 'bn-IN', name: 'Bengali (India)' },
            { value: 'gu-IN', name: 'Gujarati (India)' },
            { value: 'kn-IN', name: 'Kannada (India)' },
            { value: 'ml-IN', name: 'Malayalam (India)' },
            { value: 'mr-IN', name: 'Marathi (India)' },
            { value: 'ta-IN', name: 'Tamil (India)' },
            { value: 'te-IN', name: 'Telugu (India)' },
            { value: 'nl-NL', name: 'Dutch (Netherlands)' },
            { value: 'ko-KR', name: 'Korean (South Korea)' },
            { value: 'cmn-CN', name: 'Mandarin Chinese (China)' },
            { value: 'pl-PL', name: 'Polish (Poland)' },
            { value: 'ru-RU', name: 'Russian (Russia)' },
            { value: 'th-TH', name: 'Thai (Thailand)' },
        ];
    }

    getProfileNames() {
        return {
            interview: 'Job Interview',
            sales: 'Sales Call',
            meeting: 'Business Meeting',
            presentation: 'Presentation',
            negotiation: 'Negotiation',
            exam: 'Exam Assistant',
        };
    }

    handleProfileSelect(e) {
        this.selectedProfile = e.target.value;
        localStorage.setItem('selectedProfile', this.selectedProfile);
        this.onProfileChange(this.selectedProfile);
    }

    handleLanguageSelect(e) {
        this.selectedLanguage = e.target.value;
        localStorage.setItem('selectedLanguage', this.selectedLanguage);
        this.onLanguageChange(this.selectedLanguage);
    }

    handleScreenshotIntervalSelect(e) {
        this.selectedScreenshotInterval = e.target.value;
        localStorage.setItem('selectedScreenshotInterval', this.selectedScreenshotInterval);
        this.onScreenshotIntervalChange(this.selectedScreenshotInterval);
    }

    handleImageQualitySelect(e) {
        this.selectedImageQuality = e.target.value;
        this.onImageQualityChange(e.target.value);
    }

    handleLayoutModeSelect(e) {
        this.layoutMode = e.target.value;
        localStorage.setItem('layoutMode', this.layoutMode);
        this.onLayoutModeChange(e.target.value);
    }

    handleCustomPromptInput(e) {
        localStorage.setItem('customPrompt', e.target.value);
    }

    getDefaultKeybinds() {
        const isMac = cheddar.isMacOS || navigator.platform.includes('Mac');
        return {
            moveUp: isMac ? 'Alt+Up' : 'Ctrl+Up',
            moveDown: isMac ? 'Alt+Down' : 'Ctrl+Down',
            moveLeft: isMac ? 'Alt+Left' : 'Ctrl+Left',
            moveRight: isMac ? 'Alt+Right' : 'Ctrl+Right',
            toggleVisibility: isMac ? 'Cmd+\\' : 'Ctrl+\\',
            toggleClickThrough: isMac ? 'Cmd+M' : 'Ctrl+M',
            nextStep: isMac ? 'Cmd+Enter' : 'Ctrl+Enter',
            previousResponse: isMac ? 'Cmd+[' : 'Ctrl+[',
            nextResponse: isMac ? 'Cmd+]' : 'Ctrl+]',
            scrollUp: isMac ? 'Cmd+Shift+Up' : 'Ctrl+Shift+Up',
            scrollDown: isMac ? 'Cmd+Shift+Down' : 'Ctrl+Shift+Down',
        };
    }

    loadKeybinds() {
        const savedKeybinds = localStorage.getItem('customKeybinds');
        if (savedKeybinds) {
            try {
                this.keybinds = { ...this.getDefaultKeybinds(), ...JSON.parse(savedKeybinds) };
            } catch (e) {
                console.error('Failed to parse saved keybinds:', e);
                this.keybinds = this.getDefaultKeybinds();
            }
        }
    }

    saveKeybinds() {
        localStorage.setItem('customKeybinds', JSON.stringify(this.keybinds));
        // Send to main process to update global shortcuts
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('update-keybinds', this.keybinds);
        }
    }

    handleKeybindChange(action, value) {
        this.keybinds = { ...this.keybinds, [action]: value };
        this.saveKeybinds();
        this.requestUpdate();
    }

    resetKeybinds() {
        this.keybinds = this.getDefaultKeybinds();
        localStorage.removeItem('customKeybinds');
        this.requestUpdate();
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('update-keybinds', this.keybinds);
        }
    }

    getKeybindActions() {
        return [
            {
                key: 'moveUp',
                name: 'Move Window Up',
                description: 'Move the application window up',
            },
            {
                key: 'moveDown',
                name: 'Move Window Down',
                description: 'Move the application window down',
            },
            {
                key: 'moveLeft',
                name: 'Move Window Left',
                description: 'Move the application window left',
            },
            {
                key: 'moveRight',
                name: 'Move Window Right',
                description: 'Move the application window right',
            },
            {
                key: 'toggleVisibility',
                name: 'Toggle Window Visibility',
                description: 'Show/hide the application window',
            },
            {
                key: 'toggleClickThrough',
                name: 'Toggle Click-through Mode',
                description: 'Enable/disable click-through functionality',
            },
            {
                key: 'nextStep',
                name: 'Ask Next Step',
                description: 'Take screenshot and ask AI for the next step suggestion',
            },
            {
                key: 'previousResponse',
                name: 'Previous Response',
                description: 'Navigate to the previous AI response',
            },
            {
                key: 'nextResponse',
                name: 'Next Response',
                description: 'Navigate to the next AI response',
            },
            {
                key: 'scrollUp',
                name: 'Scroll Response Up',
                description: 'Scroll the AI response content up',
            },
            {
                key: 'scrollDown',
                name: 'Scroll Response Down',
                description: 'Scroll the AI response content down',
            },
        ];
    }

    handleKeybindFocus(e) {
        e.target.placeholder = 'Press key combination...';
        e.target.select();
    }

    handleKeybindInput(e) {
        e.preventDefault();

        const modifiers = [];
        const keys = [];

        // Check modifiers
        if (e.ctrlKey) modifiers.push('Ctrl');
        if (e.metaKey) modifiers.push('Cmd');
        if (e.altKey) modifiers.push('Alt');
        if (e.shiftKey) modifiers.push('Shift');

        // Get the main key
        let mainKey = e.key;

        // Handle special keys
        switch (e.code) {
            case 'ArrowUp':
                mainKey = 'Up';
                break;
            case 'ArrowDown':
                mainKey = 'Down';
                break;
            case 'ArrowLeft':
                mainKey = 'Left';
                break;
            case 'ArrowRight':
                mainKey = 'Right';
                break;
            case 'Enter':
                mainKey = 'Enter';
                break;
            case 'Space':
                mainKey = 'Space';
                break;
            case 'Backslash':
                mainKey = '\\';
                break;
            case 'KeyS':
                if (e.shiftKey) mainKey = 'S';
                break;
            case 'KeyM':
                mainKey = 'M';
                break;
            default:
                if (e.key.length === 1) {
                    mainKey = e.key.toUpperCase();
                }
                break;
        }

        // Skip if only modifier keys are pressed
        if (['Control', 'Meta', 'Alt', 'Shift'].includes(e.key)) {
            return;
        }

        // Construct keybind string
        const keybind = [...modifiers, mainKey].join('+');

        // Get the action from the input's data attribute
        const action = e.target.dataset.action;

        // Update the keybind
        this.handleKeybindChange(action, keybind);

        // Update the input value
        e.target.value = keybind;
        e.target.blur();
    }

    loadGoogleSearchSettings() {
        const googleSearchEnabled = localStorage.getItem('googleSearchEnabled');
        if (googleSearchEnabled !== null) {
            this.googleSearchEnabled = googleSearchEnabled === 'true';
        }
    }

    async handleGoogleSearchChange(e) {
        this.googleSearchEnabled = e.target.checked;
        localStorage.setItem('googleSearchEnabled', this.googleSearchEnabled.toString());

        // Notify main process if available
        if (window.require) {
            try {
                const { ipcRenderer } = window.require('electron');
                await ipcRenderer.invoke('update-google-search-setting', this.googleSearchEnabled);
            } catch (error) {
                console.error('Failed to notify main process:', error);
            }
        }

        this.requestUpdate();
    }

    loadLayoutMode() {
        const savedLayoutMode = localStorage.getItem('layoutMode');
        if (savedLayoutMode) {
            this.layoutMode = savedLayoutMode;
        }
    }

    loadAdvancedModeSettings() {
        const advancedMode = localStorage.getItem('advancedMode');
        if (advancedMode !== null) {
            this.advancedMode = advancedMode === 'true';
        }
    }

    async handleAdvancedModeChange(e) {
        this.advancedMode = e.target.checked;
        localStorage.setItem('advancedMode', this.advancedMode.toString());
        this.onAdvancedModeChange(this.advancedMode);
        this.requestUpdate();
    }

    loadBackgroundTransparency() {
        const backgroundTransparency = localStorage.getItem('backgroundTransparency');
        if (backgroundTransparency !== null) {
            this.backgroundTransparency = parseFloat(backgroundTransparency) || 0.8;
        }
        this.updateBackgroundTransparency();
    }

    handleBackgroundTransparencyChange(e) {
        this.backgroundTransparency = parseFloat(e.target.value);
        localStorage.setItem('backgroundTransparency', this.backgroundTransparency.toString());
        this.updateBackgroundTransparency();
        this.requestUpdate();
    }

    updateBackgroundTransparency() {
        const root = document.documentElement;
        root.style.setProperty('--header-background', `rgba(0, 0, 0, ${this.backgroundTransparency})`);
        root.style.setProperty('--main-content-background', `rgba(0, 0, 0, ${this.backgroundTransparency})`);
        root.style.setProperty('--card-background', `rgba(255, 255, 255, ${this.backgroundTransparency * 0.05})`);
        root.style.setProperty('--input-background', `rgba(0, 0, 0, ${this.backgroundTransparency * 0.375})`);
        root.style.setProperty('--input-focus-background', `rgba(0, 0, 0, ${this.backgroundTransparency * 0.625})`);
        root.style.setProperty('--button-background', `rgba(0, 0, 0, ${this.backgroundTransparency * 0.625})`);
        root.style.setProperty('--preview-video-background', `rgba(0, 0, 0, ${this.backgroundTransparency * 1.125})`);
        root.style.setProperty('--screen-option-background', `rgba(0, 0, 0, ${this.backgroundTransparency * 0.5})`);
        root.style.setProperty('--screen-option-hover-background', `rgba(0, 0, 0, ${this.backgroundTransparency * 0.75})`);
        root.style.setProperty('--scrollbar-background', `rgba(0, 0, 0, ${this.backgroundTransparency * 0.5})`);
    }

    loadFontSize() {
        const fontSize = localStorage.getItem('fontSize');
        if (fontSize !== null) {
            this.fontSize = parseInt(fontSize, 10) || 20;
        }
        this.updateFontSize();
    }

    handleFontSizeChange(e) {
        this.fontSize = parseInt(e.target.value, 10);
        localStorage.setItem('fontSize', this.fontSize.toString());
        this.updateFontSize();
        this.requestUpdate();
    }

    updateFontSize() {
        const root = document.documentElement;
        root.style.setProperty('--response-font-size', `${this.fontSize}px`);
    }

    render() {
        const profiles = this.getProfiles();
        const languages = this.getLanguages();
        const profileNames = this.getProfileNames();
        const currentProfile = profiles.find(p => p.value === this.selectedProfile);
        const currentLanguage = languages.find(l => l.value === this.selectedLanguage);

        return html`
            <div class="settings-container">
                <!-- Profile & Behavior Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">AI Profile & Behavior</div>
                    </div>

                    <div class="form-grid">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">
                                    Profile Type
                                    <span class="current-selection">${currentProfile?.name || 'Unknown'}</span>
                                </label>
                                <select class="form-control" .value=${this.selectedProfile} @change=${this.handleProfileSelect}>
                                    ${profiles.map(
                                        profile => html`
                                            <option value=${profile.value} ?selected=${this.selectedProfile === profile.value}>
                                                ${profile.name}
                                            </option>
                                        `
                                    )}
                                </select>
                            </div>
                        </div>

                        <div class="form-group full-width">
                            <label class="form-label">Custom AI Instructions</label>
                            <textarea
                                class="form-control"
                                placeholder="Add specific instructions for how you want the AI to behave during ${
                                    profileNames[this.selectedProfile] || 'this interaction'
                                }..."
                                .value=${localStorage.getItem('customPrompt') || ''}
                                rows="4"
                                @input=${this.handleCustomPromptInput}
                            ></textarea>
                            <div class="form-description">
                                Personalize the AI's behavior with specific instructions that will be added to the
                                ${profileNames[this.selectedProfile] || 'selected profile'} base prompts
                </div>
                </div>
            </div>
        </div>

                <!-- Audio & Microphone Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 10V11C19 14.866 15.866 18 12 18M5 10V11C5 14.866 8.13401 18 12 18M12 18V22M12 6V14M12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Audio & Microphone</div>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Audio Mode</label>
                            <select class="form-control" .value=${localStorage.getItem('audioMode') || 'speaker_only'} @change=${e => localStorage.setItem('audioMode', e.target.value)}>
                                <option value="speaker_only">Speaker Only (Interviewer)</option>
                                <option value="mic_only">Microphone Only (Me)</option>
                                <option value="both">Both Speaker & Microphone</option>
                            </select>
                            <div class="form-description">
                                Choose which audio sources to capture for the AI.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stealth Profile Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Stealth Profile</div>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Profile</label>
                            <select class="form-control" .value=${localStorage.getItem('stealthProfile') || 'balanced'} @change=${e => {
                                localStorage.setItem('stealthProfile', e.target.value);
                                // We need to notify the main process to restart for some settings to apply
                                alert('Restart the application for stealth changes to take full effect.');
                            }}>
                                <option value="visible">Visible</option>
                                <option value="balanced">Balanced</option>
                                <option value="ultra">Ultra-Stealth</option>
                            </select>
                            <div class="form-description">
                                Adjusts visibility and detection resistance. A restart is required for changes to apply.
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Language & Audio Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Language & Audio</div>
                    </div>

                    <div class="form-grid">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">
                                    Speech Language
                                    <span class="current-selection">${currentLanguage?.name || 'Unknown'}</span>
                                </label>
                                <select class="form-control" .value=${this.selectedLanguage} @change=${this.handleLanguageSelect}>
                                    ${languages.map(
                                        language => html`
                                            <option value=${language.value} ?selected=${this.selectedLanguage === language.value}>
                                                ${language.name}
                                            </option>
                                        `
                                    )}
                                </select>
                                <div class="form-description">Language for speech recognition and AI responses</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Interface Layout Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 5H20M4 12H20M4 19H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Interface Layout</div>
                    </div>

                    <div class="form-grid">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">
                                    Layout Mode
                                    <span class="current-selection">${this.layoutMode === 'compact' ? 'Compact' : 'Normal'}</span>
                                </label>
                                <select class="form-control" .value=${this.layoutMode} @change=${this.handleLayoutModeSelect}>
                                    <option value="normal" ?selected=${this.layoutMode === 'normal'}>Normal</option>
                                    <option value="compact" ?selected=${this.layoutMode === 'compact'}>Compact</option>
                                </select>
                                <div class="form-description">
                                    ${
                                        this.layoutMode === 'compact'
                                            ? 'Smaller window size with reduced padding and font sizes for minimal screen footprint'
                                            : 'Standard layout with comfortable spacing and font sizes'
                                    }
                                </div>
                            </div>
                        </div>

                        <div class="form-group full-width">
                            <div class="slider-container">
                                <div class="slider-header">
                                    <label class="form-label">Background Transparency</label>
                                    <span class="slider-value">${Math.round(this.backgroundTransparency * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    class="slider-input"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    .value=${this.backgroundTransparency}
                                    @input=${this.handleBackgroundTransparencyChange}
                                />
                                <div class="slider-labels">
                                    <span>Transparent</span>
                                    <span>Opaque</span>
                                </div>
                                <div class="form-description">
                                    Adjust the transparency of the interface background elements
                                </div>
                            </div>
                        </div>

                        <div class="form-group full-width">
                            <div class="slider-container">
                                <div class="slider-header">
                                    <label class="form-label">Response Font Size</label>
                                    <span class="slider-value">${this.fontSize}px</span>
                                </div>
                                <input
                                    type="range"
                                    class="slider-input"
                                    min="12"
                                    max="32"
                                    step="1"
                                    .value=${this.fontSize}
                                    @input=${this.handleFontSizeChange}
                                />
                                <div class="slider-labels">
                                    <span>12px</span>
                                    <span>32px</span>
                                </div>
                                <div class="form-description">
                                    Adjust the font size of AI response text in the assistant view
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <!-- Screen Capture Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8V4C4 2.89543 4.89543 2 6 2H20C21.1046 2 22 2.89543 22 4V16C22 17.1046 21.1046 18 20 18H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 12H18C19.1046 12 20 12.8954 20 14V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V14C4 12.8954 4.89543 12 6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Screen Capture Settings</div>
                    </div>

                    <div class="form-grid">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">
                                    Capture Interval
                                    <span class="current-selection"
                                        >${this.selectedScreenshotInterval === 'manual' ? 'Manual' : this.selectedScreenshotInterval + 's'}</span
                                    >
                                </label>
                                <select class="form-control" .value=${this.selectedScreenshotInterval} @change=${this.handleScreenshotIntervalSelect}>
                                    <option value="manual" ?selected=${this.selectedScreenshotInterval === 'manual'}>Manual (On demand)</option>
                                    <option value="1" ?selected=${this.selectedScreenshotInterval === '1'}>Every 1 second</option>
                                    <option value="2" ?selected=${this.selectedScreenshotInterval === '2'}>Every 2 seconds</option>
                                    <option value="5" ?selected=${this.selectedScreenshotInterval === '5'}>Every 5 seconds</option>
                                    <option value="10" ?selected=${this.selectedScreenshotInterval === '10'}>Every 10 seconds</option>
                                </select>
                                <div class="form-description">
                                    ${
                                        this.selectedScreenshotInterval === 'manual'
                                            ? 'Screenshots will only be taken when you use the "Ask Next Step" shortcut'
                                            : 'Automatic screenshots will be taken at the specified interval'
                                    }
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">
                                    Image Quality
                                    <span class="current-selection"
                                        >${this.selectedImageQuality.charAt(0).toUpperCase() + this.selectedImageQuality.slice(1)}</span
                                    >
                                </label>
                                <select class="form-control" .value=${this.selectedImageQuality} @change=${this.handleImageQualitySelect}>
                                    <option value="high" ?selected=${this.selectedImageQuality === 'high'}>High Quality</option>
                                    <option value="medium" ?selected=${this.selectedImageQuality === 'medium'}>Medium Quality</option>
                                    <option value="low" ?selected=${this.selectedImageQuality === 'low'}>Low Quality</option>
                                </select>
                                <div class="form-description">
                                    ${
                                        this.selectedImageQuality === 'high'
                                            ? 'Best quality, uses more tokens'
                                            : this.selectedImageQuality === 'medium'
                                              ? 'Balanced quality and token usage'
                                              : 'Lower quality, uses fewer tokens'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Keyboard Shortcuts Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 8H14M8 12H16M10 16H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Keyboard Shortcuts</div>
                    </div>

                    <div class="keybinds-container">
                        ${this.getKeybindActions().map(
                            action => html`
                                <div class="keybind-row">
                                    <div class="keybind-info">
                                        <div class="action-name">${action.name}</div>
                                        <div class="action-description">${action.description}</div>
                                    </div>
                                    <div class="keybind-input-wrapper">
                                        <input
                                            type="text"
                                            class="form-control keybind-input"
                                            .value=${this.keybinds[action.key]}
                                            placeholder="Press keys..."
                                            data-action=${action.key}
                                            @keydown=${this.handleKeybindInput}
                                            @focus=${this.handleKeybindFocus}
                                            readonly
                                        />
                                    </div>
                                </div>
                            `
                        )}
                    </div>
                    
                    <div class="reset-section">
                        <div class="form-description">
                            Restore all keyboard shortcuts to their default values
                        </div>
                        <button class="reset-keybinds-button" @click=${this.resetKeybinds}>Reset to Defaults</button>
                    </div>
                </div>



                <!-- Google Search Section -->
                <div class="settings-section">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Google Search</div>
                    </div>

                    <div class="form-grid">
                        <div class="checkbox-group">
                            <input
                                type="checkbox"
                                class="checkbox-input"
                                id="google-search-enabled"
                                .checked=${this.googleSearchEnabled}
                                @change=${this.handleGoogleSearchChange}
                            />
                            <div class="checkbox-label-wrapper">
                                <label for="google-search-enabled" class="checkbox-label">Enable Google Search</label>
                                <div class="form-description">
                                    Allow the AI to search Google for up-to-date information and facts during conversations. Changes take effect when starting a new AI session.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="settings-note">
                    Settings are automatically saved as you change them. Changes will take effect immediately or on the next session start.
                </div>

                <!-- Advanced Mode Section (Danger Zone) -->
                <div class="settings-section" style="border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05);">
                    <div class="section-header">
                        <div class="section-icon" style="background: rgba(239, 68, 68, 0.15);">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title" style="color: rgba(239, 68, 68, 0.9);">Advanced Mode</div>
                    </div>

                    <div class="form-grid">
                        <div class="checkbox-group">
                            <input
                                type="checkbox"
                                class="checkbox-input"
                                id="advanced-mode"
                                .checked=${this.advancedMode}
                                @change=${this.handleAdvancedModeChange}
                            />
                            <div class="checkbox-label-wrapper">
                                <label for="advanced-mode" class="checkbox-label">Enable Advanced Mode</label>
                                <div class="form-description">
                                    Unlock experimental features, developer tools, and advanced configuration options. Advanced mode adds a new icon to the main navigation bar.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('customize-view', CustomizeView);

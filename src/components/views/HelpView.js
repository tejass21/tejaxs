import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { resizeLayout } from '../../utils/windowResize.js';

export class HelpView extends LitElement {
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
            max-width: 100%;
        }

        .help-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding-bottom: 24px;
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
            font-size: 18px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            letter-spacing: -0.3px;
        }

        .option-group {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 24px;
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
        }

        .option-group:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
        }

        .option-label {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            color: rgba(255, 255, 255, 0.95);
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.2px;
        }

        .option-label-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .option-label-icon svg {
            width: 18px;
            height: 18px;
            opacity: 0.9;
        }

        .description {
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
            line-height: 1.6;
            user-select: text;
            cursor: text;
        }

        .description strong {
            color: rgba(255, 255, 255, 0.9);
            font-weight: 600;
            user-select: text;
        }

        .link {
            color: rgba(255, 255, 255, 0.85);
            text-decoration: none;
            cursor: pointer;
            transition: color 0.2s ease;
            user-select: text;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .link:hover {
            color: rgba(255, 255, 255, 1);
            border-bottom-color: rgba(255, 255, 255, 0.5);
        }

        .key {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
            font-weight: 600;
            margin: 0 2px;
            white-space: nowrap;
            user-select: text;
            cursor: text;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .keyboard-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 16px;
            margin-top: 12px;
        }

        .keyboard-group {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 16px;
            transition: all 0.2s ease;
        }

        .keyboard-group:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
            transform: translateY(-1px);
        }

        .keyboard-group-title {
            font-weight: 600;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .keyboard-group-title::before {
            content: '';
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
        }

        .shortcut-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            font-size: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            transition: all 0.2s ease;
        }

        .shortcut-item:last-child {
            border-bottom: none;
        }

        .shortcut-item:hover {
            background: rgba(255, 255, 255, 0.02);
            margin: 0 -8px;
            padding-left: 8px;
            padding-right: 8px;
            border-radius: 6px;
        }

        .shortcut-description {
            color: rgba(255, 255, 255, 0.75);
            user-select: text;
            cursor: text;
            flex: 1;
            margin-right: 12px;
        }

        .shortcut-keys {
            display: flex;
            gap: 4px;
            align-items: center;
        }

        .key-separator {
            color: rgba(255, 255, 255, 0.4);
            font-size: 10px;
            margin: 0 2px;
            font-weight: 500;
        }

        .profiles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
            margin-top: 12px;
        }

        .profile-item {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 14px;
            transition: all 0.2s ease;
            cursor: default;
        }

        .profile-item:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .profile-icon {
            font-size: 20px;
            margin-bottom: 8px;
            display: block;
        }

        .profile-name {
            font-weight: 600;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.95);
            margin-bottom: 6px;
            user-select: text;
            cursor: text;
            letter-spacing: -0.2px;
        }

        .profile-description {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.65);
            line-height: 1.5;
            user-select: text;
            cursor: text;
        }

        .tip-banner {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 14px 16px;
            margin-top: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
        }

        .tip-icon {
            font-size: 18px;
            flex-shrink: 0;
        }

        .tip-text {
            flex: 1;
            line-height: 1.5;
        }

        .tip-link {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .tip-link:hover {
            color: rgba(255, 255, 255, 1);
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
            margin-top: 12px;
        }

        .info-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 16px;
            transition: all 0.2s ease;
        }

        .info-card:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
        }

        .info-card-title {
            font-weight: 600;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .info-card-title svg {
            width: 16px;
            height: 16px;
            opacity: 0.8;
        }

        .info-card-content {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.5;
            user-select: text;
            cursor: text;
        }

    `;

    static properties = {
        onExternalLinkClick: { type: Function },
        keybinds: { type: Object },
    };

    constructor() {
        super();
        this.onExternalLinkClick = () => {};
        this.keybinds = this.getDefaultKeybinds();
        this.loadKeybinds();
    }

    connectedCallback() {
        super.connectedCallback();
        // Resize window for this view
        resizeLayout();
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

    formatKeybind(keybind) {
        if (!keybind) return html``;
        const keys = keybind.split('+');
        const result = [];
        keys.forEach((key, index) => {
            if (index > 0) {
                result.push(html`<span class="key-separator">+</span>`);
            }
            result.push(html`<span class="key">${key.trim()}</span>`);
        });
        return result;
    }

    handleExternalLinkClick(url) {
        this.onExternalLinkClick(url);
    }

    render() {
        const isMacOS = cheddar.isMacOS || false;
        const isLinux = cheddar.isLinux || false;

        return html`
            <div class="help-container">
                <!-- Keyboard Shortcuts Section -->
                <div class="option-group">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 8H14M8 12H16M10 16H14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Keyboard Shortcuts</div>
                    </div>
                    
                    <div class="keyboard-section">
                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Window Movement</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window up</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveUp)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window down</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveDown)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window left</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveLeft)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window right</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveRight)}</div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Window Control</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Toggle click-through mode</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.toggleClickThrough)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Toggle window visibility</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.toggleVisibility)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Close / Go back</span>
                                <div class="shortcut-keys"><span class="key">Esc</span></div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">AI Actions</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Start session / Take screenshot</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.nextStep)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Pause / Resume recording</span>
                                <div class="shortcut-keys"><span class="key">Space</span></div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Response Navigation</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Previous response</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.previousResponse)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Next response</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.nextResponse)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Scroll response up</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.scrollUp)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Scroll response down</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.scrollDown)}</div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Text Input</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Send message</span>
                                <div class="shortcut-keys"><span class="key">Enter</span></div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">New line</span>
                                <div class="shortcut-keys"><span class="key">Shift</span><span class="key">Enter</span></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tip-banner">
                        <span class="tip-icon">💡</span>
                        <span class="tip-text">Customize these shortcuts in <a class="tip-link" @click=${() => this.handleExternalLinkClick('#customize')}>Settings</a></span>
                    </div>
                </div>

                <!-- Supported Profiles Section -->
                <div class="option-group">
                    <div class="section-header">
                        <div class="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="section-title">Supported Profiles</div>
                    </div>
                    
                    <div class="profiles-grid">
                        <div class="profile-item">
                            <span class="profile-icon">💼</span>
                            <div class="profile-name">Job Interview</div>
                            <div class="profile-description">Get intelligent help with interview questions and responses</div>
                        </div>
                        <div class="profile-item">
                            <span class="profile-icon">📞</span>
                            <div class="profile-name">Sales Call</div>
                            <div class="profile-description">Assistance with sales conversations and objection handling</div>
                        </div>
                        <div class="profile-item">
                            <span class="profile-icon">🤝</span>
                            <div class="profile-name">Business Meeting</div>
                            <div class="profile-description">Support for professional meetings and discussions</div>
                        </div>
                        <div class="profile-item">
                            <span class="profile-icon">📊</span>
                            <div class="profile-name">Presentation</div>
                            <div class="profile-description">Help with presentations and public speaking</div>
                        </div>
                        <div class="profile-item">
                            <span class="profile-icon">⚖️</span>
                            <div class="profile-name">Negotiation</div>
                            <div class="profile-description">Guidance for business negotiations and deals</div>
                        </div>
                        <div class="profile-item">
                            <span class="profile-icon">📝</span>
                            <div class="profile-name">Exam Assistant</div>
                            <div class="profile-description">Academic assistance for test-taking and exam questions</div>
                        </div>
                    </div>
                </div>

                <!-- Information Section -->
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-card-title">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 16V12M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Audio Input
                        </div>
                        <div class="info-card-content">
                            The AI listens to conversations and provides contextual assistance based on what it hears in real-time.
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="info-card-title">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Real-time Processing
                        </div>
                        <div class="info-card-content">
                            Screen capture and audio analysis happen continuously for immediate AI responses during your sessions.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('help-view', HelpView);

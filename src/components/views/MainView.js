import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { resizeLayout } from '../../utils/windowResize.js';

export class MainView extends LitElement {
    static styles = css`
        * {
            font-family: 'Inter', sans-serif;
            cursor: default;
            user-select: none;
        }

        :host {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }

        .main-container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            gap: 16px;
            width: 100%;
            max-width: 480px;
            padding: 24px;
            position: relative;
            z-index: 1;
            height: 100%;
            overflow-y: auto;
        }

        .glow-effect {
            display: none;
        }

        .welcome-section {
            text-align: center;
            position: relative;
            z-index: 1;
            width: 100%;
            padding: 24px 16px;
            border-radius: 12px;
            margin-bottom: 8px;
        }

        .logo-container {
            margin-bottom: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .logo-glow {
            position: absolute;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: radial-gradient(circle at center, rgba(118, 75, 162, 0.6), rgba(118, 75, 162, 0) 60%);
            filter: blur(24px);
            opacity: 0.55;
            animation: pulseGlow 4s ease-in-out infinite;
            transform-origin: center;
        }

        .logo-icon {
            width: 56px;
            height: 56px;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(255, 255, 255, 0.04);
            display: flex;
            position: relative;
            z-index: 1;
        }

        .logo-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        @keyframes pulseGlow {
            0% {
                transform: scale(0.9);
                opacity: 0.45;
            }
            50% {
                transform: scale(1.05);
                opacity: 0.75;
            }
            100% {
                transform: scale(0.9);
                opacity: 0.45;
            }
        }

        .welcome {
            font-size: 22px;
            font-weight: 600;
            margin-bottom: 4px;
            color: rgba(255, 255, 255, 0.98);
            letter-spacing: -0.2px;
            line-height: 1.3;
        }

        .subtitle {
            font-size: 14px;
            color: var(--description-color);
            font-weight: 400;
            opacity: 0.8;
            line-height: 1.5;
            max-width: 100%;
            margin: 0 auto 16px;
        }

        .action-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 18px;
            width: 100%;
            max-width: 360px;
            position: relative;
            z-index: 1;
            margin: 10px auto 0;
        }

        .step-card {
            background: rgba(249, 250, 251, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            padding: 16px;
            text-align: left;
            transition: all 0.2s ease;
            backdrop-filter: blur(4px);
            width: 100%;
        }

        .step-card:hover {
            background: rgba(249, 250, 251, 0.03);
            border-color: rgba(255, 255, 255, 0.05);
        }

        .step-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
        }

        .step-number {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.03);
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 500;
            flex-shrink: 0;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .step-title {
            font-size: 14px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.95);
            margin: 0;
            letter-spacing: 0.01em;
        }

        .step-description {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.5);
            margin: 6px 0 0 34px;
            line-height: 1.5;
            font-weight: 400;
        }

        .start-button {
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 10px 22px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;
            cursor: pointer;
            width: auto;
            margin: 6px auto 0;
            align-self: center;
            backdrop-filter: blur(4px);
        }

        .start-button:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.12);
        }

        .start-button:active {
            transform: scale(0.98);
        }

        .start-button.initializing {
            opacity: 0.7;
            transform: none;
            cursor: not-allowed;
        }

        .start-button.initializing:hover {
            transform: none;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(118, 75, 162, 0.3);
        }

        .start-button.initializing::before {
            display: none;
        }

        .button-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .status-text {
            color: var(--description-color);
            font-size: 12px;
            opacity: 0.6;
            text-align: center;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin: 0 auto;
        }

        .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
        }

        .shortcut-icons {
            display: flex;
            align-items: center;
            gap: 3px;
            margin-left: 8px;
            padding: 2px 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 4px;
        }

        .shortcut-icons svg {
            width: 12px;
            height: 12px;
        }

        .shortcut-icons svg path {
            stroke: currentColor;
        }

        .button-icon {
            width: 16px;
            height: 16px;
        }
    `;

    static properties = {
        onStart: { type: Function },
        isInitializing: { type: Boolean },
        onLayoutModeChange: { type: Function },
    };

    constructor() {
        super();
        this.onStart = () => {};
        this.isInitializing = false;
        this.onLayoutModeChange = () => {};
        this.boundKeydownHandler = this.handleKeydown.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.electron?.ipcRenderer?.on('session-initializing', (event, isInitializing) => {
            this.isInitializing = isInitializing;
        });

        // Add keyboard event listener for Ctrl+Enter (or Cmd+Enter on Mac)
        document.addEventListener('keydown', this.boundKeydownHandler);

        // Load and apply layout mode on startup
        this.loadLayoutMode();
        
        // Initialize API key in background
        this.initializeApiKey();
        
        // Resize window for this view
        resizeLayout();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.electron?.ipcRenderer?.removeAllListeners('session-initializing');
        // Remove keyboard event listener
        document.removeEventListener('keydown', this.boundKeydownHandler);
    }

    handleKeydown(e) {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isStartShortcut = isMac ? e.metaKey && e.key === 'Enter' : e.ctrlKey && e.key === 'Enter';

        if (isStartShortcut) {
            e.preventDefault();
            this.handleStartClick();
        }
    }

    handleStartClick() {
        if (this.isInitializing) {
            return;
        }
        this.onStart();
    }

    handleResetOnboarding() {
        localStorage.removeItem('onboardingCompleted');
        // Refresh the page to trigger onboarding
        window.location.reload();
    }

    loadLayoutMode() {
        const savedLayoutMode = localStorage.getItem('layoutMode');
        if (savedLayoutMode && savedLayoutMode !== 'normal') {
            // Notify parent component to apply the saved layout mode
            this.onLayoutModeChange(savedLayoutMode);
        }
    }

    initializeApiKey() {
        // Check if API key is already set in localStorage
        const existingApiKey = localStorage.getItem('apiKey');
        if (!existingApiKey || existingApiKey.trim() === '') {
            // Set the pre-configured API key
            localStorage.setItem('apiKey', 'AIzaSyAD9VNXxfs7bmQjbqx8NOhv9oBRj6MI9lc');
            // Trigger a re-render to update the input field
            this.requestUpdate();
        }
    }


    getStartButtonText() {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        const cmdIcon = html`<svg width="14px" height="14px" viewBox="0 0 24 24" stroke-width="2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path
                d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H18C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>`;

        const enterIcon = html`<svg width="14px" height="14px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.25 19.25L6.75 15.75L10.25 12.25"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6.75 15.75H12.75C14.9591 15.75 16.75 13.9591 16.75 11.75V4.75"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>`;

        return html`Start Interview`;
    }

    render() {
        return html`
            <div class="main-container">
                <div class="glow-effect"></div>
                
                <div class="welcome-section">
                    <div class="logo-container">
                        <div class="logo-glow"></div>
                        <div class="logo-icon">
                            <img src="assets/logo.jpg" alt="DesierAi logo" loading="lazy" />
                        </div>
                    </div>
                    <div class="welcome">Welcome to DesierAi</div>
                    <div class="subtitle">The No.1 Undetectable AI for Interviews</div>
                </div>

                <div class="action-section">
                    <button @click=${this.handleStartClick} class="start-button ${this.isInitializing ? 'initializing' : ''}">
                        ${this.getStartButtonText()}
                    </button>
                    <div class="status-text">
                        ${this.isInitializing 
                            ? html`<span class="status-dot"></span> Initializing...` 
                            : html`<span class="status-dot"></span> Ready`}
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('main-view', MainView);

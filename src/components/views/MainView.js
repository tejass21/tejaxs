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
            justify-content: center;
            align-items: center;
            gap: 24px;
            text-align: center;
            width: 100%;
            max-width: 400px;
            padding: 24px 20px;
            position: relative;
            z-index: 1;
        }

        .glow-effect {
            display: none;
        }

        .welcome-section {
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .logo-container {
            margin-bottom: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .logo-icon {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo-icon svg {
            width: 28px;
            height: 28px;
            opacity: 0.9;
        }

        .welcome {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.95);
            letter-spacing: -0.3px;
            line-height: 1.3;
        }

        .subtitle {
            font-size: 13px;
            color: var(--description-color);
            font-weight: 400;
            opacity: 0.7;
            line-height: 1.4;
            max-width: 320px;
            margin: 0 auto;
        }

        .action-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            position: relative;
            z-index: 1;
        }

        .start-button {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 10px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
            cursor: pointer;
            backdrop-filter: blur(10px);
        }

        .start-button:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.25);
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
                        <div class="logo-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1488 9.47163V3.61153C14.1488 2.72151 13.4273 2 12.5373 2V2C11.6473 2 10.9258 2.72151 10.9258 3.61153V8.44611" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M16.346 12.841L18.5217 5.58862C18.7755 4.74265 18.2886 3.85248 17.4394 3.60984V3.60984C16.5943 3.3684 15.7142 3.8609 15.4779 4.70743L14.1484 9.47149" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M7.61935 9.24985L8.67489 11.5913C9.03961 12.4003 8.68159 13.352 7.87404 13.72C7.06183 14.0901 6.10347 13.7296 5.73663 12.9159L4.68109 10.5745C4.31637 9.76542 4.67439 8.81376 5.48193 8.44574C6.29415 8.07559 7.25251 8.43614 7.61935 9.24985Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M11.7192 12.2615V12.2615C11.9239 11.694 11.8998 11.0692 11.6518 10.5192L10.5787 8.13874C10.2181 7.33892 9.27613 6.98454 8.4778 7.34836V7.34836C7.66469 7.71892 7.31885 8.68832 7.71382 9.48986L7.84946 9.76511" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                <path d="M13.8566 17.6767L14.3487 16.6927C14.3976 16.5947 14.3461 16.4763 14.241 16.4454L10.6903 15.4011C9.97853 15.1918 9.51797 14.5038 9.59563 13.766V13.766C9.68372 12.9292 10.4284 12.3188 11.2662 12.3968L16.0542 12.8422C16.0542 12.8422 19.8632 13.4282 18.5447 17.2372C17.2262 21.0463 16.7867 22.3648 13.8566 22.3648C11.9521 22.3648 9.16855 22.3648 9.16855 22.3648H8.87555C6.52912 22.3648 4.62697 20.4627 4.62697 18.1163V18.1163L4.48047 9.91211" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="welcome">Welcome to DesierAi</div>
                    <div class="subtitle">AI assistant for real-time help</div>
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

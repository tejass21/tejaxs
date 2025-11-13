import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class AppHeader extends LitElement {
    static styles = css`
        * {
            font-family: 'Inter', sans-serif;
            cursor: default;
            user-select: none;
        }

        .header {
            -webkit-app-region: drag;
            display: flex;
            align-items: center;
            padding: var(--header-padding);
            border: 1px solid var(--border-color);
            background: var(--header-background);
            border-radius: var(--border-radius);
            gap: var(--header-gap);
        }

        .header-main {
            display: flex;
            align-items: center;
            gap: var(--header-gap);
            flex: 1;
            min-width: 0;
        }

        .header-title {
            flex: 0 0 auto;
            font-size: var(--header-font-size);
            font-weight: 600;
            -webkit-app-region: drag;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .header-actions {
            display: flex;
            gap: var(--header-gap);
            align-items: center;
            -webkit-app-region: no-drag;
            flex-wrap: nowrap;
        }

        .header-actions span {
            font-size: var(--header-font-size-small);
            color: var(--header-actions-color);
        }

        .button {
            background: var(--button-background);
            color: var(--text-color);
            border: 1px solid var(--button-border);
            padding: var(--header-button-padding);
            border-radius: 8px;
            font-size: var(--header-font-size-small);
            font-weight: 500;
        }

        .icon-button {
            background: none;
            color: var(--icon-button-color);
            border: none;
            padding: var(--header-icon-padding);
            border-radius: 8px;
            font-size: var(--header-font-size-small);
            font-weight: 500;
            display: flex;
            opacity: 0.6;
            transition: opacity 0.2s ease;
        }

        .icon-button svg {
            width: var(--icon-size);
            height: var(--icon-size);
        }

        .icon-button:hover {
            background: var(--hover-background);
            opacity: 1;
        }

        .button:hover {
            background: var(--hover-background);
        }

        .pause-button {
            color: #ef4444;
            transition: color 0.2s ease;
        }

        .pause-button.paused {
            color: #3b82f6;
        }

        .pause-button:hover {
            opacity: 1;
        }

        :host([isclickthrough]) .button:hover,
        :host([isclickthrough]) .icon-button:hover {
            background: transparent;
        }

        .key {
            background: var(--key-background);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 12px;
            margin: 0px;
        }

        .assistant-controls-wrapper {
            flex: 1;
            -webkit-app-region: no-drag;
            display: flex;
            align-items: center;
            min-width: 0;
        }

        .assistant-controls {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
        }

        .assistant-controls.hidden {
            display: none;
        }

        .assistant-nav-button,
        .assistant-save-button {
            background: transparent;
            color: var(--icon-button-color);
            border: none;
            padding: 6px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease, opacity 0.2s ease;
        }

        .assistant-nav-button:hover,
        .assistant-save-button:hover {
            background: var(--hover-background);
        }

        .assistant-nav-button:disabled {
            opacity: 0.3;
            cursor: default;
        }

        .assistant-save-button.saved {
            color: #4caf50;
        }

        .assistant-input {
            flex: 1;
            min-width: 120px;
            background: var(--input-background);
            color: var(--text-color);
            border: 1px solid var(--button-border);
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 13px;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
            cursor: text;
        }

        .assistant-input:focus {
            outline: none;
            border-color: var(--focus-border-color);
            box-shadow: 0 0 0 3px var(--focus-box-shadow);
            background: var(--input-focus-background);
        }

        .assistant-response-counter {
            font-size: 12px;
            color: var(--description-color);
            white-space: nowrap;
        }
    `;

    static properties = {
        currentView: { type: String },
        statusText: { type: String },
        startTime: { type: Number },
        onCustomizeClick: { type: Function },
        onHelpClick: { type: Function },
        onHistoryClick: { type: Function },
        onCloseClick: { type: Function },
        onBackClick: { type: Function },
        onHideToggleClick: { type: Function },
        onPauseToggleClick: { type: Function },
        isClickThrough: { type: Boolean, reflect: true },
        advancedMode: { type: Boolean },
        onAdvancedClick: { type: Function },
        isPaused: { type: Boolean },
        pauseStartTime: { type: Number },
        totalPausedDuration: { type: Number },
        assistantControlsEnabled: { type: Boolean },
        assistantMessageDraft: { type: String },
        assistantCanNavigatePrevious: { type: Boolean },
        assistantCanNavigateNext: { type: Boolean },
        assistantResponseCounter: { type: String },
        assistantIsSaved: { type: Boolean },
        onAssistantNavigatePrevious: { type: Function },
        onAssistantNavigateNext: { type: Function },
        onAssistantSave: { type: Function },
        onAssistantInputChange: { type: Function },
        onAssistantInputKeydown: { type: Function },
    };

    constructor() {
        super();
        this.currentView = 'main';
        this.statusText = '';
        this.startTime = null;
        this.onCustomizeClick = () => {};
        this.onHelpClick = () => {};
        this.onHistoryClick = () => {};
        this.onCloseClick = () => {};
        this.onBackClick = () => {};
        this.onHideToggleClick = () => {};
        this.onPauseToggleClick = () => {};
        this.isClickThrough = false;
        this.advancedMode = false;
        this.onAdvancedClick = () => {};
        this.isPaused = false;
        this.pauseStartTime = null;
        this.totalPausedDuration = 0;
        this._timerInterval = null;
        this.assistantControlsEnabled = false;
        this.assistantMessageDraft = '';
        this.assistantCanNavigatePrevious = false;
        this.assistantCanNavigateNext = false;
        this.assistantResponseCounter = '';
        this.assistantIsSaved = false;
        this.onAssistantNavigatePrevious = null;
        this.onAssistantNavigateNext = null;
        this.onAssistantSave = null;
        this.onAssistantInputChange = null;
        this.onAssistantInputKeydown = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this._startTimer();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._stopTimer();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        // Start/stop timer based on view change
        if (changedProperties.has('currentView')) {
            if (this.currentView === 'assistant' && this.startTime) {
                this._startTimer();
            } else {
                this._stopTimer();
            }
        }

        // Start timer when startTime is set
        if (changedProperties.has('startTime')) {
            if (this.startTime && this.currentView === 'assistant') {
                this._startTimer();
            } else if (!this.startTime) {
                this._stopTimer();
            }
        }
    }

    _startTimer() {
        // Clear any existing timer
        this._stopTimer();

        // Only start timer if we're in assistant view and have a start time
        if (this.currentView === 'assistant' && this.startTime) {
            this._timerInterval = setInterval(() => {
                // Trigger a re-render by requesting an update
                this.requestUpdate();
            }, 1000); // Update every second
        }
    }

    _stopTimer() {
        if (this._timerInterval) {
            clearInterval(this._timerInterval);
            this._timerInterval = null;
        }
    }

    getViewTitle() {
        const titles = {
            onboarding: 'Welcome to DesierAi',
            main: 'DesierAi',
            customize: 'Customize',
            help: 'Help & Shortcuts',
            history: 'Conversation History',
            advanced: 'Advanced Tools',
            assistant: 'DesierAi',
        };
        return titles[this.currentView] || 'DesierAi';
    }

    getElapsedTime() {
        if (this.currentView === 'assistant' && this.startTime) {
            const pausedDuration = this.totalPausedDuration || 0;
            const referenceTime = this.isPaused && this.pauseStartTime ? this.pauseStartTime : Date.now();
            const elapsedMs = referenceTime - this.startTime - pausedDuration;
            const elapsedSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
            return `${elapsedSeconds}s`;
        }
        return '';
    }

    isNavigationView() {
        const navigationViews = ['customize', 'help', 'history', 'advanced'];
        return navigationViews.includes(this.currentView);
    }

    render() {
        const elapsedTime = this.getElapsedTime();

        return html`
            <div class="header">
                <div class="header-main">
                    <div class="header-title">${this.getViewTitle()}</div>
                    <div class="assistant-controls-wrapper">
                        <div class="assistant-controls ${this.assistantControlsEnabled ? '' : 'hidden'}">
                            <button
                                class="assistant-nav-button"
                                @click=${this.assistantControlsEnabled ? this.onAssistantNavigatePrevious : null}
                                ?disabled=${!this.assistantCanNavigatePrevious}
                                title="Previous response"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    stroke-width="1.7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    color="currentColor"
                                >
                                    <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>

                            ${this.assistantResponseCounter
                                ? html`<span class="assistant-response-counter">${this.assistantResponseCounter}</span>`
                                : ''}

                            <button
                                class="assistant-save-button ${this.assistantIsSaved ? 'saved' : ''}"
                                @click=${this.assistantControlsEnabled ? this.onAssistantSave : null}
                                title="${this.assistantIsSaved ? 'Response saved' : 'Save this response'}"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    stroke-width="1.7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 4H18C18.5523 4 19 4.44772 19 5V20L12 16L5 20V5C5 4.44772 5.44772 4 6 4Z"
                                        stroke="currentColor"
                                        stroke-width="1.7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </button>

                            <input
                                class="assistant-input"
                                type="text"
                                placeholder="Type a message to the AI..."
                                .value=${this.assistantMessageDraft}
                                @input=${this.assistantControlsEnabled ? this.onAssistantInputChange : null}
                                @keydown=${this.assistantControlsEnabled ? this.onAssistantInputKeydown : null}
                            />

                            <button
                                class="assistant-nav-button"
                                @click=${this.assistantControlsEnabled ? this.onAssistantNavigateNext : null}
                                ?disabled=${!this.assistantCanNavigateNext}
                                title="Next response"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    stroke-width="1.7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    color="currentColor"
                                >
                                    <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="header-actions">
                    ${this.currentView === 'assistant'
                        ? html`
                              <span>${elapsedTime}</span>
                              <span>${this.statusText}</span>
                              <button class="icon-button pause-button ${this.isPaused ? 'paused' : ''}" @click=${this.onPauseToggleClick} title="${this.isPaused ? 'Resume' : 'Pause'}">
                                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                                      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"></rect>
                                      <path d="M5 10V11C5 14.866 8.13401 18 12 18M19 10V11C19 14.866 15.866 18 12 18M12 18V22M12 22H16M12 22H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                  </svg>
                              </button>
                          `
                        : ''}
                    ${this.currentView === 'main'
                        ? html`
                              <button class="icon-button" @click=${this.onHistoryClick} title="Conversation History">
                                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                                      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                  </svg>
                              </button>
                              ${this.advancedMode
                                  ? html`
                                        <button class="icon-button" @click=${this.onAdvancedClick} title="Advanced Tools">
                                            <?xml version="1.0" encoding="UTF-8"?><svg
                                                width="24px"
                                                stroke-width="1.7"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                color="currentColor"
                                            >
                                                <path d="M18.5 15L5.5 15" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"></path>
                                                <path
                                                    d="M16 4L8 4"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                                <path
                                                    d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                                <path
                                                    d="M12 9.01L12.01 8.99889"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                                <path
                                                    d="M11 2.01L11.01 1.99889"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </button>
                                    `
                                  : ''}
                              <button class="icon-button" @click=${this.onCustomizeClick} title="Settings">
                                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                      <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.29C19.896 4.47575 20.0435 4.69632 20.1441 4.93912C20.2448 5.18192 20.2966 5.44217 20.2966 5.705C20.2966 5.96783 20.2448 6.22808 20.1441 6.47088C20.0435 6.71368 19.896 6.93425 19.71 7.12L19.65 7.18C19.4195 7.41568 19.2648 7.71502 19.206 8.03941C19.1472 8.36381 19.1869 8.69838 19.32 9V9.08C19.4468 9.37577 19.6572 9.62802 19.9255 9.80569C20.1938 9.98337 20.5082 10.0787 20.83 10.08H21C21.5304 10.08 22.0391 10.2907 22.4142 10.6658C22.7893 11.0409 23 11.5496 23 12.08C23 12.6104 22.7893 13.1191 22.4142 13.4942C22.0391 13.8693 21.5304 14.08 21 14.08H20.91C20.5882 14.0813 20.2738 14.1766 20.0055 14.3543C19.7372 14.532 19.5268 14.7842 19.4 15.08V15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                  </svg>
                              </button>
                              <button class="icon-button" @click=${this.onHelpClick} title="Help">
                                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                                      <path d="M9.09 9C9.03 9.24 9 9.49 9 9.75C9 11.13 10.12 12.25 11.5 12.25H12.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                      <path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                  </svg>
                              </button>
                          `
                        : ''}
                    ${this.currentView === 'assistant'
                        ? html`
                              <button @click=${this.onHideToggleClick} class="button">
                                  Hide&nbsp;&nbsp;<span class="key" style="pointer-events: none;">${cheddar.isMacOS ? 'Cmd' : 'Ctrl'}</span
                                  >&nbsp;&nbsp;<span class="key">&bsol;</span>
                              </button>
                              <button @click=${this.onCloseClick} class="icon-button window-close">
                                  <?xml version="1.0" encoding="UTF-8"?><svg
                                      width="24px"
                                      height="24px"
                                      stroke-width="1.7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="currentColor"
                                  >
                                      <path
                                          d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                  </svg>
                              </button>
                          `
                        : html`
                              <button @click=${this.isNavigationView() ? this.onBackClick : this.onCloseClick} class="icon-button window-close">
                                  <?xml version="1.0" encoding="UTF-8"?><svg
                                      width="24px"
                                      height="24px"
                                      stroke-width="1.7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="currentColor"
                                  >
                                      <path
                                          d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                  </svg>
                              </button>
                          `}
                </div>
            </div>
        `;
    }
}

customElements.define('app-header', AppHeader);

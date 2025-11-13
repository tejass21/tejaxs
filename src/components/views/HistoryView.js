import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { resizeLayout } from '../../utils/windowResize.js';

export class HistoryView extends LitElement {
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

        @media (max-width: 900px) {
            :host {
                padding: 16px;
            }
        }

        .history-container {
            display: flex;
            flex-direction: column;
            gap: 24px;
            padding-bottom: 24px;
        }

        .option-group {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 24px;
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .option-group:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 600px) {
            .option-group {
                padding: 20px;
            }
        }

        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
        }

        .section-meta {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .section-title-block {
            display: flex;
            flex-direction: column;
            gap: 4px;
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
            letter-spacing: -0.2px;
        }

        .section-subtitle {
            font-size: 12.5px;
            color: rgba(255, 255, 255, 0.65);
            letter-spacing: 0.2px;
        }

        .section-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }

        .tabs-container {
            display: inline-flex;
            gap: 8px;
            padding: 6px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            backdrop-filter: blur(18px);
            flex-wrap: wrap;
        }

        @media (max-width: 600px) {
            .tabs-container {
                width: 100%;
                justify-content: space-between;
            }
        }

        .tab {
            background: transparent;
            color: rgba(255, 255, 255, 0.6);
            border: 1px solid transparent;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            letter-spacing: 0.3px;
            min-width: 130px;
            text-align: center;
        }

        .tab:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.12);
            color: rgba(255, 255, 255, 0.9);
        }

        .tab.active {
            background: rgba(99, 102, 241, 0.2);
            color: rgba(255, 255, 255, 0.97);
            border-color: rgba(99, 102, 241, 0.45);
            box-shadow: 0 12px 24px rgba(99, 102, 241, 0.18);
        }

        .history-scroll {
            flex: 1;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            backdrop-filter: blur(16px);
            min-height: 160px;
        }

        .history-scroll::-webkit-scrollbar {
            width: 6px;
        }

        .history-scroll::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
        }

        .history-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.22);
            border-radius: 3px;
        }

        .history-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.32);
        }

        .sessions-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .session-item {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 14px 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 6px;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .session-item:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.14);
            transform: translateY(-1px);
        }

        .session-item.selected {
            background: rgba(99, 102, 241, 0.16);
            border-color: rgba(99, 102, 241, 0.42);
            box-shadow: 0 16px 28px rgba(99, 102, 241, 0.22);
        }

        .session-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }

        .session-date {
            font-size: 12px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            letter-spacing: 0.2px;
        }

        .session-time {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
        }

        .session-preview {
            font-size: 11.5px;
            color: rgba(255, 255, 255, 0.72);
            line-height: 1.45;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .back-button {
            background: rgba(255, 255, 255, 0.08);
            color: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.16);
            padding: 8px 14px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
            backdrop-filter: blur(14px);
        }

        .back-button:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.24);
            transform: translateY(-1px);
        }

        .legend {
            display: inline-flex;
            gap: 12px;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 6px 12px;
            backdrop-filter: blur(12px);
        }

        .legend-item {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 11.5px;
            color: rgba(255, 255, 255, 0.72);
        }

        .legend-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }

        .legend-dot.user {
            background-color: rgba(99, 102, 241, 0.9);
        }

        .legend-dot.ai {
            background-color: rgba(236, 72, 153, 0.9);
        }

        .conversation-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
        }

        .conversation-view {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .message {
            margin: 0;
            padding: 12px 16px;
            border-left: 3px solid transparent;
            font-size: 13px;
            line-height: 1.55;
            background: rgba(255, 255, 255, 0.06);
            border-radius: 8px;
            color: rgba(255, 255, 255, 0.94);
            user-select: text;
            cursor: text;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);
        }

        .message.user {
            border-left-color: rgba(99, 102, 241, 0.85);
            background: rgba(99, 102, 241, 0.16);
        }

        .message.ai {
            border-left-color: rgba(236, 72, 153, 0.85);
            background: rgba(236, 72, 153, 0.16);
        }

        .empty-state {
            text-align: center;
            color: rgba(255, 255, 255, 0.62);
            font-size: 12.5px;
            padding: 48px 16px;
            background: rgba(0, 0, 0, 0.22);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            backdrop-filter: blur(12px);
        }

        .empty-state-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 6px;
            color: rgba(255, 255, 255, 0.94);
        }

        .loading {
            text-align: center;
            color: rgba(255, 255, 255, 0.62);
            font-size: 12.5px;
            padding: 40px 0;
        }

        .saved-response-item {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 16px;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .saved-response-item:hover {
            transform: translateY(-1px);
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.14);
        }

        .saved-response-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
        }

        .saved-response-profile {
            font-size: 12px;
            font-weight: 600;
            color: rgba(99, 102, 241, 0.85);
            text-transform: capitalize;
            letter-spacing: 0.2px;
        }

        .saved-response-date {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.55);
        }

        .saved-response-content {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.55;
            user-select: text;
            cursor: text;
            white-space: pre-wrap;
        }

        .delete-button {
            background: transparent;
            color: rgba(255, 255, 255, 0.5);
            border: none;
            padding: 4px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .delete-button:hover {
            background: rgba(239, 68, 68, 0.16);
            color: rgba(255, 255, 255, 0.94);
        }
    `;

    static properties = {
        sessions: { type: Array },
        selectedSession: { type: Object },
        loading: { type: Boolean },
        activeTab: { type: String },
        savedResponses: { type: Array },
    };

    constructor() {
        super();
        this.sessions = [];
        this.selectedSession = null;
        this.loading = true;
        this.activeTab = 'sessions';
        // Load saved responses from localStorage
        try {
            this.savedResponses = JSON.parse(localStorage.getItem('savedResponses') || '[]');
        } catch (e) {
            this.savedResponses = [];
        }
        this.loadSessions();
    }

    connectedCallback() {
        super.connectedCallback();
        // Resize window for this view
        resizeLayout();
    }

    async loadSessions() {
        try {
            this.loading = true;
            this.sessions = await cheddar.getAllConversationSessions();
        } catch (error) {
            console.error('Error loading conversation sessions:', error);
            this.sessions = [];
        } finally {
            this.loading = false;
        }
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    getSessionPreview(session) {
        if (!session.conversationHistory || session.conversationHistory.length === 0) {
            return 'No conversation yet';
        }

        const firstTurn = session.conversationHistory[0];
        const preview = firstTurn.transcription || firstTurn.ai_response || 'Empty conversation';
        return preview.length > 100 ? preview.substring(0, 100) + '...' : preview;
    }

    handleSessionClick(session) {
        this.selectedSession = session;
    }

    handleBackClick() {
        this.selectedSession = null;
    }

    handleTabClick(tab) {
        this.activeTab = tab;
    }

    deleteSavedResponse(index) {
        this.savedResponses = this.savedResponses.filter((_, i) => i !== index);
        localStorage.setItem('savedResponses', JSON.stringify(this.savedResponses));
        this.requestUpdate();
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

    renderSessionsList() {
        if (this.loading) {
            return html`<div class="history-scroll"><div class="loading">Loading conversation history...</div></div>`;
        }

        if (this.sessions.length === 0) {
            return html`
                <div class="history-scroll">
                    <div class="empty-state">
                        <div class="empty-state-title">No conversations yet</div>
                        <div>Start a session to see your conversation history here</div>
                    </div>
                </div>
            `;
        }

        return html`
            <div class="history-scroll sessions-list">
                ${this.sessions.map(
                    session => html`
                        <div class="session-item" @click=${() => this.handleSessionClick(session)}>
                            <div class="session-header">
                                <div class="session-date">${this.formatDate(session.timestamp)}</div>
                                <div class="session-time">${this.formatTime(session.timestamp)}</div>
                            </div>
                            <div class="session-preview">${this.getSessionPreview(session)}</div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    renderSavedResponses() {
        if (this.savedResponses.length === 0) {
            return html`
                <div class="history-scroll">
                    <div class="empty-state">
                        <div class="empty-state-title">No saved responses</div>
                        <div>Use the save button during conversations to save important responses</div>
                    </div>
                </div>
            `;
        }

        const profileNames = this.getProfileNames();

        return html`
            <div class="history-scroll sessions-list">
                ${this.savedResponses.map(
                    (saved, index) => html`
                        <div class="saved-response-item">
                            <div class="saved-response-header">
                                <div>
                                    <div class="saved-response-profile">${profileNames[saved.profile] || saved.profile}</div>
                                    <div class="saved-response-date">${this.formatTimestamp(saved.timestamp)}</div>
                                </div>
                                <button class="delete-button" @click=${() => this.deleteSavedResponse(index)} title="Delete saved response">
                                    <svg
                                        width="16px"
                                        height="16px"
                                        stroke-width="1.7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 6L18 18M6 18L18 6"
                                            stroke="currentColor"
                                            stroke-width="1.7"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="saved-response-content">${saved.response}</div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    renderSectionIcon(type) {
        switch (type) {
            case 'history':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 5.5C4 4.11929 5.11929 3 6.5 3H18C19.1046 3 20 3.89543 20 5V17.5C20 18.8807 18.8807 20 17.5 20H6.5C5.11929 20 4 18.8807 4 17.5V5.5Z"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path d="M8 7H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
                    <path d="M8 11H13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
                    <path d="M8 15H12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
                </svg>`;
            case 'session':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            default:
                return null;
        }
    }

    renderHistoryOverview() {
        return html`
            <div class="option-group">
                <div class="section-header">
                    <div class="section-meta">
                        <div class="section-icon">${this.renderSectionIcon('history')}</div>
                        <div class="section-title-block">
                            <div class="section-title">Conversation Library</div>
                            <div class="section-subtitle">
                                Browse previous sessions or jump into saved suggestions exactly like you do in Help & Shortcuts.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabs-container">
                    <button class="tab ${this.activeTab === 'sessions' ? 'active' : ''}" @click=${() => this.handleTabClick('sessions')}>
                        Conversation History
                    </button>
                    <button class="tab ${this.activeTab === 'saved' ? 'active' : ''}" @click=${() => this.handleTabClick('saved')}>
                        Saved Responses (${this.savedResponses.length})
                    </button>
                </div>
                ${this.activeTab === 'sessions' ? this.renderSessionsList() : this.renderSavedResponses()}
            </div>
        `;
    }

    renderConversationView() {
        if (!this.selectedSession) return html``;

        const { conversationHistory } = this.selectedSession;
        const sessionDate = this.formatDate(this.selectedSession.timestamp);
        const sessionTime = this.formatTime(this.selectedSession.timestamp);

        const messages = [];
        if (conversationHistory) {
            conversationHistory.forEach(turn => {
                if (turn.transcription) {
                    messages.push({
                        type: 'user',
                        content: turn.transcription,
                        timestamp: turn.timestamp,
                    });
                }
                if (turn.ai_response) {
                    messages.push({
                        type: 'ai',
                        content: turn.ai_response,
                        timestamp: turn.timestamp,
                    });
                }
            });
        }

        return html`
            <div class="option-group">
                <div class="section-header">
                    <div class="section-meta">
                        <div class="section-icon">${this.renderSectionIcon('session')}</div>
                        <div class="section-title-block">
                            <div class="section-title">Session Details</div>
                            <div class="section-subtitle">Recorded ${sessionDate} · ${sessionTime}</div>
                        </div>
                    </div>
                    <div class="section-actions">
                        <button class="back-button" @click=${this.handleBackClick}>
                            <svg
                                width="16px"
                                height="16px"
                                stroke-width="1.7"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                color="currentColor"
                            >
                                <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            Back to History
                        </button>
                        <div class="legend">
                            <div class="legend-item">
                                <div class="legend-dot user"></div>
                                <span>Them</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-dot ai"></div>
                                <span>Suggestion</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="history-scroll conversation-view">
                    ${messages.length > 0
                        ? messages.map(message => html` <div class="message ${message.type}">${message.content}</div> `)
                        : html`<div class="empty-state">No conversation data available</div>`}
                </div>
            </div>
        `;
    }

    render() {
        return html`
            <div class="history-container">
                ${this.selectedSession ? this.renderConversationView() : this.renderHistoryOverview()}
            </div>
        `;
    }
}

customElements.define('history-view', HistoryView);

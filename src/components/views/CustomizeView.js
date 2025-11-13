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
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 24px;
            padding: 16px 0 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        @media (max-width: 900px) {
            .settings-container {
                grid-template-columns: 1fr;
                gap: 16px;
            }
        }

        .settings-nav {
            position: sticky;
            top: 20px;
            align-self: start;
            display: flex;
            flex-direction: column;
            gap: 4px;
            background: rgba(20, 20, 25, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 16px 0;
            backdrop-filter: blur(10px);
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
            width: 100%;
            background: transparent;
            border: none;
            text-align: left;
            cursor: pointer;
        }

        .nav-item:focus-visible {
            outline: none;
            border-left-color: #6366f1;
            box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.35);
            color: rgba(255, 255, 255, 0.95);
        }

        .nav-item:hover {
            background: rgba(255, 255, 255, 0.04);
            color: rgba(255, 255, 255, 0.9);
        }

        .nav-item.active {
            background: rgba(255, 255, 255, 0.06);
            color: #fff;
            border-left-color: #6366f1;
        }

        .nav-item .nav-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            opacity: 0.8;
        }

        .nav-item svg {
            width: 16px;
            height: 16px;
        }

        .settings-content {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .settings-section {
            background: rgba(20, 20, 25, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 12px;
            padding: 0;
            overflow: hidden;
            transition: all 0.25s ease;
        }

        .settings-section:hover {
            border-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }

        .settings-section:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.12);
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 24px;
            background: rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            margin: 0;
        }

        .section-content {
            padding: 20px 24px;
        }

        .section-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            padding: 4px;
        }

        .section-icon svg {
            width: 16px;
            height: 16px;
            opacity: 0.9;
        }

        .settings-section.danger {
            border-color: rgba(239, 68, 68, 0.3);
            background: rgba(239, 68, 68, 0.05);
        }

        .settings-section.danger .section-header {
            background: rgba(239, 68, 68, 0.08);
            border-bottom-color: rgba(239, 68, 68, 0.2);
        }

        .settings-section.danger .section-icon {
            background: rgba(239, 68, 68, 0.15);
        }

        .settings-section.danger .section-title {
            color: rgba(239, 68, 68, 0.9);
        }

        .section-title {
            font-size: 15px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            letter-spacing: 0.3px;
            margin: 0;
        }

        .form-grid {
            display: grid;
            gap: 20px;
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
            font-weight: 500;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            display: block;
            margin-bottom: 6px;
            letter-spacing: 0.2px;
        }

        .form-description {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            line-height: 1.5;
            margin-top: 6px;
            user-select: text;
            cursor: text;
            font-weight: 400;
        }

        .resume-upload {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .resume-upload .upload-label-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .resume-upload .upload-title {
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.9);
        }

        .resume-upload .remove-button {
            background: transparent;
            border: none;
            color: rgba(239, 68, 68, 0.85);
            font-size: 12px;
            cursor: pointer;
            padding: 4px 0;
        }

        .resume-upload .remove-button:hover,
        .resume-upload .remove-button:focus-visible {
            color: rgba(239, 68, 68, 1);
            text-decoration: underline;
            outline: none;
        }

        .resume-upload .file-input {
            display: none;
        }

        .resume-upload .upload-dropzone {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 14px 16px;
            border: 1.5px dashed rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.2s ease;
            color: rgba(255, 255, 255, 0.75);
            font-size: 13px;
        }

        .resume-upload .upload-dropzone:hover,
        .resume-upload .upload-dropzone:focus-within {
            border-color: rgba(99, 102, 241, 0.6);
            color: rgba(255, 255, 255, 0.95);
            background: rgba(99, 102, 241, 0.15);
        }

        .resume-upload .upload-text {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .resume-upload .upload-text .primary {
            font-weight: 500;
            color: rgba(255, 255, 255, 0.85);
        }

        .resume-upload .upload-text .secondary {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.55);
        }

        .resume-upload .upload-status {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
        }

        .resume-upload .upload-status.success {
            color: rgba(16, 185, 129, 0.85);
        }

        .resume-upload .upload-status.error {
            color: rgba(239, 68, 68, 0.9);
        }

        .resume-upload .resume-meta {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
        }

        .resume-upload .resume-preview {
            font-size: 12px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.65);
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 8px;
            padding: 12px;
            white-space: pre-wrap;
            max-height: 180px;
            overflow: hidden;
        }

        .form-control {
            background: rgba(255, 255, 255, 0.04);
            color: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 10px 12px;
            border-radius: 6px;
            font-size: 13.5px;
            transition: all 0.15s ease;
            min-height: 36px;
            font-weight: 400;
            width: 100%;
        }

        .form-control:focus {
            outline: none;
            border-color: rgba(99, 102, 241, 0.4);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
            background: rgba(255, 255, 255, 0.05);
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

        select.form-control option,
        select.form-control optgroup {
            background-color: rgba(18, 18, 24, 0.98);
            color: rgba(255, 255, 255, 0.92);
        }

        select.form-control option:hover,
        select.form-control option:focus {
            background-color: rgba(99, 102, 241, 0.3);
            color: rgba(255, 255, 255, 1);
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
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            transition: all 0.15s ease;
            gap: 16px;
        }

        .keybind-row:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.08);
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
        activeSection: { type: String },
        resumeFileName: { type: String },
        resumeUploadStatus: { type: String },
        resumeError: { type: String },
        resumePreview: { type: String },
        resumeWordCount: { type: Number },
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

        this.activeSection = 'profile';
        this._sectionObserver = null;

        this.loadKeybinds();
        this.loadGoogleSearchSettings();
        this.loadAdvancedModeSettings();
        this.loadBackgroundTransparency();
        this.loadFontSize();
        this.resumeFileName = '';
        this.resumeUploadStatus = 'idle';
        this.resumeError = '';
        this.resumePreview = '';
        this.resumeWordCount = 0;
        this.loadResumeData();
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

    handleAudioModeChange(e) {
        const mode = e.target.value;
        localStorage.setItem('audioMode', mode);
    }

    handleStealthProfileChange(e) {
        const profile = e.target.value;
        localStorage.setItem('stealthProfile', profile);
        alert('Restart the application for stealth changes to take full effect.');
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

    loadResumeData() {
        const storedName = localStorage.getItem('resumeFileName') || '';
        const storedText = localStorage.getItem('resumeText') || '';

        if (storedName && storedText) {
            this.resumeFileName = storedName;
            this.resumePreview = this.generateResumePreview(storedText);
            this.resumeWordCount = this.calculateWordCount(storedText);
            this.resumeUploadStatus = 'success';
        }
    }

    generateResumePreview(text) {
        if (!text) {
            return '';
        }

        const sanitized = this.sanitizeResumeText(text);
        if (!sanitized) {
            return '';
        }

        const maxPreviewLength = 500;
        if (sanitized.length <= maxPreviewLength) {
            return sanitized;
        }

        return `${sanitized.slice(0, maxPreviewLength)}…`;
    }

    sanitizeResumeText(text) {
        if (!text) {
            return '';
        }

        return text
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n')
            .replace(/\u0000/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    calculateWordCount(text) {
        const sanitized = this.sanitizeResumeText(text);
        if (!sanitized) {
            return 0;
        }

        return sanitized.split(/\s+/).filter(Boolean).length;
    }

    async handleResumeFileChange(event) {
        const file = event?.target?.files?.[0];
        if (!file) {
            return;
        }

        await this.processResumeFile(file);

        if (event?.target) {
            event.target.value = '';
        }
    }

    async processResumeFile(file) {
        const maxFileSizeBytes = 5 * 1024 * 1024; // 5 MB
        if (file.size > maxFileSizeBytes) {
            this.resumeUploadStatus = 'error';
            this.resumeError = 'Please select a file smaller than 5 MB.';
            this.requestUpdate();
            return;
        }

        const allowedExtensions = ['pdf', 'docx', 'txt', 'md', 'rtf'];
        const extension = (file.name.split('.').pop() || '').toLowerCase();
        if (!allowedExtensions.includes(extension)) {
            this.resumeUploadStatus = 'error';
            this.resumeError = 'Unsupported file type. Please upload a PDF, DOCX, TXT, MD, or RTF file.';
            this.requestUpdate();
            return;
        }

        this.resumeUploadStatus = 'processing';
        this.resumeError = '';
        this.requestUpdate();

        try {
            const base64Data = await this.readFileAsBase64(file);

            if (!window.cheddar?.processResumeFile) {
                throw new Error('Resume processing is not available in the current environment.');
            }

            const response = await window.cheddar.processResumeFile({
                name: file.name,
                data: base64Data,
                type: file.type || '',
            });

            if (!response?.success || !response.text) {
                throw new Error(response?.error || 'Unable to extract text from the selected file.');
            }

            const sanitizedText = this.sanitizeResumeText(response.text);
            if (!sanitizedText) {
                throw new Error('No readable text found in the uploaded file.');
            }

            localStorage.setItem('resumeText', sanitizedText);
            localStorage.setItem('resumeFileName', file.name);

            this.resumeFileName = file.name;
            this.resumePreview = this.generateResumePreview(sanitizedText);
            this.resumeWordCount = this.calculateWordCount(sanitizedText);
            this.resumeUploadStatus = 'success';
            this.resumeError = '';

            this.dispatchEvent(
                new CustomEvent('resume-updated', {
                    detail: { fileName: file.name },
                    bubbles: true,
                    composed: true,
                })
            );
        } catch (error) {
            console.error('Resume upload failed:', error);
            this.resumeUploadStatus = 'error';
            this.resumeError = error?.message || 'We could not process that file. Please try another format.';
        } finally {
            this.requestUpdate();
        }
    }

    async readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onerror = () => {
                reader.abort();
                reject(new Error('Failed to read the selected file.'));
            };

            reader.onload = () => {
                const result = reader.result;

                if (result instanceof ArrayBuffer) {
                    const bytes = new Uint8Array(result);
                    let binary = '';

                    for (let i = 0; i < bytes.length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }

                    resolve(btoa(binary));
                } else if (typeof result === 'string') {
                    resolve(btoa(result));
                } else {
                    reject(new Error('Unsupported file format.'));
                }
            };

            reader.readAsArrayBuffer(file);
        });
    }

    handleResumeRemove() {
        localStorage.removeItem('resumeText');
        localStorage.removeItem('resumeFileName');

        this.resumeFileName = '';
        this.resumePreview = '';
        this.resumeWordCount = 0;
        this.resumeUploadStatus = 'idle';
        this.resumeError = '';

        this.dispatchEvent(
            new CustomEvent('resume-cleared', {
                bubbles: true,
                composed: true,
            })
        );

        this.requestUpdate();
    }

    getResumeStatusMessage() {
        switch (this.resumeUploadStatus) {
            case 'processing':
                return 'Processing resume...';
            case 'success':
                return 'Resume ready to use.';
            case 'error':
                return 'Upload error';
            default:
                return 'Upload PDF, DOCX, TXT, MD, or RTF';
        }
    }

    handleResumeDragOver(event) {
        event.preventDefault();
    }

    handleResumeDrop(event) {
        event.preventDefault();
        const file = event?.dataTransfer?.files?.[0];
        if (file) {
            this.processResumeFile(file);
        }
    }

    handleResumeDropzoneKeydown(event) {
        if (!event) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const input = event.currentTarget?.querySelector('input[type="file"]');
            if (input) {
                input.click();
            }
        }
    }

    async firstUpdated() {
        super.firstUpdated();
        await this.updateComplete;
        this.setupSectionObserver();
    }

    disconnectedCallback() {
        if (this._sectionObserver) {
            this._sectionObserver.disconnect();
            this._sectionObserver = null;
        }
        super.disconnectedCallback();
    }

    setupSectionObserver() {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }

        if (this._sectionObserver) {
            this._sectionObserver.disconnect();
        }

        const observer = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => a.target.offsetTop - b.target.offsetTop)[0];

                if (visible) {
                    const sectionId = visible.target.getAttribute('data-section-id');
                    if (sectionId && sectionId !== this.activeSection) {
                        this.activeSection = sectionId;
                    }
                }
            },
            { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );

        this._sectionObserver = observer;

        const sections = this.renderRoot?.querySelectorAll('.settings-section');
        sections?.forEach(section => observer.observe(section));
    }

    handleNavClick(sectionId, event) {
        event.preventDefault();
        this.activeSection = sectionId;
        const target = this.renderRoot?.querySelector(`[data-section-id="${sectionId}"]`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    renderIcon(name) {
        switch (name) {
            case 'profile':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            case 'audio':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19 10V11C19 14.866 15.866 18 12 18M5 10V11C5 14.866 8.13401 18 12 18M12 18V22M12 6V14M12 6C9.79086 6 8 7.79086 8 10V14C8 16.2091 9.79086 18 12 18"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            case 'language':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            case 'interface':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 5H20M4 12H20M4 19H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>`;
            case 'capture':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 8V4C4 2.89543 4.89543 2 6 2H20C21.1046 2 22 2.89543 22 4V16C22 17.1046 21.1046 18 20 18H16"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M2 12H18C19.1046 12 20 12.8954 20 14V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V14C4 12.8954 4.89543 12 6 12"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            case 'shortcuts':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path d="M10 8H14M8 12H16M10 16H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>`;
            case 'search':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            case 'stealth':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3 11C3 11 6 5 12 5C18 5 21 11 21 11C21 11 18 17 12 17C6 17 3 11 3 11Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            case 'tips':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2C8.13401 2 5 5.13401 5 9C5 11.3868 6.04549 13.5105 7.73397 15H7.5C6.39543 15 5.5 15.8954 5.5 17V18.5C5.5 19.0523 5.94772 19.5 6.5 19.5H9L9.5 22H14.5L15 19.5H17.5C18.0523 19.5 18.5 19.0523 18.5 18.5V17C18.5 15.8954 17.6046 15 16.5 15H16.266C17.9545 13.5105 19 11.3868 19 9C19 5.13401 15.866 2 12 2Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            case 'advanced':
                return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>`;
            default:
                return null;
        }
    }

    renderProfileSection() {
        const profiles = this.getProfiles();
        const profileNames = this.getProfileNames();
        const currentProfile = profiles.find(profile => profile.value === this.selectedProfile);
        const customPrompt = localStorage.getItem('customPrompt') || '';

        return html`
            <div class="form-grid">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">
                            Profile Type
                            <span class="current-selection">${currentProfile?.name || 'Unknown'}</span>
                        </label>
                        <select class="form-control" .value=${this.selectedProfile} @change=${this.handleProfileSelect}>
                            ${profiles.map(
                                profile => html`<option value=${profile.value}>${profile.name}</option>`
                            )}
                        </select>
                    </div>
                </div>

                <div class="form-group full-width">
                    <label class="form-label">Custom AI Instructions</label>
                    <textarea
                        class="form-control"
                        placeholder="Add specific instructions for how you want the AI to behave during ${profileNames[this.selectedProfile] || 'this interaction'}..."
                        .value=${customPrompt}
                        rows="4"
                        @input=${this.handleCustomPromptInput}
                    ></textarea>
                    <div class="form-description">
                        Personalize the AI's behavior with specific instructions that will be added to the
                        ${profileNames[this.selectedProfile] || 'selected profile'} base prompts. Uploading a resume
                        stores its text locally and automatically appends it to these instructions whenever sessions
                        start.
                    </div>
                    <div class="resume-upload">
                        <div class="upload-label-row">
                            <span class="upload-title">Attach Resume (optional)</span>
                            ${this.resumeFileName
                                ? html`<button class="remove-button" type="button" @click=${this.handleResumeRemove}>
                                      Remove
                                  </button>`
                                : ''}
                        </div>
                        <label
                            class="upload-dropzone"
                            role="button"
                            tabindex="0"
                            @dragover=${this.handleResumeDragOver}
                            @drop=${this.handleResumeDrop}
                            @keydown=${this.handleResumeDropzoneKeydown}
                        >
                            <input
                                type="file"
                                class="file-input"
                                accept=".pdf,.docx,.txt,.md,.rtf"
                                @change=${this.handleResumeFileChange}
                            />
                            <div class="upload-text">
                                <span class="primary">Click to upload or drag in your resume</span>
                                <span class="secondary">Supported: PDF, DOCX, TXT, MD, RTF · up to 5&nbsp;MB</span>
                            </div>
                            <span
                                class="upload-status ${this.resumeUploadStatus === 'success'
                                    ? 'success'
                                    : this.resumeUploadStatus === 'error'
                                        ? 'error'
                                        : ''}"
                            >
                                ${this.getResumeStatusMessage()}
                            </span>
                        </label>
                        ${this.resumeUploadStatus === 'error' && this.resumeError
                            ? html`<div class="upload-status error">${this.resumeError}</div>`
                            : ''}
                        ${this.resumeFileName
                            ? html`
                                  <div class="resume-meta">
                                      <span>${this.resumeFileName}</span>
                                      ${this.resumeWordCount
                                          ? html`<span>${this.resumeWordCount.toLocaleString()} words</span>`
                                          : ''}
                                  </div>
                                  ${this.resumePreview
                                      ? html`<div class="resume-preview">${this.resumePreview}</div>`
                                      : ''}
                              `
                            : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderAudioSection() {
        const audioMode = localStorage.getItem('audioMode') || 'speaker_only';

        return html`
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Audio Mode</label>
                    <select class="form-control" .value=${audioMode} @change=${this.handleAudioModeChange}>
                        <option value="speaker_only">Speaker Only (Interviewer)</option>
                        <option value="mic_only">Microphone Only (Me)</option>
                        <option value="both">Both Speaker & Microphone</option>
                    </select>
                    <div class="form-description">Choose which audio sources to capture for the AI.</div>
                </div>
            </div>
        `;
    }

    renderStealthSection() {
        const stealthProfile = localStorage.getItem('stealthProfile') || 'balanced';

        return html`
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Stealth Profile</label>
                    <select class="form-control" .value=${stealthProfile} @change=${this.handleStealthProfileChange}>
                        <option value="visible">Visible</option>
                        <option value="balanced">Balanced</option>
                        <option value="ultra">Ultra-Stealth</option>
                    </select>
                    <div class="form-description">
                        Adjusts visibility and detection resistance. A restart is required for changes to apply.
                    </div>
                </div>
            </div>
        `;
    }

    renderLanguageSection() {
        const languages = this.getLanguages();
        const currentLanguage = languages.find(language => language.value === this.selectedLanguage);

        return html`
            <div class="form-grid">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">
                            Speech Language
                            <span class="current-selection">${currentLanguage?.name || 'Unknown'}</span>
                        </label>
                        <select class="form-control" .value=${this.selectedLanguage} @change=${this.handleLanguageSelect}>
                            ${languages.map(language => html`<option value=${language.value}>${language.name}</option>`)}
                        </select>
                        <div class="form-description">Language for speech recognition and AI responses.</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderInterfaceSection() {
        return html`
            <div class="form-grid">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">
                            Layout Mode
                            <span class="current-selection">${this.layoutMode === 'compact' ? 'Compact' : 'Normal'}</span>
                        </label>
                        <select class="form-control" .value=${this.layoutMode} @change=${this.handleLayoutModeSelect}>
                            <option value="normal">Normal</option>
                            <option value="compact">Compact</option>
                        </select>
                        <div class="form-description">
                            ${this.layoutMode === 'compact'
                                ? 'Smaller window size with reduced padding and font sizes for minimal screen footprint.'
                                : 'Standard layout with comfortable spacing and font sizes.'}
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
                        <div class="form-description">Adjust the transparency of the interface background elements.</div>
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
                        <div class="form-description">Adjust the font size of AI response text in the assistant view.</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCaptureSection() {
        return html`
            <div class="form-grid">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">
                            Capture Interval
                            <span class="current-selection">
                                ${this.selectedScreenshotInterval === 'manual'
                                    ? 'Manual'
                                    : `${this.selectedScreenshotInterval}s`}
                            </span>
                        </label>
                        <select class="form-control" .value=${this.selectedScreenshotInterval} @change=${this.handleScreenshotIntervalSelect}>
                            <option value="manual">Manual (On demand)</option>
                            <option value="1">Every 1 second</option>
                            <option value="2">Every 2 seconds</option>
                            <option value="5">Every 5 seconds</option>
                            <option value="10">Every 10 seconds</option>
                        </select>
                        <div class="form-description">
                            ${this.selectedScreenshotInterval === 'manual'
                                ? 'Screenshots will only be taken when you use the "Ask Next Step" shortcut.'
                                : 'Automatic screenshots will be taken at the specified interval.'}
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            Image Quality
                            <span class="current-selection">
                                ${this.selectedImageQuality.charAt(0).toUpperCase() + this.selectedImageQuality.slice(1)}
                            </span>
                        </label>
                        <select class="form-control" .value=${this.selectedImageQuality} @change=${this.handleImageQualitySelect}>
                            <option value="high">High Quality</option>
                            <option value="medium">Medium Quality</option>
                            <option value="low">Low Quality</option>
                        </select>
                        <div class="form-description">
                            ${this.selectedImageQuality === 'high'
                                ? 'Best quality, uses more tokens.'
                                : this.selectedImageQuality === 'medium'
                                  ? 'Balanced quality and token usage.'
                                  : 'Lower quality, uses fewer tokens.'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderShortcutsSection() {
        return html`
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
                <div class="form-description">Restore all keyboard shortcuts to their default values.</div>
                <button class="reset-keybinds-button" @click=${this.resetKeybinds}>Reset to Defaults</button>
            </div>
        `;
    }

    renderSearchSection() {
        return html`
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
                            Allow the AI to search Google for up-to-date information and facts during conversations.
                            Changes take effect when starting a new AI session.
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderSettingsNote(cmdKey) {
        return html`
            <div class="settings-note">
                <div>
                    <p>Settings are automatically saved as you change them. Changes take effect immediately or on the next session start.</p>
                    <p style="margin-top: 8px; opacity: 0.7; font-size: 11px;">
                        Press <kbd>${cmdKey}</kbd> + <kbd>,</kbd> to quickly open settings from anywhere.
                    </p>
                </div>
            </div>
        `;
    }

    renderAdvancedSection() {
        return html`
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
        `;
    }

    render() {
        const isMac = navigator.platform.toUpperCase().includes('MAC');
        const cmdKey = isMac ? '⌘' : 'Ctrl';

        const sections = [
            { id: 'profile', title: 'AI Profile & Behavior', icon: this.renderIcon('profile'), content: this.renderProfileSection() },
            { id: 'audio', title: 'Audio & Microphone', icon: this.renderIcon('audio'), content: this.renderAudioSection() },
            { id: 'stealth', title: 'Stealth Profile', icon: this.renderIcon('stealth'), content: this.renderStealthSection() },
            { id: 'language', title: 'Language & Voice', icon: this.renderIcon('language'), content: this.renderLanguageSection() },
            { id: 'interface', title: 'Interface Layout', icon: this.renderIcon('interface'), content: this.renderInterfaceSection() },
            { id: 'capture', title: 'Screen Capture Settings', icon: this.renderIcon('capture'), content: this.renderCaptureSection() },
            { id: 'shortcuts', title: 'Keyboard Shortcuts', icon: this.renderIcon('shortcuts'), content: this.renderShortcutsSection() },
            { id: 'search', title: 'Google Search', icon: this.renderIcon('search'), content: this.renderSearchSection() },
            { id: 'tips', title: 'Helpful Tips', icon: this.renderIcon('tips'), content: this.renderSettingsNote(cmdKey) },
            { id: 'advanced', title: 'Advanced Mode', icon: this.renderIcon('advanced'), content: this.renderAdvancedSection(), variant: 'danger' },
        ];

        return html`
            <div class="settings-container">
                <nav class="settings-nav">
                    ${sections.map(
                        section => html`
                            <button
                                type="button"
                                class="nav-item ${this.activeSection === section.id ? 'active' : ''}"
                                @click=${event => this.handleNavClick(section.id, event)}
                            >
                                ${section.icon ? html`<span class="nav-icon">${section.icon}</span>` : ''}
                                <span>${section.title}</span>
                            </button>
                        `
                    )}
                </nav>

                <div class="settings-content">
                    ${sections.map(
                        section => html`
                            <section
                                class="settings-section ${section.variant === 'danger' ? 'danger' : ''}"
                                id=${section.id}
                                data-section-id=${section.id}
                            >
                                <div class="section-header">
                                    ${section.icon ? html`<div class="section-icon">${section.icon}</div>` : ''}
                                    <div class="section-title">${section.title}</div>
                                </div>
                                <div class="section-content">${section.content}</div>
                            </section>
                        `
                    )}
                </div>
            </div>
        `;
    }
}

customElements.define('customize-view', CustomizeView);


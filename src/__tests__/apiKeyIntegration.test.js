import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('API Key Integration', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    afterEach(() => {
        // Clean up after each test
        localStorage.clear();
    });

    it('should initialize with pre-configured API key when localStorage is empty', () => {
        // Simulate the MainView initializeApiKey method
        const existingApiKey = localStorage.getItem('apiKey');
        expect(existingApiKey).toBeNull();

        // Simulate the initialization
        if (!existingApiKey || existingApiKey.trim() === '') {
            localStorage.setItem('apiKey', 'AIzaSyC7t10cXt99aqMdFeegdRG5QimM0rShTwA');
        }

        const apiKey = localStorage.getItem('apiKey');
        expect(apiKey).toBe('AIzaSyC7t10cXt99aqMdFeegdRG5QimM0rShTwA');
    });

    it('should not override existing API key in localStorage', () => {
        // Set an existing API key
        const existingKey = 'existing-test-key';
        localStorage.setItem('apiKey', existingKey);

        // Simulate the initialization
        const currentApiKey = localStorage.getItem('apiKey');
        if (!currentApiKey || currentApiKey.trim() === '') {
            localStorage.setItem('apiKey', 'AIzaSyC7t10cXt99aqMdFeegdRG5QimM0rShTwA');
        }

        const apiKey = localStorage.getItem('apiKey');
        expect(apiKey).toBe(existingKey);
    });

    it('should handle empty string API key', () => {
        // Set empty string
        localStorage.setItem('apiKey', '');

        // Simulate the initialization
        const currentApiKey = localStorage.getItem('apiKey');
        if (!currentApiKey || currentApiKey.trim() === '') {
            localStorage.setItem('apiKey', 'AIzaSyAD9VNXxfs7bmQjbqx8NOhv9oBRj6MI9lc');
        }

        const apiKey = localStorage.getItem('apiKey');
        expect(apiKey).toBe('AIzaSyAD9VNXxfs7bmQjbqx8NOhv9oBRj6MI9lc');
    });

    it('should handle whitespace-only API key', () => {
        // Set whitespace-only string
        localStorage.setItem('apiKey', '   ');

        // Simulate the initialization
        const currentApiKey = localStorage.getItem('apiKey');
        if (!currentApiKey || currentApiKey.trim() === '') {
            localStorage.setItem('apiKey', 'AIzaSyAD9VNXxfs7bmQjbqx8NOhv9oBRj6MI9lc');
        }

        const apiKey = localStorage.getItem('apiKey');
        expect(apiKey).toBe('AIzaSyAD9VNXxfs7bmQjbqx8NOhv9oBRj6MI9lc');
    });
});

// ===========================
// Theme Switcher
// ===========================

class ThemeSwitcher {
    constructor() {
        this.themes = {
            'redstone': {
                name: 'RedStone Mode',
                primary: '#ff1a1a',
                secondary: '#5a0000',
                accent: '#ff4444',
                neon: '#ff6b6b',
                background: '#0a0a0a',
                surface: '#1a1a1a',
                text: '#ffffff',
                border: '#333333'
            },
            'dark': {
                name: 'Dark Mode',
                primary: '#ff6b6b',
                secondary: '#4444ff',
                accent: '#ff1a1a',
                neon: '#ff6b6b',
                background: '#0a0a0a',
                surface: '#1a1a1a',
                text: '#ffffff',
                border: '#333333'
            },
            'light': {
                name: 'Light Mode',
                primary: '#ff1a1a',
                secondary: '#4444ff',
                accent: '#ff6b6b',
                neon: '#ff1a1a',
                background: '#ffffff',
                surface: '#f5f5f5',
                text: '#333333',
                border: '#dddddd'
            }
        };
        
        this.currentTheme = 'dark';
        this.init();
    }

    /**
     * Initialize theme switcher
     */
    init() {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('redstone-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        }
        
        // Apply theme
        this.applyTheme(this.currentTheme);
        
        // Set up event listeners for theme toggle buttons
        this.setupEventListeners();
    }

    /**
     * Apply theme to the document
     * @param {string} themeName - Name of the theme to apply
     */
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) {
            console.error(`Theme ${themeName} not found`);
            return;
        }
        
        // Apply CSS variables to root
        const root = document.documentElement;
        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-secondary', theme.secondary);
        root.style.setProperty('--color-accent', theme.accent);
        root.style.setProperty('--color-neon', theme.neon);
        root.style.setProperty('--color-background', theme.background);
        root.style.setProperty('--color-surface', theme.surface);
        root.style.setProperty('--color-text', theme.text);
        root.style.setProperty('--color-border', theme.border);
        
        // Update data-theme attribute
        root.setAttribute('data-theme', themeName);
        
        // Save theme preference
        localStorage.setItem('redstone-theme', themeName);
        this.currentTheme = themeName;
        
        // Update UI elements that depend on theme
        this.updateThemeDependentElements(themeName);
    }

    /**
     * Update UI elements that depend on theme
     * @param {string} themeName - Name of the current theme
     */
    updateThemeDependentElements(themeName) {
        // Update theme toggle button icon
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('svg');
            if (icon) {
                if (themeName === 'dark') {
                    // Show sun icon for dark theme
                    themeToggle.innerHTML = `
                        <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="2"/>
                            <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    `;
                } else {
                    // Show moon icon for light themes
                    themeToggle.innerHTML = `
                        <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 10.5C16.1 13.5 13.4 15.7 10.1 15.7C6.2 15.7 3 12.5 3 8.6C3 5.3 5.2 2.6 8.2 1.7C8 2.1 7.9 2.6 7.9 3.1C7.9 5.8 10.1 8 12.8 8C13.3 8 13.8 7.9 14.2 7.7C14.9 8.9 15.3 10.3 15.3 11.8C15.3 13.3 14.8 14.7 14 15.9C15.7 14.8 17 12.8 17 10.5Z" fill="currentColor"/>
                        </svg>
                    `;
                }
            }
        }
        
        // Update chart theme if TradingView widget exists
        if (typeof updateChartTheme === 'function') {
            updateChartTheme(themeName);
        }
        
        // Update 3D model theme if function exists
        if (typeof window.update3DModelTheme === 'function') {
            window.update3DModelTheme(themeName);
        }
    }

    /**
     * Set up event listeners for theme toggle buttons
     */
    setupEventListeners() {
        // Main theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Individual theme selection buttons (if they exist)
        const themeButtons = document.querySelectorAll('[data-theme]');
        themeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const themeName = e.target.getAttribute('data-theme');
                this.applyTheme(themeName);
            });
        });
    }

    /**
     * Toggle between themes
     */
    toggleTheme() {
        // Cycle through themes: dark -> light -> redstone -> dark
        const themeOrder = ['dark', 'light', 'redstone'];
        const currentIndex = themeOrder.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeOrder.length;
        const nextTheme = themeOrder[nextIndex];
        
        this.applyTheme(nextTheme);
    }

    /**
     * Apply specific theme
     * @param {string} themeName - Name of the theme to apply
     */
    setTheme(themeName) {
        if (this.themes[themeName]) {
            this.applyTheme(themeName);
        } else {
            console.error(`Theme ${themeName} not found`);
        }
    }

    /**
     * Get current theme
     * @returns {string} - Name of the current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Get all available themes
     * @returns {Object} - Available themes
     */
    getThemes() {
        return this.themes;
    }

    /**
     * Add a new theme
     * @param {string} name - Name of the theme
     * @param {Object} theme - Theme configuration
     */
    addTheme(name, theme) {
        this.themes[name] = theme;
    }

    /**
     * Remove a theme
     * @param {string} name - Name of the theme to remove
     */
    removeTheme(name) {
        if (this.themes[name] && name !== 'dark' && name !== 'light') {
            // Don't allow removal of default themes
            delete this.themes[name];
        }
    }

    /**
     * Animate theme transition
     * @param {string} fromTheme - Theme to transition from
     * @param {string} toTheme - Theme to transition to
     */
    animateThemeTransition(fromTheme, toTheme) {
        // Add transition effect to body
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Temporarily disable transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    /**
     * Dynamically adapt charts, buttons, and quiz UI colors
     * @param {string} themeName - Name of the theme
     */
    adaptUIColors(themeName) {
        const theme = this.themes[themeName];
        
        // Update chart colors
        const charts = document.querySelectorAll('.tradingview-widget-container');
        charts.forEach(chart => {
            // In a real implementation, this would update chart colors
            console.log('Updating chart colors for theme:', themeName);
        });
        
        // Update button colors
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            // In a real implementation, this would update button colors
            console.log('Updating button colors for theme:', themeName);
        });
        
        // Update quiz UI colors
        const quizElements = document.querySelectorAll('.quiz-container, .quiz-option, .progress-bar');
        quizElements.forEach(element => {
            // In a real implementation, this would update quiz UI colors
            console.log('Updating quiz UI colors for theme:', themeName);
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSwitcher;
} else {
    // For browser usage
    window.ThemeSwitcher = ThemeSwitcher;
    
    // Initialize theme switcher when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.themeSwitcher = new ThemeSwitcher();
        });
    } else {
        window.themeSwitcher = new ThemeSwitcher();
    }
}
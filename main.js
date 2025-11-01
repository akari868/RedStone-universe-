// ===========================
// Main Application Logic
// ===========================

// Theme management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Update TradingView chart theme if it exists
        updateChartTheme(newTheme);
    });
}

// Update TradingView chart theme
function updateChartTheme(theme) {
    const chartContainer = document.getElementById('tradingview_redstone');
    if (chartContainer && typeof TradingView !== 'undefined' && chartContainer.innerHTML !== '') {
        // Reload chart with new theme
        chartContainer.innerHTML = '';
        new TradingView.widget({
            "width": "100%",
            "height": 350,
            "symbol": "BINANCE:REDUSDT",
            "interval": "60",
            "timezone": "Etc/UTC",
            "theme": theme,
            "style": "1",
            "locale": "en",
            "toolbar_bg": theme === 'dark' ? '#1a1a1a' : '#f1f3f6',
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_redstone"
        });
    }
    
    // Update 3D model background
    if (typeof window.update3DModelTheme === 'function') {
        window.update3DModelTheme(theme);
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#' or modal links
            if (href === '#' || href.startsWith('#modal') || href.startsWith('#lightbox')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header if any
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal management
function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal(modal);
            });
        }
    });
    
    // Global keyboard handler for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active, .lightbox.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

// Close modal helper
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Clear video content if it's the video modal
    if (modal.id === 'video-modal') {
        const modalBody = modal.querySelector('#video-modal-body');
        if (modalBody) {
            modalBody.innerHTML = '';
        }
    }
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = hero.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Scroll progress indicator (optional enhancement)
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--color-accent), var(--color-neon));
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add active state to navigation based on scroll position
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Update any navigation links if you add a nav menu
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading state management
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
    }
}

// Error handling for fetch requests
async function fetchWithErrorHandling(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

// Initialize accessibility features
function initAccessibility() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Ensure all interactive elements are keyboard accessible
    document.querySelectorAll('[role="button"]').forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
}

// Page visibility API for performance optimization
function initPageVisibility() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations or background tasks
            console.log('Page is hidden - pausing non-essential tasks');
        } else {
            // Resume animations or background tasks
            console.log('Page is visible - resuming tasks');
        }
    });
}

// Add custom cursor effect (optional enhancement)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-neon);
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 0 20px var(--color-neon-glow);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 4 + 'px';
        cursor.style.top = e.clientY - 4 + 'px';
        cursor.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
}

// Initialize all features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScroll();
    initModals();
    initParallax();
    initScrollProgress();
    initScrollAnimations();
    initAccessibility();
    initPageVisibility();
    initBackToTop();
    initChartToggle();
    
    // Optional: Uncomment for custom cursor effect
    // initCustomCursor();
    
    console.log('RedStone Vision Deck initialized successfully ✨');
});

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100));
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Export utilities for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        fetchWithErrorHandling,
        showLoading,
        hideLoading,
        closeModal
    };
}

// Particle burst effect on click
function createParticleBurst(x, y) {
    const colors = ['var(--color-accent)', 'var(--color-neon)', '#ffffff'];
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-burst';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = `radial-gradient(circle, ${colors[i % colors.length]}, transparent)`;
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50;
        particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 600);
    }
}

// Add click particle effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn, .video-card, .gallery-item, .partner-card, .timeline-left, .timeline-right').forEach(el => {
        el.addEventListener('click', (e) => {
            createParticleBurst(e.clientX, e.clientY);
        });
    });
});

// Chart Toggle System
function initChartToggle() {
    const toggleBtn = document.getElementById('toggleChartBtn');
    const closeBtn = document.getElementById('closeChartBtn');
    const chartSection = document.getElementById('token-chart');
    let chartLoaded = false;
    
    // Load chart state from localStorage
    const chartState = localStorage.getItem('chartVisible');
    if (chartState === 'true') {
        showChart();
    }
    
    // Toggle button click
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (chartSection.classList.contains('visible')) {
                hideChart();
            } else {
                showChart();
            }
        });
    }
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            hideChart();
        });
    }
    
    function showChart() {
        chartSection.style.display = 'block';
        // Trigger reflow
        chartSection.offsetHeight;
        chartSection.classList.add('visible');
        
        // Lazy load chart on first show
        if (!chartLoaded && typeof TradingView !== 'undefined') {
            loadTradingViewChart();
            chartLoaded = true;
        }
        
        // Save state
        localStorage.setItem('chartVisible', 'true');
        
        // Scroll to chart smoothly
        setTimeout(() => {
            chartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    function hideChart() {
        chartSection.classList.remove('visible');
        
        // Hide after animation
        setTimeout(() => {
            chartSection.style.display = 'none';
        }, 600);
        
        // Save state
        localStorage.setItem('chartVisible', 'false');
    }
}

// Load TradingView Chart
function loadTradingViewChart() {
    const chartContainer = document.getElementById('tradingview_redstone');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    
    if (chartContainer && typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "width": "100%",
            "height": 350,
            "symbol": "BINANCE:REDUSDT",
            "interval": "60",
            "timezone": "Etc/UTC",
            "theme": currentTheme,
            "style": "1",
            "locale": "en",
            "toolbar_bg": currentTheme === 'dark' ? '#1a1a1a' : '#f1f3f6',
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_redstone"
        });
    }
    
    // Fetch and display live price
    fetchTokenPrice();
    // Update price every 30 seconds
    setInterval(fetchTokenPrice, 30000);
}

// Fetch RedStone token price from Binance
async function fetchTokenPrice() {
    try {
        // Try Binance API first (more reliable)
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=REDUSDT');
        const data = await response.json();
        
        if (data.lastPrice) {
            const price = parseFloat(data.lastPrice);
            const change24h = parseFloat(data.priceChangePercent);
            
            // Update price display
            const priceElement = document.querySelector('.price-amount');
            const changeElement = document.querySelector('.change-percent');
            
            if (priceElement) {
                priceElement.textContent = `$${price.toFixed(4)}`;
            }
            
            if (changeElement) {
                const changeText = `${Math.abs(change24h).toFixed(2)}% (24h)`;
                changeElement.textContent = changeText;
                changeElement.className = 'change-percent ' + (change24h >= 0 ? 'positive' : 'negative');
            }
        }
    } catch (error) {
        console.error('Binance API failed, trying CoinGecko:', error);
        // Fallback to CoinGecko
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=redstone&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();
            
            if (data.redstone) {
                const price = data.redstone.usd;
                const change24h = data.redstone.usd_24h_change;
                
                const priceElement = document.querySelector('.price-amount');
                const changeElement = document.querySelector('.change-percent');
                
                if (priceElement) {
                    priceElement.textContent = `$${price.toFixed(4)}`;
                }
                
                if (changeElement) {
                    const changeText = `${Math.abs(change24h).toFixed(2)}% (24h)`;
                    changeElement.textContent = changeText;
                    changeElement.className = 'change-percent ' + (change24h >= 0 ? 'positive' : 'negative');
                }
            }
        } catch (fallbackError) {
            console.error('Both APIs failed:', fallbackError);
            displayPriceError();
        }
    }
}

// Display error message
function displayPriceError() {
    const priceElement = document.querySelector('.price-amount');
    const changeElement = document.querySelector('.change-percent');
    
    if (priceElement) {
        priceElement.textContent = '$0.0000';
        priceElement.style.fontSize = '2.5rem';
    }
    
    if (changeElement) {
        changeElement.textContent = 'Check chart below';
        changeElement.className = 'change-percent';
    }
}

// Portal Navigation System
function initPortalNavigation() {
    console.log('Initializing Portal Navigation...');
    
    const enterFunverseBtn = document.getElementById('enterFunverseBtn');
    const backToMainBtn = document.getElementById('backToMainBtn');
    const portalContainer = document.getElementById('portalContainer');
    const portalAnimation = document.getElementById('portalAnimation');
    const funverseFrame = document.getElementById('funverseFrame');
    
    console.log('Portal elements:', {
        enterBtn: !!enterFunverseBtn,
        backBtn: !!backToMainBtn,
        container: !!portalContainer,
        animation: !!portalAnimation,
        iframe: !!funverseFrame
    });
    
    // Enter FunVerse Portal
    if (enterFunverseBtn) {
        enterFunverseBtn.addEventListener('click', () => {
            console.log('Enter FunVerse button clicked');
            enterPortal();
        });
    } else {
        console.error('Enter FunVerse button not found!');
    }
    
    // Quick access buttons
    const quickBtns = document.querySelectorAll('.funverse-quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            console.log('Quick access to:', section);
            enterPortal(section);
        });
    });
    
    // Back to Main Portal
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', () => {
            exitPortal();
        });
    }
    
    // Listen for messages from FunVerse iframe
    window.addEventListener('message', (event) => {
        // Only accept messages from same origin
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'FUNVERSE_LOADED') {
            // Sync user data to FunVerse
            syncUserDataToFunverse();
        } else if (event.data.type === 'USER_DATA_UPDATE') {
            // Update local storage with FunVerse data
            if (event.data.userData) {
                localStorage.setItem('redstone_user_data', JSON.stringify(event.data.userData));
            }
        } else if (event.data.type === 'EXIT_PORTAL') {
            // Exit portal when requested by FunVerse
            exitPortal();
        }
    });
    
    function enterPortal(hash = '') {
        console.log('Entering FunVerse Portal...', hash ? `with hash: ${hash}` : '');
        
        // Show portal animation
        portalAnimation.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Start portal animation sequence
        setTimeout(() => {
            // Show portal container
            portalContainer.style.display = 'block';
            console.log('Portal container displayed');
            
            setTimeout(() => {
                portalContainer.classList.add('active');
                
                // Load FunVerse iframe with hash if provided
                const funverseUrl = hash ? `funverse.html${hash}` : 'funverse.html';
                
                if (!funverseFrame.src || funverseFrame.src === '') {
                    console.log('Loading FunVerse iframe:', funverseUrl);
                    funverseFrame.src = funverseUrl;
                    
                    // Wait for iframe to load
                    funverseFrame.onload = () => {
                        console.log('FunVerse iframe loaded successfully');
                    };
                    
                    funverseFrame.onerror = () => {
                        console.error('Failed to load FunVerse iframe');
                    };
                } else {
                    console.log('FunVerse iframe already loaded');
                    // If already loaded, just update the hash
                    if (hash && funverseFrame.contentWindow) {
                        funverseFrame.contentWindow.location.hash = hash;
                    }
                }
                
                // Hide animation after transition
                setTimeout(() => {
                    portalAnimation.classList.remove('active');
                }, 1000);
            }, 100);
        }, 500);
        
        // Save portal state
        sessionStorage.setItem('portal_active', 'true');
        if (hash) {
            sessionStorage.setItem('portal_hash', hash);
        }
    }
    
    function exitPortal() {
        // Show exit animation
        portalAnimation.classList.add('active');
        
        setTimeout(() => {
            // Hide portal container
            portalContainer.classList.remove('active');
            
            setTimeout(() => {
                portalContainer.style.display = 'none';
                portalAnimation.classList.remove('active');
                document.body.style.overflow = '';
            }, 500);
        }, 500);
        
        // Clear portal state
        sessionStorage.removeItem('portal_active');
    }
    
    function syncUserDataToFunverse() {
        // Get user data from localStorage
        const userData = localStorage.getItem('redstone_user_data');
        
        if (userData && funverseFrame.contentWindow) {
            // Send data to FunVerse
            funverseFrame.contentWindow.postMessage({
                type: 'SYNC_USER_DATA',
                userData: JSON.parse(userData)
            }, window.location.origin);
        }
    }
    
    // Check if portal was active (page refresh)
    if (sessionStorage.getItem('portal_active') === 'true') {
        const savedHash = sessionStorage.getItem('portal_hash') || '';
        // Restore portal state without animation
        portalContainer.style.display = 'block';
        portalContainer.classList.add('active');
        funverseFrame.src = savedHash ? `funverse.html${savedHash}` : 'funverse.html';
        document.body.style.overflow = 'hidden';
    }
}

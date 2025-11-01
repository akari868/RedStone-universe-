// ===========================
// Communication Center JavaScript
// ===========================

// DOM Elements
const tickerWrapper = document.getElementById('tickerWrapper');
const tickerContent = document.getElementById('tickerContent');
const pauseTickerBtn = document.getElementById('pauseTicker');
const playTickerBtn = document.getElementById('playTicker');
const nextUpdateTimer = document.getElementById('nextUpdateTimer');
const newsletterForm = document.getElementById('newsletterForm');
const digestTimeline = document.getElementById('digestTimeline');
const weeklySummary = document.getElementById('weeklySummary');
const pollsContainer = document.getElementById('pollsContainer');
const ambassadorsGrid = document.getElementById('ambassadorsGrid');
const ambassadorSearch = document.getElementById('ambassadorSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const joinAmbassadorBtn = document.getElementById('joinAmbassadorBtn');
const spotlightCard = document.getElementById('spotlightCard');
const stoneyMessage = document.getElementById('stoneyMessage');
const refreshStoney = document.getElementById('refreshStoney');
const successModal = document.getElementById('successModal');
const successMessage = document.getElementById('successMessage');

// State
let tickerAnimation = null;
let tickerPaused = false;
let nextUpdateSeconds = 300; // 5 minutes
let ambassadorsData = [];
let filteredAmbassadors = [];
let stoneyFacts = [];

// Initialize the Communication Center
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing RedStone Communication Center...');
    
    initThemeToggle();
    loadAnnouncements();
    loadWeeklyDigest();
    loadPolls();
    loadAmbassadors();
    loadStoneyFacts();
    initSpotlight();
    initModals();
    initNextUpdateTimer();
    initNewsletter();
    
    console.log('RedStone Communication Center initialized successfully!');
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Load announcements from JSON
async function loadAnnouncements() {
    try {
        const response = await fetch('data/announcements.json');
        const announcements = await response.json();
        populateTicker(announcements);
    } catch (error) {
        console.error('Error loading announcements:', error);
        // Fallback to sample data
        const sampleAnnouncements = [
            { id: 1, content: "RedStone integrates with Arbitrum Nova for faster data feeds", source: "twitter", timestamp: "2 hours ago", breaking: true },
            { id: 2, content: "New partnership with Chainlink announced", source: "blog", timestamp: "4 hours ago", breaking: false },
            { id: 3, content: "Governance proposal #42 passes with 87% approval", source: "snapshot", timestamp: "6 hours ago", breaking: false },
            { id: 4, content: "RedStone SDK v2.5 released with improved performance", source: "github", timestamp: "1 day ago", breaking: true },
            { id: 5, content: "Community AMA scheduled for Friday 3PM UTC", source: "discord", timestamp: "1 day ago", breaking: false },
            { id: 6, content: "RedStone token reaches new ATH at $0.45", source: "twitter", timestamp: "2 days ago", breaking: false }
        ];
        populateTicker(sampleAnnouncements);
    }
}

// Populate ticker with announcements
function populateTicker(announcements) {
    tickerContent.innerHTML = '';
    
    announcements.forEach(item => {
        const tickerItem = document.createElement('div');
        tickerItem.className = `ticker-item ${item.breaking ? 'breaking' : ''}`;
        tickerItem.innerHTML = `
            <span class="source-icon">
                ${item.source === 'twitter' ? '<i class="fab fa-twitter"></i>' : 
                  item.source === 'blog' ? '<i class="fas fa-blog"></i>' : 
                  item.source === 'github' ? '<i class="fab fa-github"></i>' : 
                  item.source === 'snapshot' ? '<i class="fas fa-vote-yea"></i>' : 
                  '<i class="fab fa-discord"></i>'}
            </span>
            <span class="content">${item.content}</span>
            ${item.breaking ? '<span class="breaking-tag">🔥 Breaking</span>' : ''}
            <span class="timestamp">${item.timestamp}</span>
        `;
        tickerItem.addEventListener('click', () => {
            // In a real implementation, this would open the source link
            showMessage(`Opening: ${item.content}`, 'info');
        });
        tickerContent.appendChild(tickerItem);
        
        // Clone for continuous scrolling effect
        const clone = tickerItem.cloneNode(true);
        tickerContent.appendChild(clone);
    });
    
    // Start ticker animation
    startTicker();
    
    // Add pause/play functionality
    pauseTickerBtn.addEventListener('click', () => {
        pauseTicker();
    });
    
    playTickerBtn.addEventListener('click', () => {
        startTicker();
    });
}

// Announcement Ticker Controls
function startTicker() {
    if (tickerAnimation) {
        tickerAnimation.play();
    } else {
        tickerContent.style.animationPlayState = 'running';
    }
    tickerPaused = false;
    pauseTickerBtn.style.display = 'flex';
    playTickerBtn.style.display = 'none';
}

function pauseTicker() {
    if (tickerAnimation) {
        tickerAnimation.pause();
    } else {
        tickerContent.style.animationPlayState = 'paused';
    }
    tickerPaused = true;
    pauseTickerBtn.style.display = 'none';
    playTickerBtn.style.display = 'flex';
}

// Load weekly digest from JSON
async function loadWeeklyDigest() {
    try {
        const response = await fetch('data/weekly-digest.json');
        const digestData = await response.json();
        populateWeeklyDigest(digestData);
    } catch (error) {
        console.error('Error loading weekly digest:', error);
        // Fallback to sample data
        const sampleDigest = {
            events: [
                { date: "Mon, Nov 1", event: "New Chain Integration", description: "RedStone adds support for Optimism" },
                { date: "Wed, Nov 3", event: "SDK Update", description: "Version 2.5 released with performance improvements" },
                { date: "Fri, Nov 5", event: "Community Event", description: "AMA with core team at 3PM UTC" },
                { date: "Sun, Nov 7", event: "Governance Vote", description: "Proposal #42: Treasury allocation" }
            ],
            summary: "This week in RedStone: We've expanded to Optimism, released SDK v2.5 with 40% performance improvements, hosted a successful AMA with 300+ participants, and opened voting for Treasury allocation proposal. The ecosystem continues to grow with 15 new integrations."
        };
        populateWeeklyDigest(sampleDigest);
    }
}

// Populate weekly digest
function populateWeeklyDigest(digestData) {
    // Clear existing timeline
    digestTimeline.innerHTML = '';
    
    // Populate timeline
    digestData.events.forEach(event => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="date">${event.date}</div>
            <div class="event">${event.event}</div>
            <div class="description">${event.description}</div>
        `;
        digestTimeline.appendChild(timelineItem);
    });
    
    // Set summary
    weeklySummary.textContent = digestData.summary;
}

// Newsletter & Update Center
function initNewsletter() {
    // Newsletter form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        
        // In a real implementation, this would send data to a backend
        console.log('Newsletter subscription:', { email, name });
        
        // Show success message
        showSuccessModal('Thank you for subscribing to RedStone updates!');
        
        // Reset form
        newsletterForm.reset();
    });
}

// Load polls from JSON
async function loadPolls() {
    try {
        const response = await fetch('data/polls.json');
        const polls = await response.json();
        populatePolls(polls);
    } catch (error) {
        console.error('Error loading polls:', error);
        // Fallback to sample data
        const samplePolls = [
            {
                id: 1,
                title: "Next Chain Integration",
                description: "Which blockchain should we prioritize for integration next?",
                options: [
                    { id: 1, text: "Polygon", votes: 45 },
                    { id: 2, text: "Avalanche", votes: 32 },
                    { id: 3, text: "Fantom", votes: 18 },
                    { id: 4, text: "Celo", votes: 5 }
                ],
                totalVotes: 100,
                active: true
            },
            {
                id: 2,
                title: "Feed Prioritization",
                description: "Which data feed should we focus on developing next?",
                options: [
                    { id: 1, text: "NFT Floor Prices", votes: 62 },
                    { id: 2, text: "Real Estate Data", votes: 28 },
                    { id: 3, text: "Weather Data", votes: 10 }
                ],
                totalVotes: 100,
                active: true
            },
            {
                id: 3,
                title: "Community Grant Allocation",
                description: "How should we distribute the next community grant pool?",
                options: [
                    { id: 1, text: "Developer Tooling (40%)", votes: 35 },
                    { id: 2, text: "Marketing & Outreach (30%)", votes: 45 },
                    { id: 3, text: "Ecosystem Rewards (30%)", votes: 20 }
                ],
                totalVotes: 100,
                active: true
            }
        ];
        populatePolls(samplePolls);
    }
}

// Populate polls
function populatePolls(polls) {
    pollsContainer.innerHTML = '';
    
    polls.forEach(poll => {
        const pollCard = document.createElement('div');
        pollCard.className = 'poll-card';
        
        let optionsHTML = '';
        poll.options.forEach(option => {
            const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
            optionsHTML += `
                <div class="poll-option">
                    <label>
                        <input type="radio" name="poll-${poll.id}" value="${option.id}" ${!poll.active ? 'disabled' : ''}>
                        ${option.text}
                    </label>
                    <div class="result-bar">
                        <div class="result-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="result-info">
                        <span>${percentage}%</span>
                        <span>${option.votes} votes</span>
                    </div>
                </div>
            `;
        });
        
        pollCard.innerHTML = `
            <div class="poll-header">
                <h3 class="poll-title">${poll.title}</h3>
                <p class="poll-description">${poll.description}</p>
            </div>
            <div class="poll-options">
                ${optionsHTML}
            </div>
            <div class="poll-actions">
                <button class="btn btn-primary" ${!poll.active ? 'disabled' : ''}>Vote</button>
                <button class="btn btn-secondary">View Results</button>
            </div>
        `;
        
        pollsContainer.appendChild(pollCard);
    });
}

// Load ambassadors from JSON
async function loadAmbassadors() {
    try {
        const response = await fetch('data/ambassadors.json');
        ambassadorsData = await response.json();
        filteredAmbassadors = [...ambassadorsData];
        renderAmbassadors(filteredAmbassadors);
        initAmbassadorControls();
    } catch (error) {
        console.error('Error loading ambassadors:', error);
        // Fallback to sample data
        ambassadorsData = [
            {
                id: 1,
                name: "Alex Johnson",
                role: "Lead Developer Advocate",
                contribution: "Community",
                xp: 2450,
                level: "Top Contributor",
                avatar: "",
                social: {
                    twitter: "alexj_dev",
                    github: "alexj-dev",
                    linkedin: "alexjohnson-dev"
                },
                badge: "top"
            },
            {
                id: 2,
                name: "Maria Garcia",
                role: "UI/UX Designer",
                contribution: "Design",
                xp: 1890,
                level: "Creative Force",
                avatar: "",
                social: {
                    twitter: "mariag_design",
                    dribbble: "mariag-design",
                    linkedin: "mariagarcia-design"
                },
                badge: "creative"
            },
            {
                id: 3,
                name: "James Wilson",
                role: "Core Protocol Developer",
                contribution: "Builder",
                xp: 3200,
                level: "Builder Elite",
                avatar: "",
                social: {
                    twitter: "jamesw_builder",
                    github: "jamesw-core",
                    linkedin: "jameswilson-dev"
                },
                badge: "elite"
            },
            {
                id: 4,
                name: "Sarah Chen",
                role: "Content Creator",
                contribution: "Community",
                xp: 1650,
                level: "Top Contributor",
                avatar: "",
                social: {
                    twitter: "sarahc_content",
                    youtube: "sarahchen-content",
                    medium: "sarahc-writer"
                },
                badge: "top"
            },
            {
                id: 5,
                name: "David Kim",
                role: "Partner Relations",
                contribution: "Partners",
                xp: 2100,
                level: "Top Contributor",
                avatar: "",
                social: {
                    twitter: "davidk_partners",
                    linkedin: "davidkim-partners"
                },
                badge: "top"
            },
            {
                id: 6,
                name: "Emma Thompson",
                role: "Frontend Developer",
                contribution: "Builder",
                xp: 1950,
                level: "Builder Elite",
                avatar: "",
                social: {
                    twitter: "emmat_frontend",
                    github: "emmat-dev",
                    linkedin: "emmathompson-dev"
                },
                badge: "elite"
            }
        ];
        filteredAmbassadors = [...ambassadorsData];
        renderAmbassadors(filteredAmbassadors);
        initAmbassadorControls();
    }
}

// Initialize ambassador controls
function initAmbassadorControls() {
    // Search functionality
    ambassadorSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredAmbassadors = ambassadorsData.filter(ambassador => 
            ambassador.name.toLowerCase().includes(searchTerm) || 
            ambassador.role.toLowerCase().includes(searchTerm) ||
            ambassador.contribution.toLowerCase().includes(searchTerm)
        );
        renderAmbassadors(filteredAmbassadors);
    });
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter ambassadors
            const filter = button.dataset.filter;
            if (filter === 'all') {
                filteredAmbassadors = [...ambassadorsData];
            } else {
                filteredAmbassadors = ambassadorsData.filter(ambassador => 
                    ambassador.contribution.toLowerCase().includes(filter)
                );
            }
            renderAmbassadors(filteredAmbassadors);
        });
    });
    
    // Join Ambassador button
    joinAmbassadorBtn.addEventListener('click', () => {
        showSuccessModal('Thank you for your interest in becoming a RedStone Ambassador! We will contact you soon.');
    });
}

// Render ambassadors
function renderAmbassadors(ambassadors) {
    ambassadorsGrid.innerHTML = '';
    
    if (ambassadors.length === 0) {
        ambassadorsGrid.innerHTML = '<p class="no-results">No ambassadors found matching your criteria.</p>';
        return;
    }
    
    ambassadors.forEach(ambassador => {
        const card = document.createElement('div');
        card.className = 'ambassador-card';
        card.innerHTML = `
            <div class="ambassador-header">
                <div class="ambassador-avatar">
                    ${ambassador.avatar ? `<img src="${ambassador.avatar}" alt="${ambassador.name}">` : '<i class="fas fa-user"></i>'}
                </div>
                <div class="ambassador-badge badge-${ambassador.badge}">
                    ${ambassador.level}
                </div>
            </div>
            <div class="ambassador-content">
                <h3 class="ambassador-name">${ambassador.name}</h3>
                <p class="ambassador-role">${ambassador.role}</p>
                <div class="ambassador-stats">
                    <div class="stat">
                        <div class="stat-value">${ambassador.xp}</div>
                        <div class="stat-label">XP</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${ambassador.contribution}</div>
                        <div class="stat-label">Role</div>
                    </div>
                </div>
                <div class="ambassador-social">
                    ${ambassador.social.twitter ? `<a href="https://twitter.com/${ambassador.social.twitter}" class="social-link" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                    ${ambassador.social.github ? `<a href="https://github.com/${ambassador.social.github}" class="social-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                    ${ambassador.social.linkedin ? `<a href="https://linkedin.com/in/${ambassador.social.linkedin}" class="social-link" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                    ${ambassador.social.dribbble ? `<a href="https://dribbble.com/${ambassador.social.dribbble}" class="social-link" target="_blank"><i class="fab fa-dribbble"></i></a>` : ''}
                    ${ambassador.social.youtube ? `<a href="https://youtube.com/${ambassador.social.youtube}" class="social-link" target="_blank"><i class="fab fa-youtube"></i></a>` : ''}
                </div>
            </div>
        `;
        ambassadorsGrid.appendChild(card);
    });
}

// Spotlight of the Week
function initSpotlight() {
    // Sample spotlight data
    const spotlight = {
        name: "Alex Johnson",
        role: "Lead Developer Advocate",
        bio: "Alex has been instrumental in building the RedStone developer community, creating educational content that has been viewed over 100,000 times. Their work on the integration tutorials has helped over 200 projects successfully implement RedStone oracles.",
        avatar: "",
        achievements: [
            { icon: "fa-users", value: "50K+", label: "Tutorial Views" },
            { icon: "fa-code", value: "200+", label: "Successful Integrations" },
            { icon: "fa-medal", value: "15", label: "Community Awards" }
        ]
    };
    
    spotlightCard.innerHTML = `
        <div class="spotlight-avatar">
            ${spotlight.avatar ? `<img src="${spotlight.avatar}" alt="${spotlight.name}">` : '<i class="fas fa-user"></i>'}
        </div>
        <h2 class="spotlight-name">${spotlight.name}</h2>
        <p class="spotlight-role">${spotlight.role}</p>
        <p class="spotlight-bio">${spotlight.bio}</p>
        <div class="spotlight-achievements">
            ${spotlight.achievements.map(achievement => `
                <div class="achievement">
                    <div class="achievement-icon">
                        <i class="fas ${achievement.icon}"></i>
                    </div>
                    <div class="achievement-value">${achievement.value}</div>
                    <div class="achievement-label">${achievement.label}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Load Stoney facts from JSON
async function loadStoneyFacts() {
    try {
        const response = await fetch('data/stoney-facts.json');
        stoneyFacts = await response.json();
        showRandomFact();
    } catch (error) {
        console.error('Error loading Stoney facts:', error);
        // Fallback to sample data
        stoneyFacts = [
            "RedStone oracles power over 110 blockchains with real-time data feeds.",
            "Our Push model stores data on-chain for constant availability, while our Pull model fetches fresh data on-demand.",
            "RedStone was the first oracle to offer gas-efficient data delivery for high-frequency applications.",
            "The RedStone token ($RED) is used for governance and securing the oracle network.",
            "Our decentralized network includes 50+ independent node operators worldwide.",
            "RedStone processes over 1 million data updates per day across all supported chains.",
            "Our SDK supports both JavaScript and Python, making integration simple for developers.",
            "RedStone's architecture allows for sub-second data updates to smart contracts."
        ];
        showRandomFact();
    }
    
    // Add event listener to refresh button
    refreshStoney.addEventListener('click', showRandomFact);
}

// Show random Stoney fact
function showRandomFact() {
    if (stoneyFacts.length > 0) {
        const randomIndex = Math.floor(Math.random() * stoneyFacts.length);
        stoneyMessage.textContent = stoneyFacts[randomIndex];
    }
}

// Next Update Timer
function initNextUpdateTimer() {
    updateTimerDisplay();
    
    // Update timer every second
    setInterval(() => {
        nextUpdateSeconds--;
        if (nextUpdateSeconds <= 0) {
            nextUpdateSeconds = 300; // Reset to 5 minutes
            // In a real implementation, this would fetch new data
            console.log('Refreshing data...');
        }
        updateTimerDisplay();
    }, 1000);
    
    function updateTimerDisplay() {
        const minutes = Math.floor(nextUpdateSeconds / 60);
        const seconds = nextUpdateSeconds % 60;
        nextUpdateTimer.textContent = `Next update in: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Modals
function initModals() {
    // Close buttons for all modals
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showSuccessModal(message) {
    successMessage.textContent = message;
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        closeModal(successModal);
    }, 3000);
}

function showMessage(message, type = 'info') {
    // In a real implementation, this would show a toast notification
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNumber,
        showMessage
    };
}
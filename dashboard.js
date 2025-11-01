// ===========================
// RedStone AI Hub Dashboard
// ===========================

// Dashboard State
const dashboardState = {
    stats: {
        totalQuizzes: 0,
        totalChats: 0,
        totalTutorials: 0,
        totalXP: 0
    },
    recentActivity: [],
    theme: 'dark'
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    loadDashboardData();
    setupEventListeners();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('ai-hub-theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    dashboardState.theme = savedTheme;
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ai-hub-theme', newTheme);
        dashboardState.theme = newTheme;
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target.startsWith('#')) {
                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = target;
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Load Dashboard Data
function loadDashboardData() {
    // In a real implementation, this would fetch data from a backend
    // For demonstration, we'll use mock data
    
    // Load stats from localStorage
    const savedStats = JSON.parse(localStorage.getItem('ai-hub-stats') || '{}');
    dashboardState.stats = {
        totalQuizzes: savedStats.totalQuizzes || 24,
        totalChats: savedStats.totalChats || 142,
        totalTutorials: savedStats.totalTutorials || 68,
        totalXP: savedStats.totalXP || 1250
    };
    
    // Load recent activity
    const savedActivity = JSON.parse(localStorage.getItem('ai-hub-activity') || '[]');
    dashboardState.recentActivity = savedActivity.length > 0 ? savedActivity : [
        {
            id: 1,
            type: 'quiz',
            title: 'Advanced Oracle Concepts',
            description: 'Completed with 9/10 correct answers',
            xp: 9,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
            id: 2,
            type: 'chat',
            title: 'Stoney Assistant Session',
            description: 'Discussed Pull Model integration',
            xp: 0,
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        {
            id: 3,
            type: 'tutorial',
            title: 'Solidity Contract Analysis',
            description: 'Explained RedStone integration in contract',
            xp: 5,
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        {
            id: 4,
            type: 'quiz',
            title: 'RWA Data Feeds',
            description: 'Completed with 8/10 correct answers',
            xp: 8,
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
    ];
    
    updateDashboardUI();
}

// Update Dashboard UI
function updateDashboardUI() {
    // Update stats
    document.getElementById('totalQuizzes').textContent = dashboardState.stats.totalQuizzes;
    document.getElementById('totalChats').textContent = dashboardState.stats.totalChats;
    document.getElementById('totalTutorials').textContent = dashboardState.stats.totalTutorials;
    document.getElementById('totalXP').textContent = dashboardState.stats.totalXP;
    
    // Update recent activity
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = dashboardState.recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <div class="activity-meta">
                    <span class="activity-time">${formatTimeAgo(activity.timestamp)}</span>
                    ${activity.xp > 0 ? `<span class="activity-xp">+${activity.xp} XP</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Get icon for activity type
function getActivityIcon(type) {
    switch (type) {
        case 'quiz': return 'question-circle';
        case 'chat': return 'comment';
        case 'tutorial': return 'graduation-cap';
        default: return 'info-circle';
    }
}

// Format time ago
function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        return `${days} days ago`;
    }
}

// Set up Event Listeners
function setupEventListeners() {
    // Quiz Management
    document.getElementById('generateQuizBtn').addEventListener('click', generateNewQuiz);
    document.getElementById('viewHistoryBtn').addEventListener('click', viewQuizHistory);
    
    // Assistant Settings
    document.getElementById('updateKnowledgeBtn').addEventListener('click', updateKnowledgeBase);
    document.getElementById('viewHistoryBtn2').addEventListener('click', viewConversationHistory);
    
    // Tutorial Settings
    document.getElementById('manageExamplesBtn').addEventListener('click', manageCodeExamples);
    document.getElementById('viewAnalyticsBtn').addEventListener('click', viewTutorialAnalytics);
}

// Quiz Management Functions
function generateNewQuiz() {
    // In a real implementation, this would call the AI Quiz Generator
    showNotification('Generating new quiz...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        dashboardState.stats.totalQuizzes++;
        saveStats();
        
        // Add to recent activity
        addToActivity({
            type: 'quiz',
            title: 'New AI Quiz Generated',
            description: 'Generated quiz with 5 advanced questions',
            xp: 0
        });
        
        showNotification('New quiz generated successfully!', 'success');
        updateDashboardUI();
    }, 1500);
}

function viewQuizHistory() {
    // In a real implementation, this would open a modal or navigate to history page
    showNotification('Opening quiz history...', 'info');
}

// Assistant Settings Functions
function updateKnowledgeBase() {
    // In a real implementation, this would update Stoney's knowledge base
    showNotification('Updating knowledge base...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Knowledge base updated successfully!', 'success');
    }, 2000);
}

function viewConversationHistory() {
    // In a real implementation, this would open a modal or navigate to history page
    showNotification('Opening conversation history...', 'info');
}

// Tutorial Settings Functions
function manageCodeExamples() {
    // In a real implementation, this would open a management interface
    showNotification('Opening code examples library...', 'info');
}

function viewTutorialAnalytics() {
    // In a real implementation, this would open analytics dashboard
    showNotification('Opening tutorial analytics...', 'info');
}

// Add to Recent Activity
function addToActivity(activity) {
    const newActivity = {
        id: Date.now(),
        type: activity.type,
        title: activity.title,
        description: activity.description,
        xp: activity.xp,
        timestamp: new Date()
    };
    
    dashboardState.recentActivity.unshift(newActivity);
    
    // Keep only the last 20 activities
    if (dashboardState.recentActivity.length > 20) {
        dashboardState.recentActivity = dashboardState.recentActivity.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem('ai-hub-activity', JSON.stringify(dashboardState.recentActivity));
    
    updateDashboardUI();
}

// Save Stats
function saveStats() {
    localStorage.setItem('ai-hub-stats', JSON.stringify(dashboardState.stats));
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export for debugging
window.dashboardState = dashboardState;
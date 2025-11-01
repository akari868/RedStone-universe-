// ===========================
// RedStone AI Hub Admin Panel
// ===========================

// Admin State
const adminState = {
    quizzes: [],
    users: [],
    currentUser: null,
    filters: {
        status: 'all',
        difficulty: 'all',
        role: 'all'
    }
};

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    loadAdminData();
    setupEventListeners();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('ai-hub-theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ai-hub-theme', newTheme);
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

// Load Admin Data
function loadAdminData() {
    // In a real implementation, this would fetch data from a backend
    // For demonstration, we'll use mock data
    
    // Mock quiz data
    adminState.quizzes = [
        {
            id: 1,
            question: "What cryptographic mechanism does RedStone use to ensure data authenticity in its Pull Model?",
            options: [
                "SHA-256 hashing only",
                "ECDSA signatures with Merkle tree optimization",
                "RSA encryption",
                "Plain text verification"
            ],
            correct: 1,
            explanation: "RedStone uses ECDSA signatures with Merkle tree optimization to ensure data authenticity while minimizing on-chain verification costs!",
            difficulty: "hard",
            source: "Pull Model Docs, Oct 2025",
            status: "pending",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
            id: 2,
            question: "How does RedStone's 'Signature Router' improve oracle efficiency?",
            options: [
                "It routes data through multiple blockchains simultaneously",
                "It aggregates multiple data points into a single signature verification",
                "It encrypts all data transfers",
                "It compresses data before transmission"
            ],
            correct: 1,
            explanation: "The Signature Router aggregates multiple data points into a single signature verification, dramatically reducing gas costs for dApps!",
            difficulty: "hard",
            source: "Core Architecture Docs, Nov 2025",
            status: "approved",
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        {
            id: 3,
            question: "What is the primary advantage of RedStone's 'Core' data delivery method?",
            options: [
                "It provides the cheapest data possible",
                "It delivers data directly to smart contracts with minimal gas overhead",
                "It only works with Ethereum",
                "It requires manual data requests"
            ],
            correct: 1,
            explanation: "RedStone Core delivers data directly to smart contracts with minimal gas overhead by using a specialized data delivery mechanism!",
            difficulty: "medium",
            source: "RedStone Core Docs, Oct 2025",
            status: "pending",
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
    ];
    
    // Mock user data
    adminState.users = [
        {
            id: 1,
            name: "Admin User",
            email: "admin@redstone.finance",
            role: "admin",
            joined: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            status: "active"
        },
        {
            id: 2,
            name: "Moderator User",
            email: "mod@redstone.finance",
            role: "moderator",
            joined: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            status: "active"
        },
        {
            id: 3,
            name: "Regular User",
            email: "user@redstone.finance",
            role: "user",
            joined: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            status: "active"
        }
    ];
    
    updateQuizList();
    updateUserList();
}

// Update Quiz List
function updateQuizList() {
    const quizList = document.getElementById('quizList');
    
    // Filter quizzes based on current filters
    const filteredQuizzes = adminState.quizzes.filter(quiz => {
        if (adminState.filters.status !== 'all' && quiz.status !== adminState.filters.status) {
            return false;
        }
        if (adminState.filters.difficulty !== 'all' && quiz.difficulty !== adminState.filters.difficulty) {
            return false;
        }
        return true;
    });
    
    quizList.innerHTML = filteredQuizzes.map(quiz => `
        <div class="quiz-item" data-id="${quiz.id}">
            <div class="quiz-item-col">
                <div class="quiz-question-preview">${quiz.question}</div>
            </div>
            <div class="quiz-item-col">
                <span class="difficulty-badge ${quiz.difficulty}">${quiz.difficulty}</span>
            </div>
            <div class="quiz-item-col">
                <div class="quiz-source">${quiz.source}</div>
            </div>
            <div class="quiz-item-col">
                <span class="status-badge ${quiz.status}">${quiz.status}</span>
            </div>
            <div class="quiz-item-col">
                <div class="quiz-actions">
                    <button class="btn-icon view-btn" data-id="${quiz.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${quiz.status === 'pending' ? `
                        <button class="btn-icon approve-btn" data-id="${quiz.id}">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-icon reject-btn" data-id="${quiz.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to action buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.view-btn').dataset.id);
            viewQuizDetails(id);
        });
    });
    
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.approve-btn').dataset.id);
            approveQuiz(id);
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.reject-btn').dataset.id);
            rejectQuiz(id);
        });
    });
}

// Update User List
function updateUserList() {
    const userList = document.getElementById('userList');
    
    // Filter users based on current filters
    const filteredUsers = adminState.users.filter(user => {
        if (adminState.filters.role !== 'all' && user.role !== adminState.filters.role) {
            return false;
        }
        return true;
    });
    
    userList.innerHTML = filteredUsers.map(user => `
        <div class="user-item" data-id="${user.id}">
            <div class="user-item-col">
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">${user.email}</div>
                </div>
            </div>
            <div class="user-item-col">
                <span class="role-badge ${user.role}">${user.role}</span>
            </div>
            <div class="user-item-col">
                <div class="user-joined">${formatDate(user.joined)}</div>
            </div>
            <div class="user-item-col">
                <span class="status-badge ${user.status}">${user.status}</span>
            </div>
            <div class="user-item-col">
                <div class="user-actions">
                    <button class="btn-icon edit-btn" data-id="${user.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-btn" data-id="${user.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// View Quiz Details
function viewQuizDetails(quizId) {
    const quiz = adminState.quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    const modal = document.getElementById('quizReviewModal');
    const content = document.getElementById('quizReviewContent');
    
    content.innerHTML = `
        <div class="quiz-review-question">
            <h3>${quiz.question}</h3>
            <div class="quiz-meta">
                <span class="difficulty-badge ${quiz.difficulty}">${quiz.difficulty}</span>
                <span class="source-info">${quiz.source}</span>
            </div>
        </div>
        
        <div class="quiz-review-options">
            <h4>Options</h4>
            ${quiz.options.map((option, index) => `
                <div class="quiz-option ${index === quiz.correct ? 'correct' : ''}">
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                    ${index === quiz.correct ? '<span class="correct-badge">Correct</span>' : ''}
                </div>
            `).join('')}
        </div>
        
        <div class="quiz-review-explanation">
            <h4>Explanation</h4>
            <p>${quiz.explanation}</p>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Set up modal close button
    document.getElementById('closeQuizReviewModal').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    document.getElementById('quizReviewOverlay').addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Set up approve/reject buttons in modal
    document.getElementById('approveQuestionBtn').addEventListener('click', () => {
        approveQuiz(quizId);
        modal.classList.remove('active');
    });
    
    document.getElementById('rejectQuestionBtn').addEventListener('click', () => {
        rejectQuiz(quizId);
        modal.classList.remove('active');
    });
}

// Approve Quiz
function approveQuiz(quizId) {
    const quiz = adminState.quizzes.find(q => q.id === quizId);
    if (quiz) {
        quiz.status = 'approved';
        updateQuizList();
        showNotification('Quiz approved successfully!', 'success');
    }
}

// Reject Quiz
function rejectQuiz(quizId) {
    const quiz = adminState.quizzes.find(q => q.id === quizId);
    if (quiz) {
        quiz.status = 'rejected';
        updateQuizList();
        showNotification('Quiz rejected!', 'info');
    }
}

// Set up Event Listeners
function setupEventListeners() {
    // Filter controls
    document.getElementById('statusFilter').addEventListener('change', (e) => {
        adminState.filters.status = e.target.value;
        updateQuizList();
    });
    
    document.getElementById('difficultyFilter').addEventListener('change', (e) => {
        adminState.filters.difficulty = e.target.value;
        updateQuizList();
    });
    
    document.getElementById('roleFilter').addEventListener('change', (e) => {
        adminState.filters.role = e.target.value;
        updateUserList();
    });
    
    // Bulk actions
    document.getElementById('approveAllBtn').addEventListener('click', approveAllQuizzes);
    document.getElementById('rejectAllBtn').addEventListener('click', rejectAllQuizzes);
    
    // User search
    document.getElementById('userSearch').addEventListener('input', (e) => {
        // In a real implementation, this would filter users
        console.log('Searching for:', e.target.value);
    });
    
    // Add user
    document.getElementById('addUserBtn').addEventListener('click', () => {
        showNotification('Add user functionality would be implemented here', 'info');
    });
}

// Approve All Quizzes
function approveAllQuizzes() {
    const pendingQuizzes = adminState.quizzes.filter(q => q.status === 'pending');
    pendingQuizzes.forEach(quiz => {
        quiz.status = 'approved';
    });
    updateQuizList();
    showNotification(`Approved ${pendingQuizzes.length} quizzes`, 'success');
}

// Reject All Quizzes
function rejectAllQuizzes() {
    const pendingQuizzes = adminState.quizzes.filter(q => q.status === 'pending');
    pendingQuizzes.forEach(quiz => {
        quiz.status = 'rejected';
    });
    updateQuizList();
    showNotification(`Rejected ${pendingQuizzes.length} quizzes`, 'info');
}

// Format Date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
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
window.adminState = adminState;
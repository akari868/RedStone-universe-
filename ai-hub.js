// ===========================
// RedStone AI Hub JavaScript
// ===========================

// State Management
const state = {
    user: null,
    xp: 0,
    chatHistory: [],
    theme: 'dark'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initAssistant();
    initTutorial();
    initFloatingChat();
    initHeroFeatureCards();
    updateStats();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('ai-hub-theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    state.theme = savedTheme;
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ai-hub-theme', newTheme);
        state.theme = newTheme;
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
        });
    });
}

// AI Assistant (Stoney)
function initAssistant() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add initial bot message
    addBotMessage("Hey there! I'm Stoney, your RedStone AI assistant. Ask me anything about RedStone technology, architecture, or integration!");
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message
        addUserMessage(message);
        chatInput.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            // Generate AI response (in a real implementation, this would call an AI service)
            const response = generateAIResponse(message);
            addBotMessage(response);
        }, 1000);
    }
}

function addUserMessage(text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    // This is a mock implementation - in a real system, this would call an AI service
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('pull model')) {
        return "The Pull Model in RedStone allows dApps to request data on-demand through the RedStone SDK. This approach is gas-efficient because data is only fetched when needed, and it ensures you always get the latest information. The data is delivered with cryptographic proofs for verification.";
    } else if (lowerMessage.includes('push model')) {
        return "The Push Model in RedStone actively pushes data to smart contracts at regular intervals, storing it on-chain. This model is ideal when you need constant data availability and predictable gas costs. It's perfect for high-frequency updates where data freshness is critical.";
    } else if (lowerMessage.includes('erc7412')) {
        return "ERC-7412 is RedStone's innovative pull-based oracle standard that enables efficient on-demand data retrieval. It defines a universal interface for oracle data requests, allowing dApps to fetch fresh data with minimal gas costs. The standard supports both EVM and non-EVM chains.";
    } else if (lowerMessage.includes('atom')) {
        return "RedStone Atom is a lightweight oracle module designed for maximum gas efficiency and easy integration. It's perfect for protocols that need a simple, cost-effective oracle solution. Atom supports both Pull and Push models and can be easily customized for specific use cases.";
    } else if (lowerMessage.includes('rwa')) {
        return "RedStone provides oracle data for Real World Assets (RWA) like real estate, commodities, and other tokenized assets. Our oracles enable DeFi protocols to integrate with traditional finance by providing reliable price feeds for these assets. Check out our RWA Tracker for current supported assets.";
    } else {
        return "I'm Stoney, your RedStone AI assistant! I can help you understand RedStone's oracle technology, explain integration guides, or answer questions about our architecture. Try asking about the Pull Model, ERC7412, or RedStone Atom!";
    }
}

// Tutorial Assistant
function initTutorial() {
    const explainBtn = document.getElementById('explainBtn');
    const codeEditor = document.getElementById('codeEditor');
    const explanationContent = document.getElementById('explanationContent');
    
    explainBtn.addEventListener('click', () => {
        const code = codeEditor.value.trim();
        if (code) {
            // Simulate AI code explanation
            const explanation = generateCodeExplanation(code);
            explanationContent.innerHTML = explanation;
        } else {
            explanationContent.innerHTML = "<p>Please enter some code to explain.</p>";
        }
    });
}

function generateCodeExplanation(code) {
    // This is a mock implementation - in a real system, this would call an AI service
    if (code.includes('RedStone')) {
        return `
            <h4>RedStone Integration Code</h4>
            <p>This code appears to be integrating with RedStone's oracle system. Here's what's happening:</p>
            <ol>
                <li><strong>Data Request:</strong> The code is requesting price data from RedStone's oracle network.</li>
                <li><strong>Verification:</strong> It's using RedStone's cryptographic verification to ensure data authenticity.</li>
                <li><strong>Integration:</strong> The data is being integrated into a smart contract for DeFi functionality.</li>
            </ol>
            <p>To learn more about RedStone integration, check out our <a href="https://docs.redstone.finance" target="_blank">documentation</a>.</p>
        `;
    } else if (code.includes('contract')) {
        return `
            <h4>Smart Contract Code</h4>
            <p>This appears to be a Solidity smart contract. Here's a breakdown:</p>
            <ol>
                <li><strong>Contract Declaration:</strong> Defines a new smart contract with a specific name.</li>
                <li><strong>State Variables:</strong> Declares variables to store contract state.</li>
                <li><strong>Functions:</strong> Implements functions that can be called by users or other contracts.</li>
                <li><strong>Modifiers:</strong> Uses modifiers to control function access and behavior.</li>
            </ol>
            <p>For RedStone integration, you would typically import the RedStone client library and use it to fetch oracle data.</p>
        `;
    } else {
        return `
            <h4>Code Analysis</h4>
            <p>I can help explain this code! Here's what I see:</p>
            <ul>
                <li>This code defines variables and functions</li>
                <li>It appears to be performing some kind of data processing</li>
                <li>The logic seems to involve conditional statements and loops</li>
            </ul>
            <p>To get a more detailed explanation, try integrating with RedStone's oracle system for real-time data!</p>
        `;
    }
}

// Floating Chat
function initFloatingChat() {
    const floatingBtn = document.getElementById('floatingChatBtn');
    const assistantSection = document.getElementById('assistant');
    
    floatingBtn.addEventListener('click', () => {
        // Scroll to assistant section
        assistantSection.scrollIntoView({ behavior: 'smooth' });
        
        // Focus on chat input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 1000);
    });
}

// Add this new function to handle hero feature card clicks
function initHeroFeatureCards() {
    const stoneyCard = document.getElementById('stoneyAssistantCard');
    const tutorialCard = document.getElementById('smartTutorialCard');
    
    if (stoneyCard) {
        stoneyCard.addEventListener('click', () => {
            document.querySelector('#assistant').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (tutorialCard) {
        tutorialCard.addEventListener('click', () => {
            document.querySelector('#tutorial').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Stats Update
function updateStats() {
    // In a real implementation, this would fetch actual stats
    // For now, we'll just update the XP display
    updateXPDisplay();
}

function updateXPDisplay() {
    // Update XP in UI if needed
    console.log(`User XP: ${state.xp}`);
}

// Export state for debugging
window.aiHubState = state;
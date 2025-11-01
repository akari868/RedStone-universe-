// ===========================
// Roadmap & KPIs Handler
// ===========================

let roadmapData = [];
let currentFilter = 'all';

// Load roadmap data
async function loadRoadmapData() {
    try {
        const response = await fetch('data/roadmap.json');
        roadmapData = await response.json();
        renderTimeline();
        renderKPIs();
        setupIntersectionObserver();
    } catch (error) {
        console.error('Error loading roadmap data:', error);
        // Fallback to mock data
        loadMockRoadmapData();
    }
}

// Mock data fallback
function loadMockRoadmapData() {
    roadmapData = [
        {
            id: 1,
            date: 'Q4 2024',
            title: 'Enhanced Oracle Infrastructure',
            summary: 'Launch of next-generation oracle architecture with improved latency and reliability',
            status: 'live',
            category: 'mainnet',
            description: 'Comprehensive upgrade to our oracle infrastructure, reducing data delivery latency by 40% and introducing redundant validator networks for enhanced reliability.',
            links: [
                { text: 'Technical RFC', url: '#' },
                { text: 'Documentation', url: '#' }
            ],
            image: 'assets/milestones/oracle-infrastructure.jpg'
        },
        {
            id: 2,
            date: 'Q1 2025',
            title: 'Cross-Chain Integration Layer',
            summary: 'Seamless data feeds across 20+ blockchain networks',
            status: 'in-progress',
            category: 'integrations',
            description: 'Building a unified cross-chain integration layer enabling RedStone oracles to serve data across all major blockchain ecosystems with minimal latency.',
            links: [
                { text: 'Progress Report', url: '#' },
                { text: 'Integration Guide', url: '#' }
            ],
            image: 'assets/milestones/cross-chain.jpg'
        },
        {
            id: 3,
            date: 'Q2 2025',
            title: 'Advanced Data Verification',
            summary: 'Zero-knowledge proof integration for enhanced data integrity',
            status: 'in-progress',
            category: 'r&d',
            description: 'Research and implementation of zero-knowledge proofs for cryptographic verification of oracle data without revealing sensitive information.',
            links: [
                { text: 'Research Paper', url: '#' }
            ],
            image: 'assets/milestones/zk-proofs.jpg'
        },
        {
            id: 4,
            date: 'Q3 2025',
            title: 'Decentralized Governance Launch',
            summary: 'Community-driven protocol governance system',
            status: 'planned',
            category: 'mainnet',
            description: 'Introduction of DAO governance allowing token holders to participate in protocol decisions, parameter updates, and ecosystem development.',
            links: [
                { text: 'Governance Proposal', url: '#' }
            ],
            image: 'assets/milestones/governance.jpg'
        },
        {
            id: 5,
            date: 'Q4 2025',
            title: 'AI-Powered Data Analytics',
            summary: 'Machine learning models for predictive oracle data',
            status: 'planned',
            category: 'r&d',
            description: 'Integration of advanced AI/ML models to provide predictive analytics and anomaly detection for oracle data streams.',
            links: [
                { text: 'Whitepaper', url: '#' }
            ],
            image: 'assets/milestones/ai-analytics.jpg'
        },
        {
            id: 6,
            date: 'Q1 2026',
            title: 'Enterprise Partnership Program',
            summary: 'Dedicated solutions for institutional clients',
            status: 'planned',
            category: 'integrations',
            description: 'Launch of enterprise-grade oracle services with SLA guarantees, dedicated support, and custom data feed configurations.',
            links: [
                { text: 'Enterprise Portal', url: '#' }
            ],
            image: 'assets/milestones/enterprise.jpg'
        }
    ];
    
    renderTimeline();
    renderKPIs();
    setupIntersectionObserver();
}

// Render timeline
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    
    // Add timeline line
    const line = document.createElement('div');
    line.className = 'timeline-line';
    container.innerHTML = '';
    container.appendChild(line);
    
    // Filter data
    const filteredData = currentFilter === 'all' 
        ? roadmapData 
        : roadmapData.filter(item => item.category === currentFilter);
    
    // Render items
    filteredData.forEach((item, index) => {
        const timelineItem = createTimelineItem(item, index);
        container.appendChild(timelineItem);
    });
}

// Create timeline item
function createTimelineItem(item, index) {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.dataset.category = item.category;
    if (item.status === 'live') div.classList.add('completed');
    
    const isLeft = index % 2 === 0;
    
    // Add deep link anchor
    const anchor = document.createElement('div');
    anchor.id = `milestone-${item.id}`;
    anchor.className = 'milestone-deep-link';
    div.appendChild(anchor);
    
    const content = document.createElement('div');
    content.className = 'timeline-content';
    content.innerHTML = `
        <div class="timeline-content">
            ${isLeft ? `
                <div class="timeline-left" data-milestone-id="${item.id}">
                    <div class="milestone-date">${item.date}</div>
                    <h3 class="milestone-title">${item.title}</h3>
                    <p class="milestone-summary">${item.summary}</p>
                    <span class="status-badge ${item.status}">${formatStatus(item.status)}</span>
                </div>
                <div class="timeline-icon">${index + 1}</div>
                <div></div>
            ` : `
                <div></div>
                <div class="timeline-icon">${index + 1}</div>
                <div class="timeline-right" data-milestone-id="${item.id}">
                    <div class="milestone-date">${item.date}</div>
                    <h3 class="milestone-title">${item.title}</h3>
                    <p class="milestone-summary">${item.summary}</p>
                    <span class="status-badge ${item.status}">${formatStatus(item.status)}</span>
                </div>
            `}
        </div>
    `;
    
    // Add click handler
    const clickableElement = div.querySelector('[data-milestone-id]');
    if (clickableElement) {
        clickableElement.addEventListener('click', () => openMilestoneModal(item));
    }
    
    return div;
}

// Format status text
function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Open milestone modal
function openMilestoneModal(milestone) {
    const modal = document.getElementById('milestone-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="milestone-date">${milestone.date}</div>
        <h2 id="modal-title" class="milestone-title">${milestone.title}</h2>
        <span class="status-badge ${milestone.status}">${formatStatus(milestone.status)}</span>
        <p style="margin-top: 1rem; line-height: 1.8;">${milestone.description}</p>
        ${milestone.links && milestone.links.length > 0 ? `
            <div style="margin-top: 2rem;">
                <h3 style="margin-bottom: 1rem;">Resources</h3>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    ${milestone.links.map(link => `
                        <a href="${link.url}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">${link.text}</a>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
    modal.focus();
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and re-render
            currentFilter = button.dataset.filter;
            renderTimeline();
            setupIntersectionObserver();
        });
    });
}

// Setup Intersection Observer for animations
function setupIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
}

// Render KPIs
function renderKPIs() {
    const kpisGrid = document.getElementById('kpis-grid');
    
    const kpis = [
        { value: '150+', label: 'Active Data Feeds' },
        { value: '1M+', label: 'Updates Per Day' },
        { value: '25+', label: 'Supported Chains' },
        { value: '99.9%', label: 'Uptime SLA' }
    ];
    
    kpisGrid.innerHTML = kpis.map(kpi => `
        <div class="kpi-card">
            <div class="kpi-value">${kpi.value}</div>
            <div class="kpi-label">${kpi.label}</div>
        </div>
    `).join('');
    
    // Animate KPIs on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateKPIValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.kpi-card').forEach(card => observer.observe(card));
}

// Animate KPI values
function animateKPIValue(card) {
    const valueElement = card.querySelector('.kpi-value');
    const targetText = valueElement.textContent;
    const hasPlus = targetText.includes('+');
    const hasPercent = targetText.includes('%');
    const hasK = targetText.includes('K');
    const hasM = targetText.includes('M');
    
    let target = parseFloat(targetText.replace(/[+%KM]/g, ''));
    let current = 0;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        
        let displayValue = Math.floor(current);
        if (hasM) displayValue += 'M';
        else if (hasK) displayValue += 'K';
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';
        
        valueElement.textContent = displayValue;
    }, stepDuration);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadRoadmapData();
    setupFilters();
});

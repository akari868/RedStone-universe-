// ===========================
// Partner Map Handler
// ===========================

let partnersData = [];

// Load partners data
async function loadPartnersData() {
    try {
        const response = await fetch('data/partners.json');
        partnersData = await response.json();
        renderPartnerMap();
    } catch (error) {
        console.error('Error loading partners data:', error);
        // Fallback to mock data
        loadMockPartnersData();
    }
}

// Mock partners data
function loadMockPartnersData() {
    partnersData = [
        {
            id: 1,
            name: 'Avalanche',
            logo: 'assets/partners/avalanche.svg',
            type: 'Layer 1 Integration',
            description: 'Native oracle integration providing real-time price feeds for Avalanche DeFi ecosystem',
            location: { lat: 37.7749, lng: -122.4194 },
            website: 'https://avax.network',
            integration: 'Live'
        },
        {
            id: 2,
            name: 'Arbitrum',
            logo: 'assets/partners/arbitrum.svg',
            type: 'Layer 2 Integration',
            description: 'High-speed oracle data delivery for Arbitrum scaling solutions',
            location: { lat: 40.7128, lng: -74.0060 },
            website: 'https://arbitrum.io',
            integration: 'Live'
        },
        {
            id: 3,
            name: 'Polygon',
            logo: 'assets/partners/polygon.svg',
            type: 'Layer 2 Integration',
            description: 'Providing decentralized oracle infrastructure for Polygon ecosystem',
            location: { lat: 19.0760, lng: 72.8777 },
            website: 'https://polygon.technology',
            integration: 'Live'
        },
        {
            id: 4,
            name: 'Optimism',
            logo: 'assets/partners/optimism.svg',
            type: 'Layer 2 Integration',
            description: 'Optimistic rollup oracle integration with low-latency data feeds',
            location: { lat: 51.5074, lng: -0.1278 },
            website: 'https://optimism.io',
            integration: 'Live'
        },
        {
            id: 5,
            name: 'BNB Chain',
            logo: 'assets/partners/bnb.svg',
            type: 'Layer 1 Integration',
            description: 'Comprehensive oracle services for BNB Chain DeFi protocols',
            location: { lat: 1.3521, lng: 103.8198 },
            website: 'https://www.bnbchain.org',
            integration: 'Live'
        },
        {
            id: 6,
            name: 'zkSync',
            logo: 'assets/partners/zksync.svg',
            type: 'Layer 2 Integration',
            description: 'Zero-knowledge rollup oracle integration with enhanced privacy features',
            location: { lat: 52.5200, lng: 13.4050 },
            website: 'https://zksync.io',
            integration: 'In Progress'
        },
        {
            id: 7,
            name: 'Aave',
            logo: 'assets/partners/aave.svg',
            type: 'DeFi Protocol',
            description: 'Providing reliable price feeds for Aave lending markets across multiple chains',
            location: { lat: 51.5074, lng: -0.1278 },
            website: 'https://aave.com',
            integration: 'Live'
        },
        {
            id: 8,
            name: 'Curve Finance',
            logo: 'assets/partners/curve.svg',
            type: 'DeFi Protocol',
            description: 'Oracle integration for stablecoin pools and liquidity management',
            location: { lat: 47.3769, lng: 8.5417 },
            website: 'https://curve.fi',
            integration: 'Live'
        }
    ];
    
    renderPartnerMap();
}

// Render partner map (grid view)
function renderPartnerMap() {
    const partnerMap = document.getElementById('partner-map');
    
    // Create grid layout
    partnerMap.innerHTML = `
        <div class="partner-grid">
            ${partnersData.map(partner => `
                <div class="partner-card" data-partner-id="${partner.id}" role="button" tabindex="0" aria-label="View ${partner.name} details">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div style="width: 100%; height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            ${renderPartnerLogo(partner)}
                        </div>
                        <div class="partner-name">${partner.name}</div>
                        <div class="partner-type">${partner.type}</div>
                        <div style="margin-top: 0.5rem;">
                            <span class="status-badge ${partner.integration.toLowerCase().replace(' ', '-')}" style="font-size: 0.75rem;">
                                ${partner.integration}
                            </span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Add click handlers
    setupPartnerClickHandlers();
}

// Render partner logo (fallback to placeholder if not available)
function renderPartnerLogo(partner) {
    // Create a simple placeholder with partner initial
    const initial = partner.name.charAt(0).toUpperCase();
    const colors = ['#ff4444', '#4444ff', '#44ff44', '#ff44ff', '#44ffff', '#ffff44'];
    const color = colors[partner.id % colors.length];
    
    return `
        <div style="
            width: 60px; 
            height: 60px; 
            border-radius: 50%; 
            background: linear-gradient(135deg, ${color}, ${color}99);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.5rem;
        ">
            ${initial}
        </div>
    `;
}

// Setup click handlers for partner cards
function setupPartnerClickHandlers() {
    const partnerCards = document.querySelectorAll('.partner-card');
    
    partnerCards.forEach(card => {
        const clickHandler = () => {
            const partnerId = parseInt(card.dataset.partnerId);
            const partner = partnersData.find(p => p.id === partnerId);
            if (partner) {
                openPartnerModal(partner);
            }
        };
        
        card.addEventListener('click', clickHandler);
        
        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                clickHandler();
            }
        });
    });
}

// Open partner modal
function openPartnerModal(partner) {
    const modal = document.getElementById('partner-modal');
    const modalBody = document.getElementById('partner-modal-body');
    
    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            ${renderPartnerLogo(partner)}
        </div>
        <h2 id="partner-modal-title" style="text-align: center; margin-bottom: 0.5rem;">${partner.name}</h2>
        <div style="text-align: center; margin-bottom: 1rem;">
            <span class="partner-type" style="color: var(--color-text-secondary);">${partner.type}</span>
        </div>
        <div style="text-align: center; margin-bottom: 2rem;">
            <span class="status-badge ${partner.integration.toLowerCase().replace(' ', '-')}">
                ${partner.integration}
            </span>
        </div>
        <p style="line-height: 1.8; margin-bottom: 2rem; text-align: center;">${partner.description}</p>
        ${partner.website ? `
            <div style="text-align: center;">
                <a href="${partner.website}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Visit Partner Website →
                </a>
            </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
    modal.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close partner modal
function closePartnerModal() {
    const modal = document.getElementById('partner-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup partner modal event handlers
function setupPartnerModalHandlers() {
    const modal = document.getElementById('partner-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closePartnerModal);
    }
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePartnerModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active') && e.key === 'Escape') {
            closePartnerModal();
        }
    });
}

// Alternative: Render SVG world map (optional advanced implementation)
function renderSVGMap() {
    // This is a placeholder for a more advanced SVG world map implementation
    // You could use a library like DataMaps, or create a custom SVG map
    // For now, we're using the grid approach which is more maintainable
    
    console.log('SVG map rendering would go here for advanced implementation');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadPartnersData();
    setupPartnerModalHandlers();
});

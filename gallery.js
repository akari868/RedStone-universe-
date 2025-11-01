// ===========================
// Gallery & Lightbox Handler
// ===========================

let galleryData = [];
let currentFilter = 'all';

// Load gallery data
async function loadGalleryData() {
    try {
        const response = await fetch('data/gallery.json');
        galleryData = await response.json();
        renderGallery();
    } catch (error) {
        console.error('Error loading gallery data:', error);
        // Fallback to mock data
        loadMockGalleryData();
    }
}

// Mock gallery data
function loadMockGalleryData() {
    galleryData = [
        {
            id: 1,
            title: 'Oracle Architecture Diagram',
            caption: 'High-level overview of RedStone oracle infrastructure',
            image: 'assets/gallery/architecture.jpg',
            thumbnail: 'assets/gallery/thumbs/architecture.jpg',
            downloadUrl: 'assets/gallery/architecture.jpg'
        },
        {
            id: 2,
            title: 'Development Team',
            caption: 'Our core engineering team building the future of oracles',
            image: 'assets/gallery/team.jpg',
            thumbnail: 'assets/gallery/thumbs/team.jpg',
            downloadUrl: 'assets/gallery/team.jpg'
        },
        {
            id: 3,
            title: 'Data Flow Visualization',
            caption: 'Real-time data propagation across blockchain networks',
            image: 'assets/gallery/dataflow.jpg',
            thumbnail: 'assets/gallery/thumbs/dataflow.jpg',
            downloadUrl: 'assets/gallery/dataflow.jpg'
        },
        {
            id: 4,
            title: 'Smart Contract Integration',
            caption: 'Example integration with DeFi protocols',
            image: 'assets/gallery/integration.jpg',
            thumbnail: 'assets/gallery/thumbs/integration.jpg',
            downloadUrl: 'assets/gallery/integration.jpg'
        },
        {
            id: 5,
            title: 'Network Topology',
            caption: 'Global validator network distribution',
            image: 'assets/gallery/network.jpg',
            thumbnail: 'assets/gallery/thumbs/network.jpg',
            downloadUrl: 'assets/gallery/network.jpg'
        },
        {
            id: 6,
            title: 'Code Review Session',
            caption: 'Collaborative development and peer review process',
            image: 'assets/gallery/codereview.jpg',
            thumbnail: 'assets/gallery/thumbs/codereview.jpg',
            downloadUrl: 'assets/gallery/codereview.jpg'
        }
    ];
    
    renderGallery();
}

// Render gallery grid
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Filter data if needed
    const filteredData = currentFilter === 'all'
        ? galleryData
        : galleryData.filter(item => item.type === currentFilter);
    
    galleryGrid.innerHTML = filteredData.map(item => `
        <div class="gallery-item" data-gallery-id="${item.id}">
            <img 
                src="${item.thumbnail || item.image}" 
                alt="${item.title}"
                loading="lazy"
            >
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${item.title}</div>
                <div class="gallery-item-caption">${item.caption}</div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    setupGalleryClickHandlers();
    
    // Setup lazy loading with Intersection Observer
    setupLazyLoading();
}

// Setup click handlers for gallery items
function setupGalleryClickHandlers() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = parseInt(item.dataset.galleryId);
            const galleryItem = galleryData.find(g => g.id === itemId);
            if (galleryItem) {
                openLightbox(galleryItem);
            }
        });
        
        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${item.querySelector('img').alt}`);
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

// Open lightbox
function openLightbox(item) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxDownload = document.getElementById('lightbox-download');
    
    lightboxImg.src = item.image;
    lightboxImg.alt = item.title;
    lightboxCaption.textContent = `${item.title} - ${item.caption}`;
    lightboxDownload.href = item.downloadUrl || item.image;
    lightboxDownload.download = `${item.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    
    lightbox.classList.add('active');
    lightbox.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add fade-in effect
                    img.addEventListener('load', () => {
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        setTimeout(() => img.style.opacity = '1', 10);
                    });
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('.gallery-item img').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Setup lightbox event handlers
function setupLightboxHandlers() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('#lightbox .lightbox-close');
    
    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });
}

// Navigate between images in lightbox
function navigateLightbox(direction) {
    const lightboxImg = document.getElementById('lightbox-img');
    const currentSrc = lightboxImg.src;
    const currentItem = galleryData.find(item => 
        currentSrc.includes(item.image.split('/').pop())
    );
    
    if (!currentItem) return;
    
    const currentIndex = galleryData.indexOf(currentItem);
    let newIndex = currentIndex + direction;
    
    // Loop around
    if (newIndex < 0) newIndex = galleryData.length - 1;
    if (newIndex >= galleryData.length) newIndex = 0;
    
    const newItem = galleryData[newIndex];
    openLightbox(newItem);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryData();
    setupLightboxHandlers();
    setupGalleryFilters();
});

// Gallery filter functionality
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and re-render
            currentFilter = button.dataset.filter;
            renderGallery();
        });
    });
}

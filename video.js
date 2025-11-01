// ===========================
// Video Player Handler
// ===========================

let videoData = [];

// Load video data
async function loadVideoData() {
    try {
        const response = await fetch('data/videos.json');
        videoData = await response.json();
        renderVideoCarousel();
    } catch (error) {
        console.error('Error loading video data:', error);
        // Fallback to mock data
        loadMockVideoData();
    }
}

// Mock video data
function loadMockVideoData() {
    videoData = [
        {
            id: 1,
            title: 'RedStone Oracle Deep Dive',
            summary: 'Comprehensive technical overview of RedStone oracle architecture and data delivery mechanisms',
            speakers: 'Lead Architect, CTO',
            duration: '45:30',
            date: 'March 2025',
            thumbnail: 'assets/videos/thumbs/deep-dive.jpg',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            transcriptUrl: '#transcript-1',
            type: 'youtube'
        },
        {
            id: 2,
            title: 'Community AMA - Q1 2025',
            summary: 'Quarterly AMA session covering roadmap updates, partnership announcements, and community questions',
            speakers: 'CEO, Product Lead',
            duration: '60:15',
            date: 'January 2025',
            thumbnail: 'assets/videos/thumbs/ama-q1.jpg',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            transcriptUrl: '#transcript-2',
            type: 'youtube'
        },
        {
            id: 3,
            title: 'Cross-Chain Integration Tutorial',
            summary: 'Step-by-step guide for integrating RedStone oracles across multiple blockchain networks',
            speakers: 'Developer Relations',
            duration: '32:45',
            date: 'February 2025',
            thumbnail: 'assets/videos/thumbs/tutorial.jpg',
            videoUrl: 'https://redstonememes.netlify.app/winner1.mp4',
            transcriptUrl: '#transcript-3',
            type: 'youtube'
        },
        {
            id: 4,
            title: 'Zero-Knowledge Proofs in Oracles',
            summary: 'Research presentation on implementing ZK proofs for enhanced oracle data verification',
            speakers: 'Research Team',
            duration: '38:20',
            date: 'April 2025',
            thumbnail: 'assets/videos/thumbs/zk-research.jpg',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            transcriptUrl: '#transcript-4',
            type: 'youtube'
        }
    ];
    
    renderVideoCarousel();
}

// Render video carousel
function renderVideoCarousel() {
    const categoriesContainer = document.getElementById('video-categories');
    
    if (!categoriesContainer) {
        console.warn('Video categories container not found');
        return;
    }
    
    // Group videos by category
    const groupedVideos = {};
    videoData.forEach(video => {
        const category = video.category || 'Other';
        if (!groupedVideos[category]) {
            groupedVideos[category] = [];
        }
        groupedVideos[category].push(video);
    });
    
    // Render each category
    let html = '';
    Object.keys(groupedVideos).forEach(category => {
        const videos = groupedVideos[category];
        
        html += `
            <div class="video-category-section" style="margin-bottom: var(--spacing-xl);">
                <h3 class="video-category-title" style="font-size: var(--font-size-xl); font-weight: 600; margin-bottom: var(--spacing-md); color: var(--color-accent);">
                    ${category}
                </h3>
                <div class="video-carousel">
                    ${videos.map(video => `
                        <div class="video-card" data-video-id="${video.id}" role="button" tabindex="0" aria-label="Play ${video.title}">
                            <div class="video-thumbnail">
                                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                                <div class="video-play-btn" aria-hidden="true"></div>
                            </div>
                            <div class="video-info">
                                <h3 class="video-title">${video.title}</h3>
                                <div class="video-meta">
                                    <span>${video.speakers}</span> • 
                                    <span>${video.duration}</span> • 
                                    <span>${video.date}</span>
                                </div>
                                <p class="video-summary">${video.summary}</p>
                                ${video.transcriptUrl && video.transcriptUrl !== '#' ? `
                                    <a href="${video.transcriptUrl}" class="video-transcript-link" style="color: var(--color-accent); font-size: var(--font-size-sm); margin-top: 0.5rem; display: inline-block;" target="_blank" rel="noopener noreferrer">
                                        View on Platform →
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    categoriesContainer.innerHTML = html;
    
    // Add click handlers
    setupVideoClickHandlers();
}

// Setup click handlers for video cards
function setupVideoClickHandlers() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const clickHandler = () => {
            const videoId = parseInt(card.dataset.videoId);
            const video = videoData.find(v => v.id === videoId);
            if (video) {
                openVideoModal(video);
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
        
        // Prevent transcript link from opening video
        const transcriptLink = card.querySelector('.video-transcript-link');
        if (transcriptLink) {
            transcriptLink.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });
}

// Open video modal
function openVideoModal(video) {
    const modal = document.getElementById('video-modal');
    const modalBody = document.getElementById('video-modal-body');
    
    let videoEmbed = '';
    
    if (video.type === 'youtube') {
        videoEmbed = `
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <iframe 
                    src="${video.videoUrl}?autoplay=1" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    title="${video.title}"
                ></iframe>
            </div>
        `;
    } else if (video.type === 'vimeo') {
        videoEmbed = `
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <iframe 
                    src="${video.videoUrl}?autoplay=1" 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowfullscreen
                    title="${video.title}"
                ></iframe>
            </div>
        `;
    } else if (video.type === 'twitter') {
        // Twitter/X embed - open in new window
        window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
        return; // Don't show modal for Twitter links
    } else {
        // Self-hosted video
        videoEmbed = `
            <video 
                controls 
                autoplay 
                style="width: 100%; max-height: 70vh; border-radius: var(--radius-lg);"
                aria-label="${video.title}"
            >
                <source src="${video.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
    
    modalBody.innerHTML = `
        <h2 id="video-modal-title" style="margin-bottom: 1rem;">${video.title}</h2>
        <div class="video-meta" style="margin-bottom: 1.5rem;">
            <span>${video.speakers}</span> • 
            <span>${video.duration}</span> • 
            <span>${video.date}</span>
        </div>
        ${videoEmbed}
        <p style="margin-top: 1.5rem; line-height: 1.8;">${video.summary}</p>
        ${video.transcriptUrl ? `
            <div style="margin-top: 1.5rem;">
                <a href="${video.transcriptUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    View Full Transcript
                </a>
            </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
    modal.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalBody = document.getElementById('video-modal-body');
    
    modal.classList.remove('active');
    
    // Stop video playback by clearing the modal content
    modalBody.innerHTML = '';
    
    document.body.style.overflow = '';
}

// Setup video modal event handlers
function setupVideoModalHandlers() {
    const modal = document.getElementById('video-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active') && e.key === 'Escape') {
            closeVideoModal();
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadVideoData();
    setupVideoModalHandlers();
});

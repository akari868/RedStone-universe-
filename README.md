# RedStone Vision Deck - Future & Innovation Portal

A premium, responsive, single-page website built with HTML, CSS, and vanilla JavaScript to showcase RedStone's roadmap, R&D updates, upcoming integrations, and ecosystem expansion.

## 🎯 Project Overview

RedStone Vision Deck is a tech-forward microsite designed for investors, partners, and developers. It features elegant typography, generous spacing, subtle motion effects, neon-accented highlights, and a seamless dark/light theme toggle.

## ✨ Features

### Core Sections

1. **Hero / Value Statement**
   - Compelling headline and subheadline
   - Three primary CTAs (Explore Roadmap, Developers, Partnerships)
   - Animated gradient background

2. **Animated Roadmap Timeline**
   - Horizontal/vertical adaptive timeline with milestones
   - Interactive detail cards with status badges (Planned/In Progress/Live)
   - Filter by category (All/R&D/Mainnet/Integrations)
   - Smooth scroll animations using IntersectionObserver

3. **Behind the Build Dev Gallery**
   - Grid layout with lazy-loaded images
   - Responsive lightbox with keyboard navigation
   - Download functionality for assets
   - Low-quality image placeholders for performance

4. **Embedded AMA Clips / Videos**
   - Video carousel with accessible controls
   - YouTube/Vimeo embed support
   - Modal video player
   - Transcript links for accessibility

5. **Interactive Partner Map**
   - Grid visualization of ecosystem partners
   - Interactive partner cards with details
   - Modal popups with integration information
   - Easy to extend with actual map visualization (SVG/Mapbox)

6. **Live Stats / KPIs**
   - Animated counter cards
   - JSON-driven data (easily swappable with real API)
   - Responsive grid layout

7. **Footer / Resources**
   - Links to documentation, GitHub, social media
   - Newsletter signup placeholder
   - Legal/privacy links

### Technical Features

- **Responsive Design**: Works flawlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Persistent theme toggle with localStorage
- **Accessibility**: WCAG AA compliant with keyboard navigation and ARIA labels
- **Performance**: Lazy loading, IntersectionObserver, optimized animations
- **SEO Ready**: Proper meta tags and Open Graph cards
- **JSON-Driven Content**: Easy content updates without touching code

## 🚀 Quick Start

```bash
# Install dependencies (if needed)
npm install

# Start the development server
npm start

# Or run specific pages
npm run ai-hub
npm run dashboard
npm run admin
npm run communication  # New Communication Center!
```

## 📁 Project Structure

```
├── assets/              # Images and media
├── data/                # JSON data files
│   ├── gallery.json
│   ├── partners.json
│   ├── roadmap.json
│   ├── videos.json
│   ├── ambassadors.json      # New!
│   ├── announcements.json    # New!
│   ├── polls.json           # New!
│   ├── stoney-facts.json    # New!
│   └── weekly-digest.json   # New!
├── index.html              # Main HTML file
├── styles.css             # All styles with CSS variables
├── main.js                # Core app logic (theme, modals, animations)
├── roadmap.js             # Roadmap timeline & KPI handler
├── gallery.js             # Gallery & lightbox functionality
├── video.js               # Video carousel & player
├── map.js                 # Partner map visualization
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)

### Installation

1. **Clone or download this repository**

2. **Open with a local server**

   Option A - Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   Option B - Using Node.js (with npx):
   ```bash
   npx http-server -p 8000
   ```

   Option C - Using PHP:
   ```bash
   php -S localhost:8000
   ```

   Option D - Using VS Code Live Server extension

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📝 Content Management

### Updating Roadmap

Edit `data/roadmap.json`:

```json
{
    "id": 1,
    "date": "Q4 2024",
    "title": "Your Milestone Title",
    "summary": "Short description",
    "status": "live",              // "live", "in-progress", or "planned"
    "category": "mainnet",         // "mainnet", "r&d", or "integrations"
    "description": "Detailed description",
    "links": [
        { "text": "Link Text", "url": "https://example.com" }
    ],
    "image": "path/to/image.jpg"
}
```

### Updating Gallery

Edit `data/gallery.json`:

```json
{
    "id": 1,
    "title": "Image Title",
    "caption": "Image description",
    "image": "path/to/full-image.jpg",
    "thumbnail": "path/to/thumbnail.jpg",
    "downloadUrl": "path/to/downloadable.jpg"
}
```

### Updating Videos

Edit `data/videos.json`:

```json
{
    "id": 1,
    "title": "Video Title",
    "summary": "Video description",
    "speakers": "Speaker Names",
    "duration": "45:30",
    "date": "March 2025",
    "thumbnail": "path/to/thumbnail.jpg",
    "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
    "transcriptUrl": "#transcript-link",
    "type": "youtube"           // "youtube", "vimeo", or "self-hosted"
}
```

### Updating Partners

Edit `data/partners.json`:

```json
{
    "id": 1,
    "name": "Partner Name",
    "logo": "path/to/logo.svg",
    "type": "Integration Type",
    "description": "Partner description",
    "location": { "lat": 0.0, "lng": 0.0 },
    "website": "https://partner.com",
    "integration": "Live"       // "Live" or "In Progress"
}
```

## 🎨 Customization

### Theme Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --color-accent: #ff4444;        /* Primary accent color */
    --color-neon: #00ffff;          /* Neon highlight color */
    /* ... other variables ... */
}
```

### Typography

Change the font by updating the Google Fonts import in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Then update the CSS variable:

```css
:root {
    --font-family: 'Your Font', sans-serif;
}
```

## 🔧 Advanced Features

### Connecting to a Live API

Replace the mock data loading in each JS file:

```javascript
// In roadmap.js, gallery.js, video.js, or map.js
async function loadData() {
    try {
        const response = await fetch('https://your-api.com/endpoint');
        data = await response.json();
        renderContent();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}
```

### Adding Real Map Visualization

To implement an interactive world map:

1. **Using Mapbox** (requires API key):
   ```html
   <script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'></script>
   ```

2. **Using Leaflet** (free):
   ```html
   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
   ```

3. **Using D3.js** (for network graphs):
   ```html
   <script src="https://d3js.org/d3.v7.min.js"></script>
   ```

Update `map.js` with your chosen implementation.

### Using GSAP for Enhanced Animations

Add GSAP library:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

Then use in your JavaScript:

```javascript
gsap.from('.timeline-item', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2
});
```

## 🧪 Accessibility Testing

This site includes:

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Skip links for screen readers
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Focus indicators
- ✅ Semantic HTML

Test with:
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation (Tab, Enter, Escape, Arrow keys)
- Browser accessibility tools (Chrome DevTools Lighthouse)

## 📊 Performance Optimization

Implemented optimizations:

- Lazy loading for images and videos
- IntersectionObserver for scroll animations
- Debounced scroll events
- CSS containment for layout optimization
- Minimal external dependencies

### Running Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for Performance, Accessibility, Best Practices, SEO
4. Target: Performance >= 80

## 🚢 Deployment

### Deploy to Netlify

1. Create `netlify.toml`:
   ```toml
   [build]
     publish = "."
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy via Netlify CLI or drag-and-drop

### Deploy to GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch and root folder
4. Site will be live at `https://username.github.io/repo-name`

### Deploy to Vercel

```bash
npx vercel
```

## 🔐 Security Notes

- No client-side secrets included
- All API keys should be environment variables
- Use restricted API keys for mapping services
- Implement CSP headers for production

## 🐛 Troubleshooting

### Images not loading
- Check file paths in JSON files
- Ensure images are in correct directories
- Verify web server is serving all file types

### Videos not playing
- Verify YouTube/Vimeo embed URLs
- Check CORS settings for self-hosted videos
- Ensure proper iframe permissions

### Animations not working
- Check browser compatibility (use latest browsers)
- Verify IntersectionObserver support
- Check JavaScript console for errors

## 📄 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## 📜 License

This project is provided as-is for RedStone. All rights reserved.

## 🤝 Contributing

To update content:
1. Edit JSON files in `/data` directory
2. Test locally
3. Deploy changes

For code changes:
1. Maintain existing code style
2. Test across browsers
3. Ensure accessibility compliance
4. Update this README if needed

## 📞 Support

For questions or issues:
- Documentation: https://docs.redstone.finance
- GitHub: https://github.com/redstone-finance
- Discord: https://discord.gg/redstone

---

**Built with ❤️ for RedStone - Powering the future of decentralized data infrastructure**

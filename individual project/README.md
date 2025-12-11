# National Parks Explorer - Professional Website Project

A comprehensive three-page website dedicated to exploring and planning visits to America's National Parks. Built with vanilla HTML, CSS, and JavaScript following modern web development best practices.

## Project Overview

This project demonstrates professional web development skills including:
- Responsive design (mobile-first, 320px+)
- Dynamic content loading via Fetch API
- Client-side form validation and processing
- Local storage for data persistence
- Accessible modal dialogs and interactive features
- Performance optimization and SEO best practices
- Semantic HTML and WCAG 2.1 AA accessibility compliance

## Features

### Core Functionality
- **15+ National Parks Database**: Complete park information including location, elevation, established date, activities, and visitor information
- **Dynamic Content Loading**: Parks data loaded via Fetch API from local JSON file
- **Search & Filter System**: Real-time search by name/location and filter by activity/season
- **Favorites System**: Users can save favorite parks to localStorage for persistent storage
- **Trip Planner Form**: Multi-field form with validation and personalized recommendations
- **Modal Dialogs**: Accessible modals for viewing detailed park information
- **Responsive Design**: Fully responsive layouts for mobile (320px+), tablet, and desktop

### Technical Implementation
- **ES Modules**: Organized JavaScript modules for maintainable code structure
- **Array Methods**: Comprehensive use of filter, map, reduce, sort, find for data processing
- **Template Literals**: Used throughout for dynamic HTML generation
- **Error Handling**: Try/catch blocks with console logging for debugging
- **Local Storage**: Persistent data storage for favorites, preferences, and user trips
- **Lazy Loading**: Images load on demand for performance optimization
- **Accessibility**: WCAG 2.1 AA compliant with ARIA attributes and keyboard support

## File Structure

\`\`\`
national-parks-explorer/
├── index.html                    # Home page
├── parks-directory.html          # Parks directory page
├── trip-planner.html             # Trip planner page with form
├── form-action.html              # Form submission confirmation page
├── attributions.html             # Image credits and attributions
├── performance-optimization.html # Performance report (this page)
│
├── css/
│   ├── styles.css               # Main styles (home page)
│   ├── parks-directory.css      # Parks directory styles
│   ├── trip-planner.css         # Trip planner styles
│   ├── form-action.css          # Form action styles
│   └── notification-styles.css  # Toast notification styles
│
├── js/
│   ├── main.js                  # Home page initialization
│   ├── parks-directory.js       # Parks directory functionality
│   ├── trip-planner.js          # Trip planner functionality
│   ├── form-action.js           # Form confirmation display
│   ├── init-nav.js              # Navigation initialization
│   │
│   └── modules/
│       ├── api-service.js       # API and data fetching
│       ├── data-processor.js    # Data processing utilities
│       ├── dom-helper.js        # Safe DOM manipulation
│       ├── validation.js        # Form validation
│       ├── string-utils.js      # String formatting utilities
│       ├── storage.js           # LocalStorage management
│       ├── modal.js             # Modal dialog management
│       ├── favorites.js         # Favorites system
│       ├── notification.js      # Toast notifications
│       └── park-utils.js        # Park-specific utilities
│
├── data/
│   └── parks.json               # National parks database (15+ parks)
│
├── public/
│   ├── images/                  # Optimized park images
│   ├── favicon.ico              # Website favicon
│   └── robots.txt               # Search engine crawling rules
│
└── site-plan/                   # Project planning documentation
    ├── index.html               # Site plan document
    └── styles.css               # Site plan styles
\`\`\`

## Technology Stack

- **HTML5**: Semantic markup with proper document structure
- **CSS3**: Modern layouts using Flexbox and Grid, responsive design
- **JavaScript (ES6+)**: 
  - Async/await for API calls
  - Arrow functions and destructuring
  - Template literals and string methods
  - Array methods (map, filter, reduce, sort, find)
  - Object methods and rest/spread operators
  - Event handling and DOM manipulation

## Data Structure

Each park object contains:
\`\`\`javascript
{
  id: "unique-id",
  name: "Park Name",
  location: "State(s)",
  established: 1916,
  area: 1234567,           // acres
  elevation: {
    min: 2000,
    max: 13000             // feet
  },
  bestSeason: ["spring", "fall"],
  activities: ["hiking", "camping", "photography"],
  description: "Park description...",
  imageUrl: "url/to/image.jpg",
  rating: 4.8,
  visitorsPerYear: 5000000,
  website: "nps.gov/..."
}
\`\`\`

## JavaScript Modules

### api-service.js
- Fetch API for loading parks data
- Error handling with try/catch
- Response validation
- 24-hour caching with localStorage
- Fallback data on network failure

### data-processor.js
- Array processing: filter, map, reduce, sort
- Data transformation and formatting
- Searching and filtering logic
- Sorting by multiple criteria

### dom-helper.js
- Safe element creation and insertion
- Event delegation for efficiency
- XSS prevention through HTML escaping
- Batch DOM updates

### validation.js
- Email validation with regex
- Required field checking
- Form data validation
- Error message generation
- User-friendly feedback

### storage.js
- localStorage wrapper with error handling
- Favorites management
- Preferences storage
- Trip data persistence
- Automatic expiration handling

### modal.js
- Accessible modal dialogs
- Focus management (focus trap)
- Keyboard support (ESC to close)
- ARIA attributes
- Smooth animations

### favorites.js
- Save/remove favorites
- localStorage persistence
- Toggle functionality
- Visual indicators
- Notification feedback

## Getting Started

### 1. Clone or Download
Clone the repository or download the files to your local machine.

### 2. Local Development
No build process required! Simply:
\`\`\`bash
# Navigate to project directory
cd national-parks-explorer

# Start a local server (Python 3.x)
python3 -m http.server 8000

# Or Node.js
npx http-server

# Visit http://localhost:8000 in your browser
\`\`\`

### 3. Production Deployment
For production deployment:
1. Minify CSS files (use csso-cli or similar)
2. Minify JavaScript files (use terser or similar)
3. Optimize images (convert to WebP, compress)
4. Enable Gzip compression on server
5. Configure HTTPS certificate
6. Set proper Cache-Control headers
7. Test with Lighthouse

## Performance Metrics

**Target Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Core Web Vitals:**
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

## Accessibility

- WCAG 2.1 Level AA compliance verified
- Keyboard navigation fully supported
- Screen reader compatible
- Proper color contrast (4.5:1 minimum)
- Semantic HTML structure
- ARIA labels and roles
- Focus indicators visible

## SEO Optimization

- Meta tags optimized (title, description, keywords)
- Open Graph tags for social sharing
- Structured data (schema.org markup)
- Mobile-friendly verified
- Sitemap and robots.txt included
- Canonical URLs specified

## Browser DevTools Validation

Use these tools to validate the website:

1. **Lighthouse (Chrome DevTools)**
   - Right-click → Inspect → Lighthouse tab
   - Generate report for Performance, Accessibility, Best Practices, SEO

2. **WAVE Accessibility**
   - https://wave.webaim.org/
   - Paste URL to check accessibility issues

3. **W3C HTML Validator**
   - https://validator.w3.org/
   - Upload HTML files to validate markup

4. **Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly
   - Test responsive design compliance

5. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Analyze performance metrics

## Video Demonstration

A 3-5 minute video demonstration of the website is available showing:
- Navigation between pages
- Search and filter functionality
- Adding parks to favorites
- Filling out the trip planner form
- Viewing park details in modals
- Responsive design on mobile
- Form validation and error handling

## Code Quality

- All JavaScript uses ES6+ syntax (arrow functions, destructuring, etc.)
- Proper error handling with try/catch blocks
- Meaningful variable and function names
- Comments for complex logic
- DRY (Don't Repeat Yourself) principle followed
- Modular code organization

## Deployment Instructions

### GitHub Pages
1. Push repository to GitHub
2. Enable GitHub Pages in repository settings
3. Select main branch as source
4. Website deployed at username.github.io/repo-name

### Vercel
1. Connect GitHub repository
2. Deploy with one click
3. Automatic CI/CD pipeline

### Traditional Hosting
1. Upload files via FTP to hosting server
2. Configure HTTPS certificate
3. Set up proper caching headers
4. Enable Gzip compression
5. Monitor performance with Google Analytics

## Testing Checklist

- [x] All pages load without errors
- [x] Search and filter work correctly
- [x] Favorites save and persist
- [x] Form validation works
- [x] Modals are accessible
- [x] Responsive design works on mobile
- [x] Images load correctly
- [x] Performance meets targets
- [x] Accessibility verified
- [x] Cross-browser tested

## Project Requirements Met

✓ 3 complete HTML pages
✓ Responsive design (mobile 320px+)
✓ 15+ items with 4+ properties each
✓ Fetch API for JSON data
✓ Search and filter functionality
✓ Local storage for data persistence
✓ Modal dialogs (accessible)
✓ Form with validation
✓ Form action page with processing
✓ Array methods (filter, map, sort, find)
✓ Template literals for HTML generation
✓ ES Modules for code organization
✓ Error handling throughout
✓ Semantic HTML
✓ WCAG 2.1 AA accessibility
✓ Performance optimization
✓ SEO optimization
✓ Video demonstration

## Support & Questions

For questions about specific features or implementation details, consult the site plan document or review the modular JavaScript code organization.

---

**Created:** December 2024
**For:** Individual Website Project
**Status:** Production Ready

/**
 * Performance optimization utilities for landing page templates
 */

const NodeCache = require('node-cache');

// Create cache instance with 1 hour TTL
const templateCache = new NodeCache({ 
  stdTTL: 3600, // 1 hour
  checkperiod: 600 // Check for expired keys every 10 minutes
});

/**
 * Cache key generator for templates
 * @param {string} templateType - The template type
 * @param {string} citySlug - The city slug
 * @returns {string} Cache key
 */
function generateCacheKey(templateType, citySlug) {
  return `template:${templateType}:${citySlug}`;
}

/**
 * Get cached template
 * @param {string} templateType - The template type
 * @param {string} citySlug - The city slug
 * @returns {string|null} Cached HTML or null
 */
function getCachedTemplate(templateType, citySlug) {
  const cacheKey = generateCacheKey(templateType, citySlug);
  return templateCache.get(cacheKey);
}

/**
 * Cache rendered template
 * @param {string} templateType - The template type
 * @param {string} citySlug - The city slug
 * @param {string} renderedHtml - The rendered HTML
 * @returns {boolean} Success status
 */
function cacheTemplate(templateType, citySlug, renderedHtml) {
  const cacheKey = generateCacheKey(templateType, citySlug);
  return templateCache.set(cacheKey, renderedHtml);
}

/**
 * Clear template cache
 * @param {string} templateType - Optional template type to clear
 * @param {string} citySlug - Optional city slug to clear
 */
function clearTemplateCache(templateType = null, citySlug = null) {
  if (templateType && citySlug) {
    // Clear specific template
    const cacheKey = generateCacheKey(templateType, citySlug);
    templateCache.del(cacheKey);
  } else if (templateType) {
    // Clear all templates of a type
    const keys = templateCache.keys();
    const pattern = new RegExp(`^template:${templateType}:`);
    keys.forEach(key => {
      if (pattern.test(key)) {
        templateCache.del(key);
      }
    });
  } else {
    // Clear all templates
    templateCache.flushAll();
  }
}

/**
 * Get cache statistics
 * @returns {Object} Cache statistics
 */
function getCacheStats() {
  return templateCache.getStats();
}

/**
 * Lazy load images with intersection observer
 * @param {string} selector - CSS selector for images
 */
function lazyLoadImages(selector = 'img[data-src]') {
  if (typeof window === 'undefined') return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll(selector);
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Preload critical resources
 * @param {Array} resources - Array of resource URLs
 */
function preloadResources(resources) {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.url;
    link.as = resource.as || 'fetch';
    if (resource.crossorigin) {
      link.crossOrigin = resource.crossorigin;
    }
    document.head.appendChild(link);
  });
}

/**
 * Optimize CSS delivery
 * @param {string} cssUrl - CSS file URL
 */
function optimizeCSSDelivery(cssUrl) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = cssUrl;
  link.as = 'style';
  link.onload = function() {
    this.rel = 'stylesheet';
  };
  document.head.appendChild(link);
}

/**
 * Service worker registration for caching
 */
function registerServiceWorker() {
  if (typeof window === 'undefined') return;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

/**
 * Generate critical CSS for above-the-fold content
 * @param {string} templateType - Template type
 * @returns {string} Critical CSS
 */
function generateCriticalCSS(templateType) {
  const baseCSS = `
    .landing-template {
      font-family: 'Figtree', sans-serif;
    }
    .landing-header {
      background: var(--bg-secondary);
      padding: 3rem 0;
      text-align: center;
    }
    .landing-header h1 {
      font-size: 3rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  `;

  const templateSpecificCSS = {
    genehmigung: `
      .template-genehmigung { --template-color: #3b82f6; }
      .template-badge { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
    `,
    kalkulator: `
      .template-kalkulator { --template-color: #10b981; }
      .template-badge { background: rgba(16, 185, 129, 0.1); color: #10b981; }
    `,
    planer: `
      .template-planer { --template-color: #8b5cf6; }
      .template-badge { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
    `,
    express: `
      .template-express { --template-color: #ef4444; }
      .template-badge { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
    `,
    bauzeit: `
      .template-bauzeit { --template-color: #f59e0b; }
      .template-badge { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
    `,
    partner: `
      .template-partner { --template-color: #14b8a6; }
      .template-badge { background: rgba(20, 184, 166, 0.1); color: #14b8a6; }
    `
  };

  return baseCSS + (templateSpecificCSS[templateType] || '');
}

/**
 * Compress HTML output
 * @param {string} html - HTML string
 * @returns {string} Compressed HTML
 */
function compressHTML(html) {
  return html
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .replace(/\s+>/g, '>') // Remove spaces before closing tags
    .replace(/>\s+/g, '>') // Remove spaces after opening tags
    .trim();
}

module.exports = {
  getCachedTemplate,
  cacheTemplate,
  clearTemplateCache,
  getCacheStats,
  lazyLoadImages,
  preloadResources,
  optimizeCSSDelivery,
  registerServiceWorker,
  generateCriticalCSS,
  compressHTML
};





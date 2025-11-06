// TideMaster Main JavaScript

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (navList) {
            if (window.innerWidth > 768) {
                navList.style.display = 'flex';
            } else {
                navList.style.display = 'none';
            }
        }
    });
    
    // Lazy loading images (native support)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.parentElement.classList.add('active');
        }
    });
});

// Performance optimization: Defer non-critical CSS
function loadDeferredStyles() {
    const addStylesNode = document.getElementById('deferred-styles');
    if (addStylesNode) {
        const replacement = document.createElement('div');
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement);
        addStylesNode.parentElement.removeChild(addStylesNode);
    }
}

// Load deferred styles
const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (raf) {
    raf(function() { window.setTimeout(loadDeferredStyles, 0); });
} else {
    window.addEventListener('load', loadDeferredStyles);
}

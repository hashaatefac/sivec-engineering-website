// Alternative script with debugging to identify the issue
console.log('Debug script loaded');

// Check for problematic links on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking all anchor links...');
    
    const allLinks = document.querySelectorAll('a');
    console.log(`Found ${allLinks.length} total links`);
    
    const hashLinks = document.querySelectorAll('a[href^="#"]');
    console.log(`Found ${hashLinks.length} hash links`);
    
    hashLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`Link ${index}: href="${href}", text="${link.textContent.trim()}"`);
        
        // Check if this href would cause issues
        if (!href || href === '#' || href.length <= 1) {
            console.warn(`Problematic link found: "${href}"`);
        }
    });
    
    // Alternative event handling for service links specifically
    const serviceLinks = document.querySelectorAll('.service-link');
    console.log(`Found ${serviceLinks.length} service links`);
    
    serviceLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`Service link ${index}: href="${href}"`);
        
        link.addEventListener('click', function(e) {
            console.log('Service link clicked:', href);
            
            if (href === '#contact') {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    console.log('Scrolling to contact section');
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.error('Contact section not found');
                }
            }
        });
    });
});

// Safe smooth scrolling function
function safeScrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        return true;
    }
    return false;
}
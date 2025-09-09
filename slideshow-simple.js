// Simplified Hero Slideshow - More Reliable Version
(function() {
    'use strict';
    
    let currentSlide = 0;
    let slides = [];
    let navDots = [];
    let slideInterval = null;
    const slideDuration = 5000; // 5 seconds
    
    function initSlideshow() {
        console.log('🎬 Initializing SIVEC slideshow...');
        
        slides = document.querySelectorAll('.slide');
        navDots = document.querySelectorAll('.nav-dot');
        
        if (slides.length === 0) {
            console.warn('⚠️ No slides found');
            return;
        }
        
        console.log(`✅ Found ${slides.length} slides`);
        
        // Ensure first slide is visible
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === 0) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
            } else {
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(100%)';
            }
        });
        
        // Set up navigation dots
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === 0);
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Set up arrow controls
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopSlideshow();
                previousSlide();
                startSlideshow();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });
        }
        
        // Set up hover pause
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', stopSlideshow);
            hero.addEventListener('mouseleave', startSlideshow);
        }
        
        // Start automatic slideshow
        startSlideshow();
        
        console.log('🚀 Slideshow initialized and started');
    }
    
    function goToSlide(index) {
        if (index === currentSlide) return;
        
        console.log(`🎯 Going to slide ${index + 1}`);
        
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].style.opacity = '0';
        
        // Determine slide direction
        if (index > currentSlide) {
            slides[currentSlide].style.transform = 'translateX(-100%)';
            slides[index].style.transform = 'translateX(100%)';
        } else {
            slides[currentSlide].style.transform = 'translateX(100%)';
            slides[index].style.transform = 'translateX(-100%)';
        }
        
        // Update current slide
        currentSlide = index;
        
        // Show new slide with delay for smooth transition
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.opacity = '1';
            slides[currentSlide].style.transform = 'translateX(0)';
        }, 50);
        
        // Update navigation dots
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    function previousSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    function startSlideshow() {
        stopSlideshow(); // Clear any existing interval
        slideInterval = setInterval(nextSlide, slideDuration);
        console.log('▶️ Slideshow started');
    }
    
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
            console.log('⏸️ Slideshow paused');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlideshow);
    } else {
        initSlideshow();
    }
    
    // Also try to initialize after a short delay in case DOM isn't fully ready
    setTimeout(initSlideshow, 1000);
    
    // Make functions available globally for debugging
    window.sivecSlideshow = {
        next: nextSlide,
        prev: previousSlide,
        goto: goToSlide,
        start: startSlideshow,
        stop: stopSlideshow,
        getCurrentSlide: () => currentSlide + 1,
        getTotalSlides: () => slides.length
    };
    
})();
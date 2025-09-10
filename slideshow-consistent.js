// Consistent Slideshow - Same transition for all slides
(function() {
    'use strict';
    
    let currentSlide = 0;
    let slides = [];
    let navDots = [];
    let slideInterval = null;
    const slideDuration = 5000; // 5 seconds
    
    function initSlideshow() {
        console.log('🎬 Initializing Consistent SIVEC Slideshow...');
        
        slides = document.querySelectorAll('.slide');
        navDots = document.querySelectorAll('.nav-dot');
        
        if (slides.length === 0) {
            console.warn('⚠️ No slides found');
            return;
        }
        
        console.log(`✅ Found ${slides.length} slides`);
        
        // Reset all slides to hidden state
        slides.forEach((slide, index) => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.style.zIndex = '1';
            slide.classList.remove('active', 'fade-out');
        });
        
        // Show first slide immediately
        slides[0].style.opacity = '1';
        slides[0].style.visibility = 'visible';
        slides[0].style.zIndex = '2';
        slides[0].classList.add('active');
        
        // Set first nav dot as active
        if (navDots.length > 0) {
            navDots[0].classList.add('active');
        }
        
        setupEventListeners();
        startAutoSlide();
        
        console.log('🚀 Consistent slideshow initialized');
    }
    
    function setupEventListeners() {
        // Navigation dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Previous/Next buttons
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', previousSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', pauseAutoSlide);
            heroSection.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    function goToSlide(targetIndex) {
        if (targetIndex === currentSlide) return;
        
        console.log(`🎯 Going to slide ${targetIndex + 1}`);
        
        // Hide current slide with consistent fade
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.zIndex = '1';
        slides[currentSlide].classList.remove('active');
        
        // Show target slide with same timing as slide 1->2
        setTimeout(() => {
            slides[currentSlide].style.visibility = 'hidden';
            
            // Prepare and show new slide
            slides[targetIndex].style.visibility = 'visible';
            slides[targetIndex].style.zIndex = '2';
            slides[targetIndex].classList.add('active');
            
            // Fade in new slide
            setTimeout(() => {
                slides[targetIndex].style.opacity = '1';
            }, 50);
            
        }, 100);
        
        // Update current slide and nav dots
        currentSlide = targetIndex;
        updateNavDots();
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    function previousSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    function updateNavDots() {
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function startAutoSlide() {
        pauseAutoSlide();
        slideInterval = setInterval(() => {
            nextSlide();
        }, slideDuration);
    }
    
    function pauseAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlideshow);
    } else {
        initSlideshow();
    }
    
    // Initialize on window load as backup
    window.addEventListener('load', initSlideshow);
})();
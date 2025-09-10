// Professional Hero Slideshow - Market Standard Implementation
(function() {
    'use strict';
    
    class ProfessionalSlideshow {
        constructor() {
            this.currentSlide = 0;
            this.slides = [];
            this.navDots = [];
            this.isTransitioning = false;
            this.slideInterval = null;
            this.slideDuration = 6000; // 6 seconds
            this.transitionDuration = 1500; // 1.5 seconds
            
            this.init();
        }
        
        init() {
            console.log('🎬 Initializing Professional SIVEC Slideshow...');
            
            this.slides = document.querySelectorAll('.slide');
            this.navDots = document.querySelectorAll('.nav-dot');
            
            if (this.slides.length === 0) {
                console.warn('⚠️ No slides found');
                return;
            }
            
            console.log(`✅ Found ${this.slides.length} slides`);
            
            this.setupSlides();
            this.setupEventListeners();
            this.startAutoSlide();
            
            console.log('🚀 Professional slideshow initialized');
        }
        
        setupSlides() {
            // Reset all slides
            this.slides.forEach((slide, index) => {
                slide.classList.remove('active', 'fade-out');
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
                slide.style.zIndex = '1';
            });
            
            // Show first slide
            this.slides[0].classList.add('active');
            this.slides[0].style.opacity = '1';
            this.slides[0].style.visibility = 'visible';
            this.slides[0].style.zIndex = '2';
            
            // Set first nav dot as active
            if (this.navDots.length > 0) {
                this.navDots[0].classList.add('active');
            }
        }
        
        setupEventListeners() {
            // Navigation dots
            this.navDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    if (!this.isTransitioning && index !== this.currentSlide) {
                        this.goToSlide(index);
                    }
                });
            });
            
            // Previous/Next buttons
            const prevBtn = document.getElementById('prevSlide');
            const nextBtn = document.getElementById('nextSlide');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (!this.isTransitioning) {
                        this.previousSlide();
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (!this.isTransitioning) {
                        this.nextSlide();
                    }
                });
            }
            
            // Pause on hover
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', () => this.pauseAutoSlide());
                heroSection.addEventListener('mouseleave', () => this.startAutoSlide());
            }
        }
        
        goToSlide(targetIndex) {
            if (this.isTransitioning || targetIndex === this.currentSlide) return;
            
            this.isTransitioning = true;
            console.log(`🎯 Transitioning to slide ${targetIndex + 1}`);
            
            const currentSlideEl = this.slides[this.currentSlide];
            const targetSlideEl = this.slides[targetIndex];
            
            // Start fade out current slide
            currentSlideEl.classList.remove('active');
            currentSlideEl.classList.add('fade-out');
            
            // Prepare target slide
            targetSlideEl.classList.remove('fade-out');
            targetSlideEl.style.visibility = 'visible';
            targetSlideEl.style.zIndex = '2';
            
            // Start fade in after a small delay
            setTimeout(() => {
                targetSlideEl.classList.add('active');
                targetSlideEl.style.opacity = '1';
            }, 50);
            
            // Complete transition after animation
            setTimeout(() => {
                // Clean up previous slide
                currentSlideEl.classList.remove('fade-out');
                currentSlideEl.style.visibility = 'hidden';
                currentSlideEl.style.zIndex = '1';
                
                // Update current slide
                this.currentSlide = targetIndex;
                this.updateNavDots();
                this.isTransitioning = false;
                
                console.log(`✅ Transition complete - now on slide ${targetIndex + 1}`);
            }, this.transitionDuration);
        }
        
        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        }
        
        previousSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prevIndex);
        }
        
        updateNavDots() {
            this.navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        }
        
        startAutoSlide() {
            this.pauseAutoSlide();
            this.slideInterval = setInterval(() => {
                if (!this.isTransitioning) {
                    this.nextSlide();
                }
            }, this.slideDuration);
        }
        
        pauseAutoSlide() {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
                this.slideInterval = null;
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ProfessionalSlideshow();
        });
    } else {
        new ProfessionalSlideshow();
    }
    
    // Global function for manual control (if needed)
    window.sivecSlideshow = null;
    window.addEventListener('load', () => {
        if (!window.sivecSlideshow) {
            window.sivecSlideshow = new ProfessionalSlideshow();
        }
    });
})();
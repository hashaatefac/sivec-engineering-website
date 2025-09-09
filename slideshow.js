// Hero Background Slideshow
class HeroSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.prevBtn = document.getElementById('prevSlide');
        this.nextBtn = document.getElementById('nextSlide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slideDuration = 5000; // 5 seconds per slide
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        this.setupEventListeners();
        this.startAutoSlide();
        this.preloadImages();
    }

    setupEventListeners() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoSlide();
                this.previousSlide();
                this.startAutoSlide();
            });
        }

        // Next button
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoSlide();
                this.nextSlide();
                this.startAutoSlide();
            });
        }

        // Navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoSlide();
                this.goToSlide(index);
                this.startAutoSlide();
            });
        });

        // Pause slideshow on hover
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => this.stopAutoSlide());
            hero.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;

        hero.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });

        hero.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            this.handleSwipe(startX, endX);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.stopAutoSlide();
                this.previousSlide();
                this.startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                this.stopAutoSlide();
                this.nextSlide();
                this.startAutoSlide();
            }
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            this.stopAutoSlide();
            if (diff > 0) {
                // Swiped left - next slide
                this.nextSlide();
            } else {
                // Swiped right - previous slide
                this.previousSlide();
            }
            this.startAutoSlide();
        }
    }

    goToSlide(slideIndex) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.navDots[this.currentSlide].classList.remove('active');

        // Add transition classes
        if (slideIndex > this.currentSlide) {
            this.slides[this.currentSlide].classList.add('prev');
            this.slides[slideIndex].classList.remove('next');
        } else {
            this.slides[this.currentSlide].classList.add('next');
            this.slides[slideIndex].classList.remove('prev');
        }

        // Update current slide
        this.currentSlide = slideIndex;

        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.navDots[this.currentSlide].classList.add('active');

        // Clean up transition classes after animation
        setTimeout(() => {
            this.slides.forEach(slide => {
                slide.classList.remove('prev', 'next');
            });
        }, 1000);

        this.updateSlideCounter();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    preloadImages() {
        this.slides.forEach(slide => {
            const bgImage = slide.style.backgroundImage;
            if (bgImage) {
                const imageUrl = bgImage.slice(4, -1).replace(/["']/g, "");
                const img = new Image();
                img.src = imageUrl;
            }
        });
    }

    updateSlideCounter() {
        // Optional: Update any slide counter display
        console.log(`Slide ${this.currentSlide + 1} of ${this.slides.length}`);
    }

    // Public methods for external control
    pause() {
        this.stopAutoSlide();
    }

    resume() {
        this.startAutoSlide();
    }

    destroy() {
        this.stopAutoSlide();
        // Remove event listeners if needed for cleanup
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a page with slideshow elements
    if (document.querySelector('.hero-slideshow')) {
        window.heroSlideshow = new HeroSlideshow();
        
        // Add visual feedback for loading
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.style.animationDelay = `${index * 0.2}s`;
        });

        console.log('🎬 Hero slideshow initialized with', slides.length, 'slides');
    }
});

// Optional: Add performance monitoring
class SlideshowPerformanceMonitor {
    constructor(slideshow) {
        this.slideshow = slideshow;
        this.metrics = {
            slideChanges: 0,
            userInteractions: 0,
            averageViewTime: 0
        };
    }

    trackSlideChange() {
        this.metrics.slideChanges++;
    }

    trackUserInteraction() {
        this.metrics.userInteractions++;
    }

    getMetrics() {
        return this.metrics;
    }
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroSlideshow;
}
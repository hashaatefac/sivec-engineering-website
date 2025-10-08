// Robust Slideshow with Image Loading and Fallbacks
(function() {
    'use strict';
    
    let currentSlide = 0;
    let slides = [];
    let navDots = [];
    let slideInterval = null;
    const slideDuration = 5000; // 5 seconds
    
    // Image paths to try (in order of preference)
    const imagePaths = [
        // Local paths (for proper hosting)
        'images/slide-1.jpeg',
        'images/slide-2.jpeg', 
        'images/slide-3.jpeg',
        'images/slide-4.jpeg',
        'images/slide-5.png',
        'images/slide-6.jpeg',
        'images/slide-7.jpeg'
    ];
    
    // GitHub backup paths
    const githubPaths = [
        'https://raw.githubusercontent.com/hashaatefac/sivec-engineering-website/main/images/slide-1.jpeg',
        'https://raw.githubusercontent.com/hashaatefac/sivec-engineering-website/main/images/slide-2.jpeg',
        'https://raw.githubusercontent.com/hashaatefac/sivec-engineering-website/main/images/slide-3.jpeg',
        'https://raw.githubusercontent.com/hashaatefac/sivec-engineering-website/main/images/slide-4.jpeg',
        'https://raw.githubusercontent.com/hashaatefac/sivec-engineering-website/main/images/slide-5.png',
        'https://raw.githubusercontent.com/hashaatefac/sivec-engineering-website/main/images/slide-6.jpeg',
        'https://raw.githubusercontent.com/hashaatefac/sivec-engineering-website/main/images/slide-7.jpeg'
    ];
    
    // Gradient fallbacks for each slide
    const gradientFallbacks = [
        'linear-gradient(135deg, #2c5e3f 0%, #4a9d6f 100%)',
        'linear-gradient(135deg, #4a9d6f 0%, #21b3f1 100%)', 
        'linear-gradient(135deg, #21b3f1 0%, #2c5e3f 100%)',
        'linear-gradient(135deg, #2c5e3f 0%, #21b3f1 100%)',
        'linear-gradient(135deg, #4a9d6f 0%, #2c5e3f 100%)',
        'linear-gradient(135deg, #21b3f1 0%, #4a9d6f 100%)',
        'linear-gradient(135deg, #2c5e3f 0%, #4a9d6f 50%, #21b3f1 100%)'
    ];
    
    function testImageLoad(imagePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log(`✅ Image loaded: ${imagePath}`);
                resolve(imagePath);
            };
            img.onerror = () => {
                console.log(`❌ Image failed: ${imagePath}`);
                reject();
            };
            img.src = imagePath;
            
            // Timeout after 3 seconds
            setTimeout(() => reject(), 3000);
        });
    }
    
    async function setSlideBackground(slide, index) {
        const localPath = imagePaths[index];
        const githubPath = githubPaths[index];
        const fallback = gradientFallbacks[index];
        
        console.log(`🔍 Setting background for slide ${index + 1}`);
        
        try {
            // Try local path first
            await testImageLoad(localPath);
            slide.style.backgroundImage = `url('${localPath}')`;
            console.log(`✅ Slide ${index + 1}: Using local image`);
        } catch {
            try {
                // Try GitHub path as backup
                await testImageLoad(githubPath);
                slide.style.backgroundImage = `url('${githubPath}')`;
                console.log(`✅ Slide ${index + 1}: Using GitHub image`);
            } catch {
                // Use gradient fallback
                slide.style.backgroundImage = fallback;
                console.log(`✅ Slide ${index + 1}: Using gradient fallback`);
            }
        }
    }
    
    async function initSlideshow() {
        console.log('🎬 Initializing Robust SIVEC Slideshow...');
        
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
            
            // Set background for each slide
            setSlideBackground(slide, index);
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
        
        console.log('🚀 Robust slideshow initialized with fallbacks');
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
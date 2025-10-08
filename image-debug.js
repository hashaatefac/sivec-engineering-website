// Image Loading Debug Script
(function() {
    'use strict';
    
    console.log('🖼️ Starting image debug check...');
    
    // Test image loading
    function testImageLoad(imagePath, index) {
        const img = new Image();
        img.onload = function() {
            console.log(`✅ Image ${index} loaded successfully: ${imagePath}`);
        };
        img.onerror = function() {
            console.log(`❌ Image ${index} failed to load: ${imagePath}`);
        };
        img.src = imagePath;
    }
    
    // Test all slide images
    const imagePaths = [
        'images/slide-1.jpeg',
        'images/slide-2.jpeg', 
        'images/slide-3.jpeg',
        'images/slide-4.jpeg',
        'images/slide-5.png',
        'images/slide-6.jpeg',
        'images/slide-7.jpeg'
    ];
    
    console.log('🔍 Testing image paths...');
    imagePaths.forEach((path, index) => {
        testImageLoad(path, index + 1);
    });
    
    // Check slide elements
    setTimeout(() => {
        const slides = document.querySelectorAll('.slide');
        console.log(`📊 Found ${slides.length} slide elements`);
        
        slides.forEach((slide, index) => {
            const bgImage = window.getComputedStyle(slide).backgroundImage;
            console.log(`🎯 Slide ${index + 1} background: ${bgImage}`);
        });
    }, 1000);
    
})();
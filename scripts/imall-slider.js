// scripts/imall-slider.js

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('hero-slider-container');
    const slidesWrapper = sliderContainer.querySelector('.slides-wrapper');
    const slides = Array.from(sliderContainer.querySelectorAll('.slide')); // Convert NodeList to Array
    const dotsContainer = sliderContainer.querySelector('.slider-dots');
    const dots = Array.from(sliderContainer.querySelectorAll('.dot')); // Convert NodeList to Array
    const prevArrow = sliderContainer.querySelector('.slider-arrow.prev');
    const nextArrow = sliderContainer.querySelector('.slider-arrow.next');

    let currentSlideIndex = 0;
    const slideIntervalTime = 5000; // Change slide every 5 seconds
    let slideTimer; // To hold the interval ID for auto-play

    if (!sliderContainer || slides.length === 0) {
        console.warn('iMall Slider: Slider elements not found or no slides available. Skipping slider initialization.');
        return; // Exit if essential elements are missing
    }

    // Function to show a specific slide
    function showSlide(index) {
        // Ensure the index wraps around
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        // Apply transform to the slidesWrapper to show the correct slide
        slidesWrapper.style.transform = `translateX(${-currentSlideIndex * 100}%)`;

        // Update active class for slides
        slides.forEach((slide, i) => {
            if (i === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update active class for dots
        dots.forEach((dot, i) => {
            if (i === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Reset auto-play timer on manual navigation
        resetAutoPlay();
    }

    // Function for next slide
    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    // Function for previous slide
    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    // Auto-play functionality
    function startAutoPlay() {
        slideTimer = setInterval(nextSlide, slideIntervalTime);
    }

    function stopAutoPlay() {
        clearInterval(slideTimer);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event Listeners for arrows
    if (prevArrow) {
        prevArrow.addEventListener('click', prevSlide);
    }
    if (nextArrow) {
        nextArrow.addEventListener('click', nextSlide);
    }

    // Event Listeners for dots
    if (dotsContainer) {
        dots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                const slideIndex = parseInt(event.target.dataset.slide);
                if (!isNaN(slideIndex)) {
                    showSlide(slideIndex);
                }
            });
        });
    }

    // Initial display and start auto-play
    showSlide(0); // Display the first slide initially
    startAutoPlay(); // Start the auto-play
});
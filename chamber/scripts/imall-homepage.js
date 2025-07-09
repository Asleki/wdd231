// scripts/imall-homepage.js

// This script handles the dynamic content rendering for the iMall homepage.

// --- Global Data (Assumed to be loaded from products.js and brands.js) ---
// const ALL_PRODUCTS;      // Defined in products.js
// const CATEGORY_DATA;     // Defined in products.js
// const TOP_BRANDS;        // Defined in brands.js

// --- Global Utility Functions (Assumed to be loaded from common-imall.js) ---
// const PLACEHOLDER_IMAGE_PATH; // Defined in common-imall.js
// function formatCurrency(amount); // Defined in common-imall.js
// function handleImageError(imageElement); // Defined in common-imall.js
// function filterProducts(products, query); // Defined in common-imall.js
// function getNextBatchOfProducts(allProducts, startIndex, limit); // Defined in common-imall.js


// --- Homepage Specific Constants & Variables ---
const PRODUCTS_PER_LOAD = 12; // Number of products to load initially and per "Load More" click
const HERO_PRODUCTS_COUNT = 3; // Number of discounted products to show in the hero slider
const SUPER_PICKS_COUNT = 3; // Number of products to show in Today's Super Picks

let currentProductDisplayIndex = 0; // Tracks the starting index for the next batch of products
let currentlyDisplayedProducts = []; // Stores the products currently rendered on the page (can be filtered)
let currentSearchQuery = ''; // Stores the current search query

let currentHeroSlideIndex = 0; // For the hero slider

// --- DOM Element References ---
const heroSliderContainer = document.getElementById('hero-slider-container');
const heroPrevBtn = document.getElementById('hero-prev-btn');
const heroNextBtn = document.getElementById('hero-next-btn');

const categoriesContainer = document.getElementById('categories-container');
const featuredProductsContainer = document.getElementById('featured-products-container');
const loadMoreBtn = document.getElementById('load-more-products-btn');
const homepageSearchInput = document.getElementById('homepage-search-input');
const homepageSearchButton = document.getElementById('homepage-search-button');
const superPicksContainer = document.getElementById('super-picks-container');
const topBrandsContainer = document.getElementById('top-brands-container');
const whyChooseUsContainer = document.getElementById('why-choose-us-container');


// --- Helper Functions ---

/**
 * Renders the rotating hero section with discounted products.
 */
function renderHeroSlider() {
    if (!heroSliderContainer || !ALL_PRODUCTS) return;

    // Filter for discounted products
    const discountedProducts = ALL_PRODUCTS.filter(p => p.isDiscounted);
    // Shuffle and pick a few for the hero
    const shuffledDiscounted = [...discountedProducts].sort(() => 0.5 - Math.random());
    const heroProducts = shuffledDiscounted.slice(0, HERO_PRODUCTS_COUNT);

    if (heroProducts.length === 0) {
        heroSliderContainer.innerHTML = '<p>No featured deals available right now.</p>';
        return;
    }

    heroSliderContainer.innerHTML = `
        <div class="hero-slider-inner">
            ${heroProducts.map((product, index) => `
                <div class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <div class="hero-content">
                        <div class="hero-text">
                            <h2>Limited Time Offer!</h2>
                            <h3>${product.name}</h3>
                            <p class="hero-price">
                                <span class="current">${formatCurrency(product.price)}</span>
                                <span class="original">${formatCurrency(product.originalPrice)}</span>
                            </p>
                            <a href="deals.html" class="cta-button">Shop All Deals</a>
                        </div>
                        <div class="hero-image">
                            <img src="${product.images[0]}" alt="${product.name}" onerror="handleImageError(this)">
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <button id="hero-prev-btn" class="slider-btn prev">&#10094;</button>
        <button id="hero-next-btn" class="slider-btn next">&#10095;</button>
    `;

    // Re-get button references after they are added to DOM
    const actualHeroPrevBtn = document.getElementById('hero-prev-btn');
    const actualHeroNextBtn = document.getElementById('hero-next-btn');

    const slides = document.querySelectorAll('.hero-slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    if (actualHeroNextBtn) {
        actualHeroNextBtn.addEventListener('click', () => {
            currentHeroSlideIndex = (currentHeroSlideIndex + 1) % slides.length;
            showSlide(currentHeroSlideIndex);
        });
    }
    if (actualHeroPrevBtn) {
        actualHeroPrevIndex = (currentHeroSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentHeroSlideIndex);
    }
    
    // Optional: Auto-rotate slides
    setInterval(() => {
        currentHeroSlideIndex = (currentHeroSlideIndex + 1) % slides.length;
        showSlide(currentHeroSlideIndex);
    }, 5000); // Change slide every 5 seconds
}


/**
 * Renders the "Today's Super Picks" section with 3 products.
 */
function renderSuperPicks() {
    if (!superPicksContainer || !ALL_PRODUCTS) return;

    // Pick 3 random products for super picks (can be customized later)
    const shuffledProducts = [...ALL_PRODUCTS].sort(() => 0.5 - Math.random());
    const superPicks = shuffledProducts.slice(0, SUPER_PICKS_COUNT);

    if (superPicks.length === 0) {
        superPicksContainer.innerHTML = '<p>No super picks available today.</p>';
        return;
    }

    superPicksContainer.innerHTML = superPicks.map(product => createProductCardHTML(product)).join('');
}


/**
 * Renders the "Why Choose Us" section.
 */
function renderWhyChooseUs() {
    if (!whyChooseUsContainer) return;

    whyChooseUsContainer.innerHTML = `
        <div class="why-choose-us-grid">
            <a href="about-us.html#great-value" class="why-choose-us-item">
                <i class="fas fa-tags"></i> <h3>Great Value</h3>
                <p>We offer competitive prices on our 10 million plus product range.</p>
            </a>
            <a href="about-us.html#worldwide-delivery" class="why-choose-us-item">
                <i class="fas fa-globe"></i> <h3>Worldwide Delivery</h3>
                <p>With sites in 3 languages, we ship to over 20 countries & regions.</p>
            </a>
            <a href="about-us.html#safe-payment" class="why-choose-us-item">
                <i class="fas fa-lock"></i> <h3>Safe Payment</h3>
                <p>Pay with the world’s most popular and secure payment methods.</p>
            </a>
            <a href="about-us.html#shop-confidence" class="why-choose-us-item">
                <i class="fas fa-shield-alt"></i> <h3>Shop with Confidence</h3>
                <p>Our Buyer Protection covers your purchase from click to delivery.</p>
            </a>
            <a href="about-us.html#help-center" class="why-choose-us-item">
                <i class="fas fa-headset"></i> <h3>24/7 Help Center</h3>
                <p>Round-the-clock assistance for a smooth shopping experience.</p>
            </a>
            <a href="about-us.html#shop-on-the-go" class="why-choose-us-item">
                <i class="fas fa-mobile-alt"></i> <h3>Shop On-The-Go</h3>
                <p>Download the app and get the world of iMall at your fingertips.</p>
            </a>
        </div>
    `;
    // Note: You'll need to link Font Awesome to your HTML for these icons to display.
    // E.g., <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
}


/**
 * Renders a batch of products into the featured products container.
 * @param {Array<Object>} productsToRender - An array of product objects to render.
 * @param {boolean} clearExisting - If true, clears the container before rendering.
 */
function renderFeaturedProducts(productsToRender, clearExisting = false) {
    if (clearExisting) {
        featuredProductsContainer.innerHTML = '';
    }

    productsToRender.forEach(product => {
        featuredProductsContainer.insertAdjacentHTML('beforeend', createProductCardHTML(product));
    });

    // Update the "Load More" button visibility
    const productsToConsider = currentSearchQuery ? currentlyDisplayedProducts : ALL_PRODUCTS;
    const remainingProducts = productsToConsider.length - currentProductDisplayIndex;

    if (remainingProducts > 0 && !currentSearchQuery) { // Only show if there are more products and no active search
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

/**
 * Renders the product categories.
 */
function renderCategories() {
    if (!categoriesContainer || !CATEGORY_DATA) return;

    categoriesContainer.innerHTML = CATEGORY_DATA.map(category => `
        <a href="category.html?cat=${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}" class="category-card">
            <h3>${category.displayName}</h3>
            <p>${category.subCategories.length} sub-categories</p>
            </a>
    `).join('');
}

/**
 * Renders the top brands section.
 */
function renderTopBrands() {
    if (!topBrandsContainer || !TOP_BRANDS) return;

    topBrandsContainer.innerHTML = TOP_BRANDS.map(brand => `
        <div class="brand-card">
            <img src="${brand.logo}" alt="${brand.name} Logo" onerror="handleImageError(this)">
            <p>${brand.name}</p>
        </div>
    `).join('');
}


// --- Event Handlers ---

/**
 * Handles the "Load More Products" button click.
 */
function handleLoadMore() {
    const nextBatch = getNextBatchOfProducts(ALL_PRODUCTS, currentProductDisplayIndex, PRODUCTS_PER_LOAD);
    renderFeaturedProducts(nextBatch, false); // Append products, don't clear
    currentProductDisplayIndex += nextBatch.length;

    if (currentProductDisplayIndex >= ALL_PRODUCTS.length) {
        loadMoreBtn.style.display = 'none'; // Hide button if all products are loaded
    }
}

/**
 * Handles the homepage search input and button click.
 */
function handleSearch() {
    const query = homepageSearchInput.value.trim();
    currentSearchQuery = query; // Store current search query

    if (query === '') {
        // If search is cleared, reset to initial product display
        currentProductDisplayIndex = 0;
        currentlyDisplayedProducts = []; // Clear any filtered products
        const initialProducts = getNextBatchOfProducts(ALL_PRODUCTS, 0, PRODUCTS_PER_LOAD);
        renderFeaturedProducts(initialProducts, true); // Clear and render initial batch
        currentProductDisplayIndex += initialProducts.length;
        loadMoreBtn.style.display = 'block'; // Show load more button again
    } else {
        const filtered = filterProducts(ALL_PRODUCTS, query);
        currentlyDisplayedProducts = filtered; // Update currently displayed products to filtered list
        currentProductDisplayIndex = filtered.length; // No "Load More" for filtered results (simplifying for search)
        renderFeaturedProducts(filtered, true); // Clear and render filtered results
        loadMoreBtn.style.display = 'none'; // Hide load more button for search results
    }
}


// --- Initialization ---

/**
 * Initializes the homepage by rendering content and setting up event listeners.
 */
function initHomepage() {
    if (!ALL_PRODUCTS || !CATEGORY_DATA || !TOP_BRANDS) {
        console.error('Required data (ALL_PRODUCTS, CATEGORY_DATA, TOP_BRANDS) not loaded. Ensure products.js and brands.js are included before imall-homepage.js.');
        return;
    }

    // Render all homepage sections
    renderHeroSlider(); // New: Hero with discounted products
    renderCategories();
    renderSuperPicks(); // New: Today's Super Picks
    renderFeaturedProducts(getNextBatchOfProducts(ALL_PRODUCTS, 0, PRODUCTS_PER_LOAD), true); // Existing featured products
    currentProductDisplayIndex += PRODUCTS_PER_LOAD; // Update index after initial load
    renderTopBrands();
    renderWhyChooseUs(); // New: Why Choose Us section

    // Set up Event Listeners
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }
    if (homepageSearchButton) {
        homepageSearchButton.addEventListener('click', handleSearch);
    }
    if (homepageSearchInput) {
        homepageSearchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
    }

    console.log('iMall Homepage initialized.');
}

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initHomepage);
// scripts/imall-new-arrivals.js

// This script handles the dynamic content rendering for the iMall New Arrivals page.

// --- Global Data & Utilities (Assumed to be loaded) ---
// const ALL_PRODUCTS;          // From products.js
// function createProductCardHTML(product); // From common-imall.js

// --- New Arrivals Specific Constants & Variables ---
const INITIAL_NEW_ARRIVALS_LOAD = 8; // Number of new arrivals to load initially
const MORE_NEW_ARRIVALS_LOAD = 4;    // Number of new arrivals to load with each "Load More" click

let allNewArrivals = [];        // Stores the complete list of "new arrival" products
let displayedNewArrivalsCount = 0; // Tracks how many new arrivals are currently displayed

// --- DOM Element References ---
const newArrivalsContainer = document.getElementById('new-arrivals-container');
const loadMoreBtn = document.getElementById('load-more-new-arrivals-btn');

// --- Helper Functions ---

/**
 * Simulates fetching "new arrival" products.
 * In a real application, products would have a 'dateAdded' property
 * and you'd filter for recently added items. For this demo, we'll
 * simply pick a shuffled subset of all products.
 * @param {Array<Object>} products - The full list of ALL_PRODUCTS.
 * @returns {Array<Object>} A subset of products considered "new arrivals".
 */
function getNewArrivalProducts(products) {
    // For demo purposes, let's randomly select some products to be "new arrivals".
    // A more realistic scenario would involve a 'dateAdded' property in products.js
    // and filtering by recency.
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    // Let's say, arbitrarily, the top 20-30 products from the shuffled list are "new".
    return shuffledProducts.slice(0, Math.floor(Math.random() * (30 - 20 + 1)) + 20); // 20-30 random products
}


/**
 * Renders a batch of new arrival products into the container.
 * @param {Array<Object>} productsToRender - The products to add to the DOM.
 */
function renderNewArrivals(productsToRender) {
    if (!newArrivalsContainer) return;

    if (productsToRender.length === 0 && displayedNewArrivalsCount === 0) {
        newArrivalsContainer.innerHTML = '<p>No new arrivals to display at the moment. Check back soon!</p>';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }

    productsToRender.forEach(product => {
        newArrivalsContainer.insertAdjacentHTML('beforeend', createProductCardHTML(product));
    });

    displayedNewArrivalsCount += productsToRender.length;

    // Show/hide load more button
    if (loadMoreBtn) {
        if (displayedNewArrivalsCount < allNewArrivals.length) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

/**
 * Loads and renders the initial batch of new arrivals.
 */
function loadInitialNewArrivals() {
    const initialBatch = allNewArrivals.slice(0, INITIAL_NEW_ARRIVALS_LOAD);
    renderNewArrivals(initialBatch);
}

/**
 * Handles the "Load More" button click, rendering the next batch of new arrivals.
 */
function loadMoreNewArrivals() {
    const nextBatch = allNewArrivals.slice(displayedNewArrivalsCount, displayedNewArrivalsCount + MORE_NEW_ARRIVALS_LOAD);
    renderNewArrivals(nextBatch);
}


// --- Initialization ---

/**
 * Initializes the New Arrivals page.
 */
function initNewArrivalsPage() {
    if (document.body.id !== 'new-arrivals-page') {
        // This script should only run on new-arrivals.html
        return;
    }

    if (!ALL_PRODUCTS) {
        console.error('ALL_PRODUCTS data not available. Ensure products.js is included before imall-new-arrivals.js.');
        return;
    }

    // 1. Get the "new arrival" products
    allNewArrivals = getNewArrivalProducts(ALL_PRODUCTS);
    allNewArrivals.sort((a, b) => b.id.localeCompare(a.id)); // A very crude way to "sort" for newness if no date is available

    // 2. Load and render the initial set
    loadInitialNewArrivals();

    // 3. Attach event listener to "Load More" button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreNewArrivals);
    }

    console.log('iMall New Arrivals Page initialized.');
}

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initNewArrivalsPage);
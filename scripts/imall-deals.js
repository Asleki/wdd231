// scripts/imall-deals.js

// This script handles the dynamic content rendering for the iMall Deals page.

// --- Global Data & Utilities (Assumed to be loaded) ---
// const ALL_PRODUCTS;       // From products.js
// function formatCurrency(amount);    // From common-imall.js
// function handleImageError(imageElement); // From common-imall.js
// function createProductCardHTML(product); // From common-imall.js


// --- Deals Page Specific Constants ---
const DEALS_PER_SECTION = 6; // Number of products to show in each deal category section


// --- DOM Element References ---
const todaysDealsContainer = document.getElementById('todays-deals-container');
const superDealsContainer = document.getElementById('super-deals-container');
const bundleDealsContainer = document.getElementById('bundle-deals-container');
const bigSaveContainer = document.getElementById('big-save-container');


// --- Helper Functions ---

/**
 * Renders a list of products into a specified container.
 * @param {HTMLElement} container - The DOM element to render products into.
 * @param {Array<Object>} productsToRender - An array of product objects.
 * @param {string} title - The title of the section (for logging/debugging).
 */
function renderDealSection(container, productsToRender, title = 'Deals') {
    if (!container || !productsToRender) {
        console.warn(`Container or products missing for ${title} section.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content

    if (productsToRender.length === 0) {
        container.innerHTML = `<p>No ${title.toLowerCase()} available right now.</p>`;
        return;
    }

    productsToRender.slice(0, DEALS_PER_SECTION).forEach(product => { // Limit display per section
        container.insertAdjacentHTML('beforeend', createProductCardHTML(product));
    });
    console.log(`Rendered ${productsToRender.slice(0, DEALS_PER_SECTION).length} products for "${title}".`);
}

/**
 * Filters and categorizes products based on discount and other criteria.
 * For demonstration, some categories pick random discounted products.
 * In a real app, products would have specific flags/tags for these categories.
 * @param {Array<Object>} allProducts - The full list of products.
 * @returns {Object} An object containing categorized deal products.
 */
function getCategorizedDeals(allProducts) {
    const discountedProducts = allProducts.filter(p => p.isDiscounted);

    // Shuffle discounted products for random selection in different categories
    const shuffledDiscounted = [...discountedProducts].sort(() => 0.5 - Math.random());

    const deals = {
        todaysDeals: [],
        superDeals: [],
        bundleDeals: [],
        bigSave: []
    };

    // Today's Deals: Could be all discounted, or a larger portion
    deals.todaysDeals = shuffledDiscounted; // All discounted products

    // SuperDeals: Example - highest discounted products, or just a subset of random ones
    // For now, let's say products with a discount of 20% or more (you'd define the logic)
    const highDiscountProducts = discountedProducts.filter(p => (p.originalPrice - p.price) / p.originalPrice >= 0.20);
    deals.superDeals = [...highDiscountProducts].sort(() => 0.5 - Math.random()).slice(0, DEALS_PER_SECTION * 2); // Get more than display limit to allow filtering/sorting

    // Bundle Deals: Currently, we don't have explicit "bundle" product types.
    // For demo, let's just pick a few random discounted items and label them as such.
    // In a real scenario, these would be specific product bundles.
    deals.bundleDeals = [...shuffledDiscounted].sort(() => 0.5 - Math.random()).slice(0, DEALS_PER_SECTION);

    // Big Save: Another category for discounted items, perhaps those with significant fixed savings or another random subset
    deals.bigSave = [...shuffledDiscounted].sort(() => 0.5 - Math.random()).slice(0, DEALS_PER_SECTION * 2);

    return deals;
}

// --- Initialization ---

/**
 * Initializes the Deals page by rendering all deal categories.
 */
function initDealsPage() {
    if (document.body.id !== 'deals-page') {
        // This script should only run on deals.html
        return;
    }

    if (!ALL_PRODUCTS) {
        console.error('ALL_PRODUCTS data not available. Ensure products.js is included before imall-deals.js.');
        return;
    }

    const categorizedDeals = getCategorizedDeals(ALL_PRODUCTS);

    renderDealSection(todaysDealsContainer, categorizedDeals.todaysDeals, "Today's Deals");
    renderDealSection(superDealsContainer, categorizedDeals.superDeals, "SuperDeals");
    renderDealSection(bundleDealsContainer, categorizedDeals.bundleDeals, "Bundle Deals");
    renderDealSection(bigSaveContainer, categorizedDeals.bigSave, "Big Save");

    console.log('iMall Deals Page initialized.');
}

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initDealsPage);
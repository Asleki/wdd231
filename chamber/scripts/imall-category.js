// scripts/imall-category.js

// This script handles the dynamic content rendering for the iMall Category pages.

// --- Global Data & Utilities (Assumed to be loaded) ---
// const ALL_PRODUCTS;       // From products.js
// const CATEGORY_DATA;     // From products.js
// const TOP_BRANDS;        // From brands.js
// function formatCurrency(amount);    // From common-imall.js
// function handleImageError(imageElement); // From common-imall.js
// function createProductCardHTML(product); // From common-imall.js
// function filterProducts(products, query); // From common-imall.js (though we'll do direct filtering here)
// function getNextBatchOfProducts(allProducts, startIndex, limit); // From common-imall.js
// function addToCart(productId, quantity); // From imall-cart.js (will be added later)
// function updateCartDisplay(); // From imall-cart.js (will be added later)
// function updateWishlistCount(); // From imall-wishlist.js (will be added later)


// --- DOM Element References ---
const categoryTitleEl = document.getElementById('category-title');
const productListingGrid = document.getElementById('product-listing-grid');
const categoryBrandsGrid = document.getElementById('category-brands-grid');
const imallCategoryDropdown = document.getElementById('imall-category-dropdown'); // For populating subheader dropdown


// --- Helper Functions ---

/**
 * Gets the category name from the URL query parameter.
 * @returns {string|null} The category name or null if not found.
 */
function getCategoryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('cat');
}

/**
 * Renders a list of products into a specified grid container.
 * @param {HTMLElement} container - The DOM element to render products into.
 * @param {Array<Object>} productsToRender - An array of product objects.
 */
function renderProductsToGrid(container, productsToRender) {
    if (!container) {
        console.error('Product grid container not found.');
        return;
    }
    container.innerHTML = ''; // Clear existing content

    if (productsToRender.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 20px;">No products found in this category.</p>';
        return;
    }

    productsToRender.forEach(product => {
        container.insertAdjacentHTML('beforeend', createProductCardHTML(product));
    });

    // Attach "Add to Cart" and "Add to Wishlist" event listeners after products are rendered
    // These functions will be defined in imall-cart.js and imall-wishlist.js later.
    attachProductCardActionListeners();
}

/**
 * Attaches click listeners to all "Add to Cart" and "Add to Wishlist" buttons.
 * This needs to be called after new product cards are added to the DOM.
 */
function attachProductCardActionListeners() {
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.removeEventListener('click', handleAddToCartClick); // Prevent duplicate listeners
        button.addEventListener('click', handleAddToCartClick);
    });
    document.querySelectorAll('.btn-add-to-wishlist').forEach(button => {
        button.removeEventListener('click', handleAddToWishlistClick); // Prevent duplicate listeners
        button.addEventListener('click', handleAddToWishlistClick);
    });
}

/**
 * Handles the click event for "Add to Cart" buttons.
 * (This function will eventually live in imall-cart.js for better organization,
 * but is temporarily here for demonstration until imall-cart.js is built.)
 */
function handleAddToCartClick(event) {
    const productId = event.target.dataset.productId;
    if (productId && typeof addToCart === 'function') {
        addToCart(productId, 1); // Add 1 quantity by default
        alert('Product added to cart!'); // Simple feedback
    } else {
        console.warn('Add to Cart failed: Product ID missing or addToCart function not available.');
    }
}

/**
 * Handles the click event for "Add to Wishlist" buttons.
 * (This function will eventually live in imall-wishlist.js for better organization,
 * but is temporarily here for demonstration until imall-wishlist.js is built.)
 */
function handleAddToWishlistClick(event) {
    const productId = event.target.dataset.productId;
    if (productId && typeof addToWishlist === 'function') {
        addToWishlist(productId);
        alert('Product added to wishlist!'); // Simple feedback
        // Optionally, change icon to solid heart if product is now in wishlist
        event.target.querySelector('i').classList.replace('far', 'fas');
    } else {
        console.warn('Add to Wishlist failed: Product ID missing or addToWishlist function not available.');
    }
}


/**
 * Renders a list of brands into the brands grid.
 * @param {HTMLElement} container - The DOM element to render brands into.
 * @param {Array<Object>} brandsToRender - An array of brand objects (from TOP_BRANDS).
 */
function renderBrandsToGrid(container, brandsToRender) {
    if (!container) {
        console.error('Category brands grid container not found.');
        return;
    }
    container.innerHTML = ''; // Clear existing content

    if (brandsToRender.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 20px;">No brands found for this category.</p>';
        return;
    }

    brandsToRender.forEach(brand => {
        // Assuming brand object has id, name, and logo properties
        const brandItem = document.createElement('a'); // Make brand item clickable
        // Link to the main iMall page, filtering by brand
        brandItem.href = `imall.html?brand=${encodeURIComponent(brand.name)}`;
        brandItem.classList.add('brand-item');
        brandItem.innerHTML = `
            <img src="${brand.logo}" alt="${brand.name} Logo" onerror="handleImageError(this)">
            <p>${brand.name}</p>
        `;
        container.appendChild(brandItem);
    });
}

/**
 * Populates the iMall subheader category dropdown.
 */
function populateSubheaderCategoryDropdown() {
    if (!imallCategoryDropdown || typeof CATEGORY_DATA === 'undefined') {
        console.error('iMall category dropdown or CATEGORY_DATA not found.');
        return;
    }

    imallCategoryDropdown.innerHTML = ''; // Clear existing
    CATEGORY_DATA.forEach(category => {
        const link = document.createElement('a');
        // Construct a URL for the category page with the category name as a parameter
        link.href = `imall-category.html?cat=${encodeURIComponent(category.name)}`;
        link.textContent = category.displayName;
        imallCategoryDropdown.appendChild(link);
    });
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial checks for global data
    if (typeof ALL_PRODUCTS === 'undefined' || typeof CATEGORY_DATA === 'undefined' || typeof TOP_BRANDS === 'undefined' || typeof PLACEHOLDER_IMAGE_PATH === 'undefined') {
        console.error('Required global data (ALL_PRODUCTS, CATEGORY_DATA, TOP_BRANDS, PLACEHOLDER_IMAGE_PATH) not loaded. Ensure products.js, brands.js, and common-imall.js are linked correctly and before imall-category.js.');
        return;
    }

    const categoryName = getCategoryFromUrl();
    let displayCategoryName = 'All Products';
    let productsToDisplay = ALL_PRODUCTS;
    let brandsToDisplay = TOP_BRANDS; // Start with all brands

    if (categoryName) {
        const foundCategory = CATEGORY_DATA.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        if (foundCategory) {
            displayCategoryName = foundCategory.displayName;
            // Filter products by category
            productsToDisplay = ALL_PRODUCTS.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());

            // Filter brands by products available in this category
            const brandsInThisCategory = new Set();
            productsToDisplay.forEach(product => {
                if (product.brand) { // Ensure product has a brand
                    brandsInThisCategory.add(product.brand);
                }
            });
            // Filter TOP_BRANDS objects based on names found in productsToDisplay
            brandsToDisplay = TOP_BRANDS.filter(brand => brandsInThisCategory.has(brand.name));

        } else if (categoryName === 'all') {
            displayCategoryName = 'All Categories';
            productsToDisplay = ALL_PRODUCTS;
            brandsToDisplay = TOP_BRANDS;
        } else {
            displayCategoryName = 'Category Not Found';
            productsToDisplay = []; // No products for unknown category
            brandsToDisplay = []; // No brands for unknown category
        }
    }

    // Update the category title on the page
    if (categoryTitleEl) {
        categoryTitleEl.textContent = displayCategoryName;
    }

    // Render products for the selected category
    renderProductsToGrid(productListingGrid, productsToDisplay);

    // Render brands related to the selected category
    renderBrandsToGrid(categoryBrandsGrid, brandsToDisplay);

    // Populate the subheader category dropdown (always do this on category page)
    populateSubheaderCategoryDropdown();

    // Initial update of cart and wishlist counts (assuming functions exist)
    if (typeof updateCartDisplay === 'function') updateCartDisplay();
    if (typeof updateWishlistCount === 'function') updateWishlistCount();

    console.log('iMall Category Page script initialized.');
});

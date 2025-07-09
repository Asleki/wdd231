// scripts/common-imall.js

// This file contains common utility functions used across iMall pages.

// --- Global Constants ---
// PLACEHOLDER_IMAGE_PATH is expected to be defined in products.js.

/**
 * Formats a numeric amount into Kenyan Shillings currency string.
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string (e.g., "KSh 1,234").
 */
function formatCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return 'KSh 0.00'; // Default for invalid amounts
    }
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0, // No decimals for whole shillings
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Handles image loading errors by replacing the image source with a placeholder.
 * This function should be called via `onerror="handleImageError(this)"` on `<img>` tags.
 * @param {HTMLImageElement} imageElement - The image element that failed to load.
 */
function handleImageError(imageElement) {
    imageElement.onerror = null; // Prevent infinite loop if placeholder also fails
    // Ensure PLACEHOLDER_IMAGE_PATH is globally accessible from products.js
    if (typeof PLACEHOLDER_IMAGE_PATH !== 'undefined') {
        imageElement.src = PLACEHOLDER_IMAGE_PATH;
    } else {
        console.error('PLACEHOLDER_IMAGE_PATH is not defined. Cannot set fallback image.');
        // Fallback to a generic broken image icon if placeholder path is truly unavailable
        imageElement.src = '';
    }
    imageElement.alt = 'Image not available';
    imageElement.style.objectFit = 'contain'; // Adjust style for placeholder
    console.warn(`Image failed to load: ${imageElement.src}. Using placeholder.`);
}

/**
 * Creates the HTML string for a single product card.
 * This function is crucial for rendering products consistently across pages.
 * It assumes product objects have properties like: id, name, price, originalPrice, isDiscounted, images (array), rating, reviewsCount.
 * @param {Object} product - The product object.
 * @returns {string} The HTML string for the product card.
 */
function createProductCardHTML(product) {
    // Ensure PLACEHOLDER_IMAGE_PATH is globally accessible from products.js
    const fallbackImageUrl = typeof PLACEHOLDER_IMAGE_PATH !== 'undefined' ? PLACEHOLDER_IMAGE_PATH : '';
    const imageUrl = (product.images && product.images.length > 0) ? product.images[0] : fallbackImageUrl;
    const originalPriceHTML = product.isDiscounted && product.originalPrice
        ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>`
        : '';
    const ratingStarsHTML = `<span class="stars" style="--rating: ${product.rating || 0};"></span>`;

    return `
        <div class="product-card" data-product-id="${product.id}">
            <a href="imall-product.html?id=${product.id}" class="product-link">
                <div class="product-image-wrapper">
                    <img src="${imageUrl}" alt="${product.name}" onerror="handleImageError(this)">
                </div>
            </a>
            <div class="product-info">
                <h4 class="product-name"><a href="imall-product.html?id=${product.id}">${product.name}</a></h4>
                <div class="product-rating">
                    ${ratingStarsHTML}
                    <span class="reviews-count">(${product.reviewsCount || 0})</span>
                </div>
                <p class="product-price-info">
                    <span class="current-price">${formatCurrency(product.price)}</span>
                    ${originalPriceHTML}
                </p>
                <div class="product-card-actions">
                    <button class="btn btn-primary btn-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                    <button class="btn btn-outline btn-add-to-wishlist" data-product-id="${product.id}" aria-label="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Utility function to filter products based on a search query.
 * @param {Array<Object>} products - The array of product objects.
 * @param {string} query - The search query string.
 * @returns {Array<Object>} Filtered array of products.
 */
function filterProducts(products, query) {
    const lowerCaseQuery = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery) ||
        product.brand.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(lowerCaseQuery))
    );
}

/**
 * Utility function to get a batch of products for pagination.
 * @param {Array<Object>} allProducts - The full list of products.
 * @param {number} startIndex - The starting index for the batch.
 * @param {number} limit - The maximum number of products to return.
 * @returns {Array<Object>} A subset of products.
 */
function getNextBatchOfProducts(allProducts, startIndex, limit) {
    return allProducts.slice(startIndex, startIndex + limit);
}

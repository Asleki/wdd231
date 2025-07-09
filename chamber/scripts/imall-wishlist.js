// scripts/imall-wishlist.js

// This script manages the user's wishlist functionalities.

// --- Global Data & Utilities (Assumed to be loaded) ---
// const ALL_PRODUCTS;          // From products.js
// const WISHLIST_STORAGE_KEY;  // From common-imall.js
// function getFromLocalStorage(key, defaultValue); // From common-imall.js
// function saveToLocalStorage(key, value); // From common-imall.js
// function formatCurrency(amount);    // From common-imall.js
// function handleImageError(imageElement); // From common-imall.js
// function createProductCardHTML(product); // From common-imall.js
// function addToCart(productId, quantity); // From imall-cart.js (if cart integration is desired)

// --- Wishlist Specific Variables ---
let wishlistItems = []; // Stores an array of product IDs in the wishlist

// --- DOM Element References (for wishlist.html page) ---
const wishlistContainer = document.getElementById('wishlist-items-container');
const emptyWishlistMessage = document.getElementById('wishlist-empty-message');
const wishlistCountBadge = document.getElementById('wishlist-count-badge'); // For displaying count in header/nav


// --- Core Wishlist Functions ---

/**
 * Loads the wishlist from localStorage.
 */
function loadWishlist() {
    wishlistItems = getFromLocalStorage(WISHLIST_STORAGE_KEY, []);
    console.log('Wishlist loaded:', wishlistItems);
}

/**
 * Saves the current wishlist to localStorage.
 */
function saveCurrentWishlist() {
    saveToLocalStorage(WISHLIST_STORAGE_KEY, wishlistItems);
    updateWishlistCount(); // Update the UI count every time wishlist changes
    console.log('Wishlist saved:', wishlistItems);
}

/**
 * Checks if a product is already in the wishlist.
 * @param {string} productId - The ID of the product to check.
 * @returns {boolean} True if the product is in the wishlist, false otherwise.
 */
function isProductInWishlist(productId) {
    return wishlistItems.includes(productId);
}

/**
 * Adds a product to the wishlist.
 * @param {string} productId - The ID of the product to add.
 * @returns {boolean} True if added successfully, false if already exists.
 */
function addToWishlist(productId) {
    if (!isProductInWishlist(productId)) {
        wishlistItems.push(productId);
        saveCurrentWishlist();
        console.log(`Product ${productId} added to wishlist.`);
        return true;
    }
    console.log(`Product ${productId} is already in wishlist.`);
    return false;
}

/**
 * Removes a product from the wishlist.
 * @param {string} productId - The ID of the product to remove.
 * @returns {boolean} True if removed successfully, false if not found.
 */
function removeFromWishlist(productId) {
    const initialLength = wishlistItems.length;
    wishlistItems = wishlistItems.filter(id => id !== productId);
    if (wishlistItems.length < initialLength) {
        saveCurrentWishlist();
        console.log(`Product ${productId} removed from wishlist.`);
        return true;
    }
    console.log(`Product ${productId} not found in wishlist.`);
    return false;
}

/**
 * Updates the displayed count of items in the wishlist badge (if available).
 */
function updateWishlistCount() {
    if (wishlistCountBadge) {
        const count = wishlistItems.length;
        wishlistCountBadge.textContent = count > 0 ? count : '';
        wishlistCountBadge.style.display = count > 0 ? 'flex' : 'none'; // Show if count > 0
    }
}

/**
 * Renders the wishlist items on the wishlist.html page.
 */
function renderWishlistPage() {
    if (!wishlistContainer || !emptyWishlistMessage || !ALL_PRODUCTS) {
        console.warn('Wishlist containers or ALL_PRODUCTS data not found. Skipping wishlist page render.');
        return;
    }

    wishlistContainer.innerHTML = ''; // Clear previous items

    if (wishlistItems.length === 0) {
        wishlistContainer.style.display = 'none';
        emptyWishlistMessage.style.display = 'block';
    } else {
        emptyWishlistMessage.style.display = 'none';
        wishlistContainer.style.display = 'grid'; // Ensure grid is visible

        const productsInWishlist = ALL_PRODUCTS.filter(p => wishlistItems.includes(p.id));

        productsInWishlist.forEach(product => {
            const productCardHtml = createWishlistItemHTML(product); // Use a specific layout for wishlist items
            wishlistContainer.insertAdjacentHTML('beforeend', productCardHtml);
        });

        // Add event listeners for "Remove" buttons and "Add to Cart" buttons within wishlist
        wishlistContainer.querySelectorAll('.wishlist-remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.productId;
                removeFromWishlist(productId);
                // Re-render the wishlist page to reflect the change
                renderWishlistPage();
            });
        });

        wishlistContainer.querySelectorAll('.add-to-cart-wishlist-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.currentTarget.dataset.productId;
                // Ensure addToCart function from imall-cart.js is available
                if (typeof window.addToCart === 'function') {
                    window.addToCart(productId, 1); // Add 1 item from wishlist to cart
                    alert(`${ALL_PRODUCTS.find(p => p.id === productId)?.name || 'Item'} added to cart!`);
                    // Optionally, remove from wishlist after adding to cart
                    // removeFromWishlist(productId);
                    // renderWishlistPage();
                } else {
                    console.error('addToCart function not available. Ensure imall-cart.js is loaded.');
                    alert('Could not add to cart. Cart functionality not loaded.');
                }
            });
        });
    }
    console.log(`Rendered ${productsInWishlist.length} wishlist items.`);
}

/**
 * Creates the HTML for a single item displayed on the wishlist page.
 * This is slightly different from product cards on other pages.
 * @param {Object} product - The product object.
 * @returns {string} HTML string for the wishlist item.
 */
function createWishlistItemHTML(product) {
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : PLACEHOLDER_IMAGE_PATH;

    const originalPriceHTML = product.isDiscounted
        ? `<p class="original-price">${formatCurrency(product.originalPrice)}</p>`
        : '';

    return `
        <div class="wishlist-item" data-product-id="${product.id}">
            <div class="wishlist-item-image">
                <img src="${imageUrl}" alt="${product.name}" onerror="handleImageError(this)">
            </div>
            <div class="wishlist-item-details">
                <h3 class="wishlist-item-name"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                <p class="wishlist-item-brand">${product.brand}</p>
                <div class="wishlist-item-price">
                    <p class="current-price">${formatCurrency(product.price)}</p>
                    ${originalPriceHTML}
                </div>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart-wishlist-btn primary-btn" data-product-id="${product.id}">Add to Cart</button>
                    <button class="wishlist-remove-btn secondary-btn" data-product-id="${product.id}">Remove</button>
                </div>
            </div>
        </div>
    `;
}

// --- Global Event Listener for Wishlist Toggle Buttons on Product Cards ---
// This listener should be active across all pages that display product cards.
document.addEventListener('click', (event) => {
    const targetButton = event.target.closest('.wishlist-toggle-btn');
    if (targetButton) {
        const productId = targetButton.dataset.productId;
        if (productId) {
            if (isProductInWishlist(productId)) {
                removeFromWishlist(productId);
                targetButton.classList.remove('active');
                targetButton.querySelector('i').className = 'far fa-heart'; // Empty heart
                targetButton.title = 'Add to Wishlist';
                alert(`${ALL_PRODUCTS.find(p => p.id === productId)?.name || 'Item'} removed from wishlist.`);
            } else {
                addToWishlist(productId);
                targetButton.classList.add('active');
                targetButton.querySelector('i').className = 'fas fa-heart'; // Solid heart
                targetButton.title = 'Remove from Wishlist';
                alert(`${ALL_PRODUCTS.find(p => p.id === productId)?.name || 'Item'} added to wishlist.`);
            }
        }
    }
});


// --- Initialization ---

/**
 * Initializes the wishlist functionality.
 * This runs on all pages to ensure wishlist count is updated and global listeners are set.
 */
function initWishlist() {
    loadWishlist(); // Load wishlist on every page load
    updateWishlistCount(); // Update the count badge

    // If on the dedicated wishlist page, render its contents
    if (document.body.id === 'wishlist-page') {
        renderWishlistPage();
    }
    console.log('iMall Wishlist functionality initialized.');
}

// Make core wishlist functions globally accessible if needed by other modules (e.g., )
window.isProductInWishlist = isProductInWishlist;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initWishlist);
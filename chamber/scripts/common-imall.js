// scripts/common-imall.js

// This file contains global constants and common utility functions
// used across the iMall website.

// --- Global Constants ---
const CART_STORAGE_KEY = 'imall_cart';
const WISHLIST_STORAGE_KEY = 'imall_wishlist';
const SHIPPING_COST = 500;
const PLACEHOLDER_IMAGE_PATH = 'images/placeholder.webp'; // Corrected to .webp as per earlier discussion
const API_BASE_URL = 'https://api.imall.com/v1';

// --- Utility Functions ---

function formatCurrency(amount) {
    if (typeof amount !== 'number') {
        console.warn('formatCurrency received non-numeric input:', amount);
        return 'KSh 0.00';
    }
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function handleImageError(imageElement) {
    if (imageElement && imageElement.src !== PLACEHOLDER_IMAGE_PATH) {
        imageElement.src = PLACEHOLDER_IMAGE_PATH;
        imageElement.alt = 'Image not available';
        console.warn(`Image failed to load: ${imageElement.dataset.originalSrc || 'unknown'}. Replaced with placeholder.`);
        imageElement.dataset.originalSrc = imageElement.src;
    }
}

// --- Local Storage Utilities ---
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(`Error saving to localStorage for key "${key}":`, e);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error(`Error retrieving from localStorage for key "${key}":`, e);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error(`Error removing from localStorage for key "${key}":`, e);
    }
}

// --- Product/Data Related Utilities ---

function createProductCardHTML(product) {
    if (!product || !product.images || product.images.length === 0) {
        product.images = [PLACEHOLDER_IMAGE_PATH];
    }

    const originalPriceHTML = product.isDiscounted
        ? `<p class="original-price">${formatCurrency(product.originalPrice)}</p>`
        : '';

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <a href="product-detail.html?id=${product.id}"> <img src="${product.images[0]}" alt="${product.name}" class="product-image" onerror="handleImageError(this)"> </a>
                ${product.isDiscounted ? '<span class="discount-badge">Sale!</span>' : ''}
            </div>
            <h3 class="product-name"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            <p class="product-brand">${product.brand}</p>
            <div class="product-price-info">
                <p class="current-price">${formatCurrency(product.price)}</p>
                ${originalPriceHTML}
            </div>
            <div class="product-rating">
                <span class="stars" style="--rating: ${product.rating};" aria-label="Rating of this product is ${product.rating} out of 5."></span>
                <span class="reviews-count">(${product.reviewsCount} reviews)</span>
            </div>
            <div class="product-card-actions">
                <button class="add-to-cart-btn" data-product-id="${product.id}" onclick="addToCart('${product.id}')">Add to Cart</button>
                <button class="wishlist-toggle-btn" data-product-id="${product.id}" title="Add to Wishlist" onclick="toggleWishlist('${product.id}')">
                    <i class="far fa-heart"></i> </button>
            </div>
        </div>
    `;
}

function filterProducts(products, query) {
    if (!query || query.trim() === '') {
        return products;
    }
    const lowerCaseQuery = query.toLowerCase().trim();
    return products.filter(product => {
        return product.name.toLowerCase().includes(lowerCaseQuery) ||
               product.description.toLowerCase().includes(lowerCaseQuery) ||
               product.brand.toLowerCase().includes(lowerCaseQuery) ||
               (product.category && product.category.toLowerCase().includes(lowerCaseQuery)) || // Added check for category existence
               (product.subCategory && product.subCategory.toLowerCase().includes(lowerCaseQuery)); // Added check for subCategory existence
    });
}

function getNextBatchOfProducts(allProducts, startIndex, limit) {
    if (!Array.isArray(allProducts)) {
        console.error('getNextBatchOfProducts expects an array for allProducts.');
        return [];
    }
    return allProducts.slice(startIndex, startIndex + limit);
}

function setupSeeMoreLess(fullTextElementId, truncatedTextElementId, toggleButtonId, truncateLength = 150) {
    const fullTextEl = document.getElementById(fullTextElementId);
    const truncatedTextEl = document.getElementById(truncatedTextElementId);
    const toggleButton = document.getElementById(toggleButtonId);

    if (!fullTextEl || !truncatedTextEl || !toggleButton) {
        console.warn('Could not find all required elements for See More/Less setup.');
        return;
    }

    const originalText = fullTextEl.dataset.originalText || fullTextEl.textContent.trim();
    fullTextEl.dataset.originalText = originalText;

    if (originalText.length <= truncateLength) {
        truncatedTextEl.textContent = originalText;
        toggleButton.style.display = 'none';
        fullTextEl.style.display = 'none';
        return;
    }

    truncatedTextEl.textContent = originalText.substring(0, truncateLength) + '...';
    fullTextEl.style.display = 'none';
    truncatedTextEl.style.display = 'block';
    toggleButton.textContent = 'See More';

    toggleButton.onclick = () => {
        const isCurrentlyTruncated = truncatedTextEl.style.display === 'block';

        if (isCurrentlyTruncated) {
            truncatedTextEl.style.display = 'none';
            fullTextEl.style.display = 'block';
            toggleButton.textContent = 'See Less';
        } else {
            fullTextEl.style.display = 'none';
            truncatedTextEl.style.display = 'block';
            toggleButton.textContent = 'See More';
        }
    };
}


// --- Global Functions (exposed on the window object for direct use in HTML onclick/data attributes) ---

// Updates the visual state of wishlist icons on product cards based on localStorage
window.updateProductCardWishlistIcons = () => {
    // Ensure getFromLocalStorage and WISHLIST_STORAGE_KEY are defined
    const wishlist = getFromLocalStorage(WISHLIST_STORAGE_KEY) || [];
    document.querySelectorAll('.wishlist-toggle-btn').forEach(button => { // Corrected selector to wishlist-toggle-btn
        const productId = button.dataset.productId;
        const icon = button.querySelector('i'); // Get the icon element

        if (wishlist.includes(productId)) {
            button.classList.add('in-wishlist');
            if (icon) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid'); // For filled heart
            }
        } else {
            button.classList.remove('in-wishlist');
            if (icon) {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular'); // For outlined heart
            }
        }
    });
};

// Placeholder/stub for adding to cart functionality
window.addToCart = (productId) => {
    console.log(`Product ${productId} added to cart! (Placeholder function in common-imall.js)`);
    // Example: Add to cart array in localStorage
    let cart = getFromLocalStorage(CART_STORAGE_KEY) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1; // Increment quantity
    } else {
        // Assuming ALL_PRODUCTS is available globally
        const productToAdd = ALL_PRODUCTS.find(p => p.id === productId);
        if (productToAdd) {
            cart.push({ id: productId, quantity: 1, ...productToAdd }); // Add product details
        }
    }
    saveToLocalStorage(CART_STORAGE_KEY, cart);
    // You would typically call a function here to update the cart count display in the header
    // e.g., updateCartCountDisplay();
    alert(`Added ${productId} to cart!`); // Simple confirmation
};

// Placeholder/stub for toggling wishlist status
window.toggleWishlist = (productId) => {
    console.log(`Product ${productId} toggled in wishlist! (Placeholder function in common-imall.js)`);
    let wishlist = getFromLocalStorage(WISHLIST_STORAGE_KEY) || [];
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1); // Remove from wishlist
    } else {
        wishlist.push(productId); // Add to wishlist
    }
    saveToLocalStorage(WISHLIST_STORAGE_KEY, wishlist);
    window.updateProductCardWishlistIcons(); // Update the icon state immediately
    // You would typically call a function here to update the wishlist count display in the header
    // e.g., updateWishlistCountDisplay();
};


// --- DOMContentLoaded for Category Dropdown and initial wishlist icon update ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Populate iMall Category Dropdown ---
    const imallCategoryDropdown = document.getElementById('imall-category-dropdown');

    // Ensure ALL_PRODUCTS is defined and the dropdown element exists
    if (imallCategoryDropdown && typeof ALL_PRODUCTS !== 'undefined') {
        const categories = new Set();

        ALL_PRODUCTS.forEach(product => {
            if (product.category) {
                categories.add(product.category);
            }
        });

        // Clear existing content to prevent duplicates if script runs multiple times
        imallCategoryDropdown.innerHTML = '';

        // Add an "All Categories" option at the top
        let allCategoriesHtml = `<a href="imall-category.html?cat=all">All Categories</a>`;
        imallCategoryDropdown.insertAdjacentHTML('beforeend', allCategoriesHtml);

        // Add unique categories
        categories.forEach(category => {
            const categoryEncoded = encodeURIComponent(category.toLowerCase());
            const categoryHtml = `
                <a href="imall-category.html?cat=${categoryEncoded}">${category}</a>
            `;
            imallCategoryDropdown.insertAdjacentHTML('beforeend', categoryHtml);
        });

        console.log('iMall categories dropdown populated.');
    } else {
        console.warn('iMall categories dropdown or ALL_PRODUCTS not found. Skipping population.');
    }

    // Initial update of wishlist icons when the DOM content is loaded
    // This ensures icons reflect current wishlist state upon page load
    window.updateProductCardWishlistIcons();
});
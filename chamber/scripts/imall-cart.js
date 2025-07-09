// scripts/imall-cart.js

// This script manages the shopping cart functionality, including adding,
// removing, and updating items, as well as rendering the cart contents.

// --- Global Data & Utilities (Assumed to be loaded from common-imall.js and products.js) ---
// const ALL_PRODUCTS; // From products.js, needed to get full product details by ID
// function formatCurrency(amount); // From common-imall.js
// function handleImageError(imageElement); // From common-imall.js
// function saveToLocalStorage(key, data); // From common-imall.js
// function getFromLocalStorage(key); // From common-imall.js
// function removeFromLocalStorage(key); // From common-imall.js

// --- Cart Specific Constants & Variables ---
const CART_STORAGE_KEY = 'imall_cart'; // Key for storing cart data in localStorage
let cartItems = []; // Array to hold cart items in memory (each item: {productId, quantity})

const SHIPPING_COST = 500; // Flat shipping cost in KES (example)

// --- DOM Element References (for cart.html page) ---
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const cartSubtotalSpan = document.getElementById('cart-subtotal');
const cartShippingSpan = document.getElementById('cart-shipping');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// --- Core Cart Logic Functions ---

/**
 * Loads cart items from localStorage into the cartItems array.
 */
function loadCart() {
    cartItems = getFromLocalStorage(CART_STORAGE_KEY) || [];
}

/**
 * Saves the current cartItems array to localStorage.
 */
function saveCart() {
    saveToLocalStorage(CART_STORAGE_KEY, cartItems);
    updateCartCountDisplay(); // Update cart count in header after saving
}

/**
 * Adds a product to the cart or updates its quantity if already present.
 * This function is exposed globally for use by other scripts (e.g., homepage).
 * @param {string} productId - The ID of the product to add.
 * @param {number} quantity - The quantity to add (defaults to 1).
 */
function addToCart(productId, quantity = 1) {
    if (!ALL_PRODUCTS) {
        console.error('ALL_PRODUCTS data not available. Cannot add to cart.');
        return;
    }

    const productExists = ALL_PRODUCTS.find(p => p.id === productId);
    if (!productExists) {
        console.warn(`Product with ID ${productId} not found. Cannot add to cart.`);
        return;
    }

    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {
        // Product already in cart, update quantity
        cartItems[existingItemIndex].quantity += quantity;
        if (cartItems[existingItemIndex].quantity <= 0) {
            cartItems.splice(existingItemIndex, 1); // Remove if quantity drops to 0 or below
        }
    } else {
        // Product not in cart, add new item
        if (quantity > 0) {
            cartItems.push({ productId, quantity });
        }
    }
    saveCart(); // Save changes to localStorage
    console.log('Cart updated:', cartItems);
    // Optional: Show a "Product added to cart!" notification
}

/**
 * Removes a product entirely from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.productId !== productId);
    saveCart();
    // Only update UI if on the cart page
    if (document.body.id === 'cart-page') {
        updateCartUI();
    }
}

/**
 * Updates the quantity of a specific product in the cart.
 * @param {string} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity for the product.
 */
function updateCartQuantity(productId, newQuantity) {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(0, newQuantity); // Ensure quantity doesn't go below 0
        if (item.quantity === 0) {
            removeFromCart(productId); // Remove if quantity becomes 0
        } else {
            saveCart();
            // Only update UI if on the cart page
            if (document.body.id === 'cart-page') {
                updateCartUI();
            }
        }
    }
}

/**
 * Calculates the subtotal, shipping, and total of the cart.
 * @returns {Object} An object containing subtotal, shipping, and total.
 */
function calculateCartTotals() {
    let subtotal = 0;
    cartItems.forEach(item => {
        const product = ALL_PRODUCTS.find(p => p.id === item.productId);
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });

    const shipping = cartItems.length > 0 ? SHIPPING_COST : 0; // Apply shipping only if cart has items
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
}

/**
 * Updates the cart count displayed in the header/nav (requires main.js to pick this up).
 */
function updateCartCountDisplay() {
    const cartCountElement = document.getElementById('cart-count'); // Assuming an element with this ID in header
    if (cartCountElement) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems > 0 ? totalItems : '';
        cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none'; // Show/hide
    }
}

// --- Cart Page Rendering Functions (specific to cart.html) ---

/**
 * Renders individual cart items into the cart items container.
 */
function renderCartItems() {
    if (!cartItemsContainer || !ALL_PRODUCTS) return;

    cartItemsContainer.innerHTML = ''; // Clear existing items

    if (cartItems.length === 0) {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'block';
        if (checkoutButton) checkoutButton.disabled = true;
        return;
    } else {
        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (checkoutButton) checkoutButton.disabled = false;
    }

    cartItems.forEach(item => {
        const product = ALL_PRODUCTS.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            const cartItemHTML = `
                <div class="cart-item" data-product-id="${product.id}">
                    <img src="${product.images[0]}" alt="${product.name}" onerror="handleImageError(this)" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${product.name}</h4>
                        <p class="cart-item-price">${formatCurrency(product.price)} each</p>
                        <div class="cart-item-quantity-controls">
                            <button class="quantity-minus-btn" data-product-id="${product.id}">-</button>
                            <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-product-id="${product.id}">
                            <button class="quantity-plus-btn" data-product-id="${product.id}">+</button>
                        </div>
                        <p class="cart-item-total">Item Total: ${formatCurrency(itemTotal)}</p>
                        <button class="remove-from-cart-btn" data-product-id="${product.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        }
    });

    // Attach event listeners for quantity controls and remove buttons after rendering
    cartItemsContainer.querySelectorAll('.quantity-minus-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const quantityInput = cartItemsContainer.querySelector(`.cart-item-quantity[data-product-id="${productId}"]`);
            if (quantityInput) {
                const newQuantity = parseInt(quantityInput.value) - 1;
                updateCartQuantity(productId, newQuantity);
            }
        });
    });

    cartItemsContainer.querySelectorAll('.quantity-plus-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            const quantityInput = cartItemsContainer.querySelector(`.cart-item-quantity[data-product-id="${productId}"]`);
            if (quantityInput) {
                const newQuantity = parseInt(quantityInput.value) + 1;
                updateCartQuantity(productId, newQuantity);
            }
        });
    });

    cartItemsContainer.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.dataset.productId;
            const newQuantity = parseInt(event.target.value);
            updateCartQuantity(productId, newQuantity);
        });
    });

    cartItemsContainer.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            removeFromCart(productId);
        });
    });
}

/**
 * Updates the cart summary (subtotal, shipping, total) displayed on the page.
 */
function updateCartSummary() {
    if (!cartSubtotalSpan || !cartShippingSpan || !cartTotalSpan) return;

    const { subtotal, shipping, total } = calculateCartTotals();

    cartSubtotalSpan.textContent = formatCurrency(subtotal);
    cartShippingSpan.textContent = formatCurrency(shipping);
    cartTotalSpan.textContent = formatCurrency(total);
}

/**
 * Orchestrates the full cart UI update (items and summary).
 */
function updateCartUI() {
    loadCart(); // Ensure cartItems is up-to-date from localStorage
    renderCartItems();
    updateCartSummary();
    updateCartCountDisplay(); // Also update the global cart count
}

// --- Event Handlers ---

/**
 * Handles clicks on "Add to Cart" buttons across the site (delegated listener).
 * @param {Event} event - The click event.
 */
function handleAddToCartClick(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productCard = event.target.closest('.product-card');
        if (productCard) {
            const productId = productCard.dataset.productId;
            addToCart(productId);
        }
    }
}

/**
 * Handles "Proceed to Checkout" button click.
 */
function handleCheckout() {
    // Implement redirection to checkout page
    if (cartItems.length > 0) {
        window.location.href = 'checkout.html'; // Assuming you'll create a checkout.html
    } else {
        alert('Your cart is empty. Please add items before checking out.');
    }
}


// --- Initialization ---

/**
 * Initializes the cart functionality for the entire site.
 */
function initCart() {
    loadCart(); // Load cart from storage on script load
    updateCartCountDisplay(); // Update initial cart count in header

    // Add a global delegated event listener for "Add to Cart" buttons
    document.addEventListener('click', handleAddToCartClick);

    // If on the cart page, render cart specific UI
    if (document.body.id === 'cart-page') {
        updateCartUI(); // Initial rendering for cart.html
        if (checkoutButton) {
            checkoutButton.addEventListener('click', handleCheckout);
        }
        console.log('iMall Cart Page initialized.');
    } else {
        console.log('iMall Cart functionality loaded for general pages.');
    }
}

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initCart);

// --- Expose Global Function ---
// Make addToCart globally accessible for other scripts to call directly.
// This is an alternative to delegation for specific elements if needed.
// window.iMallCart = {
//     addToCart: addToCart,
//     getCartItems: () => cartItems // You can expose other useful functions too
// };
// common-imall.js
const PLACEHOLDER_IMAGE_PATH = 'https://placehold.co/300x200/FF0000/FFFFFF?text=Image+Error';

/**
 * Handles image loading errors by replacing the src with a placeholder.
 * @param {HTMLImageElement} imageElement - The image element that failed to load.
 */
function handleImageError(imageElement) {
    imageElement.onerror = null; // Prevent infinite loop
    imageElement.src = PLACEHOLDER_IMAGE_PATH;
}

/**
 * Generates HTML for a single product card.
 * @param {object} product - The product object.
 * @returns {string} HTML string for the product card.
 */
function createProductCardHTML(product) {
    const isDiscountedBadge = product.isDiscounted ? `<span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Sale!</span>` : '';
    const originalPriceDisplay = product.originalPrice ? `<span class="text-gray-400 line-through text-sm ml-2">$${product.originalPrice.toFixed(2)}</span>` : '';

    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl relative product-card" data-product-id="${product.id}">
            ${isDiscountedBadge}
            <img
                src="${product.images[0] || PLACEHOLDER_IMAGE_PATH}"
                alt="${product.name}"
                class="w-full h-48 object-cover rounded-t-xl"
                onerror="handleImageError(this);"
            />
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-blue-600">$${product.price.toFixed(2)}</span>
                    ${originalPriceDisplay}
                    <button
                        class="add-to-cart-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                        data-product-id="${product.id}"
                        onclick="event.stopPropagation(); addToCart(ALL_PRODUCTS.find(p => p.id === '${product.id}'));"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Generates HTML for a single brand card.
 * @param {object} brand - The brand object.
 * @returns {string} HTML string for the brand card.
 */
function createBrandCardHTML(brand) {
    return `
        <div class="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl brand-card" data-brand-name="${brand.name}">
            <img src="${brand.logo}" alt="${brand.name} Logo" class="h-20 w-20 object-contain mb-3" onerror="handleImageError(this);">
            <h3 class="text-lg font-semibold text-gray-800">${brand.name}</h3>
        </div>
    `;
}

/**
 * Displays a temporary notification message.
 * @param {string} messageText - The message to display.
 */
function displayNotification(messageText) {
    const notificationMessageDiv = document.getElementById('notification-message');
    if (notificationMessageDiv) {
        notificationMessageDiv.textContent = messageText;
        notificationMessageDiv.classList.remove('opacity-0', 'notification-fade-out');
        notificationMessageDiv.classList.add('opacity-100');

        setTimeout(() => {
            notificationMessageDiv.classList.remove('opacity-100');
            notificationMessageDiv.classList.add('opacity-0', 'notification-fade-out');
        }, 3000);
    }
}

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Load cart from localStorage

/**
 * Adds a product to the cart or increments its quantity if already present.
 * Updates localStorage and the cart count display.
 * @param {object} product - The product object to add.
 * @param {number} quantity - The quantity to add (defaults to 1).
 */
function addToCart(product, quantity = 1) {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push({ ...product, quantity: quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    displayNotification(`${quantity}x ${product.name} added to cart!`);
}

/**
 * Updates the displayed count of items in the shopping cart icon.
 */
function updateCartCount() {
    const cartItemCountSpan = document.getElementById('cart-item-count');
    if (cartItemCountSpan) {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartItemCountSpan.textContent = totalItems;
        if (totalItems > 0) {
            cartItemCountSpan.classList.remove('hidden');
        } else {
            cartItemCountSpan.classList.add('hidden');
        }
    }
}

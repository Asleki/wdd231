// scripts/imall-checkout.js

// This script handles the checkout page functionality.

// --- Global Data & Utilities (Assumed to be loaded) ---
// const ALL_PRODUCTS;      // From products.js
// const CART_STORAGE_KEY;  // From common-imall.js
// const SHIPPING_COST;     // From common-imall.js
// function formatCurrency(amount);     // From common-imall.js
// function handleImageError(imageElement); // From common-imall.js
// function getFromLocalStorage(key);   // From common-imall.js
// function removeFromLocalStorage(key); // From common-imall.js

// --- Checkout Specific Variables ---
let currentCartItems = []; // To hold the cart items retrieved for checkout

// --- DOM Element References ---
const checkoutCartSummaryContainer = document.getElementById('checkout-cart-summary-container');
const checkoutSubtotalSpan = document.getElementById('checkout-subtotal');
const checkoutShippingSpan = document.getElementById('checkout-shipping');
const checkoutTotalSpan = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkout-form');
const placeOrderButton = document.getElementById('place-order-button');
const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
const cardDetailsFields = document.getElementById('card-details-fields');
const mpesaNumberField = document.getElementById('mpesa-number-field');


// --- Core Checkout Logic Functions ---

/**
 * Loads cart items from localStorage for the checkout process.
 */
function loadCartForCheckout() {
    currentCartItems = getFromLocalStorage(CART_STORAGE_KEY) || [];
    if (currentCartItems.length === 0) {
        // If cart is empty, redirect user back to cart page or homepage
        alert('Your cart is empty. Please add items before checking out.');
        window.location.href = 'cart.html'; // Or 'index.html'
    }
}

/**
 * Calculates the subtotal, shipping, and total for the checkout summary.
 * @returns {Object} An object containing subtotal, shipping, and total.
 */
function calculateCheckoutTotals() {
    let subtotal = 0;
    currentCartItems.forEach(item => {
        const product = ALL_PRODUCTS.find(p => p.id === item.productId);
        if (product) {
            subtotal += product.price * item.quantity;
        }
    });

    const shipping = currentCartItems.length > 0 ? SHIPPING_COST : 0;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
}

/**
 * Displays the cart summary (items and totals) on the checkout page.
 */
function displayCheckoutSummary() {
    if (!checkoutCartSummaryContainer || !ALL_PRODUCTS) return;

    checkoutCartSummaryContainer.innerHTML = ''; // Clear previous content

    currentCartItems.forEach(item => {
        const product = ALL_PRODUCTS.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            const itemHTML = `
                <div class="checkout-summary-item">
                    <img src="${product.images[0]}" alt="${product.name}" onerror="handleImageError(this)" class="checkout-item-image">
                    <div class="item-details">
                        <p class="item-name">${product.name}</p>
                        <p class="item-quantity">Qty: ${item.quantity}</p>
                    </div>
                    <span class="item-price">${formatCurrency(itemTotal)}</span>
                </div>
            `;
            checkoutCartSummaryContainer.insertAdjacentHTML('beforeend', itemHTML);
        }
    });

    // Update totals display
    const { subtotal, shipping, total } = calculateCheckoutTotals();
    if (checkoutSubtotalSpan) checkoutSubtotalSpan.textContent = formatCurrency(subtotal);
    if (checkoutShippingSpan) checkoutShippingSpan.textContent = formatCurrency(shipping);
    if (checkoutTotalSpan) checkoutTotalSpan.textContent = formatCurrency(total);
}

/**
 * Handles toggling visibility of payment method specific fields.
 */
function handlePaymentMethodChange() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (cardDetailsFields) {
        cardDetailsFields.style.display = selectedMethod === 'card' ? 'block' : 'none';
        cardDetailsFields.querySelectorAll('input').forEach(input => {
            input.required = selectedMethod === 'card';
        });
    }
    if (mpesaNumberField) {
        mpesaNumberField.style.display = selectedMethod === 'mpesa' ? 'block' : 'none';
        mpesaNumberField.querySelector('input').required = selectedMethod === 'mpesa';
    }
}

/**
 * Validates the checkout form fields.
 * @param {Event} event - The form submission event.
 * @returns {boolean} True if the form is valid, false otherwise.
 */
function validateCheckoutForm(event) {
    const form = event.target;
    let isValid = true;

    // Clear previous error messages (if any)
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.invalid-field').forEach(el => el.remove()); // Assuming you have such a class

    // Basic required field validation for shipping info
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            displayError(field, 'This field is required.');
            isValid = false;
        }
    });

    // Email validation
    const emailField = document.getElementById('email');
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        displayError(emailField, 'Please enter a valid email address.');
        isValid = false;
    }

    // Phone number validation (basic example, e.g., minimum length)
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value.length < 10) {
        displayError(phoneField, 'Phone number must be at least 10 digits.');
        isValid = false;
    }

    // Payment method specific validation
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedMethod) {
        const paymentMethodContainer = document.querySelector('.payment-methods');
        if (paymentMethodContainer) displayError(paymentMethodContainer, 'Please select a payment method.');
        isValid = false;
    } else {
        if (selectedMethod.value === 'card') {
            const cardNumber = document.getElementById('card-number');
            const expiryDate = document.getElementById('expiry-date');
            const cvv = document.getElementById('cvv');
            if (!cardNumber.value || !expiryDate.value || !cvv.value) {
                isValid = false;
                if (!cardNumber.value) displayError(cardNumber, 'Card number is required.');
                if (!expiryDate.value) displayError(expiryDate, 'Expiry date is required.');
                if (!cvv.value) displayError(cvv, 'CVV is required.');
            }
            // Add more sophisticated card validation here (e.g., regex for format)
        } else if (selectedMethod.value === 'mpesa') {
            const mpesaNumber = document.getElementById('mpesa-phone-number');
            if (!mpesaNumber.value || mpesaNumber.value.length < 10) {
                isValid = false;
                displayError(mpesaNumber, 'Please enter a valid M-Pesa number.');
            }
        }
    }

    return isValid;
}

/**
 * Displays an error message next to the problematic field.
 * @param {HTMLElement} field - The form field element.
 * @param {string} message - The error message.
 */
function displayError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Insert error message after the field or its parent container
    if (field.parentElement && field.parentElement.classList.contains('form-group')) {
        field.parentElement.appendChild(errorDiv);
    } else {
        field.insertAdjacentElement('afterend', errorDiv);
    }
    field.classList.add('invalid-field'); // Add a class for styling invalid fields
}


/**
 * Simulates the order placement process.
 * In a real application, this would send data to a backend.
 * @param {Event} event - The form submission event.
 */
function processOrder(event) {
    event.preventDefault(); // Prevent default form submission

    if (!validateCheckoutForm(event)) {
        alert('Please correct the errors in the form.');
        return;
    }

    // Gather form data (for simulation, you might log it)
    const formData = new FormData(checkoutForm);
    const orderDetails = {};
    for (let [key, value] of formData.entries()) {
        orderDetails[key] = value;
    }
    orderDetails.items = currentCartItems;
    orderDetails.totals = calculateCheckoutTotals();

    console.log('--- Simulating Order Placement ---');
    console.log('Order Details:', orderDetails);
    console.log('This data would typically be sent to a secure backend for processing.');

    // --- Simulate Successful Order ---
    alert('Order placed successfully! Redirecting to confirmation page.');

    // Clear the cart from local storage
    removeFromLocalStorage(CART_STORAGE_KEY);

    // Redirect to a confirmation page
    window.location.href = 'order-confirmation.html'; // Create this page next!
}


// --- Initialization ---

/**
 * Initializes the checkout page by loading cart, rendering summary, and setting up event listeners.
 */
function initCheckoutPage() {
    if (document.body.id !== 'checkout-page') {
        // This script should only run on checkout.html
        return;
    }

    if (!ALL_PRODUCTS) {
        console.error('ALL_PRODUCTS data not available. Cannot initialize checkout.');
        return;
    }

    loadCartForCheckout();
    displayCheckoutSummary();

    // Set up payment method radio button listeners
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', handlePaymentMethodChange);
    });
    // Trigger initial check to show/hide fields based on default selection
    handlePaymentMethodChange();

    // Set up form submission listener
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', processOrder);
    }

    console.log('iMall Checkout Page initialized.');
}

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initCheckoutPage);
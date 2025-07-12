// scripts/imall.js

// This script handles the dynamic content rendering and interactivity for the main iMall page.

// --- Global Data & Utilities (Assumed to be loaded) ---
// const ALL_PRODUCTS;       // From products.js
// const CATEGORY_DATA;     // From products.js
// function formatCurrency(amount);    // From common-imall.js
// function handleImageError(imageElement); // From common-imall.js
// function createProductCardHTML(product); // From common-imall.js
// function filterProducts(products, query); // From common-imall.js
// function getNextBatchOfProducts(allProducts, startIndex, limit); // From common-imall.js
// function addToCart(productId, quantity); // From imall-cart.js (will be added later)
// function updateCartDisplay(); // From imall-cart.js (will be added later)
// function updateWishlistCount(); // From imall-wishlist.js (will be added later)


// --- DOM Element References for Search Suggestions ---
const imallSearchInput = document.getElementById('imall-search-input');
const imallSearchSuggestionsContainer = document.getElementById('imall-search-suggestions');

// --- Search Suggestion Logic ---

/**
 * Displays product suggestions based on the search query.
 * @param {string} query - The current search input value.
 */
function showProductSuggestions(query) {
    if (!imallSearchSuggestionsContainer || !ALL_PRODUCTS) {
        console.error('Search suggestions container or ALL_PRODUCTS data not found.');
        return;
    }

    // Clear previous suggestions
    imallSearchSuggestionsContainer.innerHTML = '';
    imallSearchSuggestionsContainer.classList.remove('show'); // Hide by default

    const trimmedQuery = query.trim().toLowerCase();

    if (trimmedQuery.length === 0) {
        return; // No query, no suggestions
    }

    // Filter products for suggestions (limit to product names for simplicity in suggestions)
    const matchingProducts = ALL_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(trimmedQuery)
    );

    // Limit the number of suggestions to display
    const maxSuggestions = 7;
    const uniqueSuggestions = new Set(); // Use a Set to store unique product names

    // Add unique product names to the set, up to maxSuggestions
    for (const product of matchingProducts) {
        if (uniqueSuggestions.size < maxSuggestions) {
            uniqueSuggestions.add(product.name);
        } else {
            break; // Stop if we have enough unique suggestions
        }
    }

    if (uniqueSuggestions.size > 0) {
        imallSearchSuggestionsContainer.classList.add('show'); // Show the container

        uniqueSuggestions.forEach(suggestionText => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestionText;

            // When a suggestion is clicked, populate the search input and trigger a search
            suggestionItem.addEventListener('click', () => {
                imallSearchInput.value = suggestionText;
                imallSearchSuggestionsContainer.classList.remove('show'); // Hide suggestions
                // We will add the actual search trigger function here later
                // For now, just log that it was selected
                console.log(`Selected suggestion: ${suggestionText}`);
                // In the next step, we'll call the main search function here.
            });
            imallSearchSuggestionsContainer.appendChild(suggestionItem);
        });
    }
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial checks for global data
    if (typeof ALL_PRODUCTS === 'undefined' || typeof CATEGORY_DATA === 'undefined' || typeof PLACEHOLDER_IMAGE_PATH === 'undefined') {
        console.error('Required global data (ALL_PRODUCTS, CATEGORY_DATA, PLACEHOLDER_IMAGE_PATH) not loaded. Ensure products.js and common-imall.js are linked correctly and before imall.js.');
        return;
    }

    // Event listener for search input to show suggestions
    if (imallSearchInput) {
        imallSearchInput.addEventListener('input', (event) => {
            showProductSuggestions(event.target.value);
        });

        // Hide suggestions when input loses focus (click outside)
        imallSearchInput.addEventListener('blur', () => {
            // Add a small delay to allow click event on suggestion to register
            setTimeout(() => {
                imallSearchSuggestionsContainer.classList.remove('show');
            }, 150);
        });

        // Show suggestions again if input is focused and has text
        imallSearchInput.addEventListener('focus', (event) => {
            if (event.target.value.trim().length > 0) {
                showProductSuggestions(event.target.value);
            }
        });
    }

    console.log('iMall main script loaded. Search suggestions active.');
});

// scripts/imall-header-common.js

// This script handles common functionality for the iMall subheader,
// including search suggestions and the category dropdown.
// It should be loaded on all iMall pages (imall.html, imall-category.html, etc.).

// --- Global Data & Utilities (Assumed to be loaded before this script) ---
// const ALL_PRODUCTS;       // From products.js
// const CATEGORY_DATA;     // From products.js
// function filterProducts(products, query); // From common-imall.js

// --- DOM Element References ---
const imallSearchInput = document.getElementById('imall-search-input');
const imallSearchSuggestionsContainer = document.getElementById('imall-search-suggestions');
const imallCategoryDropdownBtn = document.querySelector('.imall-nav-links .dropdown .dropbtn');
const imallCategoryDropdownContent = document.getElementById('imall-category-dropdown');


// --- Search Suggestion Logic ---

/**
 * Displays product suggestions based on the search query.
 * @param {string} query - The current search input value.
 */
function showProductSuggestions(query) {
    if (!imallSearchSuggestionsContainer || typeof ALL_PRODUCTS === 'undefined' || typeof filterProducts === 'undefined') {
        console.error('Search suggestions container, ALL_PRODUCTS, or filterProducts function not found.');
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
    const matchingProducts = filterProducts(ALL_PRODUCTS, trimmedQuery);

    // Limit the number of suggestions to display and ensure uniqueness
    const maxSuggestions = 7;
    const uniqueSuggestions = new Set();

    for (const product of matchingProducts) {
        if (uniqueSuggestions.size < maxSuggestions) {
            uniqueSuggestions.add(product.name);
        } else {
            break;
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
                // Trigger the main search function (if it exists on the page)
                // This assumes a global search function or we will add it to imall.js/imall-category.js later
                if (typeof applyAllFilters === 'function') { // Check if main page search function exists
                    applyAllFilters();
                } else {
                    // If on a different page (e.g., category page), redirect to main iMall with search query
                    window.location.href = `imall.html?search=${encodeURIComponent(suggestionText)}`;
                }
            });
            imallSearchSuggestionsContainer.appendChild(suggestionItem);
        });
    }
}

// --- Category Dropdown Logic ---

/**
 * Populates the iMall subheader category dropdown.
 */
function populateSubheaderCategoryDropdown() {
    if (!imallCategoryDropdownContent || typeof CATEGORY_DATA === 'undefined') {
        console.error('iMall category dropdown content or CATEGORY_DATA not found.');
        return;
    }

    imallCategoryDropdownContent.innerHTML = ''; // Clear existing
    CATEGORY_DATA.forEach(category => {
        const link = document.createElement('a');
        link.href = `imall-category.html?cat=${encodeURIComponent(category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'))}`;
        link.textContent = category.displayName;
        imallCategoryDropdownContent.appendChild(link);
    });
}

/**
 * Toggles the visibility of the category dropdown content.
 */
function toggleCategoryDropdown() {
    if (imallCategoryDropdownContent) {
        imallCategoryDropdownContent.classList.toggle('show'); // Use a 'show' class for visibility
    }
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial checks for global data
    if (typeof ALL_PRODUCTS === 'undefined' || typeof CATEGORY_DATA === 'undefined' || typeof PLACEHOLDER_IMAGE_PATH === 'undefined' || typeof filterProducts === 'undefined') {
        console.error('Required global data (ALL_PRODUCTS, CATEGORY_DATA, PLACEHOLDER_IMAGE_PATH, filterProducts) not loaded. Ensure products.js, brands.js, and common-imall.js are linked correctly and before imall-header-common.js.');
        return;
    }

    // Search input event listener for suggestions
    if (imallSearchInput) {
        imallSearchInput.addEventListener('input', (event) => {
            showProductSuggestions(event.target.value);
        });

        // Hide suggestions when input loses focus (click outside)
        imallSearchInput.addEventListener('blur', () => {
            setTimeout(() => { // Add a small delay to allow click event on suggestion to register
                if (imallSearchSuggestionsContainer) {
                    imallSearchSuggestionsContainer.classList.remove('show');
                }
            }, 150);
        });

        // Show suggestions again if input is focused and has text
        imallSearchInput.addEventListener('focus', (event) => {
            if (event.target.value.trim().length > 0) {
                showProductSuggestions(event.target.value);
            }
        });
    }

    // Category dropdown button event listener (for click to persist)
    if (imallCategoryDropdownBtn) {
        imallCategoryDropdownBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link navigation
            toggleCategoryDropdown();
            // Stop propagation to prevent document click from closing it immediately
            event.stopPropagation();
        });
    }

    // Close category dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (imallCategoryDropdownContent && !imallCategoryDropdownContent.contains(event.target) &&
            imallCategoryDropdownBtn && !imallCategoryDropdownBtn.contains(event.target)) {
            imallCategoryDropdownContent.classList.remove('show');
        }
    });

    // Populate the category dropdown on load
    populateSubheaderCategoryDropdown();

    console.log('iMall header common script initialized.');
});

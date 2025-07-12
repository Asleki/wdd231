// scripts/imall-dropdown.js

// This script handles the dynamic population and click-to-toggle
// functionality for the "Shop Categories" dropdown.

// --- Global Data (Assumed to be loaded) ---
// const CATEGORY_DATA; // From products.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('iMall Categories Dropdown script loaded. DOMContentLoaded fired.');

    const shopCategoriesBtn = document.getElementById('shop-categories-btn');
    const categoriesDropdownContent = document.getElementById('imall-category-dropdown');

    if (!shopCategoriesBtn) {
        console.error('Error: "Shop Categories" button (shop-categories-btn) not found.');
        return;
    }
    if (!categoriesDropdownContent) {
        console.error('Error: Categories dropdown content (imall-category-dropdown) not found.');
        return;
    }

    // Check if CATEGORY_DATA is available
    if (typeof CATEGORY_DATA === 'undefined' || !Array.isArray(CATEGORY_DATA)) {
        console.error('CATEGORY_DATA is not defined or not an array. Ensure products.js is loaded correctly and before imall-dropdown.js.');
        // Optionally, hide the dropdown button if data isn't available
        shopCategoriesBtn.style.display = 'none';
        return;
    } else {
        console.log('CATEGORY_DATA is available and is an array.');
    }

    /**
     * Populates the categories dropdown with links from CATEGORY_DATA.
     */
    function populateCategoriesDropdown() {
        console.log('Attempting to populate categories dropdown...');
        // Clear existing content to prevent duplicates if function is called multiple times
        categoriesDropdownContent.innerHTML = '';

        if (CATEGORY_DATA.length === 0) {
            console.warn('CATEGORY_DATA is empty. No categories to display in dropdown.');
            categoriesDropdownContent.innerHTML = '<a href="#">No categories available</a>'; // Provide a fallback message
            return;
        }

        CATEGORY_DATA.forEach(category => {
            // Create a link for the main category
            const categoryLink = document.createElement('a');
            categoryLink.href = `imall-category.html?category=${encodeURIComponent(category.name.toLowerCase())}`;
            categoryLink.textContent = category.displayName;
            categoriesDropdownContent.appendChild(categoryLink);
        });
        console.log('Categories dropdown populated successfully.');
    }

    /**
     * Toggles the 'show' class on the dropdown content.
     * @param {Event} event - The click event.
     */
    function toggleDropdown(event) {
        // Prevent the default link behavior for the dropdown button
        event.preventDefault();
        // Stop event propagation to prevent the document click listener from immediately closing it
        event.stopPropagation();

        categoriesDropdownContent.classList.toggle('show');
        console.log('Dropdown toggled. Current classList:', categoriesDropdownContent.classList);
    }

    /**
     * Closes the dropdown if the click is outside of it.
     * @param {Event} event - The click event.
     */
    function closeDropdown(event) {
        // Check if the click target is NOT the dropdown button AND NOT inside the dropdown content
        if (!shopCategoriesBtn.contains(event.target) && !categoriesDropdownContent.contains(event.target)) {
            if (categoriesDropdownContent.classList.contains('show')) {
                categoriesDropdownContent.classList.remove('show');
                console.log('Dropdown closed by outside click.');
            }
        }
    }

    // Attach event listeners
    shopCategoriesBtn.addEventListener('click', toggleDropdown);
    console.log('Click listener attached to #shop-categories-btn.');

    // Close the dropdown if the user clicks anywhere else on the document
    document.addEventListener('click', closeDropdown);
    console.log('Global click listener attached for closing dropdown.');

    // Initial population of the dropdown
    populateCategoriesDropdown();
});

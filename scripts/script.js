
document.addEventListener('DOMContentLoaded', () => {
    // ... (existing code for current year, hamburger menu)

    // --- Search Bar Toggle & Filters ---
    const searchToggle = document.getElementById('search-toggle');
    const searchBarContainer = document.getElementById('search-bar-container');
    const siteSearchInput = document.getElementById('site-search');
    const filterCategory = document.getElementById('filter-category');
    const filterSize = document.getElementById('filter-size');
    const filterPopularity = document.getElementById('filter-popularity');
    const searchSubmit = document.getElementById('search-submit');

    // Ensure all elements exist before adding listeners to prevent errors
    if (searchToggle && searchBarContainer) { // Minimal check needed for the toggle
        searchToggle.addEventListener('click', () => {
            searchBarContainer.classList.toggle('search-bar-hidden'); // Toggles the hidden class
            searchBarContainer.classList.toggle('search-bar-visible'); // Toggles the visible class

            // Optional: Focus the search input when it becomes visible
            if (searchBarContainer.classList.contains('search-bar-visible') && siteSearchInput) {
                siteSearchInput.focus();
            }
        });
    }

    // ... (rest of your main.js code)
});
document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Product Data (for demonstration) ---
    const products = [
        { id: 1, name: "La Familia T-Shirt", description: "Soft cotton t-shirt with La Familia logo.", price: 24.99, image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=T-Shirt", category: "Apparel", fulfillment: "FBA", shipping: "Free Shipping", rating: 4.5 },
        { id: 2, name: "Spicy Salsa Jar", description: "Authentic homemade spicy salsa.", price: 8.50, image: "https://via.placeholder.com/150/FFC300/FFFFFF?text=Salsa", category: "Food", fulfillment: "Local Pickup", shipping: "$5 Shipping", rating: 4.8 },
        { id: 3, name: "Handmade Leather Wallet", description: "Genuine leather wallet, crafted by local artisans.", price: 45.00, image: "https://via.placeholder.com/150/C70039/FFFFFF?text=Wallet", category: "Accessories", fulfillment: "FBA", shipping: "Free Shipping", rating: 4.2 },
        { id: 4, name: "Coffee Beans - Dark Roast", description: "Premium dark roast coffee beans, 1lb.", price: 15.99, image: "https://via.placeholder.com/150/900C3F/FFFFFF?text=Coffee", category: "Food", fulfillment: "Shipped", shipping: "$3 Shipping", rating: 4.6 },
        { id: 5, name: "Artisan Ceramic Mug", description: "Unique ceramic mug for your morning coffee.", price: 18.00, image: "https://via.placeholder.com/150/581845/FFFFFF?text=Mug", category: "Home Goods", fulfillment: "Local Pickup", shipping: "Free Shipping", rating: 4.0 },
        { id: 6, name: "Organic Honey 500g", description: "Locally sourced organic honey.", price: 12.00, image: "https://via.placeholder.com/150/DAF7A6/000000?text=Honey", category: "Food", fulfillment: "Shipped", shipping: "$2 Shipping", rating: 4.9 },
        { id: 7, name: "Hand-knitted Scarf", description: "Warm and cozy hand-knitted scarf, various colors.", price: 30.00, image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=Scarf", category: "Apparel", fulfillment: "Local Pickup", shipping: "Free Shipping", rating: 4.7 },
        { id: 8, name: "Custom Engraved Pen", description: "Elegant metal pen with custom engraving option.", price: 20.00, image: "https://via.placeholder.com/150/36454F/FFFFFF?text=Pen", category: "Gifts", fulfillment: "Shipped", shipping: "$4 Shipping", rating: 4.3 },
        { id: 9, name: "Local Art Print", description: "Limited edition print by a local artist.", price: 60.00, image: "https://via.placeholder.com/150/4A4A4A/FFFFFF?text=Art", category: "Home Decor", fulfillment: "Local Pickup", shipping: "Free Shipping", rating: 4.9 },
        { id: 10, name: "Gourmet Chocolate Bar", description: "Rich dark chocolate with sea salt.", price: 7.00, image: "https://via.placeholder.com/150/8B4513/FFFFFF?text=Chocolate", category: "Food", fulfillment: "Shipped", shipping: "$1 Shipping", rating: 4.5 },
    ];

    // --- DOM Elements ---
    const searchToggleBtn = document.getElementById('search-toggle');
    const searchBarContainer = document.getElementById('search-bar-container');
    const siteSearchInput = document.getElementById('site-search');
    const searchForm = document.getElementById('search-form');
    const autocompleteResults = document.getElementById('autocomplete-results');
    const searchResultsSection = document.getElementById('search-results-section');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const newProductsGridSection = document.getElementById('new-products-grid');
    const searchKeywordDisplay = document.getElementById('search-keyword-display');
    const noResultsMessage = document.getElementById('no-results-message');
    const categoryFilter = document.getElementById('category-filter');
    const fulfillmentFilter = document.getElementById('fulfillment-filter');
    const shippingFilter = document.getElementById('shipping-filter');

    // --- Utility Functions ---

    // Function to create a product card HTML element
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-product-id', product.id); // For potential future detail view

        const ratingStars = Array(5).fill('')
            .map((_, i) => {
                if (product.rating >= i + 1) {
                    return '<i class="fas fa-star filled"></i>';
                } else if (product.rating >= i + 0.5) {
                    return '<i class="fas fa-star-half-alt filled"></i>';
                } else {
                    return '<i class="far fa-star"></i>'; // Changed to far for empty stars
                }
            })
            .join('');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">${ratingStars}</div>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-fulfillment">${product.fulfillment}</p>
            <p class="product-shipping">${product.shipping}</p>
            <button class="add-to-cart-button">Add to Cart</button>
        `;
        return card;
    }

    // Function to display products in a grid
    function displayProducts(productsToDisplay, targetElement) {
        targetElement.innerHTML = ''; // Clear previous products
        if (productsToDisplay.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
            productsToDisplay.forEach(product => {
                targetElement.appendChild(createProductCard(product));
            });
        }
    }

    // --- Search Functionality ---

    function performSearch() {
        const keyword = siteSearchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;
        const fulfillment = fulfillmentFilter.value;
        const shipping = shippingFilter.value;

        // Filter products based on keyword and filters
        const filteredProducts = products.filter(product => {
            const matchesKeyword = product.name.toLowerCase().includes(keyword) ||
                                 product.description.toLowerCase().includes(keyword);
            const matchesCategory = category === "" || product.category === category;
            const matchesFulfillment = fulfillment === "" || product.fulfillment === fulfillment;
            const matchesShipping = shipping === "" || product.shipping === shipping;
            return matchesKeyword && matchesCategory && matchesFulfillment && matchesShipping;
        });

        // Update the display for the search keyword
        searchKeywordDisplay.textContent = keyword || "All Products"; // Display "All Products" if search box is empty

        // Hide the initial "New Products" section
        newProductsGridSection.style.display = 'none';

        // Show the search results section
        searchResultsSection.style.display = 'block';

        // Display filtered products in the search results grid
        displayProducts(filteredProducts, searchResultsGrid);

        // Hide autocomplete results after search
        autocompleteResults.innerHTML = '';
        autocompleteResults.style.display = 'none';

        // Optionally, close the search bar after submission on mobile
        if (window.innerWidth < 768) { // Only close on smaller screens
            searchBarContainer.classList.remove('show-search');
        }
    }

    // Initial display of products (e.g., in the "New Products" section)
    // For this demo, let's just display all products in the new products grid
    displayProducts(products, newProductsGridSection.querySelector('.products-grid'));


    // --- Autocomplete Functionality ---
    let debounceTimeout;
    const DEBOUNCE_DELAY = 300; // milliseconds

    function showAutocomplete() {
        const inputVal = siteSearchInput.value.toLowerCase().trim();
        autocompleteResults.innerHTML = ''; // Clear previous suggestions

        if (inputVal.length === 0) {
            autocompleteResults.style.display = 'none';
            return;
        }

        const matches = products.filter(product =>
            product.name.toLowerCase().includes(inputVal)
        ).slice(0, 5); // Limit to top 5 suggestions

        if (matches.length > 0) {
            matches.forEach(product => {
                const li = document.createElement('div'); // Using div for more styling flexibility
                li.className = 'autocomplete-item';
                li.textContent = product.name;
                li.addEventListener('click', () => {
                    siteSearchInput.value = product.name;
                    performSearch(); // Perform search immediately on selection
                    autocompleteResults.innerHTML = '';
                    autocompleteResults.style.display = 'none';
                });
                autocompleteResults.appendChild(li);
            });
            autocompleteResults.style.display = 'block'; // Show the autocomplete list
        } else {
            autocompleteResults.style.display = 'none';
        }
    }

    // --- Event Listeners ---

    // Toggle search bar visibility
    searchToggleBtn.addEventListener('click', () => {
        searchBarContainer.classList.toggle('show-search');
        if (!searchBarContainer.classList.contains('show-search')) {
            // If hiding, clear autocomplete and input
            autocompleteResults.innerHTML = '';
            autocompleteResults.style.display = 'none';
            siteSearchInput.value = '';
        }
    });

    // Handle search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        performSearch();
    });

    // Live search/autocomplete on input
    siteSearchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            showAutocomplete();
        }, DEBOUNCE_DELAY);
    });

    // Hide autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        // Check if the click is outside the search bar container AND not on the search toggle button
        if (!searchBarContainer.contains(e.target) && e.target !== searchToggleBtn && !searchToggleBtn.contains(e.target)) {
            autocompleteResults.innerHTML = '';
            autocompleteResults.style.display = 'none';
        }
    });

    // Filter change listeners to re-perform search
    categoryFilter.addEventListener('change', performSearch);
    fulfillmentFilter.addEventListener('change', performSearch);
    shippingFilter.addEventListener('change', performSearch);

    // --- Dark Mode Toggle (existing functionality, ensure it works with new elements) ---
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    // Load saved mode or default to light
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (modeToggle) modeToggle.querySelector('i').className = 'fas fa-sun'; // Set icon to sun
    } else {
        if (modeToggle) modeToggle.querySelector('i').className = 'fas fa-moon'; // Set icon to moon
    }

    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                modeToggle.querySelector('i').className = 'fas fa-sun';
            } else {
                localStorage.setItem('theme', 'light');
                modeToggle.querySelector('i').className = 'fas fa-moon';
            }
        });
    }

    // --- iMall Category Dropdown Toggle (from previous sessions) ---
    // (Ensure your HTML includes these elements if you want this feature)
    // const imallCategoryToggle = document.getElementById('imall-categories-toggle');
    // const imallCategoryDropdown = document.getElementById('imall-category-dropdown');

    // if (imallCategoryToggle && imallCategoryDropdown) {
    //     imallCategoryToggle.addEventListener('click', () => {
    //         imallCategoryDropdown.classList.toggle('show-dropdown');
    //     });

    //     // Close dropdown if clicked outside
    //     document.addEventListener('click', (event) => {
    //         if (!imallCategoryDropdown.contains(event.target) && !imallCategoryToggle.contains(event.target)) {
    //             imallCategoryDropdown.classList.remove('show-dropdown');
    //         }
    //     });
    // }

    // Initial load: If there's a search term in the URL or local storage, perform initial search
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchTerm = urlParams.get('q');
    if (initialSearchTerm) {
        siteSearchInput.value = initialSearchTerm;
        performSearch();
    } else {
        // If no initial search, ensure the new products grid is visible
        newProductsGridSection.style.display = 'block';
        searchResultsSection.style.display = 'none'; // Ensure search results are hidden
    }

});
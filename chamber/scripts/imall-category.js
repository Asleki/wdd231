// scripts/imall-category.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('iMall Category Page script loaded.');

    // Ensure ALL_PRODUCTS and CATEGORY_DATA are loaded
    if (typeof ALL_PRODUCTS === 'undefined' || typeof CATEGORY_DATA === 'undefined') {
        console.error('ALL_PRODUCTS or CATEGORY_DATA not found. Make sure products.js is loaded before imall-category.js');
        document.querySelector('main').innerHTML = '<p>Error: Product data not available. Please check script loading.</p>';
        return;
    }

    const productGridContainer = document.getElementById('product-listing-grid');
    const categoryTitleElement = document.getElementById('category-title'); // Assuming you have an H1 or similar with this ID
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('cat'); // Get category from URL parameter

    // Normalize category name (e.g., handle URL encoding, case insensitivity if needed)
    if (currentCategory) {
        currentCategory = decodeURIComponent(currentCategory);
    }

    // Default to 'all' if no category is specified or if it's invalid
    const validCategoryNames = CATEGORY_DATA.map(cat => cat.name);
    if (!currentCategory || currentCategory === 'all' || !validCategoryNames.includes(currentCategory)) {
        currentCategory = 'all';
    }

    // Update the page title
    if (categoryTitleElement) {
        categoryTitleElement.textContent = currentCategory === 'all' ? 'All Products' : currentCategory;
    } else {
        console.warn('Element with ID "category-title" not found. Page title might not update.');
    }

    /**
     * Renders product cards into the specified container based on the current category.
     */
    function renderCategoryProducts() {
        if (!productGridContainer) {
            console.error('Product grid container not found. Cannot render products.');
            return;
        }

        productGridContainer.innerHTML = ''; // Clear existing content

        let productsToDisplay = [];
        if (currentCategory === 'all') {
            productsToDisplay = ALL_PRODUCTS;
        } else {
            // Filter by main category or sub-category
            productsToDisplay = ALL_PRODUCTS.filter(p =>
                p.category === currentCategory || p.subCategory === currentCategory
            );
        }

        if (productsToDisplay.length === 0) {
            productGridContainer.innerHTML = '<p class="no-products-message">No products found in this category.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card'); // Use a class for general product card styling

            // Determine price display
            const priceHtml = product.isDiscounted && product.originalPrice
                ? `<p class="product-card-price sale-price">KSh ${product.price.toFixed(2)}</p>
                   <p class="product-card-original-price">KSh ${product.originalPrice.toFixed(2)}</p>`
                : `<p class="product-card-price">KSh ${product.price.toFixed(2)}</p>`;

            productCard.innerHTML = `
                <a href="imall-product.html?id=${product.id}" class="product-card-link">
                    <img src="${product.images[0] || PLACEHOLDER_IMAGE_PATH}" alt="${product.name}" class="product-card-img" onerror="this.src='${PLACEHOLDER_IMAGE_PATH}'">
                </a>
                <div class="product-card-info">
                    <h3 class="product-card-name"><a href="imall-product.html?id=${product.id}">${product.name}</a></h3>
                    <p class="product-card-brand">${product.brand}</p>
                    ${priceHtml}
                    <div class="product-card-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        <span class="reviews-count">(${product.reviewsCount})</span>
                    </div>
                    <div class="product-card-actions">
                        <button class="btn btn-add-to-cart" data-product-id="${product.id}" ${product.inStock === 0 ? 'disabled' : ''}>
                            ${product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn btn-add-to-wishlist" data-product-id="${product.id}" aria-label="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            productGridContainer.appendChild(productCard);
        });

        // Attach event listeners for Add to Cart/Wishlist buttons
        productGridContainer.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                // Ensure addToCart is globally accessible (from common-imall.js)
                if (typeof addToCart === 'function') {
                    addToCart(productId);
                } else {
                    console.error('addToCart function not found. Check common-imall.js loading.');
                }
            });
        });
        productGridContainer.querySelectorAll('.btn-add-to-wishlist').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                // Ensure addToWishlist is globally accessible (from common-imall.js)
                if (typeof addToWishlist === 'function') {
                    addToWishlist(productId);
                } else {
                    console.error('addToWishlist function not found. Check common-imall.js loading.');
                }
            });
        });
    }

    // Initial render of products for the current category
    renderCategoryProducts();

    // --- Future Enhancements (To be added later if needed) ---
    // 1. Filtering by Brand (if you add brand filter UI)
    //    - Listen for changes on brand filter checkboxes/dropdowns.
    //    - Re-filter productsToDisplay array.
    //    - Call renderCategoryProducts() again.

    // 2. Sorting (if you add sort dropdown)
    //    - Listen for changes on sort dropdown.
    //    - Re-sort productsToDisplay array.
    //    - Call renderCategoryProducts() again.

    // 3. Pagination (for large number of products)
    //    - Implement logic to show only a subset of products.
    //    - Generate pagination controls.
    //    - Update productsToDisplay based on current page.
});
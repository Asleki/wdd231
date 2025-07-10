// imall-category.js
// This script assumes products.js and common-imall.js are loaded BEFORE this script.

const PRODUCTS_PER_LOAD_CATEGORY = 12; // Products to load per click on category page
const BRANDS_PER_LOAD_CATEGORY = 15; // Brands to load per click on category page

let filteredProducts = [];
let displayedCategoryProductCount = 0;
let filteredBrands = [];
let displayedCategoryBrandCount = 0;

// DOM Elements
const categoryTitleEl = document.getElementById('category-title');
const productListingGridEl = document.getElementById('product-listing-grid');
const categoryBrandsGridEl = document.getElementById('category-brands-grid');
const loadMoreCategoryProductsBtn = document.getElementById('load-more-category-products-btn');
const loadMoreCategoryBrandsBtn = document.getElementById('load-more-category-brands-btn');
const backToAllProductsBtn = document.getElementById('back-to-all-products-btn');
const productDetailSection = document.getElementById('product-detail-section');
const productDetailContent = document.getElementById('product-detail-content');
const backToCategoryProductsBtn = document.getElementById('back-to-category-products-btn');

/**
 * Parses URL parameters to get category and subCategory.
 * @returns {{category: string|null, subCategory: string|null}}
 */
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const subCategory = params.get('subCategory');
    return { category, subCategory };
}

/**
 * Renders a batch of products into the category product grid.
 * @param {Array<Object>} productsToRender - An array of product objects to render.
 * @param {boolean} append - If true, appends to existing products; otherwise, replaces.
 */
function renderCategoryProducts(productsToRender, append = true) {
    if (!append) {
        productListingGridEl.innerHTML = '';
        displayedCategoryProductCount = 0;
    }

    const startIndex = displayedCategoryProductCount;
    const endIndex = startIndex + PRODUCTS_PER_LOAD_CATEGORY;
    const batch = productsToRender.slice(startIndex, endIndex);

    if (batch.length === 0 && !append) {
        productListingGridEl.innerHTML = '<p class="text-center text-gray-600 col-span-full">No products found in this category.</p>';
        loadMoreCategoryProductsBtn.classList.add('hidden');
        return;
    }

    batch.forEach(product => {
        productListingGridEl.insertAdjacentHTML('beforeend', createProductCardHTML(product));
    });

    displayedCategoryProductCount += batch.length;

    if (displayedCategoryProductCount < productsToRender.length) {
        loadMoreCategoryProductsBtn.classList.remove('hidden');
    } else {
        loadMoreCategoryProductsBtn.classList.add('hidden');
    }
}

/**
 * Renders a batch of brands into the category brands grid.
 * @param {Array<Object>} brandsToRender - An array of brand objects to render.
 * @param {boolean} append - If true, appends to existing brands; otherwise, replaces.
 */
function renderCategoryBrands(brandsToRender, append = true) {
    if (!append) {
        categoryBrandsGridEl.innerHTML = '';
        displayedCategoryBrandCount = 0;
    }

    const startIndex = displayedCategoryBrandCount;
    const endIndex = startIndex + BRANDS_PER_LOAD_CATEGORY;
    const batch = brandsToRender.slice(startIndex, endIndex);

    if (batch.length === 0 && !append) {
        categoryBrandsGridEl.innerHTML = '<p class="text-center text-gray-600 col-span-full">No brands found for this category.</p>';
        loadMoreCategoryBrandsBtn.classList.add('hidden');
        return;
    }

    batch.forEach(brand => {
        categoryBrandsGridEl.insertAdjacentHTML('beforeend', createBrandCardHTML(brand));
    });

    displayedCategoryBrandCount += batch.length;

    if (displayedCategoryBrandCount < brandsToRender.length) {
        loadMoreCategoryBrandsBtn.classList.remove('hidden');
    } else {
        loadMoreCategoryBrandsBtn.classList.add('hidden');
    }
}

/**
 * Displays the detailed view of a single product on the category page.
 * @param {object} product - The product object to display.
 */
function showProductDetail(product) {
    // Hide category sections
    document.getElementById('category-products-section').classList.add('hidden');
    document.getElementById('category-brands-section').classList.add('hidden');
    productDetailSection.classList.remove('hidden'); // Show product detail section

    productDetailContent.innerHTML = ''; // Clear previous content

    if (!product) {
        productDetailContent.innerHTML = '<p class="text-center text-gray-600">Product not found.</p>';
        return;
    }

    // Determine current price
    const currentPrice = product.isDiscounted && product.originalPrice ? product.price : product.price;
    const originalPriceDisplay = product.isDiscounted && product.originalPrice ? `<span class="text-gray-400 line-through text-lg ml-4">$${product.originalPrice.toFixed(2)}</span>` : '';

    // Initial quantity and total price for the detail view
    let quantity = 1;
    let totalPrice = currentPrice * quantity;

    productDetailContent.innerHTML = `
        <div class="lg:col-span-1">
            <!-- Main Product Image -->
            <img id="product-main-image" src="${product.images[0] || PLACEHOLDER_IMAGE_PATH}" alt="${product.name}" class="w-full h-96 object-contain rounded-lg shadow-md mb-4" onerror="handleImageError(this);">
            <!-- Thumbnails -->
            <div id="product-thumbnails" class="flex space-x-2 overflow-x-auto pb-2">
                ${product.images.map((img, index) => `
                    <img
                        src="${img}"
                        class="product-gallery-thumbnail w-20 h-20 object-cover rounded-md ${index === 0 ? 'active' : ''}"
                        data-image-index="${index}"
                        alt="${product.name} thumbnail ${index + 1}"
                        onerror="handleImageError(this);"
                    >
                `).join('')}
                ${product.images.length === 0 ? `<img src="${PLACEHOLDER_IMAGE_PATH}" class="product-gallery-thumbnail w-20 h-20 object-cover rounded-md active" alt="Placeholder thumbnail">` : ''}
            </div>
        </div>
        <div class="lg:col-span-1">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">${product.name}</h1>
            <p class="text-gray-700 text-lg mb-4">${product.description}</p>

            <div class="flex items-baseline mb-4">
                <span class="text-4xl font-extrabold text-blue-600" id="product-detail-price">$${currentPrice.toFixed(2)}</span>
                ${originalPriceDisplay}
            </div>

            <div class="text-gray-600 mb-2">
                <span class="font-semibold">Category:</span> ${product.category} ${product.subCategory ? ` / ${product.subCategory}` : ''}
            </div>
            <div class="text-gray-600 mb-4">
                <span class="font-semibold">Brand:</span> ${product.brand}
            </div>

            <!-- Features -->
            ${product.features && product.features.length > 0 ? `
            <div class="mb-4">
                <h4 class="font-semibold text-gray-800 mb-2">Key Features:</h4>
                <ul class="list-disc list-inside text-gray-600">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <!-- Additional Details -->
            <div class="grid grid-cols-2 gap-2 text-gray-600 mb-6">
                ${product.rating ? `<div><span class="font-semibold">Rating:</span> ${product.rating} (${product.reviewsCount} reviews)</div>` : ''}
                ${product.inStock ? `<div><span class="font-semibold">In Stock:</span> ${product.inStock}</div>` : ''}
                ${product.sku ? `<div><span class="font-semibold">SKU:</span> ${product.sku}</div>` : ''}
                ${product.shipping ? `<div><span class="font-semibold">Shipping:</span> ${product.shipping}</div>` : ''}
                ${product.waitingPeriod ? `<div><span class="font-semibold">Delivery:</span> ${product.waitingPeriod}</div>` : ''}
                ${product.minOrderQuantity ? `<div><span class="font-semibold">Min Order:</span> ${product.minOrderQuantity}</div>` : ''}
                ${product.maxOrderQuantity ? `<div><span class="font-semibold">Max Order:</span> ${product.maxOrderQuantity}</div>` : ''}
                ${product.availableColors && product.availableColors.length > 0 ? `<div><span class="font-semibold">Colors:</span> ${product.availableColors.join(', ')}</div>` : ''}
                ${product.color ? `<div><span class="font-semibold">Selected Color:</span> ${product.color}</div>` : ''}
                ${product.storage ? `<div><span class="font-semibold">Storage:</span> ${product.storage}</div>` : ''}
                ${product.size ? `<div><span class="font-semibold">Size:</span> ${product.size}</div>` : ''}
            </div>

            <!-- Quantity Selector and Add to Cart -->
            <div class="flex items-center space-x-4 mb-6">
                <label for="product-quantity" class="font-semibold text-gray-800">Quantity:</label>
                <div class="flex items-center border border-gray-300 rounded-lg">
                    <button id="qty-minus" class="px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-l-lg focus:outline-none">-</button>
                    <input type="number" id="product-quantity" value="1" min="1" class="w-16 text-center border-x border-gray-300 focus:outline-none" readonly>
                    <button id="qty-plus" class="px-3 py-1 text-gray-700 hover:bg-gray-200 rounded-r-lg focus:outline-none">+</button>
                </div>
                <button id="add-to-cart-detail-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-75">
                    Add to Cart
                </button>
            </div>
            <p class="text-xl font-bold text-gray-800">Total: <span id="product-total-price">$${totalPrice.toFixed(2)}</span></p>
        </div>
    `;

    // Attach event listeners for image gallery
    const mainImage = document.getElementById('product-main-image');
    document.querySelectorAll('.product-gallery-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src;
            document.querySelectorAll('.product-gallery-thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Attach event listeners for quantity control
    const qtyInput = document.getElementById('product-quantity');
    const qtyMinusBtn = document.getElementById('qty-minus');
    const qtyPlusBtn = document.getElementById('qty-plus');
    const productTotalPriceSpan = document.getElementById('product-total-price');

    qtyMinusBtn.addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) {
            currentQty--;
            qtyInput.value = currentQty;
            productTotalPriceSpan.textContent = `$${(currentPrice * currentQty).toFixed(2)}`;
        }
    });

    qtyPlusBtn.addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        if (product.maxOrderQuantity && currentQty >= product.maxOrderQuantity) {
            displayNotification(`Cannot add more than ${product.maxOrderQuantity} of this item.`);
            return;
        }
        currentQty++;
        qtyInput.value = currentQty;
        productTotalPriceSpan.textContent = `$${(currentPrice * currentQty).toFixed(2)}`;
    });

    // Add to Cart from detail page
    document.getElementById('add-to-cart-detail-btn').addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        addToCart(product, qty);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize cart count (from common-imall.js)
    updateCartCount();

    const { category, subCategory } = getUrlParameters();

    if (category) {
        let titleText = decodeURIComponent(category);
        if (subCategory) {
            titleText += ` / ${decodeURIComponent(subCategory)}`;
            filteredProducts = ALL_PRODUCTS.filter(p =>
                p.category.toLowerCase() === category.toLowerCase() &&
                p.subCategory && p.subCategory.toLowerCase() === subCategory.toLowerCase()
            );
        } else {
            filteredProducts = ALL_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        categoryTitleEl.textContent = titleText;

        // Filter brands relevant to the selected category/subcategory
        const relevantBrands = new Set();
        filteredProducts.forEach(p => relevantBrands.add(p.brand));
        filteredBrands = TOP_BRANDS.filter(b => relevantBrands.has(b.name));

        renderCategoryProducts(filteredProducts, false); // Initial render
        renderCategoryBrands(filteredBrands, false); // Initial render
    } else {
        categoryTitleEl.textContent = 'All Products';
        filteredProducts = ALL_PRODUCTS;
        filteredBrands = TOP_BRANDS;
        renderCategoryProducts(filteredProducts, false);
        renderCategoryBrands(filteredBrands, false);
    }

    // Load More Products button for category page
    loadMoreCategoryProductsBtn.addEventListener('click', () => renderCategoryProducts(filteredProducts, true));

    // Load More Brands button for category page
    loadMoreCategoryBrandsBtn.addEventListener('click', () => renderCategoryBrands(filteredBrands, true));

    // Back to All Products button
    backToAllProductsBtn.addEventListener('click', () => {
        window.location.href = 'imall.html'; // Navigate back to the main iMall page
    });

    // Back to Category Products button (from product detail on category page)
    backToCategoryProductsBtn.addEventListener('click', () => {
        document.getElementById('category-products-section').classList.remove('hidden');
        document.getElementById('category-brands-section').classList.remove('hidden');
        productDetailSection.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
    });

    // Delegated event listener for product card clicks on category page
    productListingGridEl.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        if (productCard && !event.target.classList.contains('add-to-cart-btn')) {
            const productId = productCard.dataset.productId;
            const productToDisplay = ALL_PRODUCTS.find(p => p.id === productId);
            if (productToDisplay) {
                showProductDetail(productToDisplay);
            }
        }
    });

    // Delegated event listener for brand card clicks on category page
    categoryBrandsGridEl.addEventListener('click', (event) => {
        const brandCard = event.target.closest('.brand-card');
        if (brandCard) {
            const brandName = brandCard.dataset.brandName;
            const productsByBrand = ALL_PRODUCTS.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());
            // Filter products by brand within the current category context
            const categoryAndBrandProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());

            categoryTitleEl.textContent = `Products by ${brandName} in ${decodeURIComponent(category)}`;
            renderCategoryProducts(categoryAndBrandProducts, false); // Display only products for this brand within the category
            // Hide brands section when viewing filtered products
            document.getElementById('category-brands-section').classList.add('hidden');
            loadMoreCategoryProductsBtn.style.display = (categoryAndBrandProducts.length > PRODUCTS_PER_LOAD_CATEGORY) ? 'block' : 'none';
        }
    });

    // Add to Cart button delegation (for dynamically added product cards) - still needed for cards
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.dataset.productId;
            const productToAdd = ALL_PRODUCTS.find(p => p.id === productId);
            if (productToAdd) {
                // Quantity from product card is always 1
                addToCart(productToAdd, 1);
            }
        }
    });

    // Existing Chamber Scripts (ensure paths are correct and they don't conflict)
    // These scripts would typically handle the main site header/footer functionality.
    // Assuming main.js handles search-toggle, mode-toggle, hamburger-menu, etc.
    // Assuming imall-dropdown.js, imall-cart.js, imall-wishlist.js, imall-slider.js, imall.js
    // are for other parts of the iMall system or main Chambers site.
    // No changes are made to these as per the request, but their presence is noted.
});

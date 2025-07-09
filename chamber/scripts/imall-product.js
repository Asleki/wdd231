// scripts/imall-product.js

// This script handles the dynamic content rendering for a single product detail page.

// --- Global Data & Utilities (Assumed to be loaded) ---
// const ALL_PRODUCTS;          // From products.js
// function formatCurrency(amount);    // From common-imall.js
// function handleImageError(imageElement); // From common-imall.js
// function createProductCardHTML(product); // From common-imall.js
// function addToCart(productId, quantity); // From imall-cart.js

// --- Product Page Specific Variables ---
let currentProductId = null;
let currentProductData = null;

// --- DOM Element References ---
const productNameEl = document.getElementById('product-name');
const productBrandEl = document.getElementById('product-brand');
const productCategoryEl = document.getElementById('product-category');
const mainProductImageEl = document.getElementById('main-product-image');
const thumbnailGalleryEl = document.getElementById('thumbnail-gallery');
const productPriceEl = document.getElementById('product-price');
const productOriginalPriceEl = document.getElementById('product-original-price');
const productRatingStarsEl = document.getElementById('product-rating-stars');
const productReviewsCountEl = document.getElementById('product-reviews-count');
const productStockStatusEl = document.getElementById('product-stock-status');
const productDescriptionEl = document.getElementById('product-description');
const productSpecsListEl = document.getElementById('product-specs-list'); // Assuming a UL for specs
const productQuantityInput = document.getElementById('product-quantity');
const quantityMinusBtn = document.getElementById('quantity-minus-btn');
const quantityPlusBtn = document.getElementById('quantity-plus-btn');
const addToCartPageBtn = document.getElementById('add-to-cart-page-btn');
const productReviewsListEl = document.getElementById('product-reviews-list');
const relatedProductsContainer = document.getElementById('related-products-container');


// --- Core Product Page Functions ---

/**
 * Extracts the product ID from the URL query parameters.
 * @returns {string|null} The product ID or null if not found.
 */
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/**
 * Loads product data from ALL_PRODUCTS based on the provided ID.
 * @param {string} productId - The ID of the product to load.
 * @returns {Object|null} The product object or null if not found.
 */
function loadProductData(productId) {
    if (!ALL_PRODUCTS) {
        console.error('ALL_PRODUCTS data not available. Cannot load product details.');
        return null;
    }
    return ALL_PRODUCTS.find(p => p.id === productId);
}

/**
 * Renders the detailed information of the product on the page.
 * @param {Object} product - The product object to render.
 */
function renderProductDetails(product) {
    if (!product) {
        console.error('No product data to render.');
        // Display an error message on the page
        if (productNameEl) productNameEl.textContent = 'Product Not Found';
        if (productDescriptionEl) productDescriptionEl.textContent = 'The product you are looking for does not exist or has been removed.';
        document.getElementById('product-detail-page-main').innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h1>Product Not Found</h1>
                <p>We couldn't find the product you're looking for. It might have been discontinued or the link is incorrect.</p>
                <p><a href="index.html" class="primary-btn">Go to Homepage</a></p>
            </div>
        `;
        return;
    }

    // Set basic info
    if (productNameEl) productNameEl.textContent = product.name;
    if (productBrandEl) productBrandEl.textContent = product.brand;
    if (productCategoryEl) productCategoryEl.textContent = product.category; // Assuming category field

    // Price
    if (productPriceEl) productPriceEl.textContent = formatCurrency(product.price);
    if (productOriginalPriceEl) {
        if (product.isDiscounted) {
            productOriginalPriceEl.textContent = formatCurrency(product.originalPrice);
            productOriginalPriceEl.style.display = 'inline';
        } else {
            productOriginalPriceEl.style.display = 'none';
        }
    }

    // Rating & Reviews
    if (productRatingStarsEl) {
        productRatingStarsEl.style.setProperty('--rating', product.rating);
        productRatingStarsEl.setAttribute('aria-label', `Rating of this product is ${product.rating} out of 5.`);
    }
    if (productReviewsCountEl) {
        productReviewsCountEl.textContent = `(${product.reviewsCount} reviews)`;
    }

    // Stock Status
    if (productStockStatusEl) {
        if (product.stock > 0) {
            productStockStatusEl.textContent = `In Stock (${product.stock} available)`;
            productStockStatusEl.className = 'stock-status in-stock';
            if (addToCartPageBtn) addToCartPageBtn.disabled = false;
        } else {
            productStockStatusEl.textContent = 'Out of Stock';
            productStockStatusEl.className = 'stock-status out-of-stock';
            if (addToCartPageBtn) addToCartPageBtn.disabled = true;
        }
    }

    // Description
    if (productDescriptionEl) productDescriptionEl.textContent = product.description;

    // Specifications (assuming product.specs is an array of strings or objects)
    if (productSpecsListEl && product.specs && product.specs.length > 0) {
        productSpecsListEl.innerHTML = ''; // Clear previous
        product.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec; // If spec is just a string like "Display: 15.6 inch"
            // If specs are objects like { key: "Display", value: "15.6 inch" }
            // li.innerHTML = `<strong>${spec.key}:</strong> ${spec.value}`;
            productSpecsListEl.appendChild(li);
        });
    } else if (productSpecsListEl) {
        productSpecsListEl.innerHTML = '<p>No specific specifications listed.</p>';
    }

    // Images
    setupImageGallery(product.images);

    // Reviews (assuming a simple display of existing reviews)
    renderReviews(product.reviews || []);
}

/**
 * Sets up the main image and thumbnail gallery.
 * @param {Array<string>} images - Array of image URLs.
 */
function setupImageGallery(images) {
    if (!mainProductImageEl || !thumbnailGalleryEl || !images || images.length === 0) return;

    mainProductImageEl.src = images[0]; // Set first image as main
    mainProductImageEl.alt = currentProductData.name; // Set descriptive alt text

    thumbnailGalleryEl.innerHTML = ''; // Clear existing thumbnails

    images.forEach(imgSrc => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'thumbnail';
        const thumbImg = document.createElement('img');
        thumbImg.src = imgSrc;
        thumbImg.alt = `${currentProductData.name} thumbnail`;
        thumbImg.onerror = handleImageError; // Use global error handler
        thumbDiv.appendChild(thumbImg);

        thumbDiv.addEventListener('click', () => {
            mainProductImageEl.src = imgSrc; // Change main image
            // Add active class to thumbnail if desired
            thumbnailGalleryEl.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbDiv.classList.add('active');
        });
        thumbnailGalleryEl.appendChild(thumbDiv);
    });

    // Set first thumbnail as active by default
    if (thumbnailGalleryEl.firstElementChild) {
        thumbnailGalleryEl.firstElementChild.classList.add('active');
    }
}

/**
 * Sets up event listeners for quantity adjustment buttons.
 */
function setupQuantityControls() {
    if (quantityMinusBtn) {
        quantityMinusBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(productQuantityInput.value);
            if (currentQuantity > 1) {
                productQuantityInput.value = currentQuantity - 1;
            }
        });
    }

    if (quantityPlusBtn) {
        quantityPlusBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(productQuantityInput.value);
            // Optional: Limit to product stock if available
            // let maxStock = currentProductData.stock;
            // if (currentQuantity < maxStock) {
            //     productQuantityInput.value = currentQuantity + 1;
            // }
            productQuantityInput.value = currentQuantity + 1; // For now, no max limit
        });
    }

    if (productQuantityInput) {
        productQuantityInput.addEventListener('change', () => {
            let val = parseInt(productQuantityInput.value);
            if (isNaN(val) || val < 1) {
                productQuantityInput.value = 1; // Default to 1 if invalid
            }
            // Optional: Clamp to max stock
            // if (currentProductData && val > currentProductData.stock) {
            //     productQuantityInput.value = currentProductData.stock;
            // }
        });
    }
}

/**
 * Handles the "Add to Cart" button click on the product detail page.
 */
function handleAddProductToCart() {
    if (!currentProductId || !addToCart) {
        console.error('Product ID or addToCart function not available.');
        return;
    }
    const quantity = parseInt(productQuantityInput.value);
    if (isNaN(quantity) || quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }
    
    addToCart(currentProductId, quantity); // Call the global addToCart function from imall-cart.js
    alert(`${quantity} x ${currentProductData.name} added to cart!`);
    // Optional: Visual feedback like a small animation or confirmation message
}

/**
 * Renders customer reviews for the product.
 * @param {Array<Object>} reviews - Array of review objects.
 */
function renderReviews(reviews) {
    if (!productReviewsListEl) return;

    productReviewsListEl.innerHTML = ''; // Clear previous reviews

    if (reviews.length === 0) {
        productReviewsListEl.innerHTML = '<p>No reviews yet. Be the first to review this product!</p>';
        return;
    }

    reviews.forEach(review => {
        const reviewHTML = `
            <div class="review-item">
                <p class="review-meta"><strong>${review.reviewerName}</strong> on ${new Date(review.date).toLocaleDateString()}</p>
                <div class="review-rating">
                    <span class="stars" style="--rating: ${review.rating};"></span>
                </div>
                <p class="review-comment">${review.comment}</p>
            </div>
        `;
        productReviewsListEl.insertAdjacentHTML('beforeend', reviewHTML);
    });
}

/**
 * Renders related products based on current product's category or other criteria.
 * @param {Object} currentProduct - The currently viewed product.
 * @param {Array<Object>} allProducts - The full list of products.
 */
function renderRelatedProducts(currentProduct, allProducts) {
    if (!relatedProductsContainer || !createProductCardHTML) return;

    relatedProductsContainer.innerHTML = ''; // Clear previous

    const related = allProducts.filter(p =>
        p.id !== currentProduct.id && // Not the current product
        p.category === currentProduct.category // Same category
        // Add more complex logic: similar brand, price range, popular items, etc.
    ).sort(() => 0.5 - Math.random()) // Shuffle for variety
     .slice(0, 4); // Display up to 4 related products

    if (related.length === 0) {
        relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }

    related.forEach(product => {
        relatedProductsContainer.insertAdjacentHTML('beforeend', createProductCardHTML(product));
    });
}


// --- Initialization ---

/**
 * Initializes the product detail page.
 */
function initProductPage() {
    // Only run this script if on the product-detail.html page
    if (document.body.id !== 'product-detail-page') {
        return;
    }

    currentProductId = getProductIdFromUrl();

    if (!currentProductId) {
        console.error('Product ID not found in URL.');
        // Display an error message or redirect
        if (productNameEl) productNameEl.textContent = 'Error: Product ID Missing';
        if (productDescriptionEl) productDescriptionEl.textContent = 'Please provide a product ID in the URL (e.g., ?id=your-product-id).';
        return;
    }

    currentProductData = loadProductData(currentProductId);

    if (currentProductData) {
        renderProductDetails(currentProductData);
        setupQuantityControls();
        if (addToCartPageBtn) {
            addToCartPageBtn.addEventListener('click', handleAddProductToCart);
        }
        renderRelatedProducts(currentProductData, ALL_PRODUCTS);
    } else {
        console.error(`Product with ID "${currentProductId}" not found.`);
        // Render a "Product not found" message on the page
        renderProductDetails(null); // Pass null to trigger the "not found" display logic
    }

    console.log('iMall Product Detail Page initialized.');
}

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initProductPage);
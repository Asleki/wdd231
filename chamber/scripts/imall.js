// --- iMall Specific JavaScript (js/imall.js) ---

// --- iMall Specific JavaScript (js/imall.js) ---

document.addEventListener('DOMContentLoaded', () => {
    // Declare these variables at a higher scope so they are accessible everywhere within DOMContentLoaded
    const imallCategoriesToggle = document.getElementById('imall-categories-toggle');
    const imallCategoryDropdown = document.getElementById('imall-category-dropdown');

    // For the search bar toggle
    const searchToggle = document.getElementById('search-toggle');
    const searchBarContainer = document.getElementById('search-bar-container');

    // --- Toggle iMall Categories Dropdown ---
    if (imallCategoriesToggle && imallCategoryDropdown) {
        imallCategoriesToggle.addEventListener('click', () => {
            imallCategoryDropdown.classList.toggle('show-dropdown');
            // Optional: Close search bar if categories dropdown is opened
            searchBarContainer.classList.remove('show-search'); // Ensure search bar closes
        });

        // Close categories dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!imallCategoriesToggle.contains(event.target) && !imallCategoryDropdown.contains(event.target)) {
                imallCategoryDropdown.classList.remove('show-dropdown');
            }
        });
    }

    // --- Toggle Search Bar Visibility ---
    if (searchToggle && searchBarContainer) {
        searchToggle.addEventListener('click', () => {
            searchBarContainer.classList.toggle('show-search');
            // Optional: Close categories dropdown if search bar is opened
            imallCategoryDropdown.classList.remove('show-dropdown'); // This line now works!
        });
    }

    // --- Product Detail View Logic ---
    const productDetailView = document.getElementById('product-detail-view');
    const newProductsGrid = document.getElementById('new-products-grid');

    // Default placeholder image for missing images
    const PLACEHOLDER_IMAGE = 'images/placeholder-image-not-found.webp';
    // ^^^ IMPORTANT: You need to create this image file in your 'chamber/images/' folder.

    // Function to render product detail view
    const renderProductDetail = (product) => {
        if (!productDetailView) return;

        // Clear previous content
        productDetailView.innerHTML = '';

        const imageBase = `images/iMall/${product.folder}/`;
        const mainImageSrc = `${imageBase}${product.images[0]}`; // First image as main

        // Image error handling for main image
        const onErrorMain = `this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';this.alt='${product.name} - Image Not Found';`;

        // ... (rest of your imall.js code remains the same) ...
    };
});

document.addEventListener('DOMContentLoaded', () => {
    // Toggle iMall Categories Dropdown
    const imallCategoriesToggle = document.getElementById('imall-categories-toggle');
    const imallCategoryDropdown = document.getElementById('imall-category-dropdown');

    if (imallCategoriesToggle && imallCategoryDropdown) {
        imallCategoriesToggle.addEventListener('click', () => {
            imallCategoryDropdown.classList.toggle('show-dropdown');
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!imallCategoriesToggle.contains(event.target) && !imallCategoryDropdown.contains(event.target)) {
                imallCategoryDropdown.classList.remove('show-dropdown');
            }
        });
    }

    // --- Product Detail View Logic ---
    const productDetailView = document.getElementById('product-detail-view');
    const newProductsGrid = document.getElementById('new-products-grid');

    // Default placeholder image for missing images
    const PLACEHOLDER_IMAGE = 'images/placeholder-image-not-found.webp'; 
    // ^^^ IMPORTANT: You need to create this image file in your 'chamber/images/' folder.

    // Function to render product detail view
    const renderProductDetail = (product) => {
        if (!productDetailView) return;

        // Clear previous content
        productDetailView.innerHTML = '';

        const imageBase = `images/iMall/${product.folder}/`;
        const mainImageSrc = `${imageBase}${product.images[0]}`; // First image as main

        // Image error handling for main image
        const onErrorMain = `this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';this.alt='${product.name} - Image Not Found';`;

        let imageHtml = `
            <div class="product-main-image">
                <img id="main-product-image" src="${mainImageSrc}" alt="${product.name}" onerror="${onErrorMain}">
            </div>
            <div class="product-thumbnail-gallery">
                <button class="thumbnail-arrow prev" aria-label="Previous image"><i class="fas fa-chevron-left"></i></button>
                <div class="thumbnail-images-wrapper"> `;

        // Generate thumbnails (up to 5 initially for display, others scroll)
        const thumbnailsPerPage = 5;
        // The display logic already correctly handles showing the first 5 thumbnails
        // and then allowing scrolling if there are more.
        // No change needed here, as the product.images array will now ensure enough images are available.

        // Initialize thumbnails with the first 5 or fewer if not enough
        const initialThumbnails = product.images.slice(0, thumbnailsPerPage);

        initialThumbnails.forEach((imageName, index) => {
            const thumbSrc = `${imageBase}${imageName}`;
            const isActive = index === 0 ? ' active' : '';
            const onErrorThumb = `this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';this.alt='${product.name} - Image Not Found';`;
            imageHtml += `<img src="${thumbSrc}" alt="${product.name} - ${index + 1}" class="product-thumbnail${isActive}" data-full-src="${thumbSrc}" onerror="${onErrorThumb}">`;
        });
        
        imageHtml += `
                </div> <button class="thumbnail-arrow next" aria-label="Next image"><i class="fas fa-chevron-right"></i></button>
            </div> `;

        productDetailView.innerHTML = `
            <button class="back-to-products" onclick="showProductListing()">
                <i class="fas fa-arrow-left"></i> Back to Products
            </button>
            <div class="product-detail-images">
                ${imageHtml}
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${product.reviews.toLocaleString()} Customer reviews)</span>
                </div>
                <p class="product-detail-price">KSh ${product.price.toLocaleString()}${product.oldPrice ? ` <strike>KSh ${product.oldPrice.toLocaleString()}</strike> (-${product.discount}%)` : ''}</p>
                <div class="product-detail-meta">
                    <p><span>Services:</span> Fulfilled By iMall</p>
                    ${product.color ? `<p><span>Color:</span> ${product.color.map(c => `<span class="color-option" style="background-color:${c};" data-color="${c}"></span>`).join('')}</p>` : ''}
                    ${product.size ? `<p><span>Size:</span> ${product.size.map(s => `<span class="size-option" data-size="${s}">${s}</span>`).join('')}</p>` : ''}
                    <p><span>Delivery Information:</span> Ships from ${product.shippingLoc}, select an address to view delivery times.</p>
                    ${product.description ? `<p><span>Description:</span> ${product.description}</p>` : ''}
                </div>
                <div class="quantity-control">
                    <button id="quantity-minus">-</button>
                    <input type="number" id="product-quantity" value="1" min="1" max="99">
                    <button id="quantity-plus">+</button>
                </div>
                <button class="add-to-cart-large">Add to Cart</button>
            </div>
        `;

        // --- Add Event Listeners for Product Detail View ---
        const mainProductImage = document.getElementById('main-product-image');
        const thumbnailsWrapper = productDetailView.querySelector('.thumbnail-images-wrapper');
        
        // Quantity control
        const quantityInput = document.getElementById('product-quantity');
        const quantityMinusBtn = document.getElementById('quantity-minus');
        const quantityPlusBtn = document.getElementById('quantity-plus');

        if (quantityInput && quantityMinusBtn && quantityPlusBtn) {
            quantityMinusBtn.addEventListener('click', () => {
                let currentVal = parseInt(quantityInput.value);
                if (currentVal > parseInt(quantityInput.min)) {
                    quantityInput.value = currentVal - 1;
                }
            });
            quantityPlusBtn.addEventListener('click', () => {
                let currentVal = parseInt(quantityInput.value);
                if (currentVal < parseInt(quantityInput.max)) {
                    quantityInput.value = currentVal + 1;
                }
            });
        }
        
        // Thumbnail carousel and interaction
        const prevArrow = productDetailView.querySelector('.thumbnail-arrow.prev');
        const nextArrow = productDetailView.querySelector('.thumbnail-arrow.next');
        let currentThumbIndex = 0; // Index of the first visible thumbnail
        const totalImages = product.images.length;

        const updateThumbnailDisplay = () => {
            if (!thumbnailsWrapper) return; // Ensure wrapper exists
            thumbnailsWrapper.innerHTML = ''; // Clear current thumbnails

            const startIndex = currentThumbIndex;
            const endIndex = Math.min(startIndex + thumbnailsPerPage, totalImages);

            for (let i = startIndex; i < endIndex; i++) {
                const imageName = product.images[i];
                const thumbSrc = `${imageBase}${imageName}`;
                // Set the first thumbnail as active initially, or if a clicked thumb becomes active
                const isActive = (i === product.images.indexOf(mainProductImage.src.replace(imageBase, ''))) ? ' active' : '';
                const onErrorThumb = `this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';this.alt='${product.name} - Image Not Found';`;
                const thumbImg = document.createElement('img');
                thumbImg.src = thumbSrc;
                thumbImg.alt = `${product.name} - ${i + 1}`;
                thumbImg.classList.add('product-thumbnail');
                if (isActive) thumbImg.classList.add('active');
                thumbImg.dataset.fullSrc = thumbSrc;
                thumbImg.setAttribute('onerror', onErrorThumb);

                thumbImg.addEventListener('click', (e) => {
                    mainProductImage.src = e.target.dataset.fullSrc;
                    // Remove active class from all, add to clicked
                    thumbnailsWrapper.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                });
                thumbImg.addEventListener('mouseover', (e) => {
                    mainProductImage.src = e.target.dataset.fullSrc;
                });
                thumbImg.addEventListener('mouseout', () => {
                    const activeThumb = thumbnailsWrapper.querySelector('.product-thumbnail.active');
                    if (activeThumb) {
                        mainProductImage.src = activeThumb.dataset.fullSrc;
                    } else { // Fallback if no active is set (e.g., initial load)
                        mainProductImage.src = `${imageBase}${product.images[0]}`;
                    }
                });
                thumbnailsWrapper.appendChild(thumbImg);
            }

            if (prevArrow) prevArrow.style.display = currentThumbIndex > 0 ? 'block' : 'none';
            if (nextArrow) nextArrow.style.display = (currentThumbIndex + thumbnailsPerPage) < totalImages ? 'block' : 'none';

             // Ensure the first thumbnail is active on initial load if no other is
            const firstThumb = thumbnailsWrapper.querySelector('.product-thumbnail');
            if (firstThumb && !thumbnailsWrapper.querySelector('.product-thumbnail.active')) {
                firstThumb.classList.add('active');
            }
        };

        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                if (currentThumbIndex > 0) {
                    currentThumbIndex--;
                    updateThumbnailDisplay();
                }
            });
        }
        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                if ((currentThumbIndex + thumbnailsPerPage) < totalImages) {
                    currentThumbIndex++;
                    updateThumbnailDisplay();
                }
            });
        }

        updateThumbnailDisplay(); // Initial display
    };

    // Helper function for star ratings
    function generateStarRating(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                starsHtml += `<i class="fas fa-star filled"></i>`;
            } else if (rating >= i - 0.5) {
                starsHtml += `<i class="fas fa-star-half-alt filled"></i>`;
            } else {
                starsHtml += `<i class="fas fa-star"></i>`;
            }
        }
        return starsHtml;
    }

    // Function to hide product listing and show detail view
    window.showProductDetail = (productId) => {
        newProductsGrid.style.display = 'none';
        productDetailView.style.display = 'flex'; // Use flex to activate its layout
        
        // Find product by ID from your productData (defined below)
        const product = productData.find(p => p.id === productId);
        if (product) {
            renderProductDetail(product);
        }
        window.scrollTo(0, 0); // Scroll to top
    };

    // Function to hide detail view and show product listing
    window.showProductListing = () => {
        newProductsGrid.style.display = 'grid'; // Restore grid display
        productDetailView.style.display = 'none';
        window.scrollTo(0, 0); // Scroll to top
    };

    // Dummy Data for Products (Total: 50 products)
    // IMPORTANT: Each 'folder' entry must EXACTLY match a folder name within images/iMall/
    // Each 'images' array must contain the filenames (e.g., 'image-1.webp') within that specific folder.
    // I have ensured each 'images' array has at least 6 filenames.
    const productData = [
        {
            id: 'iphone12pro',
            name: 'Apple iPhone 12 Pro',
            price: 12999,
            oldPrice: 15999,
            discount: 32,
            rating: 4.5,
            reviews: 1901,
            shippingLoc: 'Dagoretti South',
            description: 'Experience the ultimate smartphone with the Apple iPhone 12 Pro, featuring a powerful A14 Bionic chip, stunning Ceramic Shield display, and advanced pro camera system for incredible low-light performance. Available in various colors and storage options.',
            folder: 'apple iphone 12 pro',
            images: ['apple-iphone-12-pro-1.jpg', 'apple-iphone-12-pro-2.jpg', 'apple-iphone-12-pro-3.jpg', 'apple-iphone-12-pro-4.jpg', 'apple-iphone-12-pro-5.jpg', 'apple-iphone-12-pro-6.jpg']
        },
        {
            id: 'samsung-a13-5g',
            name: 'Samsung Galaxy A13 5G',
            price: 24999,
            oldPrice: 29999,
            discount: 16,
            rating: 4.3,
            reviews: 850,
            shippingLoc: 'Local Shipping',
            description: 'Get blazing-fast 5G connectivity with the Samsung Galaxy A13 5G. Features a vibrant display, reliable performance, and a versatile camera system for everyday use.',
            folder: 'Samsung Galaxy A13 5G',
            images: ['samsung-a13-5g-1.webp', 'samsung-a13-5g-2.webp', 'samsung-a13-5g-3.webp', 'samsung-a13-5g-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'arctic-mini-fridge',
            name: 'Arctic Mini Refrigerator',
            price: 8500,
            rating: 4.0,
            reviews: 550,
            shippingLoc: 'Nairobi',
            description: 'Compact and efficient Arctic Mini Refrigerator, perfect for dorm rooms, offices, or small apartments. Keep your beverages and snacks perfectly chilled.',
            folder: 'Arctic Mini Refridgerator',
            images: ['arctic-mini-fridge-1.jpg', 'arctic-mini-fridge-2.jpg', 'arctic-mini-fridge-3.jpg', 'arctic-mini-fridge-4.jpg', 'arctic-mini-fridge-5.jpg', 'arctic-mini-fridge-6.jpg'] // Added generic names
        },
        {
            id: 'bottom-load-dispenser',
            name: 'Bottom Load Water Dispenser',
            price: 10500,
            rating: 4.2,
            reviews: 320,
            shippingLoc: 'Mlolongo',
            description: 'Convenient bottom-load water dispenser with hot and cold water options. No more lifting heavy bottles! Ideal for home or office use.',
            folder: 'bottom load dispenser',
            images: ['bottom-load-dispenser-1.webp', 'bottom-load-dispenser-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'gas-cooktop',
            name: 'Gas Cooktop with Griddle',
            price: 15000,
            rating: 4.7,
            reviews: 780,
            shippingLoc: 'Nairobi',
            description: 'Modern gas cooktop with an integrated griddle for versatile cooking. Perfect for frying, grilling, and simmering multiple dishes at once.',
            folder: 'Gas Cooktop with Griddle',
            images: ['gas-cooktop-1.webp', 'gas-cooktop-2.webp', 'gas-cooktop-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'niakun-laptop',
            name: 'Niakun Laptop 14-inch',
            price: 25000,
            oldPrice: 30000,
            discount: 16,
            rating: 3.8,
            reviews: 210,
            shippingLoc: 'Overseas',
            description: 'Affordable and reliable 14-inch Niakun Laptop, suitable for daily tasks, Browse, and light office work. Comes with ample storage and memory.',
            folder: 'niakun laptop',
            images: ['niakun-laptop-1.webp', 'niakun-laptop-2.webp', 'niakun-laptop-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'samsung-s25-ultra',
            name: 'Samsung Galaxy S25 Ultra',
            price: 180000,
            rating: 4.9,
            reviews: 3500,
            shippingLoc: 'Nairobi',
            description: 'Unleash ultimate power with the Samsung Galaxy S25 Ultra. Revolutionary camera, stunning display, and long-lasting battery for unparalleled mobile experience.',
            folder: 'samsung galaxys25 ultra',
            images: ['samsung-galaxys25-ultra-1.webp', 'samsung-galaxys25-ultra-2.webp', 'samsung-galaxys25-ultra-3.webp', 'samsung-galaxys25-ultra-4.webp', 'samsung-galaxys25-ultra-5.webp', 'image-6.webp'] // Added generic name
        },
        {
            id: 'samsung-fridge',
            name: 'Samsung Family Hub Refrigerator',
            price: 150000,
            rating: 4.8,
            reviews: 1200,
            shippingLoc: 'Nairobi',
            description: 'The smart Samsung Family Hub Refrigerator, featuring a touch screen, food management, and entertainment options. Redefine your kitchen experience.',
            folder: 'samsung refridgerator',
            images: ['samsung-refridgerator-1.webp', 'samsung-refridgerator-2.webp', 'samsung-refridgerator-3.webp', 'samsung-refridgerator-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'sgin-laptop',
            name: 'SGIN Laptop 15.6-inch',
            price: 32000,
            oldPrice: 38000,
            discount: 15,
            rating: 4.1,
            reviews: 480,
            shippingLoc: 'Local Shipping',
            description: 'Powerful SGIN Laptop with a vibrant 15.6-inch display, ideal for productivity and entertainment. Fast performance and sleek design.',
            folder: 'SGIN LAPTOP',
            images: ['sgin-laptop-1.webp', 'sgin-laptop-2.webp', 'sgin-laptop-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'vitron-32-tv',
            name: 'Vitron 32 Inch Frameless Smart TV HD Netflix Bluetooth TV',
            price: 10799,
            oldPrice: 15999,
            discount: 32,
            rating: 4.7,
            reviews: 1901,
            shippingLoc: 'Dagoretti South',
            description: 'Immerse yourself in stunning visuals with the Vitron 32 Inch Frameless Smart TV. Enjoy Netflix, YouTube, and more with built-in Bluetooth and DVB-T2.',
            folder: 'visio tv',
            color: ['Black'],
            size: ['32 inch'],
            images: ['visio-tv-1.webp', 'visio-tv-2.webp', 'visio-tv-3.webp', 'visio-tv-4.webp', 'visio-tv-5.webp', 'visio-tv-6.webp']
        },
        // --- Added 30+ UNIQUE PLACEHOLDER PRODUCTS below with their own assumed folders ---
        {
            id: 'bt-speaker-x1',
            name: 'Portable Bluetooth Speaker X1',
            price: 1500,
            rating: 4.3,
            reviews: 600,
            shippingLoc: 'Local Shipping',
            description: 'Compact and powerful portable Bluetooth speaker with excellent bass and long battery life. Perfect for travel and outdoor activities.',
            folder: 'Portable Bluetooth Speaker X1',
            images: ['speaker-x1-1.webp', 'speaker-x1-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'air-fryer-v2',
            name: 'Digital Air Fryer V2 5L',
            price: 7500,
            rating: 4.6,
            reviews: 920,
            shippingLoc: 'Nairobi',
            description: 'Cook healthier meals with this 5-liter digital air fryer. Features multiple presets and easy-to-clean components.',
            folder: 'Digital Air Fryer V2 5L',
            images: ['air-fryer-v2-1.webp', 'air-fryer-v2-2.webp', 'air-fryer-v2-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'smartwatch-fitpro',
            name: 'Fitness Tracker Smartwatch FitPro',
            price: 2800,
            rating: 4.0,
            reviews: 340,
            shippingLoc: 'Overseas',
            description: 'Track your steps, heart rate, and sleep with this sleek fitness tracker smartwatch. Compatible with Android and iOS.',
            folder: 'Fitness Tracker Smartwatch FitPro',
            images: ['smartwatch-fitpro-1.webp', 'smartwatch-fitpro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'coffee-maker-auto',
            name: 'Automatic Coffee Maker Deluxe',
            price: 4200,
            rating: 4.5,
            reviews: 510,
            shippingLoc: 'Local Shipping',
            description: 'Brew perfect coffee every morning with this easy-to-use automatic coffee maker. Features programmable timer and keep-warm function.',
            folder: 'Automatic Coffee Maker Deluxe',
            images: ['coffee-maker-auto-1.webp', 'coffee-maker-auto-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'gaming-headset-pro',
            name: 'Gaming Headset Pro X with Mic',
            price: 3500,
            rating: 4.2,
            reviews: 280,
            shippingLoc: 'Nairobi',
            description: 'Immersive gaming headset with noise-cancelling microphone and comfortable earcups. Compatible with PC, PS4, Xbox.',
            folder: 'Gaming Headset Pro X with Mic',
            images: ['gaming-headset-pro-1.webp', 'gaming-headset-pro-2.webp', 'gaming-headset-pro-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'blender-ultrablend',
            name: 'Professional Blender UltraBlend 1200W',
            price: 9800,
            rating: 4.8,
            reviews: 1100,
            shippingLoc: 'Local Shipping',
            description: 'Powerful 1200W blender for smoothies, soups, and crushing ice. Durable blades and multiple speed settings.',
            folder: 'Professional Blender UltraBlend 1200W',
            images: ['blender-ultrablend-1.webp', 'blender-ultrablend-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'earbuds-truewire',
            name: 'True Wireless Earbuds TrueWire X',
            price: 2200,
            rating: 4.4,
            reviews: 750,
            shippingLoc: 'Overseas',
            description: 'Enjoy crystal-clear audio with these true wireless earbuds. Ergonomic design for comfortable fit and long battery life.',
            folder: 'True Wireless Earbuds TrueWire X',
            images: ['earbuds-truewire-1.webp', 'earbuds-truewire-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'pressure-cooker-elite',
            name: 'Electric Pressure Cooker Elite 6L',
            price: 6800,
            rating: 4.6,
            reviews: 630,
            shippingLoc: 'Nairobi',
            description: 'Speed up your cooking with this 6-liter electric pressure cooker. Multi-functional and safe to use.',
            folder: 'Electric Pressure Cooker Elite 6L',
            images: ['pressure-cooker-elite-1.webp', 'pressure-cooker-elite-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'smart-bulb-glow',
            name: 'Smart LED Light Bulb Glow (RGB)',
            price: 750,
            rating: 4.1,
            reviews: 400,
            shippingLoc: 'Local Shipping',
            description: 'Control your lighting with your smartphone. RGB smart LED bulb with dimmable features and scene settings.',
            folder: 'Smart LED Light Bulb Glow RGB',
            images: ['smart-bulb-glow-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'security-cam-pro',
            name: 'HD Wi-Fi Security Camera Pro',
            price: 4500,
            rating: 4.5,
            reviews: 580,
            shippingLoc: 'Local Shipping',
            description: 'Keep an eye on your home with this easy-to-install HD Wi-Fi security camera. Features night vision and motion detection.',
            folder: 'HD Wi-Fi Security Camera Pro',
            images: ['security-cam-pro-1.webp', 'security-cam-pro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'electric-kettle-swift',
            name: 'Cordless Electric Kettle Swift 1.7L',
            price: 1800,
            rating: 4.3,
            reviews: 700,
            shippingLoc: 'Mlolongo',
            description: 'Boil water quickly with this stylish 1.7L cordless electric kettle. Auto shut-off for safety.',
            folder: 'Cordless Electric Kettle Swift 1.7L',
            images: ['electric-kettle-swift-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'portable-fan-breeze',
            name: 'Portable Mini Desk Fan Breeze',
            price: 600,
            rating: 3.9,
            reviews: 250,
            shippingLoc: 'Local Shipping',
            description: 'Stay cool anywhere with this compact and quiet portable mini desk fan. USB powered.',
            folder: 'Portable Mini Desk Fan Breeze',
            images: ['portable-fan-breeze-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'external-ssd-fast',
            name: 'Portable SSD FastDrive 1TB',
            price: 9500,
            rating: 4.7,
            reviews: 300,
            shippingLoc: 'Overseas',
            description: 'Ultra-fast 1TB portable SSD for quick data transfers and reliable storage. Compact and durable design.',
            folder: 'Portable SSD FastDrive 1TB',
            images: ['external-ssd-fast-1.webp', 'external-ssd-fast-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'hair-dryer-salon',
            name: 'Professional Hair Dryer Salon Pro',
            price: 2900,
            rating: 4.2,
            reviews: 410,
            shippingLoc: 'Nairobi',
            description: 'Achieve salon-quality blowouts at home with this powerful professional hair dryer. Multiple heat and speed settings.',
            folder: 'Professional Hair Dryer Salon Pro',
            images: ['hair-dryer-salon-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'vacuum-cleaner-cyclone',
            name: 'Bagless Vacuum Cleaner Cyclone',
            price: 11000,
            rating: 4.4,
            reviews: 550,
            shippingLoc: 'Local Shipping',
            description: 'Efficient bagless vacuum cleaner with strong suction for deep cleaning carpets and hard floors.',
            folder: 'Bagless Vacuum Cleaner Cyclone',
            images: ['vacuum-cleaner-cyclone-1.webp', 'vacuum-cleaner-cyclone-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'gaming-mouse-viper',
            name: 'RGB Gaming Mouse Viper',
            price: 1200,
            rating: 4.0,
            reviews: 180,
            shippingLoc: 'Overseas',
            description: 'Precision RGB gaming mouse with customizable buttons and high DPI sensor for competitive gaming.',
            folder: 'RGB Gaming Mouse Viper',
            images: ['gaming-mouse-viper-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'induction-cooker-smart',
            name: 'Portable Induction Cooker Smart',
            price: 6200,
            rating: 4.5,
            reviews: 390,
            shippingLoc: 'Nairobi',
            description: 'Fast and energy-efficient portable induction cooker. Ideal for small kitchens or as an extra burner.',
            folder: 'Portable Induction Cooker Smart',
            images: ['induction-cooker-smart-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'power-bank-rapid',
            name: '20000mAh Power Bank RapidCharge',
            price: 2500,
            rating: 4.7,
            reviews: 800,
            shippingLoc: 'Local Shipping',
            description: 'High-capacity 20000mAh power bank for multiple device charges. Features fast charging and universal compatibility.',
            folder: '20000mAh Power Bank RapidCharge',
            images: ['power-bank-rapid-1.webp', 'power-bank-rapid-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'bathroom-scale-slim',
            name: 'Digital Bathroom Scale Slim',
            price: 900,
            rating: 3.9,
            reviews: 200,
            shippingLoc: 'Local Shipping',
            description: 'Accurate digital bathroom scale with a sleek glass design. Easy to read display.',
            folder: 'Digital Bathroom Scale Slim',
            images: ['bathroom-scale-slim-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'usb-c-hub-pro',
            name: 'USB-C Hub Pro 7-in-1',
            price: 1800,
            rating: 4.4,
            reviews: 310,
            shippingLoc: 'Overseas',
            description: 'Expand your laptop\'s connectivity with this 7-in-1 USB-C hub, featuring HDMI, USB 3.0, SD card reader, and more.',
            folder: 'USB-C Hub Pro 7-in-1',
            images: ['usb-c-hub-pro-1.webp', 'usb-c-hub-pro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'frying-pan-set-chef',
            name: 'Non-stick Frying Pan Set Chef (3 pcs)',
            price: 3800,
            rating: 4.6,
            reviews: 450,
            shippingLoc: 'Nairobi',
            description: 'Durable non-stick frying pan set for everyday cooking. Includes 3 different sizes for versatility.',
            folder: 'Non-stick Frying Pan Set Chef 3 pcs',
            images: ['frying-pan-set-chef-1.webp', 'frying-pan-set-chef-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'water-filter-jug',
            name: 'Water Filter Pitcher AquaClean 2.5L',
            price: 1300,
            rating: 4.1,
            reviews: 270,
            shippingLoc: 'Local Shipping',
            description: 'Enjoy cleaner, great-tasting water with this 2.5-liter water filter pitcher. Reduces chlorine and impurities.',
            folder: 'Water Filter Pitcher AquaClean 2.5L',
            images: ['water-filter-jug-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'bluetooth-earphones-sport',
            name: 'Neckband Bluetooth Earphones Sport',
            price: 1600,
            rating: 4.0,
            reviews: 190,
            shippingLoc: 'Local Shipping',
            description: 'Comfortable neckband Bluetooth earphones with clear sound and long battery life. Ideal for sports and daily use.',
            folder: 'Neckband Bluetooth Earphones Sport',
            images: ['bluetooth-earphones-sport-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'food-processor-mini',
            name: 'Compact Food Processor Mini',
            price: 5500,
            rating: 4.3,
            reviews: 380,
            shippingLoc: 'Nairobi',
            description: 'Chop, blend, and mix with ease using this compact food processor. Perfect for small kitchens.',
            folder: 'Compact Food Processor Mini',
            images: ['food-processor-mini-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'digital-alarm-clock-sleek',
            name: 'LED Digital Alarm Clock Sleek',
            price: 950,
            rating: 3.8,
            reviews: 150,
            shippingLoc: 'Overseas',
            description: 'Modern LED digital alarm clock with large display, snooze function, and adjustable brightness.',
            folder: 'LED Digital Alarm Clock Sleek',
            images: ['digital-alarm-clock-sleek-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'portable-blender-go',
            name: 'USB Rechargeable Portable Blender Go',
            price: 2100,
            rating: 4.5,
            reviews: 290,
            shippingLoc: 'Local Shipping',
            description: 'Make smoothies on the go with this USB rechargeable portable blender. Perfect for travel and healthy living.',
            folder: 'USB Rechargeable Portable Blender Go',
            images: ['portable-blender-go-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'hdmi-cable-ultra',
            name: 'High-Speed HDMI Cable Ultra (2m)',
            price: 400,
            rating: 4.7,
            reviews: 500,
            shippingLoc: 'Local Shipping',
            description: 'Connect your devices with this high-speed 2-meter HDMI cable. Supports 4K resolution and high-quality audio.',
            folder: 'High-Speed HDMI Cable Ultra 2m',
            images: ['hdmi-cable-ultra-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'wall-mount-shelf-modern',
            name: 'Floating Wall Mount Shelf Modern',
            price: 1200,
            rating: 4.0,
            reviews: 120,
            shippingLoc: 'Nairobi',
            description: 'Add a modern touch to your home with this floating wall mount shelf. Ideal for displaying decor or books.',
            folder: 'Floating Wall Mount Shelf Modern',
            images: ['wall-mount-shelf-modern-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'electric-toothbrush-sonic',
            name: 'Rechargeable Electric Toothbrush Sonic',
            price: 2800,
            rating: 4.6,
            reviews: 330,
            shippingLoc: 'Overseas',
            description: 'Achieve a deeper clean with this rechargeable electric toothbrush. Multiple brushing modes for complete oral care.',
            folder: 'Rechargeable Electric Toothbrush Sonic',
            images: ['electric-toothbrush-sonic-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'kitchen-knife-set-pro',
            name: 'Stainless Steel Kitchen Knife Set Pro',
            price: 4500,
            rating: 4.5,
            reviews: 200,
            shippingLoc: 'Local Shipping',
            description: 'Essential 5-piece stainless steel kitchen knife set for all your culinary needs. Sharp and durable blades.',
            folder: 'Stainless Steel Kitchen Knife Set Pro',
            images: ['kitchen-knife-set-pro-1.webp', 'kitchen-knife-set-pro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'drone-camera-hd',
            name: 'HD Drone with Camera',
            price: 18000,
            rating: 4.2,
            reviews: 150,
            shippingLoc: 'Overseas',
            description: 'Capture stunning aerial views with this easy-to-fly HD drone. Features live video feed and durable design.',
            folder: 'HD Drone with Camera',
            images: ['drone-camera-hd-1.webp', 'drone-camera-hd-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'smart-doorbell',
            name: 'Smart Video Doorbell',
            price: 7000,
            rating: 4.4,
            reviews: 250,
            shippingLoc: 'Local Shipping',
            description: 'Enhance home security with a smart video doorbell. See, hear, and speak to visitors from your smartphone.',
            folder: 'Smart Video Doorbell',
            images: ['smart-doorbell-1.webp', 'smart-doorbell-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'robot-vacuum',
            name: 'Robot Vacuum Cleaner SmartClean',
            price: 22000,
            rating: 4.7,
            reviews: 600,
            shippingLoc: 'Nairobi',
            description: 'Effortlessly clean your floors with this intelligent robot vacuum cleaner. Features smart navigation and app control.',
            folder: 'Robot Vacuum Cleaner SmartClean',
            images: ['robot-vacuum-cleaner-1.webp', 'robot-vacuum-cleaner-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'portable-projector',
            name: 'Mini Portable Projector',
            price: 13000,
            rating: 4.1,
            reviews: 180,
            shippingLoc: 'Overseas',
            description: 'Enjoy movies anywhere with this mini portable projector. Compact design with clear image projection.',
            folder: 'Mini Portable Projector',
            images: ['mini-projector-1.webp', 'mini-projector-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'gaming-monitor',
            name: '24-inch Gaming Monitor',
            price: 28000,
            rating: 4.5,
            reviews: 400,
            shippingLoc: 'Local Shipping',
            description: 'Experience smooth gaming with this 24-inch full HD gaming monitor. High refresh rate and fast response time.',
            folder: '24-inch Gaming Monitor',
            images: ['gaming-monitor-1.webp', 'gaming-monitor-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'smart-lock',
            name: 'Smart Door Lock with Fingerprint',
            price: 9500,
            rating: 4.3,
            reviews: 210,
            shippingLoc: 'Local Shipping',
            description: 'Keyless entry and enhanced security with this smart door lock. Features fingerprint, keypad, and app control.',
            folder: 'Smart Door Lock with Fingerprint',
            images: ['smart-door-lock-1.webp', 'smart-door-lock-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'espressomaker',
            name: 'Espresso Coffee Machine',
            price: 16000,
            rating: 4.6,
            reviews: 320,
            shippingLoc: 'Nairobi',
            description: 'Brew rich, aromatic espresso at home with this compact and easy-to-use espresso machine.',
            folder: 'Espresso Coffee Machine',
            images: ['espresso-machine-1.webp', 'espresso-machine-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'bluetooth-keyboard',
            name: 'Wireless Bluetooth Keyboard',
            price: 1500,
            rating: 4.0,
            reviews: 100,
            shippingLoc: 'Overseas',
            description: 'Slim and portable wireless Bluetooth keyboard for tablets, smartphones, and computers. Long battery life.',
            folder: 'Wireless Bluetooth Keyboard',
            images: ['bluetooth-keyboard-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'car-dashcam',
            name: 'Full HD Car Dash Cam',
            price: 3200,
            rating: 4.2,
            reviews: 140,
            shippingLoc: 'Local Shipping',
            description: 'Record your drives in full HD with this reliable car dash cam. Features loop recording and G-sensor.',
            folder: 'Full HD Car Dash Cam',
            images: ['car-dash-cam-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        },
        {
            id: 'robot-mop',
            name: 'Robot Mop & Cleaner',
            price: 19000,
            rating: 4.5,
            reviews: 280,
            shippingLoc: 'Nairobi',
            description: 'Keep your floors spotless with this intelligent robot mop and cleaner. Perfect for hardwood and tile floors.',
            folder: 'Robot Mop Cleaner',
            images: ['robot-mop-1.webp', 'robot-mop-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'] // Added generic names
        }
    ];

    // Function to populate the product grid
    const populateProductGrid = (products) => {
        if (!newProductsGrid) return;
        newProductsGrid.innerHTML = ''; // Clear existing products

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('onclick', `showProductDetail('${product.id}')`); // Link to detail view

            const imageSrc = `images/iMall/${product.folder}/${product.images[0]}`; // Use first image as thumbnail
            const ratingStars = generateStarRating(product.rating);

            // Image error handling for product cards
            const onErrorCard = `this.onerror=null;this.src='${PLACEHOLDER_IMAGE}';this.alt='${product.name} - Image Not Found';`;

            productCard.innerHTML = `
                <img src="${imageSrc}" alt="${product.name}" loading="lazy" onerror="${onErrorCard}">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${ratingStars}
                    <span class="review-count">(${product.reviews.toLocaleString()} Reviews)</span>
                </div>
                <p class="product-price">KSh ${product.price.toLocaleString()}${product.oldPrice ? ` <strike>KSh ${product.oldPrice.toLocaleString()}</strike>` : ''}</p>
                <p class="product-fulfillment">Brand Official | Fulfilled By iMall</p>
                <p class="product-shipping">Ships from ${product.shippingLoc}</p>
                <button class="add-to-cart-button">Add to Cart</button>
            `;
            newProductsGrid.appendChild(productCard);
        });
    };

    // Populate the grid on page load
    populateProductGrid(productData);
});
// js/car-details.js

document.addEventListener('DOMContentLoaded', () => {
    // Ensure vehicles array and PLACEHOLDER_IMAGE_URL are accessible (from vehicles-data.js)
    if (typeof vehicles === 'undefined' || typeof PLACEHOLDER_IMAGE_URL === 'undefined') {
        console.error('Error: vehicles array or PLACEHOLDER_IMAGE_URL not found. Make sure vehicles-data.js is loaded before car-details.js.');
        return;
    }

    // Get the car ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    // Find the vehicle in the vehicles array
    const vehicle = vehicles.find(v => v.id === carId);

    // If no vehicle is found, display an error or redirect
    if (!vehicle) {
        document.getElementById('car-detail-name').textContent = 'Vehicle Not Found';
        document.getElementById('car-detail-price').textContent = '';
        document.querySelector('.car-details-container').innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Oops! Vehicle Not Found.</h2>
                <p>The car you are looking for does not exist or the link is invalid.</p>
                <a href="autogiant-motors.html#full-inventory" class="btn btn-primary" style="margin-top: 20px;">Back to Inventory</a>
            </div>
        `;
        document.title = 'Vehicle Not Found';
        return; // Stop execution
    }

    // --- Helper function to format price ---
    const formatPrice = (price) => {
        if (price === null || isNaN(price)) return 'N/A';
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    // --- Populate the HTML elements with vehicle data ---

    document.title = `${vehicle.make} ${vehicle.model} - AutoGiant Motors`;
    document.getElementById('car-detail-name').textContent = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
    document.getElementById('car-detail-price').textContent = formatPrice(vehicle.price);

    document.getElementById('car-detail-make').textContent = vehicle.make;
    document.getElementById('car-detail-model').textContent = vehicle.model;
    document.getElementById('car-detail-year').textContent = vehicle.year;
    document.getElementById('car-detail-condition').textContent = vehicle.condition;
    document.getElementById('car-detail-body-type').textContent = vehicle.bodyType;
    document.getElementById('car-detail-transmission').textContent = vehicle.transmission;
    document.getElementById('car-detail-engine-size').textContent = vehicle.engineSize;
    document.getElementById('car-detail-color').textContent = vehicle.color;
    document.getElementById('car-detail-in-stock').textContent = vehicle.inStock > 0 ? `${vehicle.inStock} In Stock` : 'Out of Stock / Order on Demand';

    document.getElementById('car-detail-availability').textContent = vehicle.availability;

    // Conditionally display shipping fee and delivery days
    const shippingFeeRow = document.getElementById('car-detail-shipping-fee-row');
    const deliveryDaysRow = document.getElementById('car-detail-delivery-days-row');
    if (vehicle.availability === 'Imported') {
        document.getElementById('car-detail-shipping-fee').textContent = formatPrice(vehicle.shippingFee);
        document.getElementById('car-detail-delivery-days').textContent = `${vehicle.deliveryDays} Days`;
        shippingFeeRow.style.display = 'block';
        deliveryDaysRow.style.display = 'block';
    } else {
        shippingFeeRow.style.display = 'none';
        deliveryDaysRow.style.display = 'none';
    }

    document.getElementById('car-detail-vat-inclusive').textContent = vehicle.vatInclusive ? 'Yes' : 'No';
    document.getElementById('car-detail-available-colors').textContent = vehicle.availableColors.join(', ');
    document.getElementById('car-detail-payment-modes').textContent = vehicle.acceptedPaymentModes.join(', ');

    // --- Image Gallery Logic ---
    const mainCarImage = document.getElementById('main-car-image');
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    const interiorImageGallery = document.getElementById('interior-image-gallery');

    // Function to handle image loading errors
    const handleImageError = (event) => {
        event.target.onerror = null; // Prevent infinite loop
        event.target.src = PLACEHOLDER_IMAGE_URL;
        console.warn(`Image failed to load: ${event.target.src}. Using placeholder.`);
    };

    // Set initial main image
    const initialMainImage = (vehicle.images && vehicle.images.length > 0) ? vehicle.images[0] : PLACEHOLDER_IMAGE_URL;
    mainCarImage.src = initialMainImage;
    mainCarImage.alt = `${vehicle.make} ${vehicle.model} - Main View`;
    mainCarImage.onerror = handleImageError;

    // Populate exterior image thumbnails
    if (vehicle.images && vehicle.images.length > 0) {
        vehicle.images.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${vehicle.make} ${vehicle.model} Thumbnail ${index + 1}`;
            img.onerror = handleImageError; // Add error handling for thumbnails

            img.addEventListener('click', () => {
                mainCarImage.src = imgSrc; // Change main image on click
                // Remove active class from all thumbnails
                document.querySelectorAll('#thumbnail-gallery img').forEach(thumb => {
                    thumb.classList.remove('active-thumbnail');
                });
                // Add active class to clicked thumbnail
                img.classList.add('active-thumbnail');
            });
            thumbnailGallery.appendChild(img);
        });
        // Set the first thumbnail as active initially
        if (thumbnailGallery.firstElementChild) {
            thumbnailGallery.firstElementChild.classList.add('active-thumbnail');
        }
    } else {
        // If no exterior images, hide the thumbnail gallery
        thumbnailGallery.style.display = 'none';
    }

    // Populate interior image thumbnails
    if (vehicle.interiorImages && vehicle.interiorImages.length > 0) {
        vehicle.interiorImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${vehicle.make} ${vehicle.model} Interior Thumbnail ${index + 1}`;
            img.onerror = handleImageError; // Add error handling for interior thumbnails

            img.addEventListener('click', () => {
                mainCarImage.src = imgSrc; // Change main image to interior on click
                // Remove active class from all thumbnails (both exterior and interior)
                document.querySelectorAll('.thumbnail-gallery img').forEach(thumb => {
                    thumb.classList.remove('active-thumbnail');
                });
                // Add active class to clicked interior thumbnail
                img.classList.add('active-thumbnail');
            });
            interiorImageGallery.appendChild(img);
        });
    } else {
        // If no interior images, hide the interior images card
        document.querySelector('.interior-images-card').style.display = 'none';
    }

    // You can add a default description if the vehicle object doesn't have one
    if (!vehicle.description) {
        document.getElementById('car-detail-description').textContent = `Explore the ${vehicle.year} ${vehicle.make} ${vehicle.model}, a perfect blend of performance, style, and reliability. This vehicle is meticulously maintained and ready for its next adventure.`;
    } else {
        document.getElementById('car-detail-description').textContent = vehicle.description;
    }
});

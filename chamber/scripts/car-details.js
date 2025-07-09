document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    // Make sure vehicles array and PLACEHOLDER_IMAGE_URL are defined in vehicles-data.js
    if (!vehicles || vehicles.length === 0) {
        console.error("vehicles data is not loaded. Ensure vehicles-data.js is linked correctly and before car-details.js.");
        return;
    }

    const car = vehicles.find(v => v.id === carId);

    if (car) {
        document.getElementById('car-detail-title').textContent = `${car.year} ${car.make} ${car.model} Details`;
        document.getElementById('car-detail-name').textContent = `${car.year} ${car.make} ${car.model}`;
        document.getElementById('car-detail-price').textContent = `Price: KSh ${new Intl.NumberFormat('en-KE').format(car.price)}`;

        // Populate Key Information
        document.getElementById('car-detail-make').textContent = car.make;
        document.getElementById('car-detail-model').textContent = car.model;
        document.getElementById('car-detail-year').textContent = car.year;
        document.getElementById('car-detail-condition').textContent = car.condition;
        document.getElementById('car-detail-body-type').textContent = car.bodyType;
        document.getElementById('car-detail-transmission').textContent = car.transmission;
        document.getElementById('car-detail-engine-size').textContent = car.engineSize;
        document.getElementById('car-detail-color').textContent = car.color;
        document.getElementById('car-detail-in-stock').textContent = car.inStock ? 'Yes' : 'No';

        // Populate Availability & Payment
        document.getElementById('car-detail-availability').textContent = car.availability;
        document.getElementById('car-detail-vat-inclusive').textContent = car.vatInclusive ? 'Yes' : 'No';
        document.getElementById('car-detail-available-colors').textContent = car.availableColors.join(', ');
        document.getElementById('car-detail-payment-modes').textContent = car.acceptedPayments.join(', ');

        const shippingFeeRow = document.getElementById('car-detail-shipping-fee-row');
        const deliveryDaysRow = document.getElementById('car-detail-delivery-days-row');

        if (car.shippingFee) {
            document.getElementById('car-detail-shipping-fee').textContent = `KSh ${new Intl.NumberFormat('en-KE').format(car.shippingFee)}`;
            shippingFeeRow.style.display = ''; // Ensure visible
        } else {
            shippingFeeRow.style.display = 'none'; // Hide if no shipping fee
        }

        if (car.deliveryDays) {
            document.getElementById('car-detail-delivery-days').textContent = `${car.deliveryDays} days`;
            deliveryDaysRow.style.display = ''; // Ensure visible
        } else {
            deliveryDaysRow.style.display = 'none'; // Hide if no delivery days
        }


        // Set main image with onerror
        const mainCarImage = document.getElementById('main-car-image');
        // Use the first main image as default
        mainCarImage.src = car.images.main[0] || PLACEHOLDER_IMAGE_URL;
        mainCarImage.alt = `${car.make} ${car.model}`;
        // Add onerror handler to fallback to placeholder if image fails to load
        mainCarImage.onerror = function() {
            this.src = PLACEHOLDER_IMAGE_URL;
            this.alt = 'Image not available';
            this.style.objectFit = 'contain'; // Adjust style for placeholder
        };


        // Populate thumbnail gallery
        const thumbnailGallery = document.getElementById('thumbnail-gallery');
        const allImages = [...car.images.main, ...car.images.interior]; // Combine all images for thumbnails

        allImages.forEach((imagePath, index) => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${car.make} ${car.model} thumbnail ${index + 1}`;
            img.classList.add('thumbnail');
            // Add onerror handler for thumbnails too
            img.onerror = function() {
                this.src = PLACEHOLDER_IMAGE_URL;
                this.alt = 'Thumbnail not available';
                this.style.objectFit = 'contain';
            };

            // Set the first thumbnail as active by default
            if (index === 0) {
                img.classList.add('active-thumbnail');
            }

            img.addEventListener('click', () => {
                mainCarImage.src = img.src; // Change main image
                // Remove active class from all thumbnails and add to clicked one
                document.querySelectorAll('.thumbnail-gallery .thumbnail').forEach(t => t.classList.remove('active-thumbnail'));
                img.classList.add('active-thumbnail');
            });
            thumbnailGallery.appendChild(img);
        });

        // Populate Interior Image Gallery (if different from main thumbnails, else remove or combine)
        // For simplicity, if interior images are separate or a subset of allImages, use this:
        const interiorImageGallery = document.getElementById('interior-image-gallery');
        if (car.images.interior && car.images.interior.length > 0 && interiorImageGallery) {
             // Clear existing content if any
             interiorImageGallery.innerHTML = '';
             car.images.interior.forEach((imagePath, index) => {
                 const img = document.createElement('img');
                 img.src = imagePath;
                 img.alt = `${car.make} ${car.model} interior thumbnail ${index + 1}`;
                 img.classList.add('thumbnail'); // Use same thumbnail class for styling
                 img.onerror = function() {
                     this.src = PLACEHOLDER_IMAGE_URL;
                     this.alt = 'Interior thumbnail not available';
                     this.style.objectFit = 'contain';
                 };
                 img.addEventListener('click', () => {
                    mainCarImage.src = img.src; // Change main image
                    // Remove active class from all thumbnails and add to clicked one
                    // Consider unifying thumbnail active state logic if galleries are linked
                    document.querySelectorAll('.thumbnail-gallery .thumbnail').forEach(t => t.classList.remove('active-thumbnail'));
                    // Add active class to the clicked interior thumbnail
                    img.classList.add('active-thumbnail');
                 });
                 interiorImageGallery.appendChild(img);
             });
        } else if (interiorImageGallery) {
            // If no interior images, you might want to hide the entire section or show a message
            const interiorImagesCard = interiorImageGallery.closest('.info-card');
            if(interiorImagesCard) interiorImagesCard.style.display = 'none';
        }


        // Populate Full Description (assuming a description field exists in your data)
        const carDescriptionElement = document.getElementById('car-detail-description');
        if (car.description && carDescriptionElement) {
            carDescriptionElement.textContent = car.description;
        } else if (carDescriptionElement) {
            carDescriptionElement.textContent = "Detailed description for this vehicle is not available at the moment. Please contact us for more information.";
        }

    } else {
        // Car not found logic
        document.getElementById('car-detail-title').textContent = 'Car Not Found';
        const carDetailsContainer = document.querySelector('.car-details-container');
        if (carDetailsContainer) {
            carDetailsContainer.innerHTML = '<p>Sorry, the car you are looking for could not be found.</p><div class="back-button-container"><a href="autogiant-motors.html#full-inventory" class="btn btn-secondary">Back to Inventory</a></div>';
        }
    }
});

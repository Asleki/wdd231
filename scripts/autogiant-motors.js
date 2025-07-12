// js/autogiant-motors.js

document.addEventListener('DOMContentLoaded', () => {
    // Ensure vehicles array and PLACEHOLDER_IMAGE_URL are accessible
    if (typeof vehicles === 'undefined' || typeof PLACEHOLDER_IMAGE_URL === 'undefined') {
        console.error('Error: vehicles array or PLACEHOLDER_IMAGE_URL not found. Make sure vehicles-data.js is loaded before autogiant-motors.js.');
        return;
    }

    const vehicleGrid = document.getElementById('vehicle-grid');
    const featuredVehiclesContainer = document.getElementById('featured-vehicles-container'); // NEW: Get featured container
    const loadMoreBtn = document.getElementById('load-more-btn');
    const inventorySearchInput = document.getElementById('inventory-search-input');
    const makeFilter = document.getElementById('make-filter');
    const modelFilter = document.getElementById('model-filter');
    const priceFilter = document.getElementById('price-filter');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    // Calculator elements
    const carPriceInput = document.getElementById('car-price');
    const downPaymentInput = document.getElementById('down-payment');
    const loanTermInput = document.getElementById('loan-term');
    const interestRateInput = document.getElementById('interest-rate');
    const calculatePaymentBtn = document.getElementById('calculate-payment-btn');
    const monthlyPaymentDisplay = document.getElementById('monthly-payment-display');


    // Global variables for pagination and filtering
    const vehiclesPerPage = 9; // Number of cars to show initially and on 'Load More'
    let currentPage = 0;
    let filteredVehicles = [...vehicles]; // Start with all vehicles, will be modified by filters

    // Helper to format currency for KSh
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    // Function to handle image loading errors
    const handleImageError = (event) => {
        event.target.onerror = null; // Prevent infinite loop
        event.target.src = PLACEHOLDER_IMAGE_URL;
        console.warn(`Image failed to load: ${event.target.src}. Using placeholder.`);
    };

    // Function to create a single vehicle card HTML
    const createVehicleCard = (vehicle) => {
        const card = document.createElement('div');
        card.classList.add('vehicle-card'); // Use 'vehicle-card' for full inventory
        // For featured items, you might add 'carousel-item' class as well if needed for specific styling
        // if (isFeatured) { card.classList.add('carousel-item'); }

        // Use the first image if available, otherwise the placeholder
        const imageUrl = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : PLACEHOLDER_IMAGE_URL;

        card.innerHTML = `
            <img src="${imageUrl}" alt="${vehicle.make} ${vehicle.model} - ${vehicle.year}" loading="lazy" onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE_URL}';">
            <div class="card-details">
                <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
                <p class="vehicle-condition">${vehicle.condition}</p>
                <p class="vehicle-availability">${vehicle.availability === 'Locally Available' ? 'Locally Available' : `Imported (${vehicle.deliveryDays} Days)`}</p>
                <p class="vehicle-price">${formatPrice(vehicle.price)}</p>
                <a href="car-details.html?id=${vehicle.id}" class="btn btn-primary view-details-btn">View Details</a>
            </div>
        `;
        return card;
    };

    // Function to display vehicles in the grid
    const displayVehicles = (vehiclesToDisplay, append = true) => {
        if (!append) {
            vehicleGrid.innerHTML = ''; // Clear existing cards if not appending
            currentPage = 0; // Reset page on new filter/search
        }

        const startIndex = currentPage * vehiclesPerPage;
        const endIndex = startIndex + vehiclesPerPage;
        const vehiclesToShow = vehiclesToDisplay.slice(startIndex, endIndex);

        if (vehiclesToShow.length === 0 && !append) {
            vehicleGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 20px;">No vehicles found matching your criteria.</p>';
        } else {
             vehiclesToShow.forEach(vehicle => {
                const card = createVehicleCard(vehicle);
                vehicleGrid.appendChild(card);
            });
        }


        // Update load more button visibility
        // Only show if there are more vehicles to load after the current batch
        if (filteredVehicles.length > (currentPage + 1) * vehiclesPerPage) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    };

    // --- Display Featured Vehicles ---
    const displayFeaturedVehicles = () => {
        // Filter for "New" condition and limit to 3, or pick any 3 for demonstration
        const featured = vehicles.filter(v => v.condition === 'New' && v.inStock > 0).slice(0, 3);
        if (featured.length === 0) {
            // Fallback to any 3 vehicles if no 'New' ones are in stock
            featured.push(...vehicles.slice(0, 3 - featured.length));
        }

        featuredVehiclesContainer.innerHTML = ''; // Clear existing
        if (featured.length === 0) {
            featuredVehiclesContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 20px;">No featured vehicles available.</p>';
        } else {
            featured.forEach(vehicle => {
                const card = document.createElement('div');
                card.classList.add('carousel-item'); // Use carousel-item class for styling
                const imageUrl = vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : PLACEHOLDER_IMAGE_URL;

                card.innerHTML = `
                    <img src="${imageUrl}" alt="${vehicle.make} ${vehicle.model}" loading="lazy" onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE_URL}';">
                    <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
                    <p>${formatPrice(vehicle.price)}</p>
                    <a href="car-details.html?id=${vehicle.id}" class="btn btn-secondary">View Details</a>
                `;
                featuredVehiclesContainer.appendChild(card);
            });
        }
    };


    // --- Load More Functionality ---
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        displayVehicles(filteredVehicles, true); // Append more vehicles
    });

    // --- Search & Filter Functionality ---

    // Populate Make filter dynamically
    const populateMakeFilter = () => {
        const makes = [...new Set(vehicles.map(v => v.make))].sort();
        makeFilter.innerHTML = '<option value="">All Makes</option>'; // Keep default
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeFilter.appendChild(option);
        });
    };

    // Populate Model filter dynamically based on selected make
    const populateModelFilter = (selectedMake = '') => {
        modelFilter.innerHTML = '<option value="">All Models</option>'; // Keep default
        let models = [];
        if (selectedMake) {
            models = [...new Set(vehicles.filter(v => v.make === selectedMake).map(v => v.model))].sort();
        } else {
            // If no make selected, show all unique models from all vehicles
            models = [...new Set(vehicles.map(v => v.model))].sort();
        }

        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelFilter.appendChild(option);
        });
    };

    makeFilter.addEventListener('change', () => {
        populateModelFilter(makeFilter.value);
    });

    const applyFilters = () => {
        const searchTerm = inventorySearchInput.value.toLowerCase().trim();
        const selectedMake = makeFilter.value;
        const selectedModel = modelFilter.value;
        const selectedPriceRange = priceFilter.value;

        filteredVehicles = vehicles.filter(vehicle => {
            const matchesSearch = !searchTerm ||
                                  vehicle.make.toLowerCase().includes(searchTerm) ||
                                  vehicle.model.toLowerCase().includes(searchTerm) ||
                                  String(vehicle.year).includes(searchTerm) ||
                                  (vehicle.bodyType && vehicle.bodyType.toLowerCase().includes(searchTerm)); // Include body type in search

            const matchesMake = !selectedMake || vehicle.make === selectedMake;
            const matchesModel = !selectedModel || vehicle.model === selectedModel;

            let matchesPrice = true;
            if (selectedPriceRange) {
                const [minStr, maxStr] = selectedPriceRange.split('-');
                const minPrice = parseInt(minStr);
                const maxPrice = maxStr === 'above' ? Infinity : parseInt(maxStr);

                if (vehicle.price < minPrice || vehicle.price > maxPrice) {
                    matchesPrice = false;
                }
            }

            return matchesSearch && matchesMake && matchesModel && matchesPrice;
        });

        displayVehicles(filteredVehicles, false); // Re-render from scratch
    };

    applyFiltersBtn.addEventListener('click', applyFilters);
    clearFiltersBtn.addEventListener('click', () => {
        inventorySearchInput.value = '';
        makeFilter.value = '';
        modelFilter.value = ''; // This will also reset by populateModelFilter
        priceFilter.value = '';
        populateModelFilter(); // Reset model filter to show all models
        filteredVehicles = [...vehicles]; // Reset to all vehicles
        displayVehicles(filteredVehicles, false); // Re-render all
    });
    // Apply filters on input/select change for live updates
    inventorySearchInput.addEventListener('input', applyFilters);
    makeFilter.addEventListener('change', applyFilters);
    modelFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);


    // --- Loan Calculator Functionality ---
    const calculateLoan = () => {
        const principal = parseFloat(carPriceInput.value) - parseFloat(downPaymentInput.value);
        const annualInterestRate = parseFloat(interestRateInput.value) / 100;
        const loanTermMonths = parseInt(loanTermInput.value);

        // Basic validation
        if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(loanTermMonths) || principal < 0 || loanTermMonths <= 0) {
            monthlyPaymentDisplay.textContent = 'Invalid input';
            return;
        }

        // Handle zero interest rate
        const monthlyInterestRate = annualInterestRate / 12;

        let monthlyPayment;
        if (monthlyInterestRate === 0) {
            monthlyPayment = principal / loanTermMonths;
        } else {
            // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
            // M = monthly payment
            // P = principal loan amount
            // i = monthly interest rate
            // n = loan term in months
            monthlyPayment = principal * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), loanTermMonths)) / (Math.pow((1 + monthlyInterestRate), loanTermMonths) - 1);
        }

        // Check for edge cases like infinite or NaN results
        if (!isFinite(monthlyPayment) || isNaN(monthlyPayment)) {
            monthlyPaymentDisplay.textContent = 'Calculation Error';
        } else {
            monthlyPaymentDisplay.textContent = formatPrice(monthlyPayment);
        }
    };

    // Attach event listeners to all calculator inputs and button
    carPriceInput.addEventListener('input', calculateLoan);
    downPaymentInput.addEventListener('input', calculateLoan);
    loanTermInput.addEventListener('input', calculateLoan);
    interestRateInput.addEventListener('input', calculateLoan);
    calculatePaymentBtn.addEventListener('click', calculateLoan); // Also trigger on button click

    // --- Initial Load ---
    populateMakeFilter();
    populateModelFilter(); // Initialize model filter with all models
    displayVehicles(vehicles, false); // Display initial batch of all vehicles
    displayFeaturedVehicles(); // Display initial featured vehicles
    calculateLoan(); // Perform initial calculation for the loan calculator
});

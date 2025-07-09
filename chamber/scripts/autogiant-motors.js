// Ensure vehicles and PLACEHOLDER_IMAGE_URL are accessible globally or passed in
// Assuming vehicles-data.js loads before this script.

document.addEventListener('DOMContentLoaded', () => {
    const featuredVehiclesContainer = document.getElementById('featured-vehicles-container');
    const vehicleGrid = document.getElementById('vehicle-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const inventorySearchInput = document.getElementById('inventory-search-input');
    const makeFilter = document.getElementById('make-filter');
    const modelFilter = document.getElementById('model-filter');
    const priceFilter = document.getElementById('price-filter');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    const vehiclesPerPage = 6;
    let currentDisplayedVehicles = 0;
    let filteredVehicles = vehicles; // Start with all vehicles

    // Function to format price as KSh with commas
    const formatPrice = (price) => {
        return `KSh ${new Intl.NumberFormat('en-KE').format(price)}`;
    };

    // Function to create a single vehicle card
    const createVehicleCard = (vehicle) => {
        const card = document.createElement('div');
        card.classList.add('vehicle-card');
        card.setAttribute('data-id', vehicle.id);

        const imageUrl = vehicle.images.main[0]; // Get the primary image path from data
        const placeholderPath = PLACEHOLDER_IMAGE_URL; // Path to your placeholder image

        card.innerHTML = `
            <div class="vehicle-image-container">
                <img src="${imageUrl}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image"
                     onerror="this.onerror=null; this.src='${placeholderPath}'; this.style.objectFit='contain';">
            </div>
            <div class="vehicle-info">
                <h3>${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
                <p class="price">${formatPrice(vehicle.price)}</p>
                <div class="specs">
                    <span><i class="fas fa-tachometer-alt"></i> ${new Intl.NumberFormat('en-KE').format(vehicle.mileage)} KM</span>
                    <span><i class="fas fa-cogs"></i> ${vehicle.transmission}</span>
                    <span><i class="fas fa-gas-pump"></i> ${vehicle.fuelType}</span>
                </div>
                <div class="features">
                    ${vehicle.features.slice(0, 2).map(feature => `<span>${feature}</span>`).join('')}
                    ${vehicle.features.length > 2 ? `<span>+${vehicle.features.length - 2} more</span>` : ''}
                </div>
                <button class="btn btn-primary view-details-btn">View Details</button>
            </div>
        `;

        // Add event listener for "View Details" button
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', () => {
            window.location.href = `car-details.html?id=${vehicle.id}`;
        });

        return card;
    };

    // Function to render vehicles into a container
    const renderVehicles = (container, vehiclesToRender, clearExisting = false) => {
        if (clearExisting) {
            container.innerHTML = '';
        }
        vehiclesToRender.forEach(vehicle => {
            container.appendChild(createVehicleCard(vehicle));
        });
    };

    // Populate Featured Vehicles (first 3 vehicles)
    if (featuredVehiclesContainer) {
        renderVehicles(featuredVehiclesContainer, vehicles.slice(0, 3));
    }

    // Function to populate inventory based on current filters and loaded count
    const populateInventory = (initialLoad = false) => {
        if (initialLoad) {
            currentDisplayedVehicles = 0; // Reset count for initial or filter-based load
            vehicleGrid.innerHTML = ''; // Clear grid for new load
        }

        const vehiclesToLoad = filteredVehicles.slice(currentDisplayedVehicles, currentDisplayedVehicles + vehiclesPerPage);
        renderVehicles(vehicleGrid, vehiclesToLoad, false); // Append, don't clear

        currentDisplayedVehicles += vehiclesToLoad.length;

        // Hide load more button if all filtered vehicles are displayed
        if (loadMoreBtn) {
            if (currentDisplayedVehicles >= filteredVehicles.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    };

    // Populate filter dropdowns
    const populateFilters = () => {
        const makes = new Set();
        const models = new Set();

        vehicles.forEach(vehicle => {
            makes.add(vehicle.make);
            models.add(vehicle.model); // For overall model list
        });

        // Populate Make filter
        makeFilter.innerHTML = '<option value="">All Makes</option>';
        Array.from(makes).sort().forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeFilter.appendChild(option);
        });

        // Initial Model filter population (all models)
        modelFilter.innerHTML = '<option value="">All Models</option>';
        Array.from(models).sort().forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelFilter.appendChild(option);
        });

        // Event listener for Make filter to update Model filter
        makeFilter.addEventListener('change', () => {
            const selectedMake = makeFilter.value;
            modelFilter.innerHTML = '<option value="">All Models</option>'; // Reset models

            if (selectedMake) {
                const modelsForSelectedMake = new Set();
                vehicles.filter(v => v.make === selectedMake).forEach(v => {
                    modelsForSelectedMake.add(v.model);
                });
                Array.from(modelsForSelectedMake).sort().forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.textContent = model;
                    modelFilter.appendChild(option);
                });
            } else {
                // If "All Makes" is selected, repopulate with all models
                Array.from(models).sort().forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.textContent = model;
                    modelFilter.appendChild(option);
                });
            }
        });
    };

    // Apply Filters function
    const applyFilters = () => {
        const searchTerm = inventorySearchInput.value.toLowerCase();
        const selectedMake = makeFilter.value;
        const selectedModel = modelFilter.value;
        const selectedPriceRange = priceFilter.value;

        filteredVehicles = vehicles.filter(vehicle => {
            const matchesSearch = searchTerm === '' ||
                                  vehicle.make.toLowerCase().includes(searchTerm) ||
                                  vehicle.model.toLowerCase().includes(searchTerm) ||
                                  vehicle.description.toLowerCase().includes(searchTerm);

            const matchesMake = selectedMake === '' || vehicle.make === selectedMake;
            const matchesModel = selectedModel === '' || vehicle.model === selectedModel;

            let matchesPrice = true;
            if (selectedPriceRange !== '') {
                const [minStr, maxStr] = selectedPriceRange.split('-');
                const minPrice = parseInt(minStr);
                const maxPrice = maxStr === 'above' ? Infinity : parseInt(maxStr);

                matchesPrice = vehicle.price >= minPrice && vehicle.price <= maxPrice;
            }

            return matchesSearch && matchesMake && matchesModel && matchesPrice;
        });

        // Re-populate inventory with filtered results from the start
        populateInventory(true);
    };

    // Event Listeners for controls
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', populateInventory);
    }
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            inventorySearchInput.value = '';
            makeFilter.value = '';
            modelFilter.value = ''; // This will reset models through makeFilter change listener
            priceFilter.value = '';
            // Manually trigger change to update model filter if make was previously selected
            const event = new Event('change');
            makeFilter.dispatchEvent(event);
            applyFilters(); // Re-apply filters to show all
        });
    }

    // Initialize
    populateFilters();
    populateInventory(true); // Initial load of all inventory
});

// Finance Calculator (from your previous request)
document.addEventListener('DOMContentLoaded', () => {
    const carPriceInput = document.getElementById('car-price');
    const downPaymentInput = document.getElementById('down-payment');
    const loanTermInput = document.getElementById('loan-term');
    const interestRateInput = document.getElementById('interest-rate');
    const calculatePaymentBtn = document.getElementById('calculate-payment-btn');
    const monthlyPaymentDisplay = document.getElementById('monthly-payment-display');

    if (calculatePaymentBtn) {
        calculatePaymentBtn.addEventListener('click', () => {
            const carPrice = parseFloat(carPriceInput.value);
            const downPayment = parseFloat(downPaymentInput.value);
            const loanTermMonths = parseInt(loanTermInput.value);
            const annualInterestRate = parseFloat(interestRateInput.value);

            if (isNaN(carPrice) || isNaN(downPayment) || isNaN(loanTermMonths) || isNaN(annualInterestRate) ||
                carPrice <= 0 || loanTermMonths <= 0 || annualInterestRate < 0 || downPayment < 0) {
                monthlyPaymentDisplay.textContent = 'Please enter valid numbers.';
                return;
            }

            if (downPayment >= carPrice) {
                monthlyPaymentDisplay.textContent = 'Down payment cannot be greater than or equal to car price.';
                return;
            }

            const principal = carPrice - downPayment;
            const monthlyInterestRate = (annualInterestRate / 100) / 12;

            let monthlyPayment;
            if (monthlyInterestRate === 0) {
                monthlyPayment = principal / loanTermMonths;
            } else {
                monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
            }

            monthlyPaymentDisplay.textContent = formatPrice(monthlyPayment);
        });
    }
});

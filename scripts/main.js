// scripts/main.js

// --- Global Constants & Configurations ---
const API_KEY = 'c8d5db76fb55df0628b2ea568d5d200b'; // OpenWeatherMap API key for weather data
const WEATHER_CITY = 'Nairobi'; // City for weather forecasts
const WEATHER_UNIT = 'metric'; // Unit for weather temperature ('metric' for Celsius, 'imperial' for Fahrenheit)
const MEMBERS_TO_SHOW_ON_HOMEPAGE = 4; // Defines the number of member spotlights displayed on the homepage
const SEARCH_HISTORY_KEY = 'laFamiliaSearchHistory'; // Key for storing search history in local storage
const MEMBERS_PER_PAGE_DIRECTORY = 12; // Number of members to display per load on the directory page

// Global variables for managing member data and display state
let allMembersData = []; // Stores all fetched member data (from members.json)
let currentFilteredMembers = []; // Stores members after applying filters and sorting
let displayedMembersCount = 0; // Tracks the number of members currently displayed on the directory page
let currentView = 'grid'; // Default view mode for the directory ('grid' or 'list')

// Global variables for Events data
let allEventsData = []; // Stores all fetched event data (from events.json)
let selectedEvent = null; // Stores the currently selected event for registration

// Global variables for Clubs data
let allClubsData = []; // Stores all fetched club data (from clubs.json)

// Global variables for Board & Executive Team data
let allBoardMembersData = { boardMembers: [], executiveTeam: [] }; // Stores all fetched board data (from board.json)

// Global variables for Dictionary/Quotes Carousel
// These are assumed to be loaded globally from dictquotes.js
// const businessDictionary = []; // Placeholder - actual data comes from dictquotes.js
// const businessQuotes = [];     // Placeholder - actual data comes from dictquotes.js
let currentDictQuoteIndex = 0;
let currentDictQuoteType = ''; // 'dictionary' or 'quote'


// --- Utility Function: Image Fallback/Placeholder ---
/**
 * Sets up error handling for image elements to display a placeholder if the original image fails to load.
 * @param {HTMLImageElement} imgElement - The image element to apply fallback logic to.
 */
function setupImageFallback(imgElement) {
    const placeholderImagePath = 'images/placeholder.png'; // Path to the default placeholder image

    // Checks if the image source is empty or if the image has failed to load initially
    if (!imgElement.src || (imgElement.complete && imgElement.naturalWidth === 0)) {
        imgElement.src = placeholderImagePath; // Sets the placeholder image
        imgElement.classList.add('image-error-fallback'); // Adds a class for styling fallback images
    }

    /**
     * Event handler for image loading errors.
     * Prevents infinite loops if the placeholder itself fails.
     */
    imgElement.onerror = function() {
        // If the current source is already the placeholder, prevent further error handling to avoid loops
        if (this.src === placeholderImagePath) {
            this.onerror = null; // Disables the onerror handler
            console.warn(`Placeholder image failed to load: ${this.src}`);
            return;
        }
        this.src = placeholderImagePath; // Sets the placeholder image on error
        this.classList.add('image-error-fallback'); // Adds a class for styling
        console.warn(`Image failed to load: ${this.alt || this.src}, replaced with placeholder.`);
    };

    /**
     * Event handler for successful image loading.
     * Removes the fallback class if the image loads successfully.
     */
    imgElement.onload = function() {
        this.classList.remove('image-error-fallback');
    };
}

// --- Custom Alert Message Box (Replaces alert()) ---
/**
 * Displays a custom, non-blocking alert message on the page.
 * @param {string} message - The message to display.
 */
function showCustomAlert(message) {
    const customAlertBox = document.getElementById('custom-alert-message-box');
    const customAlertText = document.getElementById('custom-alert-text');
    const customAlertCloseBtn = customAlertBox ? customAlertBox.querySelector('.custom-alert-close') : null;

    if (customAlertBox && customAlertText && customAlertCloseBtn) {
        customAlertText.textContent = message;
        customAlertBox.style.display = 'block'; // Show the alert box

        // Optional: Scroll to the alert box if it's off-screen
        customAlertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

        customAlertCloseBtn.onclick = () => {
            customAlertBox.style.display = 'none'; // Hide on click
        };

        // Hide if clicked outside (if alert is fixed position)
        window.addEventListener('click', function handler(event) {
            if (event.target === customAlertBox) {
                customAlertBox.style.display = 'none';
                window.removeEventListener('click', handler); // Remove listener after use
            }
        });
    } else {
        console.error("Custom alert elements not found. Falling back to console log:", message);
        // Fallback to console if custom alert elements are missing
        console.log("ALERT:", message);
    }
}


// --- Weather Function ---
/**
 * Fetches weather data from the OpenWeatherMap API for the configured city.
 * Displays an error message if fetching fails.
 */
async function fetchWeather() {
    const weatherDisplay = document.getElementById('weather-display');
    if (!weatherDisplay) return; // Exits if the weather display element is not found on the page

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CITY}&units=${WEATHER_UNIT}&appid=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data); // Calls function to display the fetched weather data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDisplay.innerHTML = `<p>Failed to load weather data. Please try again later. (${error.message})</p>`;
    }
}

/**
 * Displays the current weather and a 5-day forecast.
 * @param {object} data - The weather data object from the OpenWeatherMap API.
 */
function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    if (!weatherDisplay) return;

    weatherDisplay.innerHTML = ''; // Clears any existing weather content

    // Extracts and displays current weather information
    const currentCity = data.city.name;
    const currentTemp = data.list[0].main.temp.toFixed(0);
    const currentWeatherDescription = data.list[0].weather[0].description;
    const currentWeatherIconCode = data.list[0].weather[0].icon;
    const currentWeatherIconUrl = `http://openweathermap.org/img/wn/${currentWeatherIconCode}@2x.png`;

    const currentWeatherHtml = `
        <div class="current-weather">
            <h4>${currentCity}</h4>
            <div class="current-weather-details">
                <img src="${currentWeatherIconUrl}" alt="${currentWeatherDescription}" title="${currentWeatherDescription}">
                <p class="temp">${currentTemp}°${WEATHER_UNIT === 'metric' ? 'C' : 'F'}</p>
            </div>
            <p class="description" style="text-transform: capitalize;">${currentWeatherDescription}</p>
        </div>
    `;
    weatherDisplay.innerHTML = currentWeatherHtml;

    // Sets up container for the 5-day forecast
    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecast-container');

    const dailyForecasts = {}; // Object to store one weather entry per distinct day
    const today = new Date().toDateString(); // Gets today's date string for comparison

    // Iterates through the forecast list to select one entry per day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayString = date.toDateString();
        const hour = date.getHours();

        // Skips today's forecast if it's already past midday, focusing on future days
        if (dayString === today && hour < 12) {
             if (!dailyForecasts[day]) {
                 dailyForecasts[day] = item;
             }
             return;
        }

        // Adds distinct days to the forecast, limiting to 5 days
        if (Object.keys(dailyForecasts).length < 5) {
            // Prioritizes midday entries for a more representative daily forecast
            if (!dailyForecasts[day] || (hour >= 12 && hour < 18)) {
                dailyForecasts[day] = item;
            }
        }
    });

    // Creates and appends forecast cards for each selected day
    for (const day in dailyForecasts) {
        const item = dailyForecasts[day];
        const temp = item.main.temp.toFixed(0);
        const description = item.weather[0].description;
        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p class="forecast-day">${day}</p>
            <img src="${iconUrl}" alt="${description}" title="${description}">
            <p class="forecast-temp">${temp}°${WEATHER_UNIT === 'metric' ? 'C' : 'F'}</p>
            <p class="forecast-desc" style="text-transform: capitalize;">${description}</p>
        `;
        forecastContainer.appendChild(forecastCard);
    }

    weatherDisplay.appendChild(forecastContainer); // Appends the forecast section below current weather
}


// --- Functions for Homepage Member Spotlights ---
/**
 * Dynamically loads and displays 2-3 random Gold or Silver members as spotlights on the homepage.
 * This replaces the previous static parsing and limiting.
 */
function loadHomepageSpotlights() {
    const spotlightCarousel = document.querySelector('.member-spotlights .spotlight-carousel');
    if (!spotlightCarousel || allMembersData.length === 0) {
        if (spotlightCarousel) {
            spotlightCarousel.innerHTML = '<p>No member spotlights available at this time.</p>';
        }
        return;
    }

    // Filter for Gold (level 3) and Silver (level 2) members
    const eligibleMembers = allMembersData.filter(member =>
        member.membershipLevel === 2 || member.membershipLevel === 3
    );

    if (eligibleMembers.length === 0) {
        spotlightCarousel.innerHTML = '<p>No Gold or Silver members available for spotlight.</p>';
        return;
    }

    // Randomly select 2 or 3 members
    const numSpotlights = Math.floor(Math.random() * 2) + 2; // Randomly 2 or 3
    const selectedSpotlights = [];
    const tempEligibleMembers = [...eligibleMembers]; // Create a mutable copy

    for (let i = 0; i < numSpotlights && tempEligibleMembers.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * tempEligibleMembers.length);
        selectedSpotlights.push(tempEligibleMembers[randomIndex]);
        tempEligibleMembers.splice(randomIndex, 1); // Remove selected member to avoid duplicates
    }

    spotlightCarousel.innerHTML = ''; // Clear existing content

    // Render selected spotlights
    selectedSpotlights.forEach(member => {
        const spotlightCard = document.createElement('article');
        spotlightCard.classList.add('spotlight-card');
        spotlightCard.innerHTML = `
            <img src="${member.imgSrc}" alt="${member.imgAlt || member.name} Logo">
            <h4><a href="${member.link || '#'}" class="spotlight-name-link">${member.name}</a></h4>
            <p>${member.description}</p>
            <p><strong>Membership:</strong> ${getMembershipLevelName(member.membershipLevel)}</p>
            <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
            <p><strong>Address:</strong> ${member.address || 'N/A'}</p>
            <a href="http://${member.website}" target="_blank" class="cta-button secondary-cta">Visit Website</a>
        `;
        const imgElement = spotlightCard.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
        spotlightCarousel.appendChild(spotlightCard);
    });
}


// --- Directory Page Specific Functions ---
// DOM elements for the directory page
const membersGrid = document.getElementById('members-display'); // Corrected ID to match HTML
const memberCountSpan = document.getElementById('member-count'); // Span to display current member count
const loadMoreBtn = document.getElementById('load-more-members'); // Button to load more members

// Filter and sort input elements
const directorySiteSearch = document.getElementById('directory-site-search');
const directoryFilterCategory = document.getElementById('directory-filter-category');
const directoryFilterLocation = document.getElementById('directory-filter-location');
const directoryFilterSize = document.getElementById('directory-filter-size');
const directorySortBy = document.getElementById('directory-sort-by');
const directoryResetFiltersBtn = document.getElementById('directory-reset-filters');
const directorySearchSubmitBtn = document.getElementById('directory-search-submit');

// Modal elements for displaying member details
const memberDetailModal = document.getElementById('member-detail-modal');
const memberDetailBody = document.getElementById('member-detail-body');
const closeModalBtn = memberDetailModal ? memberDetailModal.querySelector('.close-button') : null;

// Elements for view toggle (grid/list)
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');


/**
 * Helper function to return a human-readable name for membership levels.
 * @param {number} level - The numeric membership level (e.g., 1, 2, 3).
 * @returns {string} The corresponding membership level name.
 */
function getMembershipLevelName(level) {
    switch (level) {
        case 1: return 'Bronze Member';
        case 2: return 'Silver Member';
        case 3: return 'Gold Member';
        default: return 'Associate Member'; // Default name for undefined levels
    }
}

/**
 * Asynchronously fetches member data from 'data/members.json'.
 * Populates `allMembersData`. Does NOT trigger rendering directly.
 */
async function fetchMembers() {
    try {
        // Only fetch if data hasn't been loaded yet
        if (allMembersData.length === 0) {
            const response = await fetch('data/members.json'); // Path to the JSON data file
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            allMembersData = data; // Assign fetched data to allMembersData
            console.log("Members data fetched successfully:", allMembersData);
        }
    } catch (error) {
        console.error('Error fetching members data:', error);
        // On pages where members-display exists, an error message can be shown there.
        // On other pages (like events.html), this error might only be visible in console.
        const membersDisplay = document.getElementById('members-display');
        if (membersDisplay) {
            membersDisplay.innerHTML = '<p>Error loading member directory. Please ensure "data/members.json" exists and is correctly formatted. Check console for details.</p>';
        }
    }
}


/**
 * Renders a batch of members to the directory grid or list based on `currentView`.
 * Handles pagination by rendering members from `displayedMembersCount` up to `MEMBERS_PER_PAGE_DIRECTORY`.
 * @param {Array<object>} membersToRender - An array of member objects to be rendered.
 */
function renderMembers(membersToRender) {
    const membersDisplay = document.getElementById('members-display');
    if (!membersDisplay) {
        console.error("Error: #members-display element not found. Cannot render members.");
        return; // Exit if the display element is missing
    }

    // Clear existing content if this is a fresh render (e.g., after filter/sort or view change)
    if (displayedMembersCount === 0) {
        membersDisplay.innerHTML = '';
    }

    // Apply the correct view class (grid or list)
    membersDisplay.className = ''; // Clear previous classes
    membersDisplay.classList.add(currentView + '-view'); // Add current view class

    const startIndex = displayedMembersCount;
    const endIndex = Math.min(membersToRender.length, startIndex + MEMBERS_PER_PAGE_DIRECTORY);

    // Loops through the specified range of members and creates their HTML elements
    for (let i = startIndex; i < endIndex; i++) {
        const member = membersToRender[i];
        const memberElement = document.createElement('div');
        // Assigns appropriate class based on current view mode
        memberElement.classList.add(currentView === 'grid' ? 'member-card' : 'member-item');
        memberElement.dataset.memberId = member.id; // Stores member ID for later lookup (e.g., modal)

        // Constructs the HTML for each member element, including new data fields
        // The member's name is now a link to their individual page
        let memberHtml = `
            <img src="${member.imgSrc}" alt="${member.imgAlt}">
            <div class="details">
                <h3><a href="${member.link || '#'}" class="member-name-link">${member.name}</a></h3>
                <p><strong>Category:</strong> ${member.category.charAt(0).toUpperCase() + member.category.slice(1)}</p>
                <p><strong>Location:</strong> ${member.location.charAt(0).toUpperCase() + member.location.slice(1)}</p>
                <p><strong>Address:</strong> ${member.address || 'N/A'}</p>
                <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
                <p><strong>Membership:</strong> ${getMembershipLevelName(member.membershipLevel)}</p>
                <p>${member.description}</p>
            </div>
            <button class="view-details-btn" data-member-id="${member.id}">View More Details</button>
        `;

        memberElement.innerHTML = memberHtml;

        // Applies image fallback logic to the member's image
        const imgElement = memberElement.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }

        // Adds event listener to the "View More Details" button to open the modal
        const viewDetailsBtn = memberElement.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents click event from bubbling up to parent elements
                showMemberDetails(member.id); // Opens the modal with specific member details
            });
        }

        membersDisplay.appendChild(memberElement); // Appends the created member element to the display container
    }

    displayedMembersCount = endIndex; // Updates the count of currently displayed members
    updateMemberCount(membersToRender.length); // Updates the displayed member count text

    // Controls the visibility of the "Load More" button
    if (loadMoreBtn) {
        if (displayedMembersCount >= membersToRender.length) {
            loadMoreBtn.style.display = 'none'; // Hides button if all members are displayed
        } else {
            loadMoreBtn.style.display = 'block'; // Shows button if more members are available
        }
    }
}

/**
 * Updates the text indicating how many members are currently displayed out of the total filtered members.
 * Also updates counts in the insights panel (total members, unique industries).
 * @param {number} totalFiltered - The total number of members after applying filters.
 */
function updateMemberCount(totalFiltered) {
    if (memberCountSpan) {
        memberCountSpan.textContent = `(Showing ${displayedMembersCount} of ${totalFiltered} Members)`;
    }

    // Updates the total members count in the insights panel
    const totalMembersCountSpan = document.getElementById('total-members-count');
    if (totalMembersCountSpan) {
        totalMembersCountSpan.textContent = allMembersData.length; // Displays count of all unique members
    }

    // Updates the unique industries count in the insights panel
    const uniqueIndustriesCountSpan = document.getElementById('unique-industries-count');
    if (uniqueIndustriesCountSpan) {
        const uniqueCategories = new Set(allMembersData.map(m => m.category)); // Gets unique categories
        uniqueIndustriesCountSpan.textContent = uniqueCategories.size; // Displays the count of unique categories
    }
}

/**
 * Filters and sorts the `allMembersData` based on user selections (search term, category, location, size, sort order).
 * Updates `currentFilteredMembers` and triggers a re-render of the directory.
 */
function filterAndSortMembers() {
    let filteredMembers = [...allMembersData]; // Starts with a fresh copy of all members for filtering

    // Retrieves current filter and sort values from DOM elements
    const searchTerm = directorySiteSearch ? directorySiteSearch.value.toLowerCase() : '';
    const categoryFilter = directoryFilterCategory ? directoryFilterCategory.value : '';
    const locationFilter = directoryFilterLocation ? directoryFilterLocation.value : '';
    const sizeFilter = directoryFilterSize ? directoryFilterSize.value : '';
    const sortBy = directorySortBy ? directorySortBy.value : 'popularity-desc';

    // Applies search term filter
    if (searchTerm) {
        filteredMembers = filteredMembers.filter(member =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.description.toLowerCase().includes(searchTerm) ||
            (member.fullDescription && member.fullDescription.toLowerCase().includes(searchTerm)) ||
            (member.category && member.category.toLowerCase().includes(searchTerm)) ||
            (member.address && member.address.toLowerCase().includes(searchTerm)) || // Allows searching by address
            (member.phone && member.phone.includes(searchTerm)) // Allows searching by phone number
        );
    }

    // Applies category filter
    if (categoryFilter) {
        filteredMembers = filteredMembers.filter(member => member.category === categoryFilter);
    }
    // Applies location filter
    if (locationFilter) {
        filteredMembers = filteredMembers.filter(member => member.location === locationFilter);
    }
    // Applies size filter
    if (sizeFilter) {
        filteredMembers = filteredMembers.filter(member => member.size === sizeFilter);
    }

    // Applies sorting based on selected option
    filteredMembers.sort((a, b) => {
        if (sortBy === 'alphabetical-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'alphabetical-desc') {
            return b.name.localeCompare(a.name);
        } else if (sortBy === 'newest') {
            // Sorts by founding year in descending order (newer first)
            return (b.foundingYear || 0) - (a.foundingYear || 0);
        } else if (sortBy === 'popularity-asc') {
            // Sorts by popularity (low to high) using a map for numerical comparison
            const popularityMap = { 'low': 1, 'medium': 2, 'high': 3 };
            return popularityMap[a.popularity] - popularityMap[b.popularity];
        } else if (sortBy === 'popularity-desc') {
            // Sorts by popularity (high to low)
            const popularityMap = { 'low': 1, 'medium': 2, 'high': 3 };
            return popularityMap[b.popularity] - popularityMap[a.popularity];
        } else if (sortBy === 'membership-asc') {
            // Sorts by membership level in ascending order
            return (a.membershipLevel || 0) - (b.membershipLevel || 0);
        } else if (sortBy === 'membership-desc') {
            // Sorts by membership level in descending order
            return (b.membershipLevel || 0) - (a.membershipLevel || 0);
        }
        return 0; // No change in order if sort option is not matched
    });

    // Clears the current display, resets the displayed count, and renders the first batch of filtered members
    if (membersGrid) membersGrid.innerHTML = '';
    displayedMembersCount = 0;
    renderMembers(filteredMembers);
}

/**
 * Displays detailed information about a specific member in a modal window.
 * This version is simplified to only show core contact and descriptive information,
 * as team, awards, and reviews are handled on dedicated member pages.
 * @param {string} memberId - The unique ID of the member to display.
 */
function showMemberDetails(memberId) {
    const member = allMembersData.find(m => m.id === memberId); // Finds the member object by ID
    if (member && memberDetailModal && memberDetailBody) {

        // Populates the modal body with member details (simplified content)
        memberDetailBody.innerHTML = `
            ${member.imgSrc ? `<img src="${member.imgSrc}" alt="${member.imgAlt || member.name} Logo" class="modal-logo">` : ''}
            <h3>${member.name}</h3>
            <p><strong>Category:</strong> ${member.category.charAt(0).toUpperCase() + member.category.slice(1)}</p>
            <p><strong>Location:</strong> ${member.location.charAt(0).toUpperCase() + member.location.slice(1)}</p>
            <p><strong>Address:</strong> ${member.address || 'N/A'}</p>
            <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
            <p><strong>Website:</strong> <a href="http://${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevelName(member.membershipLevel)}</p>
            <p><strong>Founded:</strong> ${member.foundingYear || 'N/A'}</p>
            <p class="full-description">${member.fullDescription || member.description}</p>
            ${member.website ? `<a href="http://${member.website}" target="_blank" class="btn view-details-btn" style="margin-top: 1rem;">Visit Website</a>` : ''}
        `;
        // Applies image fallback to the modal's logo
        const imgElement = memberDetailBody.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
        memberDetailModal.style.display = 'flex'; // Displays the modal
    }
}

/**
 * Sets up event listeners for all directory page filters, search inputs, and buttons.
 * This includes listeners for category, location, size, sort, reset, load more, and modal close.
 */
function setupDirectoryListeners() {
    // Event listeners for directory search and filter inputs
    if (directorySiteSearch) {
        directorySiteSearch.addEventListener('input', filterAndSortMembers);
        directorySearchSubmitBtn.addEventListener('click', filterAndSortMembers);
    }
    if (directoryFilterCategory) {
        directoryFilterCategory.addEventListener('change', filterAndSortMembers);
    }
    if (directoryFilterLocation) {
        directoryFilterLocation.addEventListener('change', filterAndSortMembers);
    }
    if (directoryFilterSize) {
        directoryFilterSize.addEventListener('change', filterAndSortMembers);
    }
    if (directorySortBy) {
        directorySortBy.addEventListener('change', filterAndSortMembers);
    }
    if (directoryResetFiltersBtn) {
        directoryResetFiltersBtn.addEventListener('click', () => {
            // Resets all filter and search input values to their defaults
            if (directorySiteSearch) directorySiteSearch.value = '';
            if (directoryFilterCategory) directoryFilterCategory.value = '';
            if (directoryFilterLocation) directoryFilterLocation.value = '';
            if (directoryFilterSize) directoryFilterSize.value = '';
            if (directorySortBy) directorySortBy.value = 'popularity-desc'; // Sets default sort order
            filterAndSortMembers(); // Re-applies filters and re-renders
        });
    }
    if (loadMoreBtn) {
        // Event listener for the "Load More" button to render additional members
        loadMoreBtn.addEventListener('click', () => renderMembers(currentFilteredMembers));
    }
    if (closeModalBtn) {
        // Event listener for the modal close button
        closeModalBtn.addEventListener('click', () => {
            if (memberDetailModal) memberDetailModal.style.display = 'none'; // Hides the modal
        });
    }
    if (memberDetailModal) {
        // Event listener to close the modal when clicking outside of its content
        window.addEventListener('click', (event) => {
            if (event.target === memberDetailModal) {
                memberDetailModal.style.display = 'none'; // Hides the modal
            }
        });
    }

    // Event listeners for grid/list view toggles
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => {
            currentView = 'grid'; // Sets view to grid
            displayedMembersCount = 0; // Resets count to force a full re-render
            filterAndSortMembers(); // Re-renders members in grid view
        });
    }
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => {
            currentView = 'list'; // Sets view to list
            displayedMembersCount = 0; // Resets count to force a full re-render
            filterAndSortMembers(); // Re-renders members in list view
        });
    }
}

// --- Homepage Specific Functions ---

// DOM elements for dictionary/quotes carousel
const dictQuoteHeading = document.getElementById('dictionary-quote-heading');
const dictionaryDisplay = document.getElementById('dictionary-display');
const prevDictItemBtn = document.getElementById('prev-dict-item');
const nextDictItemBtn = document.getElementById('next-dict-item');

/**
 * Renders the current dictionary term or business quote.
 * Assumes businessDictionary and businessQuotes are globally available from dictquotes.js.
 */
function renderDictQuote() {
    if (!dictQuoteHeading || !dictionaryDisplay) {
        console.warn("Dictionary/Quotes carousel elements not found. Cannot render.");
        return;
    }

    dictionaryDisplay.innerHTML = ''; // Clear previous content

    const today = new Date();
    const day = today.getDate();

    let currentDictQuoteData = []; // To hold either dictionary or quotes

    // Determine content type based on odd/even day
    if (day % 2 === 0) { // Even day: Business Quotes
        currentDictQuoteType = 'quote';
        // Check if businessQuotes is defined globally by dictquotes.js
        if (typeof businessQuotes !== 'undefined' && businessQuotes.length > 0) {
            currentDictQuoteData = businessQuotes;
            dictQuoteHeading.textContent = 'Business Quotes';
        } else {
            dictionaryDisplay.innerHTML = '<p>Business quotes data not available.</p>';
            console.warn("Global 'businessQuotes' array not found or empty. Ensure dictquotes.js is loaded.");
            return;
        }
    } else { // Odd day: Business Dictionary
        currentDictQuoteType = 'dictionary';
        // Check if businessDictionary is defined globally by dictquotes.js
        if (typeof businessDictionary !== 'undefined' && businessDictionary.length > 0) {
            currentDictQuoteData = businessDictionary;
            dictQuoteHeading.textContent = 'Business Dictionary';
        } else {
            dictionaryDisplay.innerHTML = '<p>Business dictionary data not available.</p>';
            console.warn("Global 'businessDictionary' array not found or empty. Ensure dictquotes.js is loaded.");
            return;
        }
    }

    if (currentDictQuoteData.length === 0) {
        dictionaryDisplay.innerHTML = '<p>No content available.</p>';
        return;
    }

    // Ensure current index is within bounds
    if (currentDictQuoteIndex >= currentDictQuoteData.length || currentDictQuoteIndex < 0) {
        currentDictQuoteIndex = 0; // Reset to first item if out of bounds
    }

    const item = currentDictQuoteData[currentDictQuoteIndex];
    const itemElement = document.createElement('article');
    itemElement.classList.add('dictionary-term'); // Reuse dictionary-term class for styling consistency

    if (currentDictQuoteType === 'dictionary') {
        itemElement.innerHTML = `
            <h4>${item.term}</h4>
            <p>${item.definition}</p>
        `;
    } else { // quote
        itemElement.innerHTML = `
            <h4>"${item.quote}"</h4>
            <p class="author">- ${item.author}</p>
        `;
    }
    dictionaryDisplay.appendChild(itemElement);
}

/**
 * Navigates the dictionary/quote carousel to the next item.
 */
function nextDictItem() {
    // Ensure currentDictQuoteData is populated before attempting navigation
    // This handles cases where renderDictQuote might have failed due to missing data
    let dataToNavigate = (currentDictQuoteType === 'dictionary' && typeof businessDictionary !== 'undefined') ? businessDictionary :
                         (currentDictQuoteType === 'quote' && typeof businessQuotes !== 'undefined') ? businessQuotes : [];

    if (dataToNavigate.length === 0) {
        console.warn("Cannot navigate: Dictionary/Quotes data is not available.");
        return;
    }

    currentDictQuoteIndex = (currentDictQuoteIndex + 1) % dataToNavigate.length;
    renderDictQuote();
}

/**
 * Navigates the dictionary/quote carousel to the previous item.
 */
function prevDictItem() {
    // Ensure currentDictQuoteData is populated before attempting navigation
    let dataToNavigate = (currentDictQuoteType === 'dictionary' && typeof businessDictionary !== 'undefined') ? businessDictionary :
                         (currentDictQuoteType === 'quote' && typeof businessQuotes !== 'undefined') ? businessQuotes : [];

    if (dataToNavigate.length === 0) {
        console.warn("Cannot navigate: Dictionary/Quotes data is not available.");
        return;
    }

    currentDictQuoteIndex = (currentDictQuoteIndex - 1 + dataToNavigate.length) % dataToNavigate.length;
    renderDictQuote();
}


// --- Events Page Specific Functions (New) ---
/**
 * Fetches event data from 'data/events.json'.
 */
async function fetchEvents() {
    try {
        if (allEventsData.length === 0) { // Only fetch if not already loaded
            const response = await fetch('data/events.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            allEventsData = await response.json();
            console.log("Events data fetched successfully:", allEventsData);
        }
    } catch (error) {
        console.error('Error fetching events data:', error);
        const eventsGrid = document.querySelector('.events-section .event-grid');
        if (eventsGrid) {
            eventsGrid.innerHTML = '<p>Error loading events. Please ensure "data/events.json" exists and is correctly formatted.</p>';
        }
    }
}

/**
 * Renders all events to the events grid.
 */
function renderEvents() {
    const eventsGrid = document.querySelector('.events-section .event-grid');
    if (!eventsGrid || allEventsData.length === 0) {
        if (eventsGrid) {
            eventsGrid.innerHTML = '<p>No upcoming events at this time.</p>';
        }
        return;
    }

    eventsGrid.innerHTML = ''; // Clear existing content

    allEventsData.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.name}">
            <div class="event-card-content">
                <h4>${event.name}</h4>
                <p>${event.description}</p>
                <div class="event-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${event.date}</span>
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
                ${event.registrationRequired ? `<a href="#event-registration-form-section" class="cta-button register-event-btn" data-event-id="${event.id}">Register Now</a>` : '<span class="event-status">No Registration Required</span>'}
            </div>
        `;
        const imgElement = eventCard.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
        eventsGrid.appendChild(eventCard);
    });

    // Re-attach event listeners for "Register Now" buttons after rendering
    document.querySelectorAll('.register-event-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            selectedEvent = allEventsData.find(event => event.id === e.target.dataset.eventId);
            if (selectedEvent) {
                document.getElementById('event-registration-form-section').scrollIntoView({ behavior: 'smooth' });
                initRegistrationForm(); // Initialize form for the selected event
            } else {
                showCustomAlert('Error: Event details not found.');
            }
        });
    });
}


/**
 * Initializes the event registration form logic.
 * This function is called only on events.html.
 */
function initRegistrationForm() {
    // DOM elements for the registration form
    const registrationForm = document.getElementById('event-registration-form');
    const formSteps = document.querySelectorAll('.form-step');
    const memberStatusRadios = document.querySelectorAll('input[name="member-status"]');
    const memberTypeSection = document.getElementById('member-type-section');
    const nonMemberInfoSection = document.getElementById('non-member-info-section');
    const memberTypeRadios = document.querySelectorAll('input[name="member-type"]');
    const memberCompanyGroup = document.getElementById('member-company-group');
    const memberCompanySelect = document.getElementById('member-company-select');
    const memberCompanyLabel = memberCompanyGroup.querySelector('label'); // Get the label
    const memberTeamGroup = document.getElementById('member-team-group');
    const memberTeamSelect = document.getElementById('member-team-select');
    const otherTeamMemberNameInput = document.getElementById('other-team-member-name');
    const transportOptionSelect = document.getElementById('transport-option-select');
    const pickupPointGroup = document.getElementById('pickup-point-group');
    const pickupPointSelect = document.getElementById('pickup-point-select');
    const wantsSnacksCheckbox = document.getElementById('wants-snacks');
    const snacksSelectionGroup = document.getElementById('snacks-selection-group');
    const snacksList = document.getElementById('snacks-list');
    const totalFeeSpan = document.getElementById('total-fee');
    const registrationConfirmation = document.getElementById('registration-confirmation');

    // Non-member specific input fields
    const nonMemberName = document.getElementById('non-member-name'); // Ensure this ID exists in HTML
    const nonMemberAddress = document.getElementById('non-member-address'); // Ensure this ID exists in HTML
    const nonMemberPhone = document.getElementById('non-member-phone'); // Ensure this ID exists in HTML


    let currentStep = 0;
    let isMember = false;
    let memberCategory = null; // 'club-member', 'directory-member', 'board-director', 'non-member'
    let selectedCompanyId = null; // Stores the ID of the selected member company/club/board member


    // Function to show a specific form step
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;
        updateFee(); // Recalculate fee on step change
        registrationConfirmation.style.display = 'none'; // Hide confirmation on step change
    }

    // Function to update the total fee displayed
    function updateFee() {
        if (!selectedEvent) {
            totalFeeSpan.textContent = '0';
            return;
        }

        let baseEventCost = 0;
        if (memberCategory && selectedEvent.pricing && selectedEvent.pricing[memberCategory] !== undefined) {
            baseEventCost = selectedEvent.pricing[memberCategory];
        } else {
            // Fallback to non-member price if category not found or not a member
            baseEventCost = selectedEvent.pricing['non-member'] || 0;
        }

        let calculatedFee = baseEventCost;

        // Add transport fee
        const selectedTransport = selectedEvent.transportOptions.find(opt => opt.type === transportOptionSelect.value);
        if (selectedTransport) {
            calculatedFee += selectedTransport.fee;
        }

        // Add snacks fee
        if (wantsSnacksCheckbox.checked) {
            document.querySelectorAll('#snacks-list input[type="checkbox"]:checked').forEach(checkbox => {
                calculatedFee += parseFloat(checkbox.dataset.price);
            });
        }

        totalFeeSpan.textContent = calculatedFee.toLocaleString();
    }

    // Populate dropdowns and lists
    function populateMemberCompanySelect(list, type) {
        memberCompanySelect.innerHTML = '<option value="">-- Select --</option>'; // Changed placeholder
        list.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            if (type === 'board') {
                option.textContent = `${item.name} (${item.title})`; // For board members, show name and title
            } else {
                option.textContent = item.name;
            }
            memberCompanySelect.appendChild(option);
        });
        memberCompanySelect.value = selectedCompanyId || ''; // Retain previous selection if any

        // Update label text based on type
        if (type === 'club') {
            memberCompanyLabel.textContent = "Select your Club:";
        } else if (type === 'directory') {
            memberCompanyLabel.textContent = "Select your Company/Organization:";
        } else if (type === 'board') {
            memberCompanyLabel.textContent = "Select your Name/Role:"; // For board members
        }
    }

    function populateMemberTeamSelect(teamMembers) {
        memberTeamSelect.innerHTML = '<option value="">-- Select Name --</option>';
        teamMembers.forEach(person => {
            const option = document.createElement('option');
            // Use a simple ID for team members, or their full name for display
            option.value = person.id || person.name.toLowerCase().replace(/\s/g, '-');
            option.textContent = person.name;
            memberTeamSelect.appendChild(option);
        });
        const otherOption = document.createElement('option');
        otherOption.value = 'other';
        otherOption.textContent = 'Other (Please specify)';
        memberTeamSelect.appendChild(otherOption);
    }

    function populateTransportOptions() {
        transportOptionSelect.innerHTML = ''; // Clear existing options
        if (selectedEvent && selectedEvent.transportOptions) {
            selectedEvent.transportOptions.forEach(option => {
                const optElement = document.createElement('option');
                optElement.value = option.type;
                optElement.textContent = `${option.type} ${option.fee > 0 ? `(Ksh ${option.fee.toLocaleString()})` : ''}`;
                transportOptionSelect.appendChild(optElement);
            });
        } else {
            const defaultOption = document.createElement('option');
            defaultOption.value = "None";
            defaultOption.textContent = "No Transport Options Available";
            transportOptionSelect.appendChild(defaultOption);
        }
        // Trigger change to update pickup points if necessary
        transportOptionSelect.dispatchEvent(new Event('change'));
    }

    function populatePickupPoints(points) {
        pickupPointSelect.innerHTML = '<option value="">-- Select Pickup Point --</option>';
        points.forEach(point => {
            const option = document.createElement('option');
            option.value = point;
            option.textContent = point;
            pickupPointSelect.appendChild(option);
        });
    }

    function populateSnacks() {
        snacksList.innerHTML = '';
        if (selectedEvent && selectedEvent.snacksAvailable && selectedEvent.snacksAvailable.length > 0) {
            selectedEvent.snacksAvailable.forEach(snack => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <label>
                        <input type="checkbox" data-price="${snack.price}" value="${snack.name}">
                        ${snack.name} (Ksh ${snack.price.toLocaleString()})
                    </label>
                `;
                snacksList.appendChild(div);
            });
            // Add event listeners to newly created snack checkboxes
            snacksList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateFee);
            });
        } else {
            snacksList.innerHTML = '<p>No snacks available for this event.</p>';
            wantsSnacksCheckbox.checked = false; // Uncheck if no snacks
            wantsSnacksCheckbox.disabled = true; // Disable if no snacks
            snacksSelectionGroup.style.display = 'none';
        }
    }

    // Event Listeners for the form
    // Handle member status selection (Step 1)
    memberStatusRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            isMember = (e.target.value === 'yes');
            if (isMember) {
                memberTypeSection.style.display = 'block';
                nonMemberInfoSection.style.display = 'none';
                // Reset non-member fields if they exist
                if (nonMemberName) nonMemberName.value = '';
                if (nonMemberAddress) nonMemberAddress.value = '';
                if (nonMemberPhone) nonMemberPhone.value = '';
                // Clear selected member type and company
                memberTypeRadios.forEach(r => r.checked = false);
                memberCompanyGroup.style.display = 'none';
                memberCompanySelect.innerHTML = '<option value="">-- Select --</option>'; // Reset dropdown
                memberTeamGroup.style.display = 'none';
                memberTeamSelect.innerHTML = '<option value="">-- Select Name --</option>';
                otherTeamMemberNameInput.style.display = 'none';
                otherTeamMemberNameInput.value = '';
                memberCategory = null; // Reset member category
                selectedCompanyId = null;
            } else {
                memberTypeSection.style.display = 'none';
                nonMemberInfoSection.style.display = 'block';
                memberCategory = 'non-member'; // Set category for non-members
                // Ensure member company/team fields are hidden if non-member is selected
                memberCompanyGroup.style.display = 'none';
                memberTeamGroup.style.display = 'none';
            }
            updateFee();
        });
    });

    // Handle member type selection (Step 2 - conditional)
    memberTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            memberCategory = e.target.value;
            memberCompanyGroup.style.display = 'block';
            memberTeamGroup.style.display = 'none'; // Hide team select until company is chosen
            memberTeamSelect.innerHTML = '<option value="">-- Select Name --</option>';
            otherTeamMemberNameInput.style.display = 'none';
            otherTeamMemberNameInput.value = '';

            if (memberCategory === 'club-member') {
                populateMemberCompanySelect(allClubsData, 'club'); // Populate with club names
            } else if (memberCategory === 'directory-member') {
                populateMemberCompanySelect(allMembersData, 'directory'); // All members from members.json
            } else if (memberCategory === 'board-director') {
                // Populate with individual board members from board.json
                populateMemberCompanySelect(allBoardMembersData.boardMembers, 'board');
                memberTeamGroup.style.display = 'none'; // Hide team selection for board members
            }
            updateFee();
        });
    });

    // Handle member company/club/board member selection dropdown change
    memberCompanySelect.addEventListener('change', (e) => {
        selectedCompanyId = e.target.value;
        let membersForTeamSelect = [];

        if (memberCategory === 'club-member') {
            const selectedClub = allClubsData.find(club => club.id === selectedCompanyId);
            if (selectedClub && selectedClub.clubMembers && selectedClub.clubMembers.length > 0) {
                // For club members, we list the individuals associated with that club
                // These individuals might be companies from allMembersData, so we need to get their 'ourTeam'
                // Or, if clubMembers are actual individuals with names, use them directly.
                // Assuming clubMembers in clubs.json are member company IDs, and we need their teams:
                membersForTeamSelect = selectedClub.clubMembers.flatMap(clubMemberRef => {
                    const memberCompany = allMembersData.find(m => m.id === clubMemberRef.memberId);
                    return memberCompany ? memberCompany.ourTeam || [] : [];
                });
                // If clubMembers are directly individuals:
                // membersForTeamSelect = selectedClub.clubMembers;
            }
        } else if (memberCategory === 'directory-member') {
            const selectedMemberCompany = allMembersData.find(m => m.id === selectedCompanyId);
            if (selectedMemberCompany && selectedMemberCompany.ourTeam && selectedMemberCompany.ourTeam.length > 0) {
                // For directory members, we list their 'ourTeam'
                membersForTeamSelect = selectedMemberCompany.ourTeam;
            }
        }
        // For 'board-director', the memberTeamGroup is hidden, so no logic needed here.

        if (membersForTeamSelect.length > 0 && memberCategory !== 'board-director') {
            populateMemberTeamSelect(membersForTeamSelect);
            memberTeamGroup.style.display = 'block';
        } else {
            memberTeamGroup.style.display = 'none';
            memberTeamSelect.innerHTML = '<option value="">-- Select Name --</option>';
            otherTeamMemberNameInput.style.display = 'none';
            otherTeamMemberNameInput.value = '';
        }
        updateFee();
    });

    // Handle "Other" option in team member select
    memberTeamSelect.addEventListener('change', () => {
        if (memberTeamSelect.value === 'other') {
            otherTeamMemberNameInput.style.display = 'block';
            otherTeamMemberNameInput.setAttribute('required', 'true');
        } else {
            otherTeamMemberNameInput.style.display = 'none';
            otherTeamMemberNameInput.removeAttribute('required');
            otherTeamMemberNameInput.value = '';
        }
    });


    // Handle transport option selection
    transportOptionSelect.addEventListener('change', () => {
        const selectedTransportType = transportOptionSelect.value;
        const transportOption = selectedEvent.transportOptions.find(opt => opt.type === selectedTransportType);

        if (transportOption && transportOption.pickupPoints && transportOption.pickupPoints.length > 0) {
            populatePickupPoints(transportOption.pickupPoints);
            pickupPointGroup.style.display = 'block';
        } else {
            pickupPointGroup.style.display = 'none';
            pickupPointSelect.value = ''; // Reset selection
        }
        updateFee();
    });

    // Handle pickup point selection change
    pickupPointSelect.addEventListener('change', updateFee);

    // Handle snacks checkbox change
    wantsSnacksCheckbox.addEventListener('change', () => {
        if (wantsSnacksCheckbox.checked) {
            snacksSelectionGroup.style.display = 'block';
            populateSnacks();
        } else {
            snacksSelectionGroup.style.display = 'none';
            snacksList.innerHTML = ''; // Clear snacks
        }
        updateFee();
    });

    // Form navigation buttons
    document.querySelectorAll('.form-navigation .next-button').forEach(button => {
        button.addEventListener('click', (e) => {
            console.log("Next button clicked. Current step:", currentStep);
            let isValid = true;

            // Basic validation for current step
            if (currentStep === 0) { // Membership status step
                if (!document.querySelector('input[name="member-status"]:checked')) {
                    showCustomAlert('Please select your membership status.');
                    isValid = false;
                }
            } else if (currentStep === 1) { // Member type or non-member info step
                if (isMember) { // If member, validate member type and selection
                    if (!document.querySelector('input[name="member-type"]:checked')) {
                        showCustomAlert('Please select your member type.');
                        isValid = false;
                    } else if (memberCompanySelect.value === '') {
                        showCustomAlert('Please select your company/club/board from the list.');
                        isValid = false;
                    } else if (memberCategory !== 'board-director' && memberTeamGroup.style.display === 'block' && memberTeamSelect.value === '') {
                        showCustomAlert('Please select your name or "Other" from the team list.');
                        isValid = false;
                    } else if (memberTeamSelect.value === 'other' && (!otherTeamMemberNameInput || otherTeamMemberNameInput.value.trim() === '')) {
                        // Added check for otherTeamMemberNameInput existence
                        showCustomAlert('Please enter your name if "Other" is selected.');
                        isValid = false;
                    }
                } else { // If non-member, validate personal info
                    // Added checks for existence of non-member input fields
                    if (!nonMemberName || nonMemberName.value.trim() === '' ||
                        !nonMemberAddress || nonMemberAddress.value.trim() === '' ||
                        !nonMemberPhone || nonMemberPhone.value.trim() === '') {
                        showCustomAlert('Please fill in all your details.');
                        isValid = false;
                    }
                }
            }
            console.log("Validation result for next step:", isValid);
            if (isValid) {
                showStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.form-navigation .prev-button').forEach(button => {
        button.addEventListener('click', () => {
            console.log("Previous button clicked. Current step:", currentStep);
            showStep(currentStep - 1);
        });
    });

    // Handle form submission
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Form submission attempted.");

        // Final validation (can be more robust)
        if (!selectedEvent) {
            showCustomAlert('Please select an event to register for.');
            console.error("No event selected for registration.");
            return;
        }

        let registrationDetails = `Registration for: ${selectedEvent.name}\n\n`;
        registrationDetails += `Membership Status: ${isMember ? 'Member' : 'Non-Member'}\n`;

        if (isMember) {
            registrationDetails += `Member Type: ${memberCategory.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}\n`;
            if (memberCategory === 'board-director') {
                registrationDetails += `Registered Name/Role: ${memberCompanySelect.options[memberCompanySelect.selectedIndex].textContent}\n`;
            } else {
                registrationDetails += `Company/Membership: ${memberCompanySelect.options[memberCompanySelect.selectedIndex].textContent}\n`;
                if (memberTeamGroup.style.display === 'block' && memberTeamSelect.value) {
                    registrationDetails += `Registered Name: ${memberTeamSelect.value === 'other' ? (otherTeamMemberNameInput ? otherTeamMemberNameInput.value.trim() : 'N/A') : memberTeamSelect.options[memberTeamSelect.selectedIndex].textContent}\n`;
                }
            }
        } else {
            registrationDetails += `Name: ${nonMemberName ? nonMemberName.value.trim() : 'N/A'}\n`;
            registrationDetails += `Address: ${nonMemberAddress ? nonMemberAddress.value.trim() : 'N/A'}\n`;
            registrationDetails += `Phone: ${nonMemberPhone ? nonMemberPhone.value.trim() : 'N/A'}\n`;
        }

        const selectedTransportType = transportOptionSelect.value;
        registrationDetails += `Transport: ${selectedTransportType}\n`;
        if (selectedTransportType === 'La Familia Staff Bus' && pickupPointSelect.value) {
            registrationDetails += `Pickup Point: ${pickupPointSelect.value}\n`;
        }

        const selectedSnacks = Array.from(document.querySelectorAll('#snacks-list input[type="checkbox"]:checked'))
                                .map(checkbox => checkbox.value);
        if (selectedSnacks.length > 0) {
            registrationDetails += `Snacks: ${selectedSnacks.join(', ')}\n`;
        } else {
            registrationDetails += `Snacks: None\n`;
        }

        registrationDetails += `\nTotal Fee: Ksh ${totalFeeSpan.textContent}`;

        // Simulate sending email and show confirmation
        registrationConfirmation.innerHTML = `Thank you for registering for ${selectedEvent.name}! Your ticket and details have been sent to your email. We look forward to seeing you!<br><br><strong>Summary:</strong><pre>${registrationDetails}</pre>`;
        registrationConfirmation.style.display = 'block';
        registrationForm.reset(); // Clear the form
        showStep(0); // Reset to first step
        selectedEvent = null; // Reset selected event
        updateFee(); // Reset fee
        registrationConfirmation.scrollIntoView({ behavior: 'smooth' }); // Scroll to confirmation

        console.log("Registration Details:\n", registrationDetails); // Log details for debugging
    });

    // Initial setup for the form when it's first displayed
    showStep(0); // Display the first step
    updateFee(); // Initialize fee to 0
    // Reset all conditional sections
    memberTypeSection.style.display = 'none';
    nonMemberInfoSection.style.display = 'none';
    memberCompanyGroup.style.display = 'none';
    memberTeamGroup.style.display = 'none';
    otherTeamMemberNameInput.style.display = 'none';
    pickupPointGroup.style.display = 'none';
    snacksSelectionGroup.style.display = 'none';
    wantsSnacksCheckbox.disabled = false; // Enable if it was disabled by a previous event
    snacksList.innerHTML = ''; // Clear any previous snacks
    memberCompanySelect.innerHTML = '<option value="">-- Select --</option>'; // Reset dropdown
    memberTeamSelect.innerHTML = '<option value="">-- Select Name --</option>';
    transportOptionSelect.innerHTML = ''; // Clear transport options
    populateTransportOptions(); // Populate transport options for the selected event
}


// --- Clubs Page Specific Functions (New) ---
/**
 * Fetches club data from 'data/clubs.json'.
 */
async function fetchClubs() {
    try {
        if (allClubsData.length === 0) { // Only fetch if not already loaded
            const response = await fetch('data/clubs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            allClubsData = await response.json();
            console.log("Clubs data fetched successfully:", allClubsData);
        }
    } catch (error) {
        console.error('Error fetching clubs data:', error);
        const clubGrid = document.getElementById('club-grid');
        if (clubGrid) {
            clubGrid.innerHTML = '<p>Error loading clubs. Please ensure "data/clubs.json" exists and is correctly formatted.</p>';
        }
    }
}

/**
 * Renders all clubs to the clubs grid.
 */
function renderClubs() {
    const clubGrid = document.getElementById('club-grid');
    if (!clubGrid || allClubsData.length === 0) {
        if (clubGrid) {
            clubGrid.innerHTML = '<p>No active clubs at this time.</p>';
        }
        return;
    }

    clubGrid.innerHTML = ''; // Clear existing content

    allClubsData.forEach(club => {
        const clubCard = document.createElement('div');
        clubCard.classList.add('club-card');
        clubCard.innerHTML = `
            <img src="${club.image}" alt="${club.name}">
            <div class="club-card-content">
                <h4>${club.name}</h4>
                <p>${club.description}</p>
                <div class="club-meta">
                    <span><i class="fas fa-users"></i> ${club.details.membersCount} Members</span>
                    <span><i class="fas fa-calendar-alt"></i> ${club.details.frequency}</span>
                    <span><i class="fas fa-globe"></i> ${club.details.location}</span>
                </div>
                <a href="#" class="cta-button">Learn More & Join</a>
            </div>
        `;
        const imgElement = clubCard.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
        clubGrid.appendChild(clubCard);
    });
}

// --- Board Page Specific Functions (New) ---
/**
 * Fetches board and executive team data from 'data/board.json'.
 */
async function fetchBoardMembersData() {
    try {
        if (allBoardMembersData.boardMembers.length === 0 && allBoardMembersData.executiveTeam.length === 0) {
            const response = await fetch('data/board.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            allBoardMembersData = data; // Assign fetched data
            console.log("Board data fetched successfully:", allBoardMembersData);
        }
    } catch (error) {
        console.error('Error fetching board data:', error);
        const boardGrid = document.getElementById('board-of-directors-grid');
        const executiveGrid = document.getElementById('executive-team-grid');
        if (boardGrid) boardGrid.innerHTML = '<p style="text-align: center; color: var(--text-color); grid-column: 1 / -1;">Error loading Board Members. Please ensure "data/board.json" exists and is correctly formatted.</p>';
        if (executiveGrid) executiveGrid.innerHTML = '<p style="text-align: center; color: var(--text-color); grid-column: 1 / -1;">Error loading Executive Team. Please ensure "data/board.json" exists and is correctly formatted.</p>';
    }
}

/**
 * Renders team members (board or executive) to their respective grids.
 * @param {Array<object>} members - Array of member objects.
 * @param {string} containerId - ID of the HTML container element.
 */
function renderTeamMembers(members, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear loading message

    if (members.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: var(--text-color); grid-column: 1 / -1;">No ${containerId.replace(/-/g, ' ')} available at this time.</p>`;
        return;
    }

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('team-member-card');
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h4>${member.name}</h4>
            <p>${member.title}</p>
            <div class="bio-snippet">${member.bio}</div>
            <div class="social-links">
                ${member.social.linkedin ? `<a href="${member.social.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>` : ''}
                ${member.social.twitter ? `<a href="${member.social.twitter}" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>` : ''}
            </div>
        `;
        const imgElement = memberCard.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
        container.appendChild(memberCard);
    });
}

/**
 * Initializes the Board & Team page functionality.
 */
function initBoardPage() {
    renderTeamMembers(allBoardMembersData.boardMembers, 'board-of-directors-grid');
    renderTeamMembers(allBoardMembersData.executiveTeam, 'executive-team-grid');
}


// --- Core UI & Utility Initializations (Common to all pages) ---
/**
 * Executes functions once the DOM is fully loaded.
 * This is the main entry point for most JavaScript functionality.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- Current Year and Last Modified for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // --- Image Error Handling ---
    document.querySelectorAll('img').forEach(setupImageFallback);

    // --- Active Navigation Link ---
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#main-nav .nav-list a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.closest('li').classList.add('active-nav-link');
        } else {
            link.closest('li').classList.remove('active-nav-link'); // Ensure only one is active
        }
    });


    // --- Hamburger Menu Toggle ---
    const hamButton = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    if (hamButton && mainNav) {
        hamButton.addEventListener('click', () => {
            mainNav.classList.toggle('main-nav-open');
            hamButton.querySelector('i').classList.toggle('fa-bars');
            hamButton.querySelector('i').classList.toggle('fa-times');
        });
    }

    // --- Global Search Bar Toggle & Filters ---
    const searchToggle = document.getElementById('search-toggle');
    const searchBarContainer = document.getElementById('search-bar-container');
    const siteSearchInput = document.getElementById('site-search');
    const searchTypeFilter = document.getElementById('search-type-filter');
    const searchLocationFilter = document.getElementById('search-location-filter');
    const searchSubmitBtn = document.getElementById('search-submit-btn');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchMicBtn = document.getElementById('search-mic-btn');
    const searchSuggestionsDiv = document.getElementById('search-suggestions');
    const searchHistoryDiv = document.getElementById('search-history');

    if (searchToggle && searchBarContainer && siteSearchInput && searchTypeFilter && searchLocationFilter && searchSubmitBtn && searchClearBtn && searchMicBtn && searchSuggestionsDiv && searchHistoryDiv) {
        function toggleSearchBar() {
            searchBarContainer.classList.toggle('show-search');
            if (searchBarContainer.classList.contains('show-search')) {
                siteSearchInput.focus();
                displaySearchHistory();
            } else {
                siteSearchInput.value = '';
                toggleSearchControls(false);
                searchSuggestionsDiv.innerHTML = '';
                searchHistoryDiv.innerHTML = '';
            }
        }

        searchToggle.addEventListener('click', toggleSearchBar);

        document.addEventListener('click', (event) => {
            if (!searchBarContainer.contains(event.target) && !searchToggle.contains(event.target) && searchBarContainer.classList.contains('show-search')) {
                toggleSearchBar();
            }
        });

        function toggleSearchControls(hasInput) {
            searchClearBtn.style.display = hasInput ? 'inline-block' : 'none';
            searchMicBtn.style.display = hasInput ? 'none' : 'inline-block';
            searchSubmitBtn.style.display = hasInput ? 'inline-block' : 'none';
        }

        siteSearchInput.addEventListener('input', () => {
            const hasInput = siteSearchInput.value.length > 0;
            toggleSearchControls(hasInput);
            if (hasInput) {
                fetchSearchSuggestions(siteSearchInput.value);
            } else {
                searchSuggestionsDiv.innerHTML = '';
            }
        });

        searchClearBtn.addEventListener('click', () => {
            siteSearchInput.value = '';
            toggleSearchControls(false);
            searchSuggestionsDiv.innerHTML = '';
            siteSearchInput.focus();
        });

        function performSearch() {
            const query = siteSearchInput.value.trim();
            const type = searchTypeFilter.value;
            const location = searchLocationFilter.value;

            if (query) {
                const normalizedQuery = query.toLowerCase().replace(/ /g, '-');
                const foundMember = allMembersData.find(member =>
                    member.id === normalizedQuery || member.name.toLowerCase() === query.toLowerCase()
                );

                if (foundMember) {
                    window.location.href = foundMember.link;
                    return;
                }
                console.log(`Global Search executed for: "${query}" (Type: ${type}, Location: ${location})`);
                saveSearchHistory(query);

                const url = new URL('directory.html', window.location.origin);
                if (query) {
                    url.searchParams.set('search', query);
                }
                if (type && type !== 'all') {
                    url.searchParams.set('category', type);
                }
                if (location && location !== 'all') {
                    url.searchParams.set('location', location);
                }

                window.location.href = url.toString();

                toggleSearchBar();
            } else {
                showCustomAlert('Please enter a search term for global search.');
            }
        }

        searchSubmitBtn.addEventListener('click', performSearch);

        siteSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        let searchHistory = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];

        function saveSearchHistory(query) {
            searchHistory = searchHistory.filter(item => item !== query);
            searchHistory.unshift(query);
            searchHistory = searchHistory.slice(0, 5);
            localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
            displaySearchHistory();
        }

        function displaySearchHistory() {
            searchHistoryDiv.innerHTML = '';
            if (searchHistory.length > 0) {
                const historyTitle = document.createElement('h4');
                historyTitle.textContent = 'Recent Searches';
                searchHistoryDiv.appendChild(historyTitle);

                const historyList = document.createElement('ul');
                searchHistory.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    listItem.addEventListener('click', () => {
                        siteSearchInput.value = item;
                        toggleSearchControls(true);
                        performSearch();
                    });
                    historyList.appendChild(listItem);
                });
                searchHistoryDiv.appendChild(historyList);
            }
        }

        const allSearchableTerms = [
            "retail", "health", "e-commerce", "automotive", "real-estate", "catering", "beauty", "arts",
            "Duka Lako Supermart", "AfyaCare Clinic", "iMall", "AutoGiant Motors", "Grand Auto Imports",
            "Wheel N' Fix", "Soko Properties", "Taste of Africa Catering", "Urban Edge Barbershop & Spa",
            "Creative Canvas Studios", "Naija Cuisine Hub", "TechSolutions Africa", "Eco Clean Services",
            "Fashion Finesse Boutique", "Apex Innovations", "Green Thumb Landscaping",
            "Nairobi events", "business growth", "networking", "memberships",
            "privacy policy", "terms of service", "FAQs", "about La Familia", "events calendar"
        ];

        function fetchSearchSuggestions(query) {
            searchSuggestionsDiv.innerHTML = '';
            const lowerCaseQuery = query.toLowerCase();
            const matchingSuggestions = allSearchableTerms.filter(term =>
                term.toLowerCase().includes(lowerCaseQuery) && term.toLowerCase() !== lowerCaseQuery
            ).slice(0, 5);

            if (matchingSuggestions.length > 0) {
                const suggestionsList = document.createElement('ul');
                matchingSuggestions.forEach(suggestion => {
                    const listItem = document.createElement('li');
                    listItem.textContent = suggestion;
                    listItem.addEventListener('click', () => {
                        siteSearchInput.value = suggestion;
                        toggleSearchControls(true);
                        performSearch();
                    });
                    suggestionsList.appendChild(listItem);
                });
                searchSuggestionsDiv.appendChild(suggestionsList);
            }
        }

        toggleSearchControls(false);
    } else {
        console.warn("One or more GLOBAL search bar elements not found. Global Search functionality may be limited.", {
            searchToggle: searchToggle, searchBarContainer: searchBarContainer, siteSearchInput: siteSearchInput,
            searchTypeFilter: searchTypeFilter, searchLocationFilter: searchLocationFilter, searchSubmitBtn: searchSubmitBtn,
            searchClearBtn: searchClearBtn, searchMicBtn: searchMicBtn, searchSuggestionsDiv: searchSuggestionsDiv, searchHistoryDiv: searchHistoryDiv
        });
    }

    // --- Mode Toggle (Dark/Light Mode) ---
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            modeToggle.querySelector('i').classList.toggle('fa-moon', !isDarkMode);
            modeToggle.querySelector('i').classList.toggle('fa-sun', isDarkMode);
            localStorage.setItem('darkMode', isDarkMode);
        });

        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true' || (savedMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
            modeToggle.querySelector('i').classList.add('fa-sun');
            modeToggle.querySelector('i').classList.remove('fa-moon');
        } else {
            document.body.classList.remove('dark-mode');
            modeToggle.querySelector('i').classList.add('fa-moon');
            modeToggle.querySelector('i').classList.remove('fa-sun');
        }
    }

    // --- Initialize Homepage Specifics ---
    if (document.querySelector('.hero-section')) { // Check if on homepage
        const heroImages = document.querySelectorAll('.hero-image');
        let currentImageIndex = 0;
        if (heroImages.length > 0) {
            setInterval(() => {
                heroImages[currentImageIndex].classList.remove('active-slide');
                currentImageIndex = (currentImageIndex + 1) % heroImages.length;
                heroImages[currentImageIndex].classList.add('active-slide');
            }, 5000);
        }

        const adImages = document.querySelectorAll('.ad-image');
        let currentAdIndex = 0;
        if (adImages.length > 0) {
            setInterval(() => {
                adImages[currentAdIndex].classList.remove('active-ad');
                currentAdIndex = (currentAdIndex + 1) % adImages.length;
                adImages[currentAdIndex].classList.add('active-ad');
            }, 7000);
        }

        if (document.getElementById('weather-display')) {
            fetchWeather();
        }

        // Ensure allMembersData is loaded for spotlights
        if (allMembersData.length === 0) {
            await fetchMembers();
        }
        loadHomepageSpotlights();

        // Initialize dictionary and quotes carousel using globally defined arrays
        if (dictQuoteHeading && dictionaryDisplay && prevDictItemBtn && nextDictItemBtn) {
            renderDictQuote(); // Directly use global arrays
            prevDictItemBtn.addEventListener('click', prevDictItem);
            nextDictItemBtn.addEventListener('click', nextDictItem);
        } else {
            console.warn("Business Dictionary/Quotes carousel elements not found on homepage. Dynamic content may not display.");
        }
    }


    // --- Initialize Directory Page Functionality ---
    if (document.getElementById('members-display')) {
        await fetchMembers(); // Fetch data
        currentFilteredMembers = [...allMembersData]; // Initialize for directory
        filterAndSortMembers(); // Filter and render for directory
        setupDirectoryListeners();
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            showMemberDetails(initialHash);
        }
    }

    // --- Initialize Events Page Functionality ---
    if (document.querySelector('.events-section') && document.getElementById('event-registration-form')) {
        await fetchEvents(); // Fetch event data
        if (allMembersData.length === 0) { // Ensure members data is available for registration form
            await fetchMembers();
        }
        if (allClubsData.length === 0) { // Ensure clubs data is available for registration form
            await fetchClubs();
        }
        if (allBoardMembersData.boardMembers.length === 0 && allBoardMembersData.executiveTeam.length === 0) { // Ensure board data is available for registration form
            await fetchBoardMembersData();
        }
        renderEvents(); // Render events dynamically
        // The initRegistrationForm will be called by the "Register Now" buttons
    }

    // --- Initialize Clubs Page Functionality ---
    if (document.getElementById('club-grid')) {
        await fetchClubs(); // Fetch club data
        renderClubs(); // Render clubs dynamically
    }

    // --- Initialize Board Page Functionality ---
    if (document.getElementById('board-of-directors-grid')) {
        await fetchBoardMembersData(); // Fetch board data
        initBoardPage(); // Render board members and executive team
    }
});

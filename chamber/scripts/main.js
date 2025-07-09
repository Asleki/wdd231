// --- Global Constants & Configurations ---
const API_KEY = 'c8d5db76fb55df0628b2ea568d5d200b'; // Your OpenWeatherMap API key
const WEATHER_CITY = 'Nairobi';
const WEATHER_UNIT = 'metric'; // or 'imperial' for Fahrenheit
const MEMBERS_TO_SHOW_ON_HOMEPAGE = 4; // UPDATED: Number of members to display on the homepage
const SEARCH_HISTORY_KEY = 'laFamiliaSearchHistory';
const MEMBERS_PER_PAGE_DIRECTORY = 12; // Number of members to show per load on directory page

// --- Data Storage (Extracted from HTML and extended for directory) ---
// In a real app, this would likely be fetched from an API or JSON file.
// This dummy data is comprehensive for directory page demonstration.
let allMembersData = [
    {
        id: 'duka-lako-supermart',
        imgSrc: 'images/placeholder.png', // Placeholder image URL
        imgAlt: 'Duka Lako Supermart Logo',
        name: 'Duka Lako Supermart',
        description: 'Your neighborhood supermarket, offering fresh produce, groceries, and household essentials.',
        fullDescription: 'Duka Lako Supermart is committed to providing the freshest produce, highest quality groceries, and a wide array of household essentials to our community. We pride ourselves on friendly service and competitive prices, making your shopping experience enjoyable and convenient. Visit us today for all your daily needs!',
        category: 'retail',
        location: 'cbd',
        size: 'medium',
        popularity: 'high',
        foundingYear: 2018,
        contact: 'info@dukalako.co.ke',
        website: 'dukalako.co.ke',
        link: 'dukalako.html' 
    },
    {
        id: 'afyacare-clinic',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'AfyaCare Clinic Logo',
        name: 'AfyaCare Clinic',
        description: 'Comprehensive healthcare services for the whole family, from general check-ups to specialized treatments.',
        fullDescription: 'AfyaCare Clinic is a state-of-the-art medical facility dedicated to offering comprehensive healthcare services. Our team of experienced doctors and nurses provides everything from routine check-ups and vaccinations to specialized treatments and emergency care, ensuring the well-being of your entire family. We are equipped with modern diagnostic tools to provide accurate and timely medical attention.',
        category: 'health',
        location: 'westlands',
        size: 'small',
        popularity: 'high',
        foundingYear: 2020,
        contact: 'contact@afyacare.org',
        website: 'afyacare.org',
        link: 'afyacare.html'
    },
    {
        id: 'imall-e-commerce',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'iMall E-commerce Logo',
        name: 'iMall E-commerce',
        description: 'Nairobi\'s leading online marketplace for electronics, fashion, and home goods with fast delivery.',
        fullDescription: 'iMall E-commerce is Nairobi\'s premier online shopping destination, offering an extensive range of products including the latest electronics, trendy fashion apparel, and essential home goods. We prioritize customer satisfaction with a seamless shopping experience, secure payment options, and remarkably fast delivery services across the city. Discover convenience and quality at your fingertips.',
        category: 'e-commerce',
        location: 'kilimani',
        size: 'large',
        popularity: 'medium',
        foundingYear: 2017,
        contact: 'support@imall.co.ke',
        website: 'imall.co.ke',
        link: 'imall.html'
    },
    {
        id: 'autogiant-motors',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'AutoGiant Motors Logo',
        name: 'AutoGiant Motors',
        description: 'New and pre-owned vehicles. Specializing in imports and local sales with financing options.',
        fullDescription: 'AutoGiant Motors is your trusted partner for acquiring both new and quality pre-owned vehicles. We specialize in importing a diverse range of cars to meet every preference and budget, alongside a robust selection of locally sourced automobiles. Our dedicated team assists with flexible financing options, making your dream car more accessible. Drive away with confidence and exceptional service.',
        category: 'automotive',
        location: 'upper-hill',
        size: 'medium',
        popularity: 'medium',
        foundingYear: 2015,
        contact: 'sales@autogiant.com',
        website: 'autogiant.com',
        link: 'autogiant.html'
    },
    {
        id: 'taste-of-africa-catering',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Taste of Africa Catering Logo',
        name: 'Taste of Africa Catering',
        description: 'Authentic African and international cuisine catering for events of all sizes.',
        fullDescription: 'Taste of Africa Catering brings the rich, vibrant flavors of authentic African and exquisite international cuisine to your special events. Whether it’s a corporate gathering, a wedding, or a private party, our culinary experts craft bespoke menus that tantalize taste buds and leave a lasting impression. Experience the true essence of gourmet catering with us.',
        category: 'catering',
        location: 'langata',
        size: 'small',
        popularity: 'high',
        foundingYear: 2019,
        contact: 'events@tasteofafrica.co.ke',
        website: 'tasteofafrica.co.ke',
        link: 'tasteofafrica.html'
    },
    {
        id: 'creative-canvas-studios',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Creative Canvas Studios Logo',
        name: 'Creative Canvas Studios',
        description: 'Branding, graphic design, and web development services for businesses looking to make an impact.',
        fullDescription: 'Creative Canvas Studios is a dynamic agency offering comprehensive branding, innovative graphic design, and cutting-edge web development services. We partner with businesses to craft compelling visual identities and robust online presences that truly resonate with their audience. Our goal is to transform your vision into impactful and memorable digital experiences that drive growth and engagement.',
        category: 'brand-design',
        location: 'lavington',
        size: 'small',
        popularity: 'medium',
        foundingYear: 2021,
        contact: 'hello@creativecanvas.com',
        website: 'creativecanvas.com',
        link: 'creativecanvas.html'
    },
    {
        id: 'soko-properties',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Soko Properties Logo',
        name: 'Soko Properties',
        description: 'Leading real estate agency in Nairobi, offering sales, rentals, and property management.',
        fullDescription: 'Soko Properties stands as a leading real estate agency in Nairobi, providing unparalleled services in property sales, rentals, and comprehensive property management. Our expert team offers personalized guidance to clients navigating the dynamic real estate market, ensuring seamless transactions and optimal investment returns. Whether you’re buying, selling, or leasing, trust us to deliver exceptional results with integrity and professionalism.',
        category: 'real-estate',
        location: 'cbd',
        size: 'large',
        popularity: 'high',
        foundingYear: 2010,
        contact: 'info@sokoproperties.co.ke',
        website: 'sokoproperties.co.ke',
        link: 'sokoproperties.html'
    },
    {
        id: 'urban-edge-barbershop-spa',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Urban Edge Barbershop & Spa Logo',
        name: 'Urban Edge Barbershop & Spa',
        description: 'Modern grooming and relaxation services for men and women.',
        fullDescription: 'Urban Edge Barbershop & Spa offers a contemporary sanctuary for both men and women seeking top-tier grooming and relaxation services. From precision haircuts and traditional shaves to rejuvenating spa treatments and holistic therapies, our skilled professionals are dedicated to providing an unparalleled experience. Step into Urban Edge for a transformative journey of style and serenity, where every detail is crafted for your ultimate comfort and satisfaction.',
        category: 'beauty-spa',
        location: 'ruaka',
        size: 'small',
        popularity: 'medium',
        foundingYear: 2022,
        contact: 'book@urbanedge.ke',
        website: 'urbanedge.ke',
        link: 'urbanedge.html'
    },
    {
        id: 'naija-cuisine-hub',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Naija Cuisine Hub Logo',
        name: 'Naija Cuisine Hub',
        description: 'Authentic Nigerian dishes in the heart of Nairobi. Experience a burst of flavors!',
        fullDescription: 'Naija Cuisine Hub brings the vibrant and rich culinary traditions of Nigeria directly to Nairobi. Our chefs prepare authentic dishes like Jollof Rice, Egusi Soup, and Suya with fresh, high-quality ingredients, ensuring every bite is a journey to West Africa. Come and savor the true taste of Nigerian hospitality and flavor in a cozy, welcoming atmosphere.',
        category: 'food-beverage',
        location: 'kilimani',
        size: 'small',
        popularity: 'medium',
        foundingYear: 2021,
        contact: 'info@naijacuisinehub.com',
        website: 'naijacuisinehub.com',
        link: 'naijacuisine.html'
    },
    {
        id: 'techsolutions-africa',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'TechSolutions Africa Logo',
        name: 'TechSolutions Africa',
        description: 'IT consulting, software development, and network solutions for businesses of all sizes.',
        fullDescription: 'TechSolutions Africa is a leading provider of comprehensive IT consulting, innovative software development, and robust network solutions tailored for businesses across the continent. We empower organizations to leverage technology for efficiency, growth, and competitive advantage. Our expert team delivers bespoke solutions, from custom applications to secure infrastructure, ensuring your digital landscape is optimized and future-ready.',
        category: 'services',
        location: 'cbd',
        size: 'medium',
        popularity: 'high',
        foundingYear: 2016,
        contact: 'contact@techsolutions.africa',
        website: 'techsolutions.africa',
        link: 'techsolutions.html'
    },
    {
        id: 'eco-clean-services',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Eco Clean Services Logo',
        name: 'Eco Clean Services',
        description: 'Eco-friendly cleaning solutions for homes and offices in Nairobi.',
        fullDescription: 'Eco Clean Services is dedicated to providing top-tier, environmentally friendly cleaning solutions for both residential and commercial spaces in Nairobi. We use sustainable products and practices to ensure a sparkling clean environment without harmful chemicals. Our reliable and professional team is committed to delivering exceptional service, contributing to a healthier planet, one clean space at a time.',
        category: 'services',
        location: 'westlands',
        size: 'small',
        popularity: 'low',
        foundingYear: 2022,
        contact: 'info@ecoclean.co.ke',
        website: 'ecoclean.co.ke',
        link: 'ecoclean.html'
    },
    {
        id: 'fashion-finesse',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Fashion Finesse Boutique Logo',
        name: 'Fashion Finesse Boutique',
        description: 'Trendy and elegant apparel for the modern Kenyan fashionista.',
        fullDescription: 'Fashion Finesse Boutique is Nairobi\'s destination for the latest trends and timeless elegance in apparel. We curate a exquisite collection for the modern Kenyan fashionista, offering unique styles that embody sophistication and flair. Discover your next statement piece with us, where quality craftsmanship meets contemporary design, empowering you to express your individuality with confidence and grace.',
        category: 'retail',
        location: 'kilimani',
        size: 'small',
        popularity: 'medium',
        foundingYear: 2019,
        contact: 'sales@fashionfinesse.com',
        website: 'fashionfinesse.com',
        link: 'fashionfinesse.html'
    },
    {
        id: 'prime-security-solutions',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Prime Security Solutions Logo',
        name: 'Prime Security Solutions',
        description: 'Advanced security systems and personnel for homes and businesses.',
        fullDescription: 'Prime Security Solutions offers cutting-edge security systems and highly trained personnel to protect your home and business. Our comprehensive services include CCTV surveillance, alarm systems, access control, and professional guard services, all designed to provide peace of mind. We utilize the latest technology to ensure maximum protection against potential threats, tailored to your specific needs.',
        category: 'services',
        location: 'cbd',
        size: 'medium',
        popularity: 'high',
        foundingYear: 2014,
        contact: 'info@primesecurity.co.ke',
        website: 'primesecurity.co.ke',
        link: 'primesecurity.html'
    },
    {
        id: 'green-thumb-landscaping',
        imgSrc: 'images/placeholder.png',
        imgAlt: 'Green Thumb Landscaping Logo',
        name: 'Green Thumb Landscaping',
        description: 'Professional landscaping and garden maintenance services.',
        fullDescription: 'Green Thumb Landscaping specializes in creating and maintaining beautiful outdoor spaces. From initial design and softscaping to irrigation and ongoing garden maintenance, our team of experts transforms ordinary yards into lush, vibrant landscapes. We are passionate about greenery and dedicated to enhancing the aesthetic appeal and value of your property with sustainable and artistic designs.',
        category: 'services',
        location: 'lavington',
        size: 'small',
        popularity: 'medium',
        foundingYear: 2018,
        contact: 'design@greenthumb.co.ke',
        website: 'greenthumb.co.ke',
        link: 'greenthumb.html'
    }
];

let displayedMembersCount = 0; // To track how many members are currently displayed on directory page


// --- Utility Function: Image Fallback/Placeholder ---
function setupImageFallback(imgElement) {
    if (!imgElement.src || (imgElement.complete && imgElement.naturalWidth === 0)) {
        imgElement.classList.add('image-error-fallback');
    }
    imgElement.onerror = function() {
        if (!this.classList.contains('image-error-fallback')) {
            this.classList.add('image-error-fallback');
            console.warn(`Image failed to load: ${this.alt || this.src}`);
        }
    };
    imgElement.onload = function() {
        this.classList.remove('image-error-fallback');
    };
}

// --- Weather Function ---
async function fetchWeather() {
    const weatherDisplay = document.getElementById('weather-display');
    if (!weatherDisplay) return; // Exit if weather display element is not on the page

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CITY}&units=${WEATHER_UNIT}&appid=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDisplay.innerHTML = `<p>Failed to load weather data. Please try again later. (${error.message})</p>`;
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    if (!weatherDisplay) return;

    // Clear previous content
    weatherDisplay.innerHTML = '';

    // Current weather
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

    // 5-day forecast (OpenWeatherMap free tier provides 5-day/3-hour forecast)
    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecast-container');

    const dailyForecasts = {}; // To store one entry per day
    const today = new Date().toDateString();

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayString = date.toDateString(); // e.g., "Mon Jul 08 2025"
        const hour = date.getHours();

        // Skip today if we're showing current weather prominently, or if it's already past midday
        if (dayString === today && hour < 12) {
             // Only include today's forecast if it's before midday
             if (!dailyForecasts[day]) {
                 dailyForecasts[day] = item;
             }
             return;
        }

        // Add distinct days to the forecast, max 5 days (excluding current if already displayed)
        if (Object.keys(dailyForecasts).length < 5) {
            // Try to get a midday (12-3 PM) entry, or the first entry for the day if midday not available yet
            if (!dailyForecasts[day] || (hour >= 12 && hour < 18)) {
                dailyForecasts[day] = item;
            }
        }
    });

    // Create forecast cards
    for (const day in dailyForecasts) {
        const item = dailyForecasts[day];
        const temp = item.main.temp.toFixed(0);
        const description = item.weather[0].description;
        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // No @2x for smaller icons

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

    weatherDisplay.appendChild(forecastContainer); // Append forecast below current weather
}


// --- Functions for Homepage Member Spotlights ---
function parseMemberDataFromHomepage() {
    const spotlightCards = document.querySelectorAll('.member-spotlights .spotlight-card');
    const homepageMembers = []; // Use a temporary array for homepage spotlights
    spotlightCards.forEach(card => {
        const imgSrc = card.querySelector('img')?.src;
        const imgAlt = card.querySelector('img')?.alt;
        const name = card.querySelector('h4')?.textContent;
        const descriptionElement = card.querySelector('p[data-category]');
        const description = descriptionElement?.textContent;
        const category = descriptionElement?.dataset.category;
        const size = descriptionElement?.dataset.size;
        const popularity = descriptionElement?.dataset.popularity;
        const link = card.querySelector('a')?.href;
        const id = card.id; // Get ID if available

        if (name && description) {
            homepageMembers.push({ id, imgSrc, imgAlt, name, description, category, size, popularity, link });
        }
    });
    // This function now primarily handles data from index.html if it's there
    // For directory.html, allMembersData is pre-defined or fetched.
    console.log("Parsed member data from homepage (if any):", homepageMembers);
}

// Limit members displayed on homepage
function limitHomepageMembersDisplay() {
    const spotlightCarousel = document.querySelector('.member-spotlights .spotlight-carousel');
    if (spotlightCarousel) {
        const memberCards = spotlightCarousel.querySelectorAll('.spotlight-card');
        memberCards.forEach((card, index) => {
            if (index >= MEMBERS_TO_SHOW_ON_HOMEPAGE) {
                card.style.display = 'none'; // Hide members beyond the limit
            } else {
                card.style.display = ''; // Ensure first N members are visible
            }
        });
        console.log(`Limited homepage members display to ${MEMBERS_TO_SHOW_ON_HOMEPAGE}.`);
    }
}

// --- Directory Page Specific Functions ---
const membersGrid = document.getElementById('members-grid');
const memberCountSpan = document.getElementById('member-count');
const loadMoreBtn = document.getElementById('load-more-members');

const directorySiteSearch = document.getElementById('directory-site-search');
const directoryFilterCategory = document.getElementById('directory-filter-category');
const directoryFilterLocation = document.getElementById('directory-filter-location');
const directoryFilterSize = document.getElementById('directory-filter-size');
const directorySortBy = document.getElementById('directory-sort-by');
const directoryResetFiltersBtn = document.getElementById('directory-reset-filters');
const directorySearchSubmitBtn = document.getElementById('directory-search-submit');

const memberDetailModal = document.getElementById('member-detail-modal');
const memberDetailBody = document.getElementById('member-detail-body');
const closeModalBtn = memberDetailModal ? memberDetailModal.querySelector('.close-button') : null;


// Function to render members to the grid
function renderMembers(membersToRender) {
    if (!membersGrid) return; // Ensure element exists

    const startIndex = displayedMembersCount;
    const endIndex = Math.min(membersToRender.length, startIndex + MEMBERS_PER_PAGE_DIRECTORY);

    for (let i = startIndex; i < endIndex; i++) {
        const member = membersToRender[i];
        const memberCard = document.createElement('div');
        memberCard.classList.add('spotlight-card'); // Re-using existing card style
        memberCard.dataset.memberId = member.id; // Store ID for modal lookup
        memberCard.innerHTML = `
            <img src="${member.imgSrc}" alt="${member.imgAlt}">
            <h4>${member.name}</h4>
            <p data-category="${member.category}" data-size="${member.size}" data-popularity="${member.popularity}">
                ${member.description}
            </p>
            <a href="${member.link}" class="cta-button primary-cta">View Details</a>
        `;
        const imgElement = memberCard.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
       
        memberCard.addEventListener('click', (e) => {
            // Prevent default behavior if clicking on a specific link/button inside the card
            // (e.g., if you had other links that should behave differently)
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return; 
            }
            window.location.href = member.link; // Navigate to the member's dedicated page
        });
        membersGrid.appendChild(memberCard);
    }

    displayedMembersCount = endIndex;
    updateMemberCount(membersToRender.length);

    // Hide Load More button if all members are displayed
    if (loadMoreBtn) {
        if (displayedMembersCount >= membersToRender.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Function to update the member count display
function updateMemberCount(totalFiltered) {
    if (memberCountSpan) {
        memberCountSpan.textContent = `(Showing ${displayedMembersCount} of ${totalFiltered} Members)`;
    }

    // Update insights panel counts
    const totalMembersCountSpan = document.getElementById('total-members-count');
    if (totalMembersCountSpan) {
        totalMembersCountSpan.textContent = allMembersData.length; // All unique members
    }
    const uniqueIndustriesCountSpan = document.getElementById('unique-industries-count');
    if (uniqueIndustriesCountSpan) {
        const uniqueCategories = new Set(allMembersData.map(m => m.category));
        uniqueIndustriesCountSpan.textContent = uniqueCategories.size;
    }
}

// Function to filter and sort members
function filterAndSortMembers() {
    let filteredMembers = [...allMembersData]; // Start with all members

    const searchTerm = directorySiteSearch ? directorySiteSearch.value.toLowerCase() : '';
    const categoryFilter = directoryFilterCategory ? directoryFilterCategory.value : '';
    const locationFilter = directoryFilterLocation ? directoryFilterLocation.value : '';
    const sizeFilter = directoryFilterSize ? directoryFilterSize.value : '';
    const sortBy = directorySortBy ? directorySortBy.value : 'popularity-desc';

    // Apply search term
    if (searchTerm) {
        filteredMembers = filteredMembers.filter(member =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.description.toLowerCase().includes(searchTerm) ||
            (member.fullDescription && member.fullDescription.toLowerCase().includes(searchTerm)) ||
            (member.category && member.category.toLowerCase().includes(searchTerm))
        );
    }

    // Apply filters
    if (categoryFilter) {
        filteredMembers = filteredMembers.filter(member => member.category === categoryFilter);
    }
    if (locationFilter) {
        filteredMembers = filteredMembers.filter(member => member.location === locationFilter);
    }
    if (sizeFilter) {
        filteredMembers = filteredMembers.filter(member => member.size === sizeFilter);
    }

    // Apply sorting
    filteredMembers.sort((a, b) => {
        if (sortBy === 'alphabetical-asc') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'alphabetical-desc') {
            return b.name.localeCompare(a.name);
        } else if (sortBy === 'newest') {
            // Assuming newer members have higher foundingYear, or we'd need a 'joinedDate'
            return (b.foundingYear || 0) - (a.foundingYear || 0);
        } else if (sortBy === 'popularity-asc') {
            const popularityMap = { 'low': 1, 'medium': 2, 'high': 3 };
            return popularityMap[a.popularity] - popularityMap[b.popularity];
        } else if (sortBy === 'popularity-desc') {
            const popularityMap = { 'low': 1, 'medium': 2, 'high': 3 };
            return popularityMap[b.popularity] - popularityMap[a.popularity];
        }
        return 0;
    });

    // Reset display and render first batch of filtered members
    if (membersGrid) membersGrid.innerHTML = ''; // Clear current grid
    displayedMembersCount = 0;
    renderMembers(filteredMembers);
}

// Function to show member details in a modal
function showMemberDetails(memberId) {
    const member = allMembersData.find(m => m.id === memberId);
    if (member && memberDetailModal && memberDetailBody) {
        memberDetailBody.innerHTML = `
            ${member.imgSrc ? `<img src="${member.imgSrc}" alt="${member.imgAlt || member.name} Logo">` : ''}
            <h3>${member.name}</h3>
            <p><strong>Category:</strong> ${member.category.charAt(0).toUpperCase() + member.category.slice(1)}</p>
            <p><strong>Location:</strong> ${member.location.charAt(0).toUpperCase() + member.location.slice(1)}</p>
            <p><strong>Business Size:</strong> ${member.size.charAt(0).toUpperCase() + member.size.slice(1)}</p>
            <p>${member.fullDescription || member.description}</p>
            ${member.contact ? `<p><strong>Contact:</strong> <a href="mailto:${member.contact}">${member.contact}</a></p>` : ''}
            ${member.website ? `<p><strong>Website:</strong> <a href="http://${member.website}" target="_blank">${member.website}</a></p>` : ''}
            ${member.foundingYear ? `<p><strong>Founded:</strong> ${member.foundingYear}</p>` : ''}
            ${member.link ? `<a href="${member.link}" class="btn btn-primary" style="margin-top: 1rem;">Go to Member Page</a>` : ''}
        `;
        const imgElement = memberDetailBody.querySelector('img');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
        memberDetailModal.style.display = 'flex'; // Show the modal
    }
}

// Event listeners for directory specific elements
function setupDirectoryListeners() {
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
            if (directorySiteSearch) directorySiteSearch.value = '';
            if (directoryFilterCategory) directoryFilterCategory.value = '';
            if (directoryFilterLocation) directoryFilterLocation.value = '';
            if (directoryFilterSize) directoryFilterSize.value = '';
            if (directorySortBy) directorySortBy.value = 'popularity-desc'; // Default sort
            filterAndSortMembers();
        });
    }
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => renderMembers(currentFilteredMembers)); // currentFilteredMembers needs to be global or passed
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (memberDetailModal) memberDetailModal.style.display = 'none';
        });
    }
    if (memberDetailModal) {
        window.addEventListener('click', (event) => {
            if (event.target === memberDetailModal) {
                memberDetailModal.style.display = 'none';
            }
        });
    }
}

let currentFilteredMembers = []; // Store the currently filtered and sorted members globally for load more

// --- Core UI & Utility Initializations (Common to all pages) ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Image Error Handling ---
    const placeholderImagePath = 'images/placeholder.png'; // Make sure this path is correct

    const images = document.querySelectorAll('img'); // Selects all <img> tags

    images.forEach(img => {
        img.onerror = function() {
            // Prevent an infinite loop if the placeholder itself fails to load
            this.onerror = null;
            // Set the source to the placeholder image
            this.src = placeholderImagePath;
            console.warn(`Image failed to load: ${this.alt || this.src}, replaced with placeholder.`);
        };
    });

    // --- Hamburger Menu Toggle ---
    const hamButton = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');

    if (hamButton && mainNav) {
        hamButton.addEventListener('click', () => {
            mainNav.classList.toggle('main-nav-open');
            hamButton.querySelector('i').classList.toggle('fa-bars');
            hamButton.querySelector('i').classList.toggle('fa-times'); // Change icon to 'X'
        });
    }

    // --- Global Search Bar Toggle & Filters ---
    const searchToggle = document.getElementById('search-toggle');
    const searchBarContainer = document.getElementById('search-bar-container');
    const siteSearchInput = document.getElementById('site-search');
    // Corrected IDs for the new filter selects
    const searchTypeFilter = document.getElementById('search-type-filter');
    const searchLocationFilter = document.getElementById('search-location-filter');
    const searchSubmitBtn = document.getElementById('search-submit-btn');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const searchMicBtn = document.getElementById('search-mic-btn');

    // Get search history and suggestions containers
    const searchSuggestionsDiv = document.getElementById('search-suggestions');
    const searchHistoryDiv = document.getElementById('search-history');

    // Make sure all required elements are found before proceeding
    if (searchToggle && searchBarContainer && siteSearchInput && searchTypeFilter && searchLocationFilter && searchSubmitBtn && searchClearBtn && searchMicBtn && searchSuggestionsDiv && searchHistoryDiv) {
        // Function to toggle search bar visibility and manage focus
        function toggleSearchBar() {
            searchBarContainer.classList.toggle('show-search');
            if (searchBarContainer.classList.contains('show-search')) {
                siteSearchInput.focus();
                displaySearchHistory(); // Show history when search bar opens
            } else {
                siteSearchInput.value = ''; // Clear input when hiding
                toggleSearchControls(false); // Reset controls
                searchSuggestionsDiv.innerHTML = ''; // Clear suggestions
                searchHistoryDiv.innerHTML = ''; // Clear history
            }
        }

        searchToggle.addEventListener('click', toggleSearchBar);

        // Close search bar if clicking outside of it
        document.addEventListener('click', (event) => {
            // Check if click is outside search bar container AND not on the search toggle button itself
            if (!searchBarContainer.contains(event.target) && !searchToggle.contains(event.target) && searchBarContainer.classList.contains('show-search')) {
                toggleSearchBar();
            }
        });

        // Function to toggle clear, mic, and submit buttons based on input
        function toggleSearchControls(hasInput) {
            searchClearBtn.style.display = hasInput ? 'inline-block' : 'none';
            searchMicBtn.style.display = hasInput ? 'none' : 'inline-block';
            searchSubmitBtn.style.display = hasInput ? 'inline-block' : 'none';
        }

        // Event listener for input changes
        siteSearchInput.addEventListener('input', () => {
            const hasInput = siteSearchInput.value.length > 0;
            toggleSearchControls(hasInput);
            if (hasInput) {
                fetchSearchSuggestions(siteSearchInput.value);
            } else {
                searchSuggestionsDiv.innerHTML = ''; // Clear suggestions if input is empty
            }
        });

        // Clear button functionality
        searchClearBtn.addEventListener('click', () => {
            siteSearchInput.value = '';
            toggleSearchControls(false);
            searchSuggestionsDiv.innerHTML = '';
            siteSearchInput.focus();
        });

        // Search execution (can be triggered by submit button or Enter key)
        function performSearch() {
            const query = siteSearchInput.value.trim();
            const type = searchTypeFilter.value;
            const location = searchLocationFilter.value;

            if (query) {

                const normalizedQuery = query.toLowerCase().replace(/ /g, '-'); // Example normalization
                const foundMember = allMembersData.find(member => 
                    member.id === normalizedQuery || member.name.toLowerCase() === query.toLowerCase()
                );

                if (foundMember) {
                    window.location.href = foundMember.link; // Redirect to member's specific page
                    return; // Stop execution of this function
                }
                console.log(`Global Search executed for: "${query}" (Type: ${type}, Location: ${location})`);
                saveSearchHistory(query);

                // Construct URL for redirection to directory.html
                const url = new URL('directory.html', window.location.origin);
                if (query) {
                    url.searchParams.set('search', query);
                }
                if (type && type !== 'all') { // Only add if a specific type is selected
                    url.searchParams.set('category', type);
                }
                if (location && location !== 'all') { // Only add if a specific location is selected
                    url.searchParams.set('location', location);
                }
                
                // Perform the redirection
                window.location.href = url.toString();

                // Optionally, hide the search bar after search (this line will be executed after navigation starts, but kept for logical flow)
                toggleSearchBar(); 
            } else {
                alert('Please enter a search term for global search.');
            }
        }

        searchSubmitBtn.addEventListener('click', performSearch);

        siteSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent default form submission
                performSearch();
            }
        });

        // Dummy data for search history (replace with localStorage in a real app)
        let searchHistory = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];

        function saveSearchHistory(query) {
            // Add to history, ensuring no duplicates and limited size
            searchHistory = searchHistory.filter(item => item !== query); // Remove if already exists
            searchHistory.unshift(query); // Add to the beginning
            searchHistory = searchHistory.slice(0, 5); // Keep only the latest 5
            localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
            displaySearchHistory(); // Refresh display
        }

        function displaySearchHistory() {
            searchHistoryDiv.innerHTML = ''; // Clear existing history
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

        // Dummy data for global search suggestions
        const allSearchableTerms = [
            "retail", "health", "e-commerce", "automotive", "real-estate", "catering", "beauty", "arts",
            "Duka Lako Supermart", "AfyaCare Clinic", "iMall", "AutoGiant Motors", "Grand Auto Imports",
            "Wheel N' Fix", "Soko Properties", "Taste of Africa Catering", "Urban Edge Barbershop & Spa",
            "Creative Canvas Studios", "Nairobi events", "business growth", "networking", "memberships",
            "privacy policy", "terms of service", "FAQs", "about La Familia", "events calendar" // Example global search terms
        ];

        function fetchSearchSuggestions(query) {
            searchSuggestionsDiv.innerHTML = ''; // Clear existing suggestions
            const lowerCaseQuery = query.toLowerCase();
            const matchingSuggestions = allSearchableTerms.filter(term =>
                term.toLowerCase().includes(lowerCaseQuery) && term.toLowerCase() !== lowerCaseQuery
            ).slice(0, 5); // Limit to 5 suggestions

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

        // Initialize state for controls when search bar is not active
        toggleSearchControls(false);

    } else {
        console.warn("One or more GLOBAL search bar elements not found. Global Search functionality may be limited.", {
            searchToggle: searchToggle,
            searchBarContainer: searchBarContainer,
            siteSearchInput: siteSearchInput,
            searchTypeFilter: searchTypeFilter,
            searchLocationFilter: searchLocationFilter,
            searchSubmitBtn: searchSubmitBtn,
            searchClearBtn: searchClearBtn,
            searchMicBtn: searchMicBtn,
            searchSuggestionsDiv: searchSuggestionsDiv,
            searchHistoryDiv: searchHistoryDiv
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

        // Set initial mode based on localStorage or system preference
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

    // --- Hero Image Slider (Homepage Only) ---
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;
    if (heroImages.length > 0) {
        setInterval(() => {
            heroImages[currentImageIndex].classList.remove('active-slide');
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImages[currentImageIndex].classList.add('active-slide');
        }, 5000); // Change image every 5 seconds
    }

    // --- Ad Space Slider (Homepage Only) ---
    const adImages = document.querySelectorAll('.ad-image');
    let currentAdIndex = 0;
    if (adImages.length > 0) {
        setInterval(() => {
            adImages[currentAdIndex].classList.remove('active-ad');
            currentAdIndex = (currentAdIndex + 1) % adImages.length;
            adImages[currentAdIndex].classList.add('active-ad');
        }, 7000); // Change ad every 7 seconds
    }

    // --- Initialize Weather on applicable pages ---
    if (document.getElementById('weather-display')) {
        fetchWeather();
    }

    // --- Handle Homepage Member Spotlights ---
    // This runs on homepage to parse existing HTML members and limit display.
    if (document.querySelector('.member-spotlights')) {
        parseMemberDataFromHomepage(); // Parses homepage HTML for spotlights
        limitHomepageMembersDisplay(); // Limits how many are shown
    }

    // --- Initialize Directory Page Functionality ---
    // This block only runs if the 'members-grid' element exists (i.e., on directory.html)
    if (document.getElementById('members-grid')) {
        currentFilteredMembers = [...allMembersData]; // Initialize current filtered list with all members
        setupDirectoryListeners(); // Setup event listeners for directory filters/search
        filterAndSortMembers(); // Initial render and count update
        
        // Handle initial hash in URL for direct member linking (from previous directory.html script)
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            setTimeout(() => showMemberDetails(initialHash), 500); // Small delay to ensure render
        }

        // Event listener for load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => renderMembers(currentFilteredMembers));
        }
    }


    // Initialize image fallbacks for all images on the page
    document.querySelectorAll('img').forEach(setupImageFallback);
});
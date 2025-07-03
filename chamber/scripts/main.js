document.addEventListener('DOMContentLoaded', () => {
    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

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

    // --- Search Bar Toggle & Filters ---
    const searchToggle = document.getElementById('search-toggle');
    const searchBarContainer = document.getElementById('search-bar-container');
    const siteSearchInput = document.getElementById('site-search');
    const filterCategory = document.getElementById('filter-category');
    const filterSize = document.getElementById('filter-size');
    const filterPopularity = document.getElementById('filter-popularity');
    const searchSubmit = document.getElementById('search-submit');

    if (searchToggle && searchBarContainer && siteSearchInput && filterCategory && filterSize && filterPopularity && searchSubmit) {
        searchToggle.addEventListener('click', () => {
            searchBarContainer.classList.toggle('search-bar-visible');
            if (searchBarContainer.classList.contains('search-bar-visible')) {
                siteSearchInput.focus(); // Focus input when visible
            }
        });

        // Simple search and filter (for demonstration, would typically lead to directory page)
        searchSubmit.addEventListener('click', () => {
            const query = siteSearchInput.value.toLowerCase();
            const category = filterCategory.value;
            const size = filterSize.value;
            const popularity = filterPopularity.value;

            alert(`Searching for:\nQuery: "${query}"\nCategory: "${category}"\nSize: "${size}"\nPopularity: "${popularity}"\n\n(This would typically lead to the Member Directory with filtered results.)`);
            // You would redirect to directory.html with query parameters:
            // window.location.href = `directory.html?q=${query}&category=${category}&size=${size}&popularity=${popularity}`;
        });

        // Optional: Hide search bar if clicked outside (on desktop)
        document.addEventListener('click', (event) => {
            const isClickInsideSearchBar = searchBarContainer.contains(event.target);
            const isClickOnSearchToggle = searchToggle.contains(event.target);
            const isMobileNavOpen = mainNav && mainNav.classList.contains('main-nav-open');

            if (!isClickInsideSearchBar && !isClickOnSearchToggle && !isMobileNavOpen) {
                 if (searchBarContainer.classList.contains('search-bar-visible') && window.innerWidth >= 768) { // Only on desktop
                    searchBarContainer.classList.remove('search-bar-visible');
                }
            }
        });
    }

    // --- Dark/Light Mode Toggle ---
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            modeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun'); // Show sun icon
        } else {
             modeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon'); // Show moon icon
        }
    }

    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');

            // Toggle icon
            if (isDarkMode) {
                modeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            } else {
                modeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // --- Placeholder Alert for Nav Links ---
    const navLinks = document.querySelectorAll('#main-nav a:not([href="index.html"]):not([href="discover.html"]):not([href="directory.html"]):not([href="join.html"])');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the default link behavior
            alert(`"${event.target.textContent}" page to be added soon. Stay tuned!`);
            // You can optionally still navigate if you prefer, after the alert
            // window.location.href = event.target.href;
        });
    });


    // --- Rotating Hero Images ---
    let heroSlideIndex = 0;
    const heroSlides = document.querySelectorAll('.hero-image');
    const showHeroSlides = () => {
        heroSlides.forEach((slide, index) => {
            slide.classList.remove('active-slide');
            if (index === heroSlideIndex) {
                slide.classList.add('active-slide');
            }
        });
        heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    };
    if (heroSlides.length > 0) {
        showHeroSlides(); // Show first image immediately
        setInterval(showHeroSlides, 5000); // Change image every 5 seconds
    }


    // --- Rotating Ad Images ---
    let adSlideIndex = 0;
    const adSlides = document.querySelectorAll('.ad-image');
    const showAdSlides = () => {
        adSlides.forEach((slide, index) => {
            slide.classList.remove('active-ad');
            if (index === adSlideIndex) {
                slide.classList.add('active-ad');
            }
        });
        adSlideIndex = (adSlideIndex + 1) % adSlides.length;
    };
    if (adSlides.length > 0) {
        showAdSlides(); // Show first ad immediately
        setInterval(showAdSlides, 7000); // Change ad every 7 seconds
    }


    // --- Weather API Integration for Nairobi ---
    const WEATHER_API_KEY = 'c8d5db76fb55df0628b2ea568d5d200b'; // Your provided API Key
    const WEATHER_CITY = 'Nairobi';
    const WEATHER_UNIT = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit

    const weatherDisplay = document.getElementById('weather-display');

    async function getNairobiWeather() {
        if (!WEATHER_API_KEY) {
            if (weatherDisplay) {
                weatherDisplay.innerHTML = '<p>Weather API key is missing. Please configure it.</p>';
            }
            console.error('OpenWeatherMap API key is missing.');
            return;
        }

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&units=${WEATHER_UNIT}&appid=${WEATHER_API_KEY}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${WEATHER_CITY}&units=${WEATHER_UNIT}&appid=${WEATHER_API_KEY}`;

        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentWeatherUrl),
                fetch(forecastUrl)
            ]);

            if (!currentResponse.ok) throw new Error(`Current Weather HTTP error! status: ${currentResponse.status}`);
            if (!forecastResponse.ok) throw new Error(`Forecast HTTP error! status: ${forecastResponse.status}`);

            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();

            displayWeather(currentData, forecastData);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            if (weatherDisplay) {
                weatherDisplay.innerHTML = '<p>Could not load weather data for Nairobi.</p>';
            }
        }
    }

    function displayWeather(currentData, forecastData) {
        if (!weatherDisplay) return;

        // --- Display Current Weather ---
        const currentTemp = currentData.main.temp.toFixed(0);
        const currentDescription = currentData.weather[0].description;
        const currentIconCode = currentData.weather[0].icon;
        const currentIconUrl = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;

        weatherDisplay.innerHTML = `
            <div class="current-weather">
                <h4>Current in Nairobi</h4>
                <p>${currentTemp}°${WEATHER_UNIT === 'metric' ? 'C' : 'F'}</p>
                <img src="${currentIconUrl}" alt="${currentDescription}" title="${currentDescription}">
                <p style="text-transform: capitalize;">${currentDescription}</p>
            </div>
        `;

        // --- Display 5-Day Forecast ---
        const forecastContainer = document.createElement('div');
        forecastContainer.classList.add('weather-forecast');
        forecastContainer.innerHTML = '<h4>5-Day Forecast</h4>';

        // Filter forecast data for daily summaries (around midday for each day)
        // OpenWeatherMap's forecast provides data every 3 hours. We'll pick one entry per day.
        const dailyForecasts = {};
        let count = 0;
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000); // Convert timestamp to Date object
            const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const hour = date.getHours();

            // Only add up to 5 unique days
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

    // Call weather function on page load
    getNairobiWeather();

});
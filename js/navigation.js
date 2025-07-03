// js/navigation.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav'); // Select the <nav> element
    // Get the <i> element inside the hamburger button to change its icon
    const hamburgerIcon = hamburgerMenu ? hamburgerMenu.querySelector('i') : null;

    if (hamburgerMenu && mainNav && hamburgerIcon) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('open'); // Toggle the 'open' class on the <nav>

            // Toggle the icon and aria-label based on the menu's open state
            if (mainNav.classList.contains('open')) {
                hamburgerIcon.classList.replace('fa-bars', 'fa-times'); // Change to X icon
                hamburgerMenu.setAttribute('aria-label', 'Close navigation'); // Update aria-label for accessibility
            } else {
                hamburgerIcon.classList.replace('fa-times', 'fa-bars'); // Change back to bars icon
                hamburgerMenu.setAttribute('aria-label', 'Open navigation'); // Reset aria-label
            }
        });

        // Optional: Close menu when a link inside it is clicked (common for single-page sites)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    // Ensure the icon also reverts when closing by clicking a link
                    hamburgerIcon.classList.replace('fa-times', 'fa-bars');
                    hamburgerMenu.setAttribute('aria-label', 'Open navigation');
                }
            });
        });
    } else {
        console.warn('Hamburger menu, main navigation, or hamburger icon element not found. Mobile menu functionality may be impaired.');
    }
});
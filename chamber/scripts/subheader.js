document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('imall-profile-icon');
    const profileDropdown = document.getElementById('imall-profile-dropdown');
    const cartIcon = document.getElementById('imall-cart-icon');
    const cartPrompt = document.getElementById('imall-cart-prompt');
    const featureAlert = document.getElementById('imall-feature-alert');
    const alertOkBtn = document.getElementById('imall-alert-ok-btn');

    function toggleVisibility(element) {
        element.classList.toggle('imall-hidden');
    }

    function hideAllPopups() {
        profileDropdown.classList.add('imall-hidden');
        cartPrompt.classList.add('imall-hidden');
        featureAlert.classList.add('imall-hidden');
    }

    // Event listener for Profile Icon - STOP PROPAGATION HERE to prevent immediate re-hide by document click
    if (profileIcon) {
        profileIcon.addEventListener('click', (event) => {
            console.log('Profile Icon clicked!');
            event.stopPropagation(); 
            hideAllPopups();
            toggleVisibility(profileDropdown);
        });
    }

    // Event listener for Cart Icon - STOP PROPAGATION HERE to prevent immediate re-hide by document click
    if (cartIcon) {
        cartIcon.addEventListener('click', (event) => {
            console.log('Cart Icon clicked!');
            event.stopPropagation();
            hideAllPopups();
            toggleVisibility(cartPrompt);
        });
    }

    // Event listener for 'OK' button in the feature alert
    if (alertOkBtn) {
        alertOkBtn.addEventListener('click', () => {
            console.log('Alert OK button clicked!');
            featureAlert.classList.add('imall-hidden');
        });
    }

    // Delegate click events for dropdown items that show the alert
    // This listener is on document.body, so clicks from inside dropdowns will bubble up to it.
    document.body.addEventListener('click', (event) => {
        const targetElement = event.target.closest('a[data-feature], button');

        // If a feature link (e.g., My Orders, Wishlist) was clicked
        if (targetElement && targetElement.matches('a[data-feature]')) {
            console.log('Feature link clicked:', targetElement.dataset.feature);
            event.preventDefault(); // Prevent default link behavior
            hideAllPopups(); // Hide any open dropdowns (including the one just clicked from)
            featureAlert.classList.remove('imall-hidden'); // Show the alert
        }
        // If a generic button (excluding those with specific handlers) was clicked
        else if (targetElement && targetElement.tagName === 'BUTTON' && 
                 !['imall-login-btn', 'imall-register-btn', 'imall-search-button', 
                  'imall-continue-exploring', 'imall-profile-icon', 'imall-cart-icon', 
                  'imall-alert-ok-btn'].includes(targetElement.id)) {
            console.log('Generic button clicked (showing alert):', targetElement.id);
            event.preventDefault();
            hideAllPopups();
            featureAlert.classList.remove('imall-hidden'); // Show the alert
        }
    });

    // Hide all dropdowns/alerts if clicked anywhere on the document *outside* an open popup or its icon
    document.addEventListener('click', (event) => {
        // Hide profile dropdown if click is outside it AND its icon
        if (!profileDropdown.contains(event.target) && !profileIcon.contains(event.target)) {
            profileDropdown.classList.add('imall-hidden');
        }
        // Hide cart prompt if click is outside it AND its icon
        if (!cartPrompt.contains(event.target) && !cartIcon.contains(event.target)) {
            cartPrompt.classList.add('imall-hidden');
        }
        // The featureAlert is global; it's designed to be closed by its own OK button.
        // No specific document click is needed to close it here, as hideAllPopups handles it.
    });

    // REMOVED: event.stopPropagation() from dropdowns themselves.
    // This allows clicks inside them (like data-feature links) to bubble up
    // to the document.body event listener, which handles showing the alert.
});
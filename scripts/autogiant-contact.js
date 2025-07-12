// scripts/autogiant-contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatusMessage = document.getElementById('form-status-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Clear previous messages
            formStatusMessage.style.display = 'none';
            formStatusMessage.classList.remove('success', 'error');
            formStatusMessage.textContent = '';

            // Get form fields
            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // Basic Validation
            let isValid = true;
            let errorMessage = '';

            if (fullName === '') {
                isValid = false;
                errorMessage += 'Full Name is required.<br>';
            }
            if (email === '') {
                isValid = false;
                errorMessage += 'Email Address is required.<br>';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Simple email regex
                isValid = false;
                errorMessage += 'Please enter a valid Email Address.<br>';
            }
            if (subject === '') {
                isValid = false;
                errorMessage += 'Subject is required.<br>';
            }
            if (message === '') {
                isValid = false;
                errorMessage += 'Message is required.<br>';
            }

            if (isValid) {
                // Simulate form submission (no actual server call)
                console.log('Form Submitted Data:', {
                    fullName,
                    email,
                    phone,
                    subject,
                    message
                });

                // Display success message
                formStatusMessage.classList.add('success');
                formStatusMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
                formStatusMessage.style.display = 'block';

                // Clear the form
                contactForm.reset();

            } else {
                // Display error message
                formStatusMessage.classList.add('error');
                formStatusMessage.innerHTML = errorMessage; // Use innerHTML for <br> tags
                formStatusMessage.style.display = 'block';
            }
        });
    }
});

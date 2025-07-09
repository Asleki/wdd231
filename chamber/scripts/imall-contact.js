// scripts/imall-contact.js

// This script handles the contact form submission and client-side validation.

// --- DOM Element References ---
const contactForm = document.getElementById('contact-form');
const formStatusMessage = document.getElementById('form-status-message');

// --- Helper Functions ---

/**
 * Displays an error or success message.
 * @param {HTMLElement} element - The DOM element to display the message in.
 * @param {string} message - The message text.
 * @param {'success' | 'error'} type - The type of message ('success' or 'error').
 */
function displayMessage(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = `status-message ${type}`; // Add class for styling
    element.style.display = 'block'; // Ensure it's visible
}

/**
 * Clears all error messages and invalid field indicators.
 */
function clearErrors() {
    document.querySelectorAll('.error-feedback').forEach(el => el.textContent = '');
    document.querySelectorAll('.invalid-field').forEach(el => el.remove('invalid-field'));
    if (formStatusMessage) {
        formStatusMessage.textContent = '';
        formStatusMessage.className = 'status-message';
        formStatusMessage.style.display = 'none';
    }
}

/**
 * Shows an error message next to a specific form field.
 * @param {HTMLElement} fieldElement - The input/textarea field.
 * @param {string} message - The error message.
 */
function showFieldError(fieldElement, message) {
    fieldElement.classList.add('invalid-field'); // Add class for styling
    const errorDiv = fieldElement.nextElementSibling; // Assumes error-feedback div is next sibling
    if (errorDiv && errorDiv.classList.contains('error-feedback')) {
        errorDiv.textContent = message;
    } else {
        // Fallback if structure is different
        const newErrorDiv = document.createElement('div');
        newErrorDiv.className = 'error-feedback';
        newErrorDiv.textContent = message;
        fieldElement.parentNode.insertBefore(newErrorDiv, fieldElement.nextSibling);
    }
}

/**
 * Validates the contact form fields.
 * @param {HTMLFormElement} form - The form element to validate.
 * @returns {boolean} True if the form is valid, false otherwise.
 */
function validateContactForm(form) {
    clearErrors(); // Clear previous errors on new validation attempt
    let isValid = true;

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    if (!nameField.value.trim()) {
        showFieldError(nameField, 'Name is required.');
        isValid = false;
    }

    if (!emailField.value.trim()) {
        showFieldError(emailField, 'Email is required.');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address.');
        isValid = false;
    }

    if (!subjectField.value.trim()) {
        showFieldError(subjectField, 'Subject is required.');
        isValid = false;
    }

    if (!messageField.value.trim()) {
        showFieldError(messageField, 'Message is required.');
        isValid = false;
    }

    return isValid;
}


// --- Event Handlers ---

/**
 * Handles the contact form submission.
 * @param {Event} event - The form submission event.
 */
function handleContactFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    if (validateContactForm(contactForm)) {
        // Form is valid, simulate submission
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        console.log('--- Contact Form Submission Simulated ---');
        console.log('Form Data:', formData);
        console.log('In a real application, this data would be sent to a backend server.');

        // Simulate a delay for server response
        displayMessage(formStatusMessage, 'Sending message...', 'info'); // Add 'info' style if you define it
        contactForm.querySelector('button[type="submit"]').disabled = true; // Disable button

        setTimeout(() => {
            displayMessage(formStatusMessage, 'Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            contactForm.reset(); // Clear the form
            contactForm.querySelector('button[type="submit"]').disabled = false; // Re-enable button
            console.log('Simulated message sent successfully.');
        }, 2000); // Simulate 2-second delay
    } else {
        displayMessage(formStatusMessage, 'Please correct the errors in the form.', 'error');
    }
}


// --- Initialization ---

/**
 * Initializes the contact page functionality.
 */
function initContactPage() {
    // Only run this script if on the contact.html page
    if (document.body.id !== 'contact-page') {
        return;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    console.log('iMall Contact Page initialized.');
}

// Ensure the DOM is fully loaded before initializing the script
document.addEventListener('DOMContentLoaded', initContactPage);
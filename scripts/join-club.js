// scripts/join-club.js

// Data for clubs (in a real application, this would come from an API or a separate JSON file)
let allClubsData = []; // Will store fetched club data
let allMembersData = []; // Will store fetched members data (for validation)

// --- Utility Functions ---
async function fetchClubsData() {
    if (allClubsData.length === 0) { // Only fetch if data isn't already loaded
        try {
            const response = await fetch('clubs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allClubsData = await response.json();
            console.log("Clubs data fetched:", allClubsData);
        } catch (error) {
            console.error("Could not fetch clubs data:", error);
            // Optionally display an error message to the user
            const clubList = document.getElementById('club-selection-list');
            if (clubList) {
                clubList.innerHTML = '<p class="error-message">Failed to load clubs. Please try again later.</p>';
            }
        }
    }
}

async function fetchMembersData() {
    if (allMembersData.length === 0) { // Only fetch if data isn't already loaded
        try {
            const response = await fetch('members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allMembersData = await response.json();
            console.log("Members data fetched:", allMembersData);
        } catch (error) {
            console.error("Could not fetch members data:", error);
            // This error might not need a user-facing message on this page directly
        }
    }
}

// --- Club Selection Logic ---
const clubSelectionList = document.getElementById('club-selection-list');
const selectedClubDisplay = document.getElementById('selected-club-display');
const selectedClubIdInput = document.createElement('input'); // Hidden input to store selected club ID
selectedClubIdInput.type = 'hidden';
selectedClubIdInput.name = 'selectedClubId';
// Append to form, not wizard directly as it might be nested
document.getElementById('club-application-wizard').appendChild(selectedClubIdInput);

let selectedClub = null; // Stores the selected club object

function renderClubSelection() {
    if (!clubSelectionList) return; // Exit if element not found

    clubSelectionList.innerHTML = ''; // Clear previous content

    if (allClubsData.length === 0) {
        clubSelectionList.innerHTML = '<p>No clubs available at the moment. Please check back later.</p>';
        return;
    }

    allClubsData.forEach(club => {
        const clubItem = document.createElement('div');
        clubItem.classList.add('club-selection-item');
        clubItem.dataset.clubId = club.id;
        clubItem.innerHTML = `
            <img src="${club.image || 'images/placeholder.webp'}" alt="${club.name} Club Image">
            <h4>${club.name}</h4>
            <p>${club.description}</p>
        `;
        clubItem.addEventListener('click', () => {
            // Remove 'selected' class from all items
            document.querySelectorAll('.club-selection-item').forEach(item => {
                item.classList.remove('selected');
            });
            // Add 'selected' class to the clicked item
            clubItem.classList.add('selected');
            selectedClub = club;
            selectedClubDisplay.textContent = `Selected Club: ${club.name}`;
            selectedClubIdInput.value = club.id; // Update hidden input
            console.log("Selected club:", selectedClub.name);
        });
        clubSelectionList.appendChild(clubItem);
    });
}

// --- Form Wizard Logic ---
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');
const clubApplicationForm = document.getElementById('club-application-wizard');
const joinClubConfirmation = document.getElementById('join-club-confirmation');

let currentStep = 0;

function showStep(stepIndex) {
    formSteps.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add('active');
            step.style.display = 'block'; // Ensure it's visible
        } else {
            step.classList.remove('active');
            step.style.display = 'none'; // Hide other steps
        }
    });
    currentStep = stepIndex;

    // Specific logic for conditional fields based on the new flow
    if (currentStep === 2) { // This is the 'Your Details' step (original Step 1)
        toggleMemberFields(); // Ensure member/non-member fields are correctly displayed
    } else if (currentStep === 3) { // This is the 'Select Your Club' step (original Step 0)
        renderClubSelection(); // Ensure clubs are rendered when this step is shown
    }

    // Scroll to the top of the form when a new step is shown
    clubApplicationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validateStep(stepIndex) {
    let isValid = true;
    if (stepIndex === 0) { // New Step 0: Membership Status
        const isMemberRadios = document.querySelectorAll('input[name="isMember"]');
        let memberStatusSelected = false;
        isMemberRadios.forEach(radio => {
            if (radio.checked) {
                memberStatusSelected = true;
            }
        });
        if (!memberStatusSelected) {
            alert('Please specify your membership status to proceed.');
            isValid = false;
        }
    } else if (stepIndex === 1) { // New Step 1: Member Type
        const isMember = document.getElementById('is-member-yes').checked;
        if (isMember) { // Only validate member type if "Yes, I am a member" was selected
            const memberTypeRadios = document.querySelectorAll('input[name="memberType"]');
            let memberTypeSelected = false;
            memberTypeRadios.forEach(radio => {
                if (radio.checked) {
                    memberTypeSelected = true;
                }
            });
            if (!memberTypeSelected) {
                alert('Please select your member type to proceed.');
                isValid = false;
            }
        }
        // If "No, I am not a member" was selected in step 0, this step is skipped,
        // so validation isn't strictly needed here for the "No" path.
        // The navigation logic will handle skipping this step.
    } else if (stepIndex === 2) { // New Step 2: Your Details (original Step 1 content)
        const isMember = document.getElementById('is-member-yes').checked;
        if (isMember) {
            const memberId = document.getElementById('member-id');
            if (!memberId.value.trim()) {
                alert('Please enter your La Familia Member ID.');
                isValid = false;
            } else {
                // Simulate member ID validation against fetched data
                const foundMember = allMembersData.some(member => member.id === memberId.value.trim());
                if (!foundMember) {
                    alert('Member ID not found. Please check your ID or select "No" if you are not a member.');
                    isValid = false;
                }
            }
        } else { // Not a member
            const nonMemberName = document.getElementById('non-member-name');
            const nonMemberEmail = document.getElementById('non-member-email');
            const nonMemberPhone = document.getElementById('non-member-phone');

            if (!nonMemberName.value.trim()) {
                alert('Please enter your full name.');
                isValid = false;
            }
            if (!nonMemberEmail.value.trim() || !/\S+@\S+\.\S+/.test(nonMemberEmail.value.trim())) {
                alert('Please enter a valid email address.');
                isValid = false;
            }
            if (!nonMemberPhone.value.trim()) { // Basic check, could add regex for phone format
                alert('Please enter your phone number.');
                isValid = false;
            }
        }
    } else if (stepIndex === 3) { // New Step 3: Select Your Club (original Step 0 content)
        if (!selectedClub) {
            alert('Please select a club to proceed.');
            isValid = false;
        }
    }
    return isValid;
}

// Event Listeners for Navigation Buttons
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < formSteps.length - 1) {
                // Special navigation logic for step 0 (Membership Status)
                if (currentStep === 0) {
                    const isMember = document.getElementById('is-member-yes').checked;
                    if (isMember) {
                        showStep(currentStep + 1); // Go to Step 1 (Member Type)
                    } else {
                        // If "No, I am not a member" is selected, skip Step 1 (Member Type)
                        showStep(currentStep + 2); // Go directly to Step 2 (Your Details)
                    }
                } else if (currentStep === 3) { // If moving from Step 3 (Club Selection) to Step 4 (Confirmation)
                    populateConfirmationStep();
                    showStep(currentStep + 1);
                }
                else {
                    showStep(currentStep + 1); // Normal progression
                }
            }
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep > 0) {
            // Special navigation logic for step 2 (Your Details) when coming from step 0 (Membership Status)
            if (currentStep === 2) {
                const isMember = document.getElementById('is-member-yes').checked;
                if (!isMember) { // If user was a non-member, go back to Step 0
                    showStep(currentStep - 2);
                } else { // If user was a member, go back to Step 1
                    showStep(currentStep - 1);
                }
            } else {
                showStep(currentStep - 1); // Normal regression
            }
        }
    });
});

// Member Status Conditional Fields (now driven by Step 0 selection)
const isMemberRadios = document.querySelectorAll('input[name="isMember"]');
const memberIdField = document.getElementById('member-id-field');
const nonMemberFields = document.getElementById('non-member-fields');

function toggleMemberFields() {
    const isMember = document.getElementById('is-member-yes').checked;
    if (memberIdField && nonMemberFields) { // Ensure elements exist
        if (isMember) {
            memberIdField.style.display = 'block';
            nonMemberFields.style.display = 'none';
            // Clear non-member fields if "Yes" is selected
            document.getElementById('non-member-name').value = '';
            document.getElementById('non-member-email').value = '';
            document.getElementById('non-member-phone').value = '';
        } else { // No, I am not a member
            memberIdField.style.display = 'none';
            nonMemberFields.style.display = 'block';
            // Clear member ID field if "No" is selected
            document.getElementById('member-id').value = '';
        }
    }
}

// Add listeners to isMember radios to trigger toggleMemberFields immediately
isMemberRadios.forEach(radio => {
    radio.addEventListener('change', toggleMemberFields);
});


// Populate Confirmation Step
function populateConfirmationStep() {
    // Collect data from the form's fields to populate the confirmation step
    document.getElementById('confirm-club-name').textContent = selectedClub ? selectedClub.name : 'N/A';

    const isMember = document.getElementById('is-member-yes').checked;
    document.getElementById('confirm-member-status').textContent = isMember ? 'Yes (Existing Member)' : 'No (New Applicant)';

    const confirmMemberIdRow = document.getElementById('confirm-member-id-row');
    const confirmNonMemberNameRow = document.getElementById('confirm-non-member-name-row');
    const confirmNonMemberEmailRow = document.getElementById('confirm-non-member-email-row');
    const confirmNonMemberPhoneRow = document.getElementById('confirm-non-member-phone-row');

    if (isMember) {
        // If they are a member, also show their member type
        const memberType = document.querySelector('input[name="memberType"]:checked');
        if (memberType) {
            document.getElementById('confirm-member-status').textContent += ` (${memberType.labels[0].textContent.trim()})`;
        }

        document.getElementById('confirm-member-id').textContent = document.getElementById('member-id').value.trim();
        confirmMemberIdRow.style.display = 'list-item';
        confirmNonMemberNameRow.style.display = 'none';
        confirmNonMemberEmailRow.style.display = 'none';
        confirmNonMemberPhoneRow.style.display = 'none';
    } else {
        document.getElementById('confirm-non-member-name').textContent = document.getElementById('non-member-name').value.trim();
        document.getElementById('confirm-non-member-email').textContent = document.getElementById('non-member-email').value.trim();
        document.getElementById('confirm-non-member-phone').textContent = document.getElementById('non-member-phone').value.trim();
        confirmMemberIdRow.style.display = 'none';
        confirmNonMemberNameRow.style.display = 'list-item';
        confirmNonMemberEmailRow.style.display = 'list-item';
        confirmNonMemberPhoneRow.style.display = 'list-item';
    }
}


// Handle Form Submission
clubApplicationForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!validateStep(currentStep)) { // Final validation for the last step
        return;
    }

    // Collect all form data
    const formData = new FormData(clubApplicationForm);
    const applicationData = {};
    for (let [key, value] of formData.entries()) {
        applicationData[key] = value;
    }

    // Add selected club details if available
    if (selectedClub) {
        applicationData.selectedClubName = selectedClub.name;
        applicationData.selectedClubDescription = selectedClub.description;
    }

    // Simulate form submission (e.g., to an API endpoint)
    console.log("Submitting application data:", applicationData);

    // Construct a confirmation message for display/console
    let applicationDetails = `Application for: ${applicationData.selectedClubName || 'Unknown Club'}\n`;
    applicationDetails += `Membership Status: ${applicationData.isMember === 'yes' ? 'Existing Member' : 'New Applicant'}\n`;

    if (applicationData.isMember === 'yes') {
        applicationDetails += `Member ID: ${applicationData.memberId || 'N/A'}\n`;
        applicationDetails += `Member Type: ${applicationData.memberType || 'N/A'}\n`; // Add member type
    } else {
        applicationDetails += `Name: ${applicationData.nonMemberName || 'N/A'}\n`;
        applicationDetails += `Email: ${applicationData.nonMemberEmail || 'N/A'}\n`;
        applicationDetails += `Phone: ${applicationData.nonMemberPhone || 'N/A'}\n`;
    }

    // Simulate sending application and show confirmation
    joinClubConfirmation.textContent = `Thank you for your application to join the ${selectedClub ? selectedClub.name : 'selected club'}! We have received your details and will process your application shortly. A confirmation email has been sent to your provided email address.`;
    joinClubConfirmation.style.display = 'block';
    clubApplicationForm.reset(); // Clear the form
    showStep(0); // Reset to first step
    selectedClub = null; // Reset selected club
    selectedClubIdInput.value = ''; // Clear hidden input
    document.querySelectorAll('.club-selection-item').forEach(item => item.classList.remove('selected')); // Deselect clubs
    joinClubConfirmation.scrollIntoView({ behavior: 'smooth' }); // Scroll to confirmation

    console.log("Club Application Details:\n", applicationDetails); // Log details for debugging
});

// Initial setup
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch both clubs and members data on page load
    await fetchClubsData();
    await fetchMembersData();
    // No longer calling renderClubSelection here, it will be called when step 3 is shown
    // toggleMemberFields(); // This is now triggered by radio change listeners in step 0
    showStep(0); // Display the first step (Membership Status)
});
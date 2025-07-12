// clubs.js

(function() { // IIFE for scope isolation

    let allClubsData = []; // To store club data
    let allMembersData = []; // To store member data (for join club logic)

    /**
     * Fetches JSON data from a specified path.
     * This is a utility function, local to clubs.js.
     * @param {string} path - The URL path to the JSON file.
     * @returns {Promise<Array|Object>} - A promise that resolves with the parsed JSON data.
     */
    async function fetchLocalJSONData(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching data from ${path}:`, error);
            return []; // Return empty array or appropriate default on error
        }
    }

    /**
     * Fetches club data from clubs.json.
     */
    async function fetchClubsPageData() { // Renamed for uniqueness
        allClubsData = await fetchLocalJSONData('data/clubs.json');
        console.log("Clubs data loaded:", allClubsData);
    }

    /**
     * Fetches member data from members.json (needed for join club verification).
     */
    async function fetchMembersForClubs() { // Renamed for uniqueness
        allMembersData = await fetchLocalJSONData('data/members.2.json'); // Adjusted to new members.json version
        console.log("Members data for clubs loaded:", allMembersData);
    }

    /**
     * Renders club cards dynamically on the clubs page.
     */
    function renderClubsPageCards() { // Renamed for uniqueness
        const clubGrid = document.getElementById('clubs-page-grid'); // Unique ID
        if (!clubGrid || allClubsData.length === 0) return;

        clubGrid.innerHTML = ''; // Clear existing content

        allClubsData.forEach(club => {
            const clubCard = document.createElement('div');
            clubCard.classList.add('club-page-card'); // Unique class
            clubCard.innerHTML = `
                <img src="${club.image}" alt="${club.name}" onerror="this.onerror=null;this.src='images/placeholder.png';">
                <div class="club-page-info">
                    <h3>${club.name}</h3>
                    <p>${club.description}</p>
                    <div class="club-page-details">
                        <p>Members: <span>${club.details.membersCount}</span></p>
                        <p>Frequency: <span>${club.details.frequency}</span></p>
                        <p>Location: <span>${club.details.location}</span></p>
                    </div>
                    <a href="join-clubs.html?clubId=${club.id}" class="btn join-club-page-btn">Join Club</a>
                </div>
            `;
            clubGrid.appendChild(clubCard);
            // Utility for image fallback, could be duplicated or a very small shared helper
            setupClubsImageFallback(clubCard.querySelector('img'));
        });
    }

    /**
     * Sets up error handling for image elements to display a placeholder.
     * Unique to clubs.js to avoid dependency.
     */
    function setupClubsImageFallback(imgElement) {
        const placeholderImagePath = 'images/placeholder.png';
        imgElement.addEventListener('error', () => {
            if (imgElement.src !== placeholderImagePath) {
                imgElement.src = placeholderImagePath;
                imgElement.classList.add('image-error-fallback');
            }
        });
    }

    /**
     * Initializes the Join Club form.
     * This function will be called on join-clubs.html.
     */
    function initJoinClubForm() { // Renamed for uniqueness
        const joinClubForm = document.getElementById('join-club-application-form'); // Unique ID
        if (!joinClubForm) return;

        const urlParams = new URLSearchParams(window.location.search);
        const preSelectedClubId = urlParams.get('clubId');
        let currentSelectedClub = null;

        const clubSelectionContainer = document.getElementById('club-selection-list'); // Unique ID
        const memberStatusRadios = document.querySelectorAll('input[name="member-status"]');
        const nonMemberFields = document.getElementById('non-member-fields'); // Unique ID
        const memberIdField = document.getElementById('member-id-field'); // Unique ID
        const joinClubConfirmation = document.getElementById('join-club-confirmation'); // Unique ID
        const submitButton = document.getElementById('join-club-submit-btn'); // Unique ID

        // Render clubs for selection
        if (clubSelectionContainer && allClubsData.length > 0) {
            clubSelectionContainer.innerHTML = '';
            allClubsData.forEach(club => {
                const clubItem = document.createElement('div');
                clubItem.classList.add('club-application-item'); // Unique class
                if (preSelectedClubId === club.id) {
                    clubItem.classList.add('selected');
                    currentSelectedClub = club;
                }
                clubItem.dataset.clubId = club.id;
                clubItem.innerHTML = `
                    <img src="${club.image}" alt="${club.name}" class="club-application-image" onerror="this.onerror=null;this.src='images/placeholder.png';">
                    <div class="club-application-info">
                        <h4>${club.name}</h4>
                        <p>${club.description}</p>
                    </div>
                `;
                clubSelectionContainer.appendChild(clubItem);

                clubItem.addEventListener('click', () => {
                    document.querySelectorAll('.club-application-item').forEach(item => item.classList.remove('selected'));
                    clubItem.classList.add('selected');
                    currentSelectedClub = allClubsData.find(c => c.id === clubItem.dataset.clubId);
                    document.getElementById('selected-club-display').textContent = currentSelectedClub ? currentSelectedClub.name : 'None Selected'; // Unique ID
                });
            });
             if (currentSelectedClub) {
                document.getElementById('selected-club-display').textContent = currentSelectedClub.name;
            }
        }


        // Handle member status change
        memberStatusRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.value === 'new') {
                    nonMemberFields.style.display = 'block';
                    memberIdField.style.display = 'none';
                } else { // existing
                    nonMemberFields.style.display = 'none';
                    memberIdField.style.display = 'block';
                }
            });
        });

        // Handle form submission
        joinClubForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!currentSelectedClub) {
                alert("Please select a club to join.");
                return;
            }

            const isExistingMember = document.getElementById('member-status-existing').checked;
            let applicationDetails = `Club: ${currentSelectedClub.name}\n`;

            if (isExistingMember) {
                const memberId = document.getElementById('existing-member-id').value.trim(); // Unique ID
                if (!memberId) {
                    alert("Please enter your Member ID.");
                    return;
                }
                // Basic check if member ID exists in allMembersData
                const foundMember = allMembersData.find(m => m.id === memberId);
                if (!foundMember) {
                    alert("Member ID not found. Please check your ID or select 'New Member'.");
                    return;
                }
                applicationDetails += `Member Type: Existing Member\n`;
                applicationDetails += `Member ID: ${memberId}\n`;
                applicationDetails += `Member Name: ${foundMember.name}\n`; // Add found member's name
                applicationDetails += `Member Contact: ${foundMember.contact}\n`; // Add found member's contact
            } else {
                const newMemberName = document.getElementById('new-member-name'); // Unique ID
                const newMemberEmail = document.getElementById('new-member-email'); // Unique ID
                const newMemberPhone = document.getElementById('new-member-phone'); // Unique ID

                if (!newMemberName.value.trim() || !newMemberEmail.value.trim() || !newMemberPhone.value.trim()) {
                    alert("Please fill in all new member details.");
                    return;
                }
                applicationDetails += `Member Type: New Member\n`;
                applicationDetails += `Name: ${newMemberName.value.trim()}\n`;
                applicationDetails += `Email: ${newMemberEmail.value.trim()}\n`;
                applicationDetails += `Phone: ${newMemberPhone.value.trim()}\n`;
            }

            // Simulate sending application and show confirmation
            joinClubConfirmation.textContent = `Thank you for your application to join the ${currentSelectedClub.name}! We have received your details and will process your application shortly. A confirmation email has been sent to your provided email address.`;
            joinClubConfirmation.style.display = 'block';
            joinClubForm.reset(); // Clear the form
            // Reset selected club and selection visually
            currentSelectedClub = null;
            document.querySelectorAll('.club-application-item').forEach(item => item.classList.remove('selected'));
            document.getElementById('selected-club-display').textContent = 'None Selected';
            nonMemberFields.style.display = 'none'; // Hide new member fields
            memberIdField.style.display = 'none'; // Hide existing member fields
            document.getElementById('member-status-new').checked = true; // Reset radio to new
            joinClubConfirmation.scrollIntoView({ behavior: 'smooth' });

            console.log("Club Application Details:\n", applicationDetails); // Log details for debugging
        });
    }


    // Initialize based on the current page
    document.addEventListener('DOMContentLoaded', async () => {
        // Only fetch clubs data if a club grid exists (Clubs page)
        if (document.getElementById('clubs-page-grid')) {
            await fetchClubsPageData();
            renderClubsPageCards();
        }

        // Only fetch clubs and members data if the join club form exists (Join Clubs page)
        if (document.getElementById('join-club-application-form')) {
            await fetchClubsPageData(); // Need club data for selection
            await fetchMembersForClubs(); // Need member data for verification
            initJoinClubForm();
        }
    });

})();
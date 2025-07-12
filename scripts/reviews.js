// scripts/reviews.js

// Global variables for Reviews data
let allReviewsData = []; // Stores all collected reviews from members.json
let displayedReviewsCount = 0; // Tracks the number of reviews currently displayed on the reviews page
const REVIEWS_PER_PAGE = 6; // Number of reviews to display per load on the reviews page

// Utility function duplicated from main.js for independent image fallback
/**
 * Sets up error handling for image elements to display a placeholder if the original image fails to load.
 * @param {HTMLImageElement} imgElement - The image element to apply fallback logic to.
 */
function setupImageFallback(imgElement) {
    const placeholderImagePath = 'https://placehold.co/200x150/cccccc/000000?text=Image+Not+Found'; // Path to the default placeholder image

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


/**
 * Asynchronously fetches member data from 'members.json' specifically for reviews.
 * This is a local copy to ensure independence from main.js's allMembersData.
 * @returns {Array<object>} An array of member objects.
 */
async function fetchMembersForReviews() {
    try {
        const response = await fetch('data/members.json'); // Path to the JSON data file
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching members data for reviews:', error);
        const reviewGrid = document.getElementById('review-grid');
        if (reviewGrid) {
            reviewGrid.innerHTML = '<p style="text-align: center; color: var(--text-color);">Error loading member data for reviews. Please ensure "members.json" exists and is correctly formatted. Check console for details.</p>';
        }
        return [];
    }
}

/**
 * Fetches all reviews from `members.json` and populates `allReviewsData`.
 * Each review object will also contain the `memberId` and `memberName` for context.
 */
async function fetchAllReviews() {
    try {
        // Only collect reviews if not already loaded
        if (allReviewsData.length === 0) {
            const membersData = await fetchMembersForReviews(); // Fetch members data locally

            if (membersData.length > 0) {
                membersData.forEach(member => {
                    if (member.reviews && Array.isArray(member.reviews)) {
                        member.reviews.forEach(review => {
                            // Add member context to each review
                            allReviewsData.push({
                                ...review,
                                memberId: member.id,
                                memberName: member.name,
                                memberLink: member.link,
                                memberImg: member.imgSrc // Add member image for review card
                            });
                        });
                    }
                });
                console.log("All reviews collected:", allReviewsData);
                // Optionally sort reviews, e.g., by date (newest first)
                allReviewsData.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        }
    } catch (error) {
        console.error('Error collecting all reviews:', error);
        const reviewGrid = document.getElementById('review-grid');
        if (reviewGrid) {
            reviewGrid.innerHTML = '<p style="text-align: center; color: var(--text-color);">Error loading reviews. Please check console for details.</p>';
        }
    }
}

/**
 * Renders a batch of reviews to the reviews grid.
 */
function renderReviews() {
    const reviewGrid = document.getElementById('review-grid');
    const loadMoreReviewsBtn = document.getElementById('load-more-reviews');

    if (!reviewGrid) {
        console.error("Error: #review-grid element not found. Cannot render reviews.");
        return;
    }

    // Clear "Loading reviews..." message or previous content if this is the initial render
    if (displayedReviewsCount === 0) {
        reviewGrid.innerHTML = '';
    }

    const startIndex = displayedReviewsCount;
    const endIndex = Math.min(allReviewsData.length, startIndex + REVIEWS_PER_PAGE);

    if (allReviewsData.length === 0 && startIndex === 0) {
        reviewGrid.innerHTML = '<p style="text-align: center; color: var(--text-color);">No reviews available at this time.</p>';
        if (loadMoreReviewsBtn) loadMoreReviewsBtn.style.display = 'none';
        return;
    }

    for (let i = startIndex; i < endIndex; i++) {
        const review = allReviewsData[i];
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');

        // Generate star rating HTML
        const starRatingHtml = `
            <div class="star-rating">
                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(review.rating))}
                ${review.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(review.rating))}
            </div>
        `;

        reviewCard.innerHTML = `
            <div class="review-header">
                ${review.memberImg ? `<img src="${review.memberImg}" alt="${review.memberName} Logo" class="review-member-logo">` : ''}
                <div>
                    <h4>${review.author}</h4>
                    <p class="review-source">from <a href="${review.memberLink || '#'}" target="_blank">${review.memberName}</a></p>
                </div>
            </div>
            ${starRatingHtml}
            <p class="review-text">${review.text}</p>
            <p class="review-date">${new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        `;
        const imgElement = reviewCard.querySelector('.review-member-logo');
        if (imgElement) {
            setupImageFallback(imgElement);
        }
        reviewGrid.appendChild(reviewCard);
    }

    displayedReviewsCount = endIndex; // Update count of displayed reviews

    // Manage Load More button visibility
    if (loadMoreReviewsBtn) {
        if (displayedReviewsCount >= allReviewsData.length) {
            loadMoreReviewsBtn.style.display = 'none'; // Hide if all reviews are shown
        } else {
            loadMoreReviewsBtn.style.display = 'block'; // Show if more reviews are available
        }
    }
}

// Initialize Reviews Page Functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('review-grid')) {
        await fetchAllReviews(); // Fetch all reviews from members.json
        renderReviews(); // Render initial batch of reviews

        const loadMoreReviewsBtn = document.getElementById('load-more-reviews');
        if (loadMoreReviewsBtn) {
            loadMoreReviewsBtn.addEventListener('click', () => renderReviews());
        }
    }
});

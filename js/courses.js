// js/courses.js

// Course List Array as provided by instructions, but updated for CSE courses
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true // Example: Change to true if you completed
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 4,
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Backend Development',
        credits: 2,
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const courseListDiv = document.querySelector('.course-list');
    const filterButtons = document.querySelectorAll('.course-filters .filter-button');
    const totalCreditsSpan = document.getElementById('total-credits');

    // Function to display courses
    function displayCourses(courseArray) {
        courseListDiv.innerHTML = ''; // Clear existing courses
        let currentTotalCredits = 0;

        courseArray.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.classList.add('course-item');

            // Add subject-specific class for coloring
            if (course.subject === 'CSE') {
                courseItem.classList.add('cse-course');
            } else if (course.subject === 'WDD') {
                courseItem.classList.add('wdd-course');
            }

            // Add 'completed' class if applicable
            if (course.completed) {
                courseItem.classList.add('completed');
            }

            courseItem.innerHTML = `
                <p>${course.subject} ${course.number} - ${course.title} (${course.credits} credits)</p>
            `;
            courseListDiv.appendChild(courseItem);

            currentTotalCredits += course.credits;
        });

        // Update total credits dynamically
        if (totalCreditsSpan) {
            totalCreditsSpan.textContent = currentTotalCredits;
        }
    }

    // Initial display of all courses
    displayCourses(courses);

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            event.target.classList.add('active');

            const filterType = event.target.dataset.filter;
            let filteredCourses = [];

            if (filterType === 'all') {
                filteredCourses = courses;
            } else {
                // Use array filter method
                filteredCourses = courses.filter(course => course.subject === filterType);
            }

            displayCourses(filteredCourses);
        });
    });
});
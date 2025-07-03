// js/date.js
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set current year for copyright
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamically set last modified date
    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modification: ${new Date(document.lastModified).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })}`;
    }
});
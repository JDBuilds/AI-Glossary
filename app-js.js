// Initialize the app only when DOM is ready
function initApp() {
    // Get DOM elements
    const searchInput = document.getElementById('searchInput');
    const glossaryGrid = document.getElementById('glossaryGrid');
    const termCount = document.getElementById('termCount');
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check if all required elements exist
    if (!searchInput || !glossaryGrid || !termCount || !themeToggle) {
        console.error('Required elements not found');
        return;
    }

    // SVG icons for theme toggle
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;

    // Theme management
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        themeToggle.innerHTML = theme === 'dark' ? moonIcon : sunIcon;
    }

    // Create term card
    function createTermCard(term, definition) {
        return `
            <article class="term-card">
                <h2>${term}</h2>
                <p>${definition}</p>
            </article>
        `;
    }

    // Render glossary
    function renderGlossary(searchTerm = '') {
        const searchLower = searchTerm.toLowerCase();
        let hasResults = false;
        let html = '';

        const filteredTerms = Object.entries(glossaryData)
            .filter(([term, data]) => {
                return term.toLowerCase().includes(searchLower) ||
                       data.Definition.toLowerCase().includes(searchLower);
            })
            .sort(([termA], [termB]) => termA.localeCompare(termB));

        filteredTerms.forEach(([term, data]) => {
            hasResults = true;
            html += createTermCard(term, data.Definition);
        });

        if (!hasResults) {
            html = '<div class="no-results">No matching terms found</div>';
        }

        termCount.textContent = `Showing ${filteredTerms.length} of ${Object.keys(glossaryData).length} terms`;
        glossaryGrid.innerHTML = html;
    }

    // Event listeners
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    searchInput.addEventListener('input', (e) => {
        renderGlossary(e.target.value);
    });

    // Initialize
    setTheme('light');
    renderGlossary();
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

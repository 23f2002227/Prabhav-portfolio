/* ═══════════════════════════════════════════════════════════
   NEURAL NEXUS — Quest Board
   Quest card filtering by rarity
   ═══════════════════════════════════════════════════════════ */

(function () {
    const filters = document.querySelectorAll('.quest-filter');
    const cards = document.querySelectorAll('.quest-card');

    if (!filters.length || !cards.length) return;

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const rarity = filter.dataset.filter;

            cards.forEach(card => {
                if (rarity === 'all' || card.dataset.rarity === rarity) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    // Re-trigger animation
                    card.style.animation = 'none';
                    card.offsetHeight; // Force reflow
                    card.style.animation = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
})();

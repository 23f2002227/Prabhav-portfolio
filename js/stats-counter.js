/* ═══════════════════════════════════════════════════════════
   NEURAL NEXUS — Stats Counter
   Animated counting for stat values and XP bar fill
   ═══════════════════════════════════════════════════════════ */

(function () {
    /**
     * Animate a number counting up from 0 to target
     */
    function animateCounter(el, target, duration) {
        const start = performance.now();
        const startValue = 0;

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startValue + (target - startValue) * eased);

            el.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toLocaleString();
                // Add glow effect on completion
                el.style.animation = 'counter-glow 0.6s ease';
            }
        }

        requestAnimationFrame(tick);
    }

    /**
     * Animate stat bars filling to their data-value percentage
     */
    function animateStatBars() {
        const bars = document.querySelectorAll('.stat-bar-fill');
        bars.forEach((bar, index) => {
            const value = parseInt(bar.dataset.value, 10);
            if (isNaN(value)) return;

            setTimeout(() => {
                bar.style.setProperty('--value', value);
                bar.classList.add('animated');
                bar.style.width = value + '%';
            }, index * 150);
        });
    }

    /**
     * Animate XP bar filling
     */
    function animateXPBar() {
        const xpFill = document.querySelector('.xp-fill');
        if (!xpFill) return;
        const value = parseInt(xpFill.dataset.value, 10) || 85;
        setTimeout(() => {
            xpFill.classList.add('animated');
            xpFill.style.width = value + '%';
        }, 500);
    }

    /**
     * Animate stat value counters
     */
    function animateStatValues() {
        const statValues = document.querySelectorAll('.stat-value[data-target]');
        statValues.forEach((el, index) => {
            const target = parseInt(el.dataset.target, 10);
            if (isNaN(target)) return;
            setTimeout(() => {
                animateCounter(el, target, 1500);
            }, index * 200);
        });
    }

    /**
     * Animate highlight counters (Problems Conquered, Quests, Achievements)
     */
    function animateHighlightValues() {
        const highlights = document.querySelectorAll('.highlight-value[data-target]');
        highlights.forEach((el, index) => {
            const target = parseInt(el.dataset.target, 10);
            if (isNaN(target)) return;
            setTimeout(() => {
                animateCounter(el, target, 2000);
            }, index * 300 + 500);
        });
    }

    // Use IntersectionObserver to trigger animations when hero section is visible
    let hasAnimated = false;

    function triggerHeroAnimations() {
        if (hasAnimated) return;
        hasAnimated = true;

        animateStatValues();
        animateStatBars();
        animateXPBar();
        animateHighlightValues();
    }

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Delay slightly to feel natural after page load
                        setTimeout(triggerHeroAnimations, 400);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(heroSection);
    }

    // Export for manual trigger
    window.NeuralNexus = window.NeuralNexus || {};
    window.NeuralNexus.triggerHeroAnimations = triggerHeroAnimations;
})();

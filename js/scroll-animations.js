/* ═══════════════════════════════════════════════════════════
   NEURAL NEXUS — Scroll Animations
   IntersectionObserver-based reveal animations for elements
   ═══════════════════════════════════════════════════════════ */

(function () {
    const ANIMATION_CLASS = 'animate-on-scroll';
    const VISIBLE_CLASS = 'visible';

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(VISIBLE_CLASS);
                    // Optionally unobserve after revealing (one-time)
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    function initScrollAnimations() {
        const elements = document.querySelectorAll('.' + ANIMATION_CLASS);
        elements.forEach(el => {
            observer.observe(el);
        });
    }

    // Active section tracking for nav
    function initNavHighlighting() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');

        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        navLinks.forEach(link => {
                            link.classList.toggle('active', link.dataset.section === sectionId);
                        });
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '-80px 0px -50% 0px'
            }
        );

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // Nav scroll effect (add .scrolled class)
    function initNavScroll() {
        const nav = document.getElementById('hud-nav');
        if (!nav) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    nav.classList.toggle('scrolled', window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
            initNavHighlighting();
            initNavScroll();
        });
    } else {
        initScrollAnimations();
        initNavHighlighting();
        initNavScroll();
    }
})();

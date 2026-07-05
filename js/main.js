/* ═══════════════════════════════════════════════════════════
   NEURAL NEXUS — Main Controller
   Loading screen, nav toggle, smooth scroll, orchestration
   ═══════════════════════════════════════════════════════════ */

(function () {
    // ─────────────────────────────────────────────────────
    // LOADING SCREEN
    // ─────────────────────────────────────────────────────
    const loadingScreen = document.getElementById('loading-screen');
    const loadingFill = document.getElementById('loading-fill');
    const loadingPercent = document.getElementById('loading-percent');
    const loadingStatus = document.getElementById('loading-status');

    const loadingMessages = [
        '> Initializing system...',
        '> Loading neural pathways...',
        '> Calibrating skill tree...',
        '> Syncing quest data...',
        '> Establishing connections...',
        '> Compiling achievements...',
        '> Forging ML pipelines...',
        '> System ready. Welcome, Operative.'
    ];

    function simulateLoading() {
        let progress = 0;
        let messageIndex = 0;
        const totalDuration = 2500;
        const interval = 30;
        const increment = 100 / (totalDuration / interval);

        const timer = setInterval(() => {
            progress = Math.min(progress + increment + Math.random() * 1.5, 100);
            const rounded = Math.round(progress);

            if (loadingFill) loadingFill.style.width = rounded + '%';
            if (loadingPercent) loadingPercent.textContent = rounded + '%';

            // Update status message at milestones
            const newIndex = Math.min(
                Math.floor((progress / 100) * loadingMessages.length),
                loadingMessages.length - 1
            );
            if (newIndex !== messageIndex && loadingStatus) {
                messageIndex = newIndex;
                loadingStatus.innerHTML = `<span class="terminal-text">${loadingMessages[messageIndex]}</span>`;
            }

            if (progress >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                    }
                    document.body.style.overflow = '';
                }, 600);
            }
        }, interval);
    }

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Start loading immediately
    if (loadingScreen) {
        simulateLoading();
    } else {
        document.body.style.overflow = '';
    }

    // ─────────────────────────────────────────────────────
    // MOBILE NAV TOGGLE
    // ─────────────────────────────────────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close nav when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // Close nav on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    // ─────────────────────────────────────────────────────
    // SMOOTH SCROLL FOR NAV LINKS
    // ─────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('hud-nav')?.offsetHeight || 70;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─────────────────────────────────────────────────────
    // PIPELINE NODE STAGGER ANIMATION
    // ─────────────────────────────────────────────────────
    const pipelineNodes = document.querySelectorAll('.pipeline-node');
    if (pipelineNodes.length) {
        const pipelineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const nodes = entry.target.querySelectorAll('.pipeline-node');
                        nodes.forEach((node, i) => {
                            node.style.opacity = '0';
                            node.style.transform = 'translateY(20px)';
                            node.style.transition = `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`;
                            
                            requestAnimationFrame(() => {
                                node.style.opacity = '1';
                                node.style.transform = 'translateY(0)';
                            });
                        });
                        pipelineObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const pipelineViz = document.querySelector('.pipeline-visualization');
        if (pipelineViz) {
            pipelineObserver.observe(pipelineViz);
        }
    }

    // ─────────────────────────────────────────────────────
    // KEYBOARD SHORTCUTS (Easter Egg)
    // ─────────────────────────────────────────────────────
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            document.body.style.animation = 'none';
            document.body.offsetHeight;
            document.body.style.animation = 'neon-flicker 0.5s ease 3';
            konamiCode = [];
        }
    });

})();

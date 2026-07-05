/* ═══════════════════════════════════════════════════════════
   NEURAL NEXUS — Terminal Typing Effect
   Typewriter animation for the contact section terminal
   ═══════════════════════════════════════════════════════════ */

(function () {
    const lines = [
        { id: 'terminal-line-1', text: 'Welcome to the Neural Nexus transmission channel.' },
        { id: 'terminal-line-2', text: 'Ready to establish connection with Prabhav Sharma.' },
        { id: 'terminal-line-3', text: 'Select a transmission channel below...' },
    ];

    let hasPlayed = false;

    function typeText(element, text, speed) {
        return new Promise((resolve) => {
            element.textContent = '';
            element.classList.add('typing');
            let i = 0;

            function tick() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(tick, speed);
                } else {
                    element.classList.remove('typing');
                    resolve();
                }
            }

            tick();
        });
    }

    async function playTerminal() {
        if (hasPlayed) return;
        hasPlayed = true;

        for (const line of lines) {
            const el = document.getElementById(line.id);
            if (!el) continue;

            el.textContent = '';
            await new Promise(r => setTimeout(r, 300));
            await typeText(el, line.text, 30);
            await new Promise(r => setTimeout(r, 200));
        }

        // Show channels with stagger
        const channels = document.querySelector('.transmission-channels');
        if (channels) {
            channels.style.opacity = '0';
            channels.style.transform = 'translateY(10px)';
            channels.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            await new Promise(r => setTimeout(r, 300));
            channels.style.opacity = '1';
            channels.style.transform = 'translateY(0)';
        }
    }

    // Use IntersectionObserver to trigger when contact section is visible
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        playTerminal();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(contactSection);
    }
})();

/* ═══════════════════════════════════════════════════════════
   NEURAL NEXUS — Skill Tree
   Generates skill nodes dynamically and handles filtering
   ═══════════════════════════════════════════════════════════ */

(function () {
    const container = document.getElementById('skill-tree-container');
    if (!container) return;

    // ─────────────────────────────────────────────────────
    // SKILL DATA
    // ─────────────────────────────────────────────────────
    const skills = [
        // Programming
        { name: 'Python', icon: '🐍', category: 'programming', status: 'mastered', level: 95, desc: 'Primary weapon of choice. Used across ML, backend, and automation.' },
        { name: 'JavaScript', icon: '⚡', category: 'programming', status: 'unlocked', level: 70, desc: 'Frontend interactivity, Vue.js applications, DOM manipulation.' },
        { name: 'C/C++', icon: '⚙️', category: 'programming', status: 'unlocked', level: 65, desc: 'Data structures, algorithms, systems-level understanding.' },
        { name: 'SQL', icon: '🗄️', category: 'programming', status: 'mastered', level: 90, desc: 'Complex queries, database design, optimization.' },
        { name: 'HTML/CSS', icon: '🎨', category: 'programming', status: 'mastered', level: 88, desc: 'Semantic markup, responsive design, CSS animations.' },

        // Machine Learning
        { name: 'Scikit-learn', icon: '🔬', category: 'ml', status: 'mastered', level: 92, desc: 'Classical ML algorithms, pipelines, preprocessing.' },
        { name: 'XGBoost', icon: '🚀', category: 'ml', status: 'mastered', level: 88, desc: 'Gradient boosting for tabular data, hyperparameter tuning.' },
        { name: 'K-Means', icon: '🎯', category: 'ml', status: 'mastered', level: 90, desc: 'Customer segmentation, clustering analysis.' },
        { name: 'Feature Eng.', icon: '⚗️', category: 'ml', status: 'mastered', level: 85, desc: 'RFM analysis, feature selection, domain-driven features.' },
        { name: 'MLflow', icon: '📊', category: 'ml', status: 'unlocked', level: 75, desc: 'Experiment tracking, model registry, ML lifecycle.' },

        // Deep Learning
        { name: 'PyTorch', icon: '🔥', category: 'dl', status: 'unlocked', level: 72, desc: 'Neural network architectures, training loops, GPU compute.' },
        { name: 'CNNs', icon: '👁️', category: 'dl', status: 'unlocked', level: 68, desc: 'Convolutional networks for image recognition tasks.' },
        { name: 'RNNs/LSTMs', icon: '🔄', category: 'dl', status: 'unlocked', level: 60, desc: 'Sequence modeling, time series, text processing.' },
        { name: 'Transformers', icon: '🤖', category: 'dl', status: 'locked', level: 40, desc: 'Attention mechanisms, LLM understanding. Currently training.' },
        { name: 'GANs', icon: '🎭', category: 'dl', status: 'locked', level: 30, desc: 'Generative adversarial networks. Future skill path.' },

        // Backend
        { name: 'Flask', icon: '🧪', category: 'backend', status: 'mastered', level: 92, desc: 'REST APIs, template rendering, middleware, extensions.' },
        { name: 'FastAPI', icon: '⚡', category: 'backend', status: 'mastered', level: 88, desc: 'Async APIs, Pydantic models, auto-documentation.' },
        { name: 'Celery', icon: '🥬', category: 'backend', status: 'unlocked', level: 70, desc: 'Async task queues, background job processing.' },
        { name: 'Redis', icon: '🔴', category: 'backend', status: 'unlocked', level: 68, desc: 'Caching, message broker, session management.' },
        { name: 'REST APIs', icon: '🔌', category: 'backend', status: 'mastered', level: 90, desc: 'API design, versioning, authentication, documentation.' },

        // Frontend
        { name: 'Vue.js', icon: '💚', category: 'frontend', status: 'unlocked', level: 72, desc: 'Component architecture, reactivity, SPA development.' },
        { name: 'Bootstrap', icon: '🅱️', category: 'frontend', status: 'mastered', level: 85, desc: 'Responsive grid, utility classes, component library.' },
        { name: 'Streamlit', icon: '📱', category: 'frontend', status: 'mastered', level: 88, desc: 'Rapid ML dashboard prototyping, data apps.' },

        // Databases
        { name: 'SQLite', icon: '💾', category: 'database', status: 'mastered', level: 90, desc: 'Embedded database, rapid prototyping, file-based storage.' },
        { name: 'SQLAlchemy', icon: '🗃️', category: 'database', status: 'mastered', level: 85, desc: 'ORM, database migrations, query building.' },
        { name: 'PostgreSQL', icon: '🐘', category: 'database', status: 'unlocked', level: 60, desc: 'Production databases, advanced queries. Currently leveling.' },

        // Tools
        { name: 'Git', icon: '📁', category: 'tools', status: 'mastered', level: 90, desc: 'Version control, branching strategies, collaboration.' },
        { name: 'Docker', icon: '🐳', category: 'tools', status: 'unlocked', level: 75, desc: 'Containerization, multi-stage builds, Docker Compose.' },
        { name: 'Linux', icon: '🐧', category: 'tools', status: 'unlocked', level: 72, desc: 'Shell scripting, system administration, server management.' },
        { name: 'VS Code', icon: '💻', category: 'tools', status: 'mastered', level: 95, desc: 'Extensions, debugging, integrated terminal, productivity.' },

        // Core CS
        { name: 'DSA', icon: '🧩', category: 'cs', status: 'mastered', level: 88, desc: '185+ LeetCode problems. Trees, graphs, DP, greedy.' },
        { name: 'OOP', icon: '📐', category: 'cs', status: 'mastered', level: 85, desc: 'Design patterns, SOLID principles, abstraction.' },
        { name: 'OS Concepts', icon: '🖥️', category: 'cs', status: 'unlocked', level: 70, desc: 'Process management, memory, scheduling, file systems.' },
        { name: 'Networking', icon: '🌐', category: 'cs', status: 'unlocked', level: 65, desc: 'TCP/IP, HTTP, DNS, network security fundamentals.' },

        // AI Systems
        { name: 'NLP', icon: '📝', category: 'ai', status: 'unlocked', level: 55, desc: 'Text processing, tokenization, sentiment analysis.' },
        { name: 'Computer Vision', icon: '📷', category: 'ai', status: 'locked', level: 35, desc: 'Image recognition, object detection. Future quest.' },
        { name: 'LLM/RAG', icon: '🧠', category: 'ai', status: 'locked', level: 25, desc: 'Large language models, retrieval-augmented generation. Next frontier.' },
    ];

    // ─────────────────────────────────────────────────────
    // RENDER SKILL NODES
    // ─────────────────────────────────────────────────────
    function renderSkills(filter) {
        container.innerHTML = '';

        const filtered = filter === 'all'
            ? skills
            : skills.filter(s => s.category === filter);

        filtered.forEach((skill, index) => {
            const node = document.createElement('div');
            node.className = 'skill-node';
            node.dataset.status = skill.status;
            node.dataset.category = skill.category;
            node.style.animationDelay = `${index * 50}ms`;

            node.innerHTML = `
                <span class="skill-icon">${skill.icon}</span>
                <span class="skill-name">${skill.name}</span>
                <div class="skill-level-bar">
                    <div class="skill-level-fill" style="width: ${skill.status === 'locked' ? 0 : skill.level}%"></div>
                </div>
                <span class="skill-level-label">${skill.status === 'locked' ? 'LOCKED' : 'LVL ' + skill.level}</span>
                <div class="skill-tooltip">
                    <p>${skill.desc}</p>
                </div>
            `;

            node.classList.add('filter-in');
            container.appendChild(node);
        });
    }

    // ─────────────────────────────────────────────────────
    // TAB FILTERING
    // ─────────────────────────────────────────────────────
    const tabs = document.querySelectorAll('.skill-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderSkills(tab.dataset.category);
        });
    });

    // Initial render
    renderSkills('all');

})();

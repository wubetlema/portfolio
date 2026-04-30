// Portfolio JavaScript - Complete Working Version

// GitHub Configuration - UPDATE THIS WITH YOUR GITHUB USERNAME
const GITHUB_USERNAME = 'wubetlema'; // Your GitHub username

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    const header = document.querySelector('header');

    // Load GitHub Projects
    loadGitHubProjects();

    // ===== GITHUB PROJECTS LOADER =====
    async function loadGitHubProjects() {
        const projectsContainer = document.getElementById('projectsContainer');
        const loadingMessage = document.getElementById('loadingProjects');
        const errorMessage = document.getElementById('projectsError');
        const errorText = document.getElementById('errorText');

        try {
            // Fetch repositories from GitHub API
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

            if (!response.ok) {
                throw new Error(`GitHub user "${GITHUB_USERNAME}" not found. Please check the username.`);
            }

            const repos = await response.json();

            // Hide loading message
            loadingMessage.style.display = 'none';

            // Filter out forked repos and sort by stars/updated date
            const myRepos = repos
                .filter(repo => !repo.fork)
                .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

            if (myRepos.length === 0) {
                errorText.textContent = 'No repositories found for this user.';
                errorMessage.style.display = 'block';
                return;
            }

            // Display repositories
            myRepos.forEach((repo, index) => {
                const projectCard = createProjectCard(repo);
                projectsContainer.appendChild(projectCard);

                // Add staggered animation
                projectCard.style.animationDelay = `${index * 0.1}s`;
            });

        } catch (error) {
            console.error('Error loading GitHub projects:', error);
            loadingMessage.style.display = 'none';
            errorText.textContent = error.message;
            errorMessage.style.display = 'block';
        }
    }

    function createProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Get language color
        const languageColor = getLanguageColor(repo.language);

        // Create project image based on language/topic
        const imageUrl = getProjectImage(repo.language, repo.name);

        // Custom descriptions for specific projects
        const customDescriptions = {
            'smart-library-management': 'A modern web-based library platform with advanced book search, borrowing & return management, reservations with email notifications, and student borrow limits. Includes PDF reading, ratings & reviews, QR codes.',
            'smart_library_management': 'A modern web-based library platform with advanced book search, borrowing & return management, reservations with email notifications, and student borrow limits. Includes PDF reading, ratings & reviews, QR codes.',
            'smart-library-ms': 'A modern web-based library platform with advanced book search, borrowing & return management, reservations with email notifications, and student borrow limits. Includes PDF reading, ratings & reviews, QR codes.'
        };

        // Format description
        const description = customDescriptions[repo.name.toLowerCase()] || repo.description || 'No description available for this project.';

        // Get topics/languages
        const topics = repo.topics && repo.topics.length > 0
            ? repo.topics.slice(0, 4)
            : (repo.language ? [repo.language] : ['Code']);

        card.innerHTML = `
            <img src="${imageUrl}" alt="${repo.name}" class="project-img">
            <div class="project-content">
                <h3>${formatRepoName(repo.name)}</h3>
                <p>${description}</p>
                <div class="project-tech">
                    ${topics.map(topic => `<span>${topic}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn">
                        <i class="fab fa-github"></i> View on GitHub
                    </a>
                    ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>` : ''}
                </div>
                <div class="project-stats">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    ${repo.language ? `<span style="color: ${languageColor}"><i class="fas fa-circle"></i> ${repo.language}</span>` : ''}
                </div>
            </div>
        `;

        return card;
    }

    function formatRepoName(name) {
        // Convert repo-name or repo_name to Repo Name
        return name
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'Java': '#b07219',
            'TypeScript': '#2b7489',
            'C++': '#f34b7d',
            'C#': '#178600',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'Rust': '#dea584',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Vue': '#41b883',
            'React': '#61dafb'
        };
        return colors[language] || '#8257e5';
    }

    function getProjectImage(language, repoName) {
        // Map languages to relevant Unsplash images
        const imageMap = {
            'Python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=500&fit=crop',
            'JavaScript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=500&fit=crop',
            'TypeScript': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=500&fit=crop',
            'Java': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
            'C#': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
            'C++': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
            'PHP': 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&h=500&fit=crop',
            'Ruby': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
            'Go': 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=500&fit=crop',
            'Rust': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop',
            'HTML': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=500&fit=crop',
            'CSS': 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=500&fit=crop',
            'Vue': 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&h=500&fit=crop',
            'React': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
            'Swift': 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&h=500&fit=crop',
            'Kotlin': 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&h=500&fit=crop'
        };

        // Check if repo name contains specific keywords
        const lowerName = repoName.toLowerCase();
        if (lowerName.includes('web') || lowerName.includes('website')) {
            return 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop';
        }
        if (lowerName.includes('mobile') || lowerName.includes('app')) {
            return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop';
        }
        if (lowerName.includes('library') || lowerName.includes('book')) {
            return 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop';
        }
        if (lowerName.includes('api') || lowerName.includes('backend')) {
            return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop';
        }
        if (lowerName.includes('data') || lowerName.includes('analytics')) {
            return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop';
        }
        if (lowerName.includes('game')) {
            return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop';
        }
        if (lowerName.includes('bot') || lowerName.includes('ai') || lowerName.includes('ml')) {
            return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop';
        }
        if (lowerName.includes('payroll') || lowerName.includes('employee') || lowerName.includes('management')) {
            return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop';
        }

        // Return language-specific image or default
        return imageMap[language] || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop';
    }

    // ===== THEME TOGGLE (Dark/Light Mode) =====

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Theme toggle click event
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // ===== MOBILE MENU TOGGLE =====

    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');

        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // ===== SMOOTH SCROLLING =====

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECTS =====

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 20px var(--shadow)';
        } else {
            header.style.boxShadow = '0 2px 10px var(--shadow)';
        }

        // Update active menu link
        updateActiveLink();
    });

    // ===== ACTIVE LINK HIGHLIGHTING =====

    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(function (link) {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    // ===== FORM SUBMISSION =====

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // ===== SCROLL ANIMATIONS =====

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(function (category) {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(category);
    });

});

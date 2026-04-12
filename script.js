// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initTypingAnimation();
    initDarkMode();
    initNavigation();
    initScrollReveal();
    initCounterAnimation();
    // initFormValidation();
    initHamburger();
});

// ===========================
// TYPING ANIMATION
// ===========================

function initTypingAnimation() {
    const texts = [
        'Web Developer',
        'Machine Learning ',
        'Python Programmer'
    ];
    
    let currentText = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    const typingText = document.querySelector('.typing-text');
    
    function type() {
        const text = texts[currentText];
        
        if (!isDeleting && currentChar < text.length) {
            typingText.textContent += text.charAt(currentChar);
            currentChar++;
            setTimeout(type, 100);
        } else if (isDeleting && currentChar > 0) {
            typingText.textContent = text.substring(0, currentChar - 1);
            currentChar--;
            setTimeout(type, 50);
        } else if (currentChar === text.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (currentChar === 0 && isDeleting) {
            isDeleting = false;
            currentText = (currentText + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    
    type();
}

// ===========================
// DARK MODE TOGGLE
// ===========================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        document.body.classList.toggle('light-mode', savedMode === 'light');
        updateDarkModeIcon(savedMode === 'light');
    } else {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (!prefersDark) {
            document.body.classList.add('light-mode');
            updateDarkModeIcon(true);
        }
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('darkMode', isLightMode ? 'light' : 'dark');
        updateDarkModeIcon(isLightMode);
    });
    
    function updateDarkModeIcon(isLightMode) {
        darkModeToggle.innerHTML = isLightMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// ===========================
// NAVIGATION
// ===========================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                updateActiveNavLink();
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================

function initScrollReveal() {
    const reveals = document.querySelectorAll('.glass-card, .skill-card, .hobby-card, .project-card, .cert-card, .timeline-item, .counter-card, .contact-card, .experience-card');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible && elementBottom > elementVisible) {
                element.classList.add('fade-in');
            } else {
                element.classList.remove('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ===========================
// COUNTER ANIMATION
// ===========================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter-number');
    let hasAnimated = false;
    
    const animateCounters = () => {
        if (hasAnimated) return;
        
        const counterSection = document.querySelector('.counter');
        if (!counterSection) return;
        
        const counterTop = counterSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (counterTop < windowHeight - 200) {
            hasAnimated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                const duration = 2000;
                const increment = target / (duration / 50);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 50);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check
}

// ===========================
// PARTICLE SYSTEM
// ===========================

function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random animation delay
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 15;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
    
    // Recreate particles periodically
    setInterval(() => {
        const particles = particlesContainer.querySelectorAll('.particle');
        if (particles.length < particleCount) {
            createNewParticles(particleCount - particles.length);
        }
    }, 5000);
    
    function createNewParticles(count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const x = Math.random() * window.innerWidth;
            const y = window.innerHeight + 10;
            
            const delay = 0;
            const duration = Math.random() * 10 + 15;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
}

// ===========================
// FORM VALIDATION & SUBMISSION
// ===========================

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showMessage('Message sent successfully! Thank you for reaching out.', 'success');
            contactForm.reset();
            
            // In a real application, you would send the data to a server here
            console.log({ name, email, message });
        });
    }
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// ===========================
// HAMBURGER MENU
// ===========================

function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===========================
// 3D TILT EFFECT (Optional Enhancement)
// ===========================

function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.project-card, .hobby-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize tilt effect on DOM ready
document.addEventListener('DOMContentLoaded', initTiltEffect);

// ===========================
// SMOOTH ANIMATION FOR SKILL CARDS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
});

// ===========================
// WINDOW RESIZE HANDLER
// ===========================

window.addEventListener('resize', () => {
    // Handle responsive changes if needed
});

// ===========================
// SCROLL TO TOP BUTTON (Optional)
// ===========================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 40;
        font-size: 20px;
        transition: all 0.3s ease;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.6)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = 'none';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ===========================
// HOVER ANIMATIONS FOR SOCIAL ICONS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===========================
// ACTIVE MENU HIGHLIGHTING ON PAGE LOAD
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#hero') {
            link.classList.add('active');
        }
    });
});

// ===========================
// LOADING ANIMATION COMPLETION
// ===========================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 2500);
    }
});

// ===========================
// FLOATING ANIMATION ENHANCEMENTS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const floatingCard = document.querySelector('.floating-card');
    
    if (floatingCard) {
        floatingCard.addEventListener('mouseover', () => {
            floatingCard.style.animation = 'none';
            setTimeout(() => {
                floatingCard.style.animation = '';
            }, 10);
        });
        
        floatingCard.addEventListener('mouseout', () => {
            floatingCard.style.animation = 'float 3s ease-in-out infinite';
        });
    }
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for performance optimization
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function for smooth animations
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// CONSOLE GREETING
// ===========================

console.log('%cWelcome to Angeshkumar P Portfolio', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cWeb Developer | Data Analytics Enthusiast', 'font-size: 14px; color: #8b5cf6;');
console.log('%cGitHub: https://github.com/ANGESHKUMAR123', 'color: #00d4ff;');
console.log('%cLinkedIn: https://www.linkedin.com/in/angeshkumar-p-99ab92302', 'color: #00d4ff;');

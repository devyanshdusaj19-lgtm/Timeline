// ===== ROMANTIC ENHANCEMENTS =====

// Create falling hearts effect
function createFallingHearts() {
    const hearts = ['❤️', '💕', '🌹', '💖'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (5 + Math.random() * 5) + 's';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 10000);
    }, 1500);
}

// Enhanced confetti with hearts
function createEnhancedConfetti() {
    const symbols = ['❤️', '💕', '💖', '💗', '🌹', '✨'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'heart-burst';
        confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const angle = (i / confettiCount) * Math.PI * 2;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        confetti.style.left = window.innerWidth / 2 + 'px';
        confetti.style.top = window.innerHeight / 2 + 'px';
        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--ty', ty + 'px');
        confetti.style.fontSize = (1 + Math.random() * 2) + 'rem';
        confetti.style.animation = `heartBurst ${1.5 + Math.random() * 0.5}s ease-out forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2500);
    }
}

// Add sparkles on hover
function addSparkles(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-element';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.opacity = '0.8';
        card.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2000);
    }
}

// Initialize falling hearts on page load
document.addEventListener('DOMContentLoaded', () => {
    createFallingHearts();
    
    // Add sparkle effect to all cards
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.addEventListener('mouseenter', addSparkles);
    });
});

// ===== INTERACTIVE TIMELINE NAVIGATION =====
class TimelineNavigator {
    constructor() {
        this.cards = Array.from(document.querySelectorAll('.timeline-card'));
        this.totalMemories = this.cards.length;
        this.currentMemoryId = 1;
        this.initNavigationDots();
        this.attachButtonListeners();
        this.attachDotListeners();
        this.setupScrollTracking();
    }

    initNavigationDots() {
        const dotsContainer = document.getElementById('navigationDots');
        for (let i = 1; i <= this.totalMemories; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.memoryId = i;
            dotsContainer.appendChild(dot);
        }
        this.updateActiveDot(1);
    }

    attachButtonListeners() {
        document.querySelectorAll('.nav-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.timeline-card');
                const currentId = parseInt(card.dataset.memoryId);

                if (e.target.classList.contains('next-btn')) {
                    this.goToMemory(currentId + 1);
                } else if (e.target.classList.contains('prev-btn')) {
                    this.goToMemory(currentId - 1);
                }
            });
        });
    }

    attachDotListeners() {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const memoryId = parseInt(dot.dataset.memoryId);
                this.goToMemory(memoryId);
            });
        });
    }

    goToMemory(memoryId) {
        if (memoryId < 1 || memoryId > this.totalMemories) return;

        const targetCard = document.querySelector(`[data-memory-id="${memoryId}"]`);
        if (targetCard) {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            this.updateActiveDot(memoryId);
        }
    }

    updateActiveDot(memoryId) {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('active');
        });
        const activeDot = document.querySelector(`.dot[data-memory-id="${memoryId}"]`);
        if (activeDot) {
            activeDot.classList.add('active');
        }
    }

    setupScrollTracking() {
        window.addEventListener('scroll', () => {
            let closestCard = null;
            let closestDistance = Infinity;

            this.cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const distance = Math.abs(rect.top - window.innerHeight / 2);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }
            });

            if (closestCard) {
                const memoryId = parseInt(closestCard.dataset.memoryId);
                this.updateActiveDot(memoryId);
            }
        });
    }
}

// Initialize timeline navigator
document.addEventListener('DOMContentLoaded', () => {
    new TimelineNavigator();
});

// ===== FLOATING PARTICLES =====

class ParticleGenerator {
    constructor(containerId, particleCount = 50) {
        this.container = document.getElementById(containerId);
        this.particles = ['❤️', '💕', '🌹', '✨', '💖', '💗', '✦', '🌸'];
        this.particleCount = particleCount;
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = this.particles[Math.floor(Math.random() * this.particles.length)];
        
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 20;
        const randomDuration = 15 + Math.random() * 15;
        
        particle.style.left = randomLeft + '%';
        particle.style.animation = `float ${randomDuration}s linear ${randomDelay}s infinite`;
        particle.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
        particle.style.opacity = 0.3 + Math.random() * 0.4;
        
        this.container.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    new ParticleGenerator('particleContainer', 50);
});

// ===== SMOOTH SCROLL TO TIMELINE =====
const ctaButton = document.getElementById('ctaButton');
const timelineSection = document.getElementById('timelineSection');

ctaButton.addEventListener('click', () => {
    timelineSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// ===== SCROLL REVEAL ANIMATIONS =====
class ScrollReveal {
    constructor() {
        this.cards = document.querySelectorAll('.timeline-card');
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, options);

        this.cards.forEach(card => {
            observer.observe(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
});

// ===== VALENTINE BUTTON CELEBRATION =====
const valentineButton = document.getElementById('valentineButton');
const celebrationModal = document.getElementById('celebrationModal');

valentineButton.addEventListener('click', () => {
    // Show modal
    celebrationModal.classList.add('active');

    // Create enhanced confetti with hearts
    createEnhancedConfetti();

    // Add screen glow effect
    addScreenGlow();

    // Create falling hearts burst
    createFallingHearts();

    // Auto hide modal after 4 seconds
    setTimeout(() => {
        celebrationModal.classList.remove('active');
    }, 4000);

    // Close modal on click
    celebrationModal.addEventListener('click', (e) => {
        if (e.target === celebrationModal) {
            celebrationModal.classList.remove('active');
        }
    });
});

function createHeartBurst(event) {
    createEnhancedConfetti();
}

function addScreenGlow() {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.top = '0';
    glow.style.left = '0';
    glow.style.width = '100%';
    glow.style.height = '100%';
    glow.style.pointerEvents = 'none';
    glow.style.background = 'radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%)';
    glow.style.zIndex = '999';
    glow.style.animation = 'screenGlow 1.5s ease-out forwards';

    document.body.appendChild(glow);

    setTimeout(() => {
        glow.remove();
    }, 1500);
}

// ===== SCREEN GLOW ANIMATION =====
const style = document.createElement('style');
style.textContent = `
    @keyframes screenGlow {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== CONFESSION TEXT AUTO-SAVE =====
const confessionText = document.getElementById('confessionText');

confessionText.addEventListener('input', () => {
    // Save to localStorage
    localStorage.setItem('confession', confessionText.value);
});

// Load saved confession on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedConfession = localStorage.getItem('confession');
    if (savedConfession) {
        confessionText.value = savedConfession;
    }
});

// ===== IMAGE FALLBACK HANDLING =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.card-image img');
    
    images.forEach(img => {
        img.addEventListener('error', () => {
            // Create placeholder background
            img.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '250px';
            placeholder.style.background = 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(139, 127, 191, 0.2) 100%)';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '3rem';
            placeholder.textContent = '📸';
            
            img.parentElement.insertBefore(placeholder, img);
        });

        // Show placeholder if image doesn't exist
        if (!img.src || img.src === 'images/placeholder.jpg') {
            img.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '250px';
            placeholder.style.background = 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(139, 127, 191, 0.2) 100%)';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.fontSize = '3rem';
            placeholder.textContent = '📸';
            placeholder.style.borderRadius = '15px 15px 0 0';
            
            img.parentElement.insertBefore(placeholder, img);
        }
    });
});

// ===== SMOOTH PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        celebrationModal.classList.remove('active');
    }
});

// ===== COPY CONFESSION TO CLIPBOARD =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save (browser default, but we handle styling)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (document.activeElement === confessionText) {
            confessionText.blur();
        }
    }
});

// ===== PARALLAX EFFECT FOR HERO =====
const heroSection = document.getElementById('heroSection');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
    });
}

// ===== RESPONSIVE CHECK =====
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
});

// ===== ENHANCE TOUCH EXPERIENCE =====
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {
        // Remove hover effects on touch
    }, false);

    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ===== CONFESSIONAL TEXT STATS =====
confessionText.addEventListener('input', () => {
    const characterCount = confessionText.value.length;
    // You can add a character counter if desired
    console.log(`Characters: ${characterCount}`);
});

// ===== DYNAMIC GREETING =====
const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
    const hours = new Date().getHours();
    let greeting = 'Our Story';
    
    if (hours >= 5 && hours < 12) {
        greeting = 'Good Morning, Love ❤️';
    } else if (hours >= 12 && hours < 17) {
        greeting = 'Good Afternoon ❤️';
    } else {
        greeting = 'Good Evening, Darling ❤️';
    }
    
    // Keep original title but add this for special occasions
    // Uncomment if you want dynamic greeting:
    // heroTitle.textContent = greeting;
}

// ===== PREVENT ACCIDENTAL NAVIGATION =====
window.addEventListener('beforeunload', (e) => {
    if (confessionText.value && confessionText.value.trim().length > 0) {
        // Auto-save already happens, so this is just a safety measure
        console.log('Confession saved locally');
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Improve focus visibility
        document.body.style.outline = 'none';
    }
});

// ===== ANIMATION PERFORMANCE OPTIMIZATION =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Respect user's motion preferences
    document.documentElement.style.scrollBehavior = 'auto';
    
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== CONSOLE EASTER EGG =====
console.log('%c❤️ Welcome to Our Love Story ❤️', 'font-size: 20px; color: #ff6b9d; font-weight: bold;');
console.log('%cCreated with love and nostalgia.', 'font-size: 14px; color: #8b7fbf;');
console.log('%cEvery memory here is a piece of forever.', 'font-size: 12px; color: #d0d0d0;');

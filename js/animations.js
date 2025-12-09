<<<<<<< HEAD
// ===== ANIMACIONES AVANZADAS PARA CODEREBELS =====

class CodeRebelsAnimations {
    constructor() {
        this.initializeAnimations();
    }

    // Inicializar todas las animaciones
    initializeAnimations() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffect();
        this.setupTypewriterEffects();
        this.setupCounterAnimations();
        this.setupParticleSystem();
        this.setupInteractiveElements();
    }

    // ===== ANIMACIONES AL SCROLL =====
    setupScrollAnimations() {
        // Configurar Intersection Observer para animaciones al scroll
        const scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateOnScroll(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Elementos a observar
        const animatedElements = document.querySelectorAll(
            '.server-card, .project-card, .skill-category, .timeline-item, .contact-card'
        );

        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    animateOnScroll(element) {
        // Añadir clase de animación según el tipo de elemento
        if (element.classList.contains('server-card')) {
            element.classList.add('drop-in');
        } else if (element.classList.contains('project-card')) {
            element.classList.add('zoom-in');
        } else if (element.classList.contains('skill-category')) {
            element.classList.add('slide-in-right');
        } else if (element.classList.contains('timeline-item')) {
            element.classList.add('slide-in-left');
        } else {
            element.classList.add('animate-fade-in');
        }

        // Efecto de brillo temporal
        element.style.boxShadow = '0 0 30px rgba(107, 70, 193, 0.4)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 1000);
    }

    // ===== ANIMACIONES AL HOVER =====
    setupHoverAnimations() {
        // Efecto de hover para tarjetas
        const cards = document.querySelectorAll('.server-card, .project-card, .goal-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hover-animation');
                this.createRippleEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hover-animation');
            });
        });

        // Efecto de hover para botones
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.add('neon-effect');
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.classList.remove('neon-effect');
            });
        });

        // Efecto de hover para enlaces
        const links = document.querySelectorAll('.nav-link, .contact-link, .project-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('heartbeat');
            });
            
            link.addEventListener('mouseleave', () => {
                link.classList.remove('heartbeat');
            });
        });
    }

    // Efecto de ondas al hacer clic/hover
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(107, 70, 193, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            top: ${rect.height / 2 - 50}px;
            left: ${rect.width / 2 - 50}px;
        `;
        
        // Añadir la animación de ripple temporalmente
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 600);
    }

    // ===== EFECTO PARALLAX =====
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-cube, .hero-background, .pixelmon-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.05);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            // Efecto de parallax para el fondo
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const heroOffset = heroSection.offsetTop;
                const scrollPercent = (scrolled - heroOffset) / heroSection.offsetHeight;
                
                if (scrollPercent > 0 && scrollPercent < 1) {
                    const opacity = 1 - (scrollPercent * 0.5);
                    heroSection.style.opacity = opacity;
                }
            }
        });
    }

    // ===== EFECTOS DE MÁQUINA DE ESCRIBIR =====
    setupTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                this.typeWriterEffect(element, text, 50, index * 500);
            }, 1000 + (index * 1000));
        });
    }

    typeWriterEffect(element, text, speed, delay = 0) {
        let i = 0;
        
        setTimeout(() => {
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    
                    // Efecto de sonido de teclado (opcional)
                    this.playTypeSound();
                } else {
                    clearInterval(timer);
                    // Añadir cursor parpadeante
                    const cursor = document.createElement('span');
                    cursor.className = 'blinking-cursor';
                    cursor.textContent = '|';
                    element.appendChild(cursor);
                }
            }, speed);
        }, delay);
    }

    playTypeSound() {
        // Crear un sonido de teclado simple
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = 800 + Math.random() * 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
    }

    // ===== ANIMACIONES DE CONTADORES =====
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16);
    }

    // ===== SISTEMA DE PARTÍCULAS =====
    setupParticleSystem() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Crear partículas iniciales
        for (let i = 0; i < 20; i++) {
            this.createParticle(heroSection);
        }
        
        // Añadir partículas periódicamente
        setInterval(() => {
            this.createParticle(heroSection);
        }, 1000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamaño aleatorio
        const size = 2 + Math.random() * 8;
        
        // Color aleatorio del tema
        const colors = ['#6B46C1', '#9F7AEA', '#38B2AC', '#00FF00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Duración de animación
        const duration = 3 + Math.random() * 7;
        
        particle.style.cssText = `
            position: absolute;
            background-color: ${color};
            border-radius: 50%;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${0.3 + Math.random() * 0.7};
            animation: particle-float ${duration}s linear infinite;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(particle);
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // ===== ELEMENTOS INTERACTIVOS =====
    setupInteractiveElements() {
        // Efecto al hacer clic en botones
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createClickEffect(e);
                this.playClickSound();
            });
        });
        
        // Efecto al hacer clic en tarjetas
        document.querySelectorAll('.server-card, .project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) { // No aplicar si se hace clic en un enlace
                    this.createClickEffect(e);
                }
            });
        });
        
        // Efecto de seguimiento del cursor
        this.setupCursorTrail();
    }

    createClickEffect(event) {
        const x = event.clientX;
        const y = event.clientY;
        
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary-color), transparent);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
            animation: click-effect 0.5s ease-out forwards;
        `;
        
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        
        // Añadir animación temporal
        const style = document.createElement('style');
        style.textContent = `
            @keyframes click-effect {
                0% {
                    transform: translate(-50%, -50%) scale(0.5);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
            style.remove();
        }, 500);
    }

    playClickSound() {
        // Efecto de sonido de clic simple
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
    }

    setupCursorTrail() {
        const trail = [];
        const trailLength = 5;
        
        document.addEventListener('mousemove', (e) => {
            // Crear nuevo punto de trail
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--accent-color);
                pointer-events: none;
                z-index: 10000;
                transform: translate(-50%, -50%);
                opacity: 0.7;
            `;
            
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            
            document.body.appendChild(dot);
            trail.push(dot);
            
            // Limitar longitud del trail
            if (trail.length > trailLength) {
                const oldDot = trail.shift();
                oldDot.style.opacity = '0';
                setTimeout(() => oldDot.remove(), 300);
            }
            
            // Desvanecer puntos gradualmente
            trail.forEach((dot, index) => {
                const opacity = 0.7 * (index / trail.length);
                dot.style.opacity = opacity;
                dot.style.width = `${6 - (index * 0.8)}px`;
                dot.style.height = `${6 - (index * 0.8)}px`;
            });
        });
    }

    // ===== ANIMACIONES DE CARGA =====
    setupLoadingAnimations() {
        // Animación de carga para imágenes
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                });
            }
        });
        
        // Mostrar porcentaje de carga
        window.addEventListener('load', () => {
            const loadingElement = document.querySelector('.loading-screen');
            if (loadingElement) {
                loadingElement.style.opacity = '0';
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                }, 500);
            }
            
            // Iniciar animaciones después de la carga
            setTimeout(() => {
                this.startPageAnimations();
            }, 100);
        });
    }

    startPageAnimations() {
        // Animación de entrada para elementos principales
        const mainElements = document.querySelectorAll('.hero-content, .section-header');
        mainElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Efecto de confeti al cargar
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#6B46C1', '#9F7AEA', '#38B2AC', '#00FF00', '#F59E0B'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 5 + Math.random() * 10;
            const posX = Math.random() * 100;
            const duration = 1 + Math.random() * 2;
            const delay = Math.random() * 0.5;
            
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                top: -20px;
                left: ${posX}%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                transform: rotate(${Math.random() * 360}deg);
                opacity: 0.8;
                animation: confetti-fall ${duration}s ease-out ${delay}s forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            
            // Añadir animación de confeti temporal
            const style = document.createElement('style');
            style.textContent = `
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
                style.remove();
            }, (duration + delay) * 1000);
        }
    }
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const animations = new CodeRebelsAnimations();
    window.CodeRebelsAnimations = animations; // Hacer disponible globalmente
});

// Exportar para módulos (si se usa)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeRebelsAnimations;
=======
// ===== ANIMACIONES AVANZADAS PARA CODEREBELS =====

class CodeRebelsAnimations {
    constructor() {
        this.initializeAnimations();
    }

    // Inicializar todas las animaciones
    initializeAnimations() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffect();
        this.setupTypewriterEffects();
        this.setupCounterAnimations();
        this.setupParticleSystem();
        this.setupInteractiveElements();
    }

    // ===== ANIMACIONES AL SCROLL =====
    setupScrollAnimations() {
        // Configurar Intersection Observer para animaciones al scroll
        const scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateOnScroll(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Elementos a observar
        const animatedElements = document.querySelectorAll(
            '.server-card, .project-card, .skill-category, .timeline-item, .contact-card'
        );

        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    animateOnScroll(element) {
        // Añadir clase de animación según el tipo de elemento
        if (element.classList.contains('server-card')) {
            element.classList.add('drop-in');
        } else if (element.classList.contains('project-card')) {
            element.classList.add('zoom-in');
        } else if (element.classList.contains('skill-category')) {
            element.classList.add('slide-in-right');
        } else if (element.classList.contains('timeline-item')) {
            element.classList.add('slide-in-left');
        } else {
            element.classList.add('animate-fade-in');
        }

        // Efecto de brillo temporal
        element.style.boxShadow = '0 0 30px rgba(107, 70, 193, 0.4)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 1000);
    }

    // ===== ANIMACIONES AL HOVER =====
    setupHoverAnimations() {
        // Efecto de hover para tarjetas
        const cards = document.querySelectorAll('.server-card, .project-card, .goal-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('card-hover-animation');
                this.createRippleEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('card-hover-animation');
            });
        });

        // Efecto de hover para botones
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.classList.add('neon-effect');
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.classList.remove('neon-effect');
            });
        });

        // Efecto de hover para enlaces
        const links = document.querySelectorAll('.nav-link, .contact-link, .project-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('heartbeat');
            });
            
            link.addEventListener('mouseleave', () => {
                link.classList.remove('heartbeat');
            });
        });
    }

    // Efecto de ondas al hacer clic/hover
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(107, 70, 193, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            top: ${rect.height / 2 - 50}px;
            left: ${rect.width / 2 - 50}px;
        `;
        
        // Añadir la animación de ripple temporalmente
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            style.remove();
        }, 600);
    }

    // ===== EFECTO PARALLAX =====
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-cube, .hero-background, .pixelmon-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.05);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            // Efecto de parallax para el fondo
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const heroOffset = heroSection.offsetTop;
                const scrollPercent = (scrolled - heroOffset) / heroSection.offsetHeight;
                
                if (scrollPercent > 0 && scrollPercent < 1) {
                    const opacity = 1 - (scrollPercent * 0.5);
                    heroSection.style.opacity = opacity;
                }
            }
        });
    }

    // ===== EFECTOS DE MÁQUINA DE ESCRIBIR =====
    setupTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                this.typeWriterEffect(element, text, 50, index * 500);
            }, 1000 + (index * 1000));
        });
    }

    typeWriterEffect(element, text, speed, delay = 0) {
        let i = 0;
        
        setTimeout(() => {
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    
                    // Efecto de sonido de teclado (opcional)
                    this.playTypeSound();
                } else {
                    clearInterval(timer);
                    // Añadir cursor parpadeante
                    const cursor = document.createElement('span');
                    cursor.className = 'blinking-cursor';
                    cursor.textContent = '|';
                    element.appendChild(cursor);
                }
            }, speed);
        }, delay);
    }

    playTypeSound() {
        // Crear un sonido de teclado simple
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = 800 + Math.random() * 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
    }

    // ===== ANIMACIONES DE CONTADORES =====
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16);
    }

    // ===== SISTEMA DE PARTÍCULAS =====
    setupParticleSystem() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Crear partículas iniciales
        for (let i = 0; i < 20; i++) {
            this.createParticle(heroSection);
        }
        
        // Añadir partículas periódicamente
        setInterval(() => {
            this.createParticle(heroSection);
        }, 1000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamaño aleatorio
        const size = 2 + Math.random() * 8;
        
        // Color aleatorio del tema
        const colors = ['#6B46C1', '#9F7AEA', '#38B2AC', '#00FF00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Duración de animación
        const duration = 3 + Math.random() * 7;
        
        particle.style.cssText = `
            position: absolute;
            background-color: ${color};
            border-radius: 50%;
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${0.3 + Math.random() * 0.7};
            animation: particle-float ${duration}s linear infinite;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(particle);
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // ===== ELEMENTOS INTERACTIVOS =====
    setupInteractiveElements() {
        // Efecto al hacer clic en botones
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createClickEffect(e);
                this.playClickSound();
            });
        });
        
        // Efecto al hacer clic en tarjetas
        document.querySelectorAll('.server-card, .project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) { // No aplicar si se hace clic en un enlace
                    this.createClickEffect(e);
                }
            });
        });
        
        // Efecto de seguimiento del cursor
        this.setupCursorTrail();
    }

    createClickEffect(event) {
        const x = event.clientX;
        const y = event.clientY;
        
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary-color), transparent);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10000;
            animation: click-effect 0.5s ease-out forwards;
        `;
        
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        
        // Añadir animación temporal
        const style = document.createElement('style');
        style.textContent = `
            @keyframes click-effect {
                0% {
                    transform: translate(-50%, -50%) scale(0.5);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
            style.remove();
        }, 500);
    }

    playClickSound() {
        // Efecto de sonido de clic simple
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.value = 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.1);
    }

    setupCursorTrail() {
        const trail = [];
        const trailLength = 5;
        
        document.addEventListener('mousemove', (e) => {
            // Crear nuevo punto de trail
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: var(--accent-color);
                pointer-events: none;
                z-index: 10000;
                transform: translate(-50%, -50%);
                opacity: 0.7;
            `;
            
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            
            document.body.appendChild(dot);
            trail.push(dot);
            
            // Limitar longitud del trail
            if (trail.length > trailLength) {
                const oldDot = trail.shift();
                oldDot.style.opacity = '0';
                setTimeout(() => oldDot.remove(), 300);
            }
            
            // Desvanecer puntos gradualmente
            trail.forEach((dot, index) => {
                const opacity = 0.7 * (index / trail.length);
                dot.style.opacity = opacity;
                dot.style.width = `${6 - (index * 0.8)}px`;
                dot.style.height = `${6 - (index * 0.8)}px`;
            });
        });
    }

    // ===== ANIMACIONES DE CARGA =====
    setupLoadingAnimations() {
        // Animación de carga para imágenes
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                });
            }
        });
        
        // Mostrar porcentaje de carga
        window.addEventListener('load', () => {
            const loadingElement = document.querySelector('.loading-screen');
            if (loadingElement) {
                loadingElement.style.opacity = '0';
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                }, 500);
            }
            
            // Iniciar animaciones después de la carga
            setTimeout(() => {
                this.startPageAnimations();
            }, 100);
        });
    }

    startPageAnimations() {
        // Animación de entrada para elementos principales
        const mainElements = document.querySelectorAll('.hero-content, .section-header');
        mainElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Efecto de confeti al cargar
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#6B46C1', '#9F7AEA', '#38B2AC', '#00FF00', '#F59E0B'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 5 + Math.random() * 10;
            const posX = Math.random() * 100;
            const duration = 1 + Math.random() * 2;
            const delay = Math.random() * 0.5;
            
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                top: -20px;
                left: ${posX}%;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                transform: rotate(${Math.random() * 360}deg);
                opacity: 0.8;
                animation: confetti-fall ${duration}s ease-out ${delay}s forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            
            // Añadir animación de confeti temporal
            const style = document.createElement('style');
            style.textContent = `
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
                style.remove();
            }, (duration + delay) * 1000);
        }
    }
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const animations = new CodeRebelsAnimations();
    window.CodeRebelsAnimations = animations; // Hacer disponible globalmente
});

// Exportar para módulos (si se usa)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeRebelsAnimations;
>>>>>>> 361137f8eb5bb2fd39c4ebb5cf7a46ca654a3a5e
}
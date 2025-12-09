// ===== SISTEMA DE MENÚ PARA CODEREBELS =====

class CodeRebelsMenu {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navMenu = document.getElementById('navMenu');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentSection = '';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollSpy();
        this.setupMobileMenu();
        this.setupMenuAnimations();
        this.setupActiveLink();
    }

    // ===== CONFIGURAR EVENT LISTENERS =====
    setupEventListeners() {
        // Menú hamburguesa
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Cerrar menú al hacer clic en enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Cambiar estilo del navbar al hacer scroll
        window.addEventListener('scroll', () => this.handleScroll());

        // Manejar teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // ===== MENÚ MÓVIL =====
    setupMobileMenu() {
        // Añadir overlay para móvil
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(10px);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        overlay.addEventListener('click', () => this.closeMobileMenu());
        document.body.appendChild(overlay);
        this.overlay = overlay;
    }

    toggleMobileMenu() {
        const isActive = this.hamburger.classList.contains('active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        
        // Animar enlaces del menú
        this.animateMenuItems();
        
        // Efecto de sonido
        this.playMenuSound('open');
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        
        // Efecto de sonido
        this.playMenuSound('close');
    }

    handleOutsideClick(event) {
        const isClickInsideMenu = this.navMenu.contains(event.target);
        const isClickOnHamburger = this.hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && this.navMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }

    animateMenuItems() {
        const menuItems = this.navMenu.querySelectorAll('.nav-link');
        
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // ===== SCROLL SPY - SEGUIMIENTO DE SECCIÓN ACTIVA =====
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.currentSection = entry.target.id;
                        this.updateActiveLink();
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-100px 0px -100px 0px'
            }
        );
        
        sections.forEach(section => observer.observe(section));
    }

    updateActiveLink() {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === `#${this.currentSection}`) {
                link.classList.add('active');
                
                // Efecto visual para el enlace activo
                this.highlightActiveLink(link);
            }
        });
    }

    highlightActiveLink(link) {
        // Remover highlight anterior
        document.querySelectorAll('.nav-link-highlight').forEach(el => el.remove());
        
        // Crear highlight
        const highlight = document.createElement('span');
        highlight.className = 'nav-link-highlight';
        highlight.style.cssText = `
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
            border-radius: 2px;
            animation: highlight-pulse 2s infinite;
        `;
        
        // Añadir animación temporal
        const style = document.createElement('style');
        style.textContent = `
            @keyframes highlight-pulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        link.appendChild(highlight);
        
        // Limpiar después de un tiempo
        setTimeout(() => style.remove(), 2000);
    }

    // ===== MANEJO DEL SCROLL =====
    handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Cambiar estilo del navbar al hacer scroll
        if (scrollPosition > 100) {
            this.navbar.classList.add('scrolled');
            this.navbar.style.backdropFilter = 'blur(20px)';
            this.navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            this.navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            this.navbar.classList.remove('scrolled');
            this.navbar.style.backdropFilter = 'blur(15px)';
            this.navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            this.navbar.style.boxShadow = 'none';
        }
        
        // Efecto de parallax en el logo
        this.handleLogoParallax(scrollPosition);
        
        // Mostrar/ocultar botón de volver arriba
        this.handleBackToTop(scrollPosition);
    }

    handleLogoParallax(scrollPosition) {
        const logo = document.querySelector('.logo');
        if (logo && scrollPosition > 0) {
            const scale = 1 - Math.min(scrollPosition * 0.001, 0.1);
            logo.style.transform = `scale(${scale})`;
        }
    }

    handleBackToTop(scrollPosition) {
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            if (scrollPosition > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    }

    // ===== ANIMACIONES DEL MENÚ =====
    setupMenuAnimations() {
        // Efecto de hover en enlaces del menú
        this.navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.createLinkHoverEffect(link);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeLinkHoverEffect(link);
            });
        });
        
        // Animación de entrada del navbar
        this.animateNavbarEntrance();
    }

    createLinkHoverEffect(link) {
        // Crear efecto de partículas al hover
        const particles = 3;
        
        for (let i = 0; i < particles; i++) {
            setTimeout(() => {
                this.createMenuParticle(link);
            }, i * 100);
        }
        
        // Efecto de escala
        link.style.transform = 'scale(1.1)';
    }

    removeLinkHoverEffect(link) {
        link.style.transform = 'scale(1)';
    }

    createMenuParticle(link) {
        const particle = document.createElement('div');
        const rect = link.getBoundingClientRect();
        
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background-color: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: menu-particle 0.6s ease-out forwards;
        `;
        
        // Añadir animación temporal
        const style = document.createElement('style');
        style.textContent = `
            @keyframes menu-particle {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            style.remove();
        }, 600);
    }

    animateNavbarEntrance() {
        // Animación de entrada del navbar
        this.navbar.style.opacity = '0';
        this.navbar.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            this.navbar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            this.navbar.style.opacity = '1';
            this.navbar.style.transform = 'translateY(0)';
        }, 300);
    }

    // ===== ENLACE ACTIVO POR DEFECTO =====
    setupActiveLink() {
        // Establecer "Inicio" como activo por defecto
        const homeLink = document.querySelector('.nav-link[href="#inicio"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }

    // ===== MANEJO DE TECLADO =====
    handleKeyboard(event) {
        // ESC para cerrar menú móvil
        if (event.key === 'Escape' && this.navMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
        
        // Flechas para navegación
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            this.handleKeyboardNavigation(event.key);
        }
    }

    handleKeyboardNavigation(key) {
        const currentIndex = Array.from(this.navLinks).findIndex(link => 
            link.classList.contains('active')
        );
        
        let nextIndex;
        if (key === 'ArrowDown') {
            nextIndex = currentIndex < this.navLinks.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : this.navLinks.length - 1;
        }
        
        this.navLinks.forEach(link => link.classList.remove('active'));
        this.navLinks[nextIndex].classList.add('active');
        
        // Scroll a la sección correspondiente
        const href = this.navLinks[nextIndex].getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // ===== EFECTOS DE SONIDO =====
    playMenuSound(action) {
        // Solo reproducir sonido si está permitido
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (action === 'open') {
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
        } else {
            oscillator.frequency.value = 400;
            oscillator.type = 'sine';
        }
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // ===== FUNCIONES PÚBLICAS =====
    navigateTo(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            // Cerrar menú móvil si está abierto
            if (this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
            
            // Scroll suave a la sección
            target.scrollIntoView({ behavior: 'smooth' });
            
            // Actualizar enlace activo
            this.currentSection = sectionId;
            this.updateActiveLink();
            
            return true;
        }
        return false;
    }

    getCurrentSection() {
        return this.currentSection;
    }

    isMobileMenuOpen() {
        return this.navMenu.classList.contains('active');
    }
}

// Inicializar menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const menu = new CodeRebelsMenu();
    window.CodeRebelsMenu = menu; // Hacer disponible globalmente
    
    // Añadir al objeto global para acceso fácil
    window.navigateToSection = (sectionId) => menu.navigateTo(sectionId);
});

// Para navegación programática desde otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeRebelsMenu;
}
// ===== CONFIGURACIÓN INICIAL =====
console.log('🚀 Portafolio AleeJi - CodeRebels Development cargado');

// ===== MENÚ HAMBURGUESA =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Bloquear scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offset = 100; // Ajuste para la barra de navegación
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// ===== ANIMACIONES AL SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            
            // Animación especial para timeline items
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.classList.add('animate-slide-left');
            }
        }
    });
}, observerOptions);

// Observar elementos para animación
const elementsToAnimate = [
    '.overview-card',
    '.feature',
    '.timeline-item',
    '.goal-card',
    '.contact-card',
    '.skill',
    '.learning-item',
    '.server-philosophy'
];

elementsToAnimate.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    });
});

// ===== EFECTO DE ESCRITURA EN EL TÍTULO =====
function initTypeWriter() {
    const typingElement = document.querySelector('.text-typing');
    if (!typingElement) return;
    
    const text = 'AleeJi';
    const speed = 150;
    let i = 0;
    
    // Guardar el contenido original
    const originalContent = typingElement.textContent;
    
    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Mantener cursor parpadeando
            typingElement.innerHTML = text + '<span class="cursor blinking">|</span>';
        }
    }
    
    // Esperar un momento antes de empezar
    setTimeout(() => {
        typingElement.innerHTML = '';
        typeWriter();
    }, 1000);
}

// ===== BOTÓN VOLVER ARRIBA =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.tech-level');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// ===== CONTADOR ANIMADO DE ESTADÍSTICAS =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 30);
    });
}

// ===== SIMULACIÓN DE CONTACTO =====
function setupContactInteraction() {
    const discordButton = document.querySelector('[onclick*="Discord"]');
    if (discordButton) {
        discordButton.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="Discord"]')) {
                e.preventDefault();
                alert('Discord: ale.ij\n¡Agrégame para hablar de proyectos!');
            }
        });
    }
    
    const emailButton = document.querySelector('a[href^="mailto"]');
    if (emailButton) {
        emailButton.addEventListener('click', (e) => {
            setTimeout(() => {
                const confirmation = confirm('¿Quieres copiar mi email al portapapeles?');
                if (confirmation) {
                    navigator.clipboard.writeText('coderebels.developer@gmail.com')
                        .then(() => alert('Email copiado al portapapeles 📋'))
                        .catch(() => alert('No se pudo copiar el email'));
                }
            }, 100);
        });
    }
}

// ===== EFECTO PARALLAX =====
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-cube, .pixelmon-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== TEMPORIZADOR DE ACTIVIDAD =====
function setupActivityTimer() {
    const startDate = new Date('2023-11-01');
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const activityElement = document.querySelector('.overview-card:nth-child(1) p');
    if (activityElement && activityElement.textContent.includes('Noviembre')) {
        activityElement.textContent = `${diffDays}+ días activo`;
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar efectos
    initTypeWriter();
    animateSkillBars();
    setupContactInteraction();
    setupParallax();
    setupActivityTimer();
    
    // Añadir clases iniciales para animación
    document.querySelectorAll('.overview-card, .feature, .goal-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    // Observar elementos
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
    
    // Iniciar contador de estadísticas después de un delay
    setTimeout(animateStats, 1000);
    
    // Efecto de sonido opcional (descomentar si quieres)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const clickSound = new Audio('click.mp3');
            clickSound.volume = 0.3;
            clickSound.play();
        });
    });
    
    console.log('✅ Todos los sistemas operativos - ¡Bienvenido al portafolio de AleeJi!');
});

// ===== DETECCIÓN DE TEMA DEL SISTEMA =====
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

// Escuchar cambios en el tema del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectSystemTheme);

// ===== CARGAR TEMPLATES DINÁMICOS (para futuras expansiones) =====
function loadTemplate(templateId, targetId) {
    const template = document.getElementById(templateId);
    const target = document.getElementById(targetId);
    
    if (template && target) {
        target.innerHTML = template.innerHTML;
    }
}

// ===== MANEJADOR DE ERRORES =====
window.addEventListener('error', (event) => {
    console.error('Error en el portafolio:', event.error);
});

// ===== OFFLINE SUPPORT =====
window.addEventListener('offline', () => {
    console.warn('⚠️ Estás offline - Algunas funciones pueden no estar disponibles');
});

window.addEventListener('online', () => {
    console.log('🌐 ¡Estás de vuelta online!');
});
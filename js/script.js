document.addEventListener('DOMContentLoaded', function() {
    // Inicializar partículas
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Cambio de tema
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animación del botón
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Efecto de escritura para el poema
    const poemLines = document.querySelectorAll('.poem-line');
    
    function animatePoem() {
        poemLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 50 + (index * 20));
        });
    }
    
    // Observador de intersección para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('poem-section')) {
                    animatePoem();
                }
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.poem-section, .footer');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Efecto de hover en los nombres del menú
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('mouseenter', function() {
            const dropdown = this.nextElementSibling;
            const letters = this.textContent.split('');
            
            this.textContent = '';
            
            letters.forEach((letter, i) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.display = 'inline-block';
                span.style.transition = `transform 0.3s ${i * 0.05}s`;
                this.appendChild(span);
                
                setTimeout(() => {
                    span.style.transform = 'translateY(-5px)';
                }, 10);
            });
        });
        
        toggle.addEventListener('mouseleave', function() {
            const spans = this.querySelectorAll('span');
            
            spans.forEach(span => {
                span.style.transform = 'translateY(0)';
            });
            
            setTimeout(() => {
                this.textContent = this.dataset.originalText || 'Lennyn';
            }, 300);
        });
        
        // Guardar el texto original
        this.dataset.originalText = this.textContent;
    });

    // Efecto de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de parallax para el hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Efecto de sonido al interactuar con elementos
    const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
    hoverSound.volume = 0.2;
    
    document.querySelectorAll('.nav-link, .dropdown-item, .theme-toggle').forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
});
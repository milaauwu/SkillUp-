// inicia animaciones, navegación, scroll y elementos 
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations()
    initNavigation()
    initScrollEffects()
    initInteractiveElements()

    // navbar background + scroll
    // cambia fondo de navbar al hacer scroll
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar")
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)"
            navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)"
            navbar.style.boxShadow = "none"
        }
    })

    // animacion de scroll
    // observar aparicion de elementos en pantalla
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    // observa elementos .service-card y aplica animacion de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, observerOptions)

    // servicio card
    // selecciona tarjetas de servicio para aplicar animaciones
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(30px)"
        card.style.transition = "all 0.6s ease"
        observer.observe(card)
    })

    // animacion para clase stat
    // aplica animacion de contador a estadisticas 
    const stats = document.querySelectorAll(".stat-number")
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target)
                }
            })
        },
        { threshold: 0.5 },
    )

    stats.forEach((stat) => {
        statsObserver.observe(stat)
    })
})

// redirige al test 1

// redirige al test 2

// redirige a game dress

// anima numeros desde 0 hasta su valor final
function animateCounter(element) {
    const target = element.textContent.includes("K")
        ? Number.parseInt(element.textContent) * 1000
        : Number.parseInt(element.textContent.replace(/[^\d]/g, ""))

    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
        current += step
        if (current >= target) {
            current = target
            clearInterval(timer)
        }

        if (element.textContent.includes("K")) {
            element.textContent = Math.floor(current / 1000) + "K+"
        } else if (element.textContent.includes("%")) {
            element.textContent = Math.floor(current) + "%"
        } else {
            element.textContent = Math.floor(current)
        }
    }, 16)
}

// agrega clase 'loaded' al cargar completamente la página
window.addEventListener("load", () => {
    document.body.classList.add("loaded")
})

// efecto parrallax
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const rate = scrolled * -0.5

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`
    }
})

// aplica efecto hover a tarjetas de servicio
document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
    })
})

// transicion suave antes de redirigir a otra pag
function navigateWithTransition(url) {
    document.body.style.opacity = "0"
    setTimeout(() => {
        window.location.href = url
    }, 300)
}

// anima elementos con atributo data-aos al entrar en pantalla
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate")
            }
        })
    }, observerOptions)
    document.querySelectorAll("[data-aos]").forEach((el) => {
        observer.observe(el)
    })
}

//  menu "hamburguesa" para mobile
function initNavigation() {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")

    // mobile
    hamburger?.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")

        // animacion
        const spans = hamburger.querySelectorAll("span")
        if (hamburger.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
            spans[1].style.opacity = "0"
            spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
        } else {
            spans.forEach((span) => {
                span.style.transform = ""
                span.style.opacity = ""
            })
        }
    })

    // cerrar menu mobile click en x
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            hamburger?.classList.remove("active")
            navMenu?.classList.remove("active")

            // reset
            const spans = hamburger?.querySelectorAll("span")
            spans?.forEach((span) => {
                span.style.transform = ""
                span.style.opacity = ""
            })
        })
    })

    // scroll navbar navegacion
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()
            const targetId = this.getAttribute("href")
            const targetSection = document.querySelector(targetId)

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }
        })
    })
}

// efectos visuales en scroll como navbar y figuras flotantes
function initScrollEffects() {
    let ticking = false
    // efectos visuales: scroll, parallax y figuras flotantes
    function updateScrollEffects() {
        const scrolled = window.pageYOffset
        const navbar = document.querySelector(".navbar")
        const hero = document.querySelector(".hero")

        // navbar background
        if (scrolled > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.98)"
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)"
            navbar.style.boxShadow = "none"
        }

        // parrallax efecto (hero)
        if (hero) {
            const rate = scrolled * -0.3
            hero.style.transform = `translateY(${rate}px)`
        }

        // aniamciones para scroll
        const shapes = document.querySelectorAll(".shape")
        shapes.forEach((shape, index) => {
            const rate = scrolled * (0.1 + index * 0.05)
            shape.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`
        })

        ticking = false
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects)
            ticking = true
        }
    }

    window.addEventListener("scroll", requestTick)
}

// hover, click y efectos interactivos en tarjetas y botones
function initInteractiveElements() {
    // efectos hover sobre quiz card
    const quizCards = document.querySelectorAll(".quiz-card")

    quizCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-15px) scale(1.02)"

            // efecto glow
            const glow = this.querySelector(".quiz-glow")
            if (glow) {
                glow.style.opacity = "1"
                glow.style.height = "4px"
            }
        })

        card.addEventListener("mouseleave", function () {
            if (this.classList.contains("featured")) {
                this.style.transform = "scale(1.05) translateY(0)"
            } else {
                this.style.transform = "translateY(0) scale(1)"
            }

            // remove glow
            const glow = this.querySelector(".quiz-glow")
            if (glow) {
                glow.style.opacity = "0"
                glow.style.height = "2px"
            }
        })

        // animacion al dar click
        card.addEventListener("click", function () {
            this.style.transform = "scale(0.98)"
            setTimeout(() => {
                if (this.classList.contains("featured")) {
                    this.style.transform = "scale(1.05)"
                } else {
                    this.style.transform = "scale(1)"
                }
            }, 150)
        })
    })

    // boton click efectos
    const buttons = document.querySelectorAll(".cta-button, .quiz-button")
    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span")
            const rect = this.getBoundingClientRect()
            const size = Math.max(rect.width, rect.height)
            const x = e.clientX - rect.left - size / 2
            const y = e.clientY - rect.top - size / 2

            ripple.style.width = ripple.style.height = size + "px"
            ripple.style.left = x + "px"
            ripple.style.top = y + "px"
            ripple.classList.add("ripple")

            this.appendChild(ripple)

            setTimeout(() => {
                ripple.remove()
            }, 600)
        })
    })

    // creamos style ripple
    const style = document.createElement("style")
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
    document.head.appendChild(style)
}

// desplaza suavemente hasta la seccion de tests
function scrollToQuizzes() {
    const quizzesSection = document.querySelector("#quizzes")
    quizzesSection?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
}

// va al test 1
function goToCareerQuiz() {
    // se añade animacion de loading
    showLoadingTransition()
    setTimeout(() => {
        window.location.href = "FormularioVocacional/HTML/FormularioVocacional.html"
    }, 500)
}

// 👑va al test 2
function goToLeadershipQuiz() {
    showLoadingTransition()
    setTimeout(() => {
        window.location.href = "TestHabilidesBlandas/Preguntas habilidades blandas.html"
    }, 500)
}

// va a dress game
function goToDressGame() {
    showLoadingTransition()
    setTimeout(() => {
        window.location.href = "DressCode/index.html"
    }, 500)
}

// pantalla de carga con animacion mientras dirige
function showLoadingTransition() {
    const overlay = document.createElement("div")
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        font-weight: 600;
    `

    overlay.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <div>Cargando tu experiencia...</div>
        </div>
    `

    // animacion de spin (carga)
    const spinStyle = document.createElement("style")
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `
    document.head.appendChild(spinStyle)

    document.body.appendChild(overlay)
}

// aplica animaciones a tarjetas y estadisticas
function initAdvancedAnimations() {
    const quizCards = document.querySelectorAll(".quiz-card")
    quizCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`
    })
    const stats = document.querySelectorAll(".stat-number")
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target)
                }
            })
        },
        { threshold: 0.5 },
    )

    stats.forEach((stat) => {
        statsObserver.observe(stat)
    })
}

// inicializa las animaciones
document.addEventListener("DOMContentLoaded", initAdvancedAnimations)

// comparte resultados del test en redes sociales
function shareResults(platform, results) {
    const shareText = `¡Acabo de descubrir mi perfil profesional en FutureMe! 🚀 ${results.title}`
    const shareUrl = window.location.href

    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
        instagram: shareUrl,
    }

    if (shareUrls[platform]) {
        window.open(shareUrls[platform], "_blank", "width=600,height=400")
    }
}

// controla frecuencia de ejecucion para mejorar el rendimiento de la pag
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

function updateScrollEffects() {
    const scrolled = window.pageYOffset
    const navbar = document.querySelector(".navbar")
    const hero = document.querySelector(".hero")

    if (scrolled > 50) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)"
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
    } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
        navbar.style.boxShadow = "none"
    }
    if (hero) {
        const rate = scrolled * -0.3
        hero.style.transform = `translateY(${rate}px)`
    }

    // animaciones basadas en scroll
    const shapes = document.querySelectorAll(".shape")
    shapes.forEach((shape, index) => {
        const rate = scrolled * (0.1 + index * 0.05)
        shape.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`
    })
}

// scroll optimizado usando debounce
const optimizedScrollHandler = debounce(() => {
    updateScrollEffects()
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)

// animacion de entrada para secciones completas
function initSectionAnimations() {
    const sections = document.querySelectorAll(".quizzes, .dress-game-section, .about")

    sections.forEach((section) => {
        section.classList.add("section-animate")
    })

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in")
                }
            })
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
        },
    )

    sections.forEach((section) => {
        sectionObserver.observe(section)
    })
}

// animacion para zona de el equipo
function initTeamAnimations() {
    const teamSection = document.querySelector(".about")
    const teamMembers = document.querySelectorAll(".team-member")

    const teamObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    teamMembers.forEach((member, index) => {
                        setTimeout(() => {
                            member.style.opacity = "1"
                            member.style.transform = "translateY(0) scale(1)"
                        }, index * 200)
                    })
                }
            })
        },
        {
            threshold: 0.3,
        },
    )

    if (teamSection) {
        teamObserver.observe(teamSection)
    }
}

// Efecto de parallax a fondos fijos
function initParallaxEffects() {
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll(".parallax-bg")

        parallaxElements.forEach((element) => {
            const speed = 0.5
            const yPos = -(scrolled * speed)
            element.style.transform = `translateY(${yPos}px)`
        })
    })
}

// transiciones suaves entre secciones
function initSmoothTransitions() {
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()
            const targetId = this.getAttribute("href")
            const targetSection = document.querySelector(targetId)

            if (targetSection) {
                // añadir clase de transicion
                document.body.style.scrollBehavior = "smooth"

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
                targetSection.style.transform = "scale(1.01)"
                setTimeout(() => {
                    targetSection.style.transform = "scale(1)"
                }, 300)
            }
        })
    })
}

// inicializar animaciones
document.addEventListener("DOMContentLoaded", () => {
    initSectionAnimations()
    initTeamAnimations()
    initParallaxEffects()
    initSmoothTransitions()
})
let latestScrollY = 0
let ticking = false

function applySmoothParallax() {
    const hero = document.querySelector(".hero")
    if (hero) {
        const rate = latestScrollY * -0.2
        hero.style.transform = `translateY(${rate}px)`
    }

    const shapes = document.querySelectorAll(".shape")
    shapes.forEach((shape, index) => {
        const offset = latestScrollY * (0.1 + index * 0.03)
        shape.style.transform = `translateY(${offset}px) rotate(${latestScrollY * 0.05}deg)`
    })

    ticking = false
}

function onScroll() {
    latestScrollY = window.scrollY
    if (!ticking) {
        window.requestAnimationFrame(applySmoothParallax)
        ticking = true
    }
}

window.addEventListener("scroll", onScroll)

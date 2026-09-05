document.addEventListener("DOMContentLoaded", () => {
    // Referencias del DOM
    const text403 = document.querySelector('.huge-403');
    const illustration = document.querySelector('.illustration-wrapper');
    const book = document.querySelector('#closed-book');
    const lock = document.querySelector('#digital-lock');
    const particles = document.querySelectorAll('.particle');
    const message = document.querySelector('.message');
    const buttons = document.querySelectorAll('.btn');

    // 1. Animación de Entrada Progresiva (Timeline)
    const tl = gsap.timeline();

    tl.fromTo(text403, 
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }
    )
    .fromTo(illustration,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=1.3"
    )
    .fromTo(particles,
        { opacity: 0, scale: 0 },
        { opacity: 0.45, scale: 1, duration: 1, stagger: 0.08, ease: "back.out(1.4)" },
        "-=0.8"
    )
    .fromTo([message, buttons],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
    );

    // 2. Microanimación Ocasional y Discreta del Candado (Pulso neón cada 4.5 segundos)
    gsap.to(lock, {
        scale: 1.05,
        transformOrigin: "center center",
        duration: 0.4,
        repeat: -1,
        repeatDelay: 4.5,
        yoyo: true,
        ease: "power1.inOut"
    });

    // 3. Interacción Parallax vs Animación Ambiental Táctil
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    if (isTouchDevice) {
        // En móviles: Flotación ambiental suave
        gsap.to(illustration, { y: "-=12", duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(text403, { scale: 1.015, duration: 4.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
    } else {
        // En escritorio: Parallax multicapa suave
        window.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            // El "403" se desplaza en fondo (capa profunda)
            gsap.to(text403, { x: x * -20, y: y * -20, duration: 1.1, ease: "power2.out" });

            // La ilustración principal se mueve en primer plano
            gsap.to(illustration, { x: x * 30, y: y * 30, rotation: x * 4, duration: 1, ease: "power2.out" });

            // Parallax interno: El candado se mueve ligeramente independiente del libro para dar profundidad
            gsap.to(lock, { x: x * 8, y: y * 8, duration: 0.8, ease: "power1.out" });

            // Partículas a distintas velocidades
            particles.forEach((particle, index) => {
                const depth = (index % 3 + 1) * 10;
                gsap.to(particle, { x: x * depth, y: y * depth, duration: 1.2, ease: "power2.out" });
            });
        });
    }

    // 4. Microinteracciones de los Botones
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { scale: 1.04, y: -2, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        });
    });
});
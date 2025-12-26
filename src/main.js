// Initialize Lucide icons
lucide.createIcons();

// Lenis Smooth Scroll
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Header animation on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
});

// Глобальная анимация появления элементов при скролле
gsap.registerPlugin(ScrollTrigger);

const footerCols = document.querySelectorAll('.footer__col');
gsap.from(footerCols, {
    scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
});
// Анимация появления Hero-контента
gsap.from(".hero__content > *", {
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    delay: 0.5
});

// Плавное парение для 3D блока (если Spline не загрузился сразу)
gsap.from(".hero__visual", {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "expo.out",
    delay: 0.2
});
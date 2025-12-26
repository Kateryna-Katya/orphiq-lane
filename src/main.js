lucide.createIcons();

// Smooth Scroll (Lenis)
const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Mobile Menu Toggle
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.onclick = () => {
    mobileMenu.classList.toggle('active');
    burger.classList.toggle('active');
};

mobileLinks.forEach(link => {
    link.onclick = () => {
        mobileMenu.classList.remove('active');
    };
});

// Captcha Logic
const captchaQ = document.getElementById('captchaQuestion');
const num1 = Math.floor(Math.random() * 10);
const num2 = Math.floor(Math.random() * 10);
const correctAnswer = num1 + num2;
if(captchaQ) captchaQ.innerText = `${num1} + ${num2} = `;

// Form Validation & AJAX Simulation
const form = document.getElementById('mainForm');
const phoneInput = document.getElementById('phoneInput');

phoneInput.oninput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
};

form.onsubmit = (e) => {
    e.preventDefault();
    const userAnswer = document.getElementById('captchaAnswer').value;
    
    if(parseInt(userAnswer) !== correctAnswer) {
        alert('Ошибка в капче. Попробуйте снова.');
        return;
    }

    const btn = form.querySelector('button');
    btn.innerText = 'Отправка...';
    
    setTimeout(() => {
        form.reset();
        document.getElementById('formSuccess').style.display = 'block';
        btn.innerText = 'Отправить запрос';
    }, 1500);
};

// Cookie Popup Logic
if(!localStorage.getItem('cookiesAccepted')) {
    const popup = document.getElementById('cookiePopup');
    popup.style.display = 'flex';
    document.getElementById('acceptCookies').onclick = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        popup.style.display = 'none';
    };
}

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('.section-title, .about__card, .inno-item, .blog-card'), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
});
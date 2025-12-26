/**
 * ORPHIQ LANE — OFFICIAL PLATFORM SCRIPT (2025)
 * Технологический стек: Three.js, GSAP, Lenis, Lucide.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (LUCIDE) ---
  // Выполняем в первую очередь, чтобы элементы имели корректные размеры до расчетов GSAP
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // --- 2. ПЛАВНЫЙ СКРОЛЛ (LENIS) ---
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // --- 3. ИНТЕРАКТИВНАЯ 3D СФЕРА (THREE.JS) ---
  const initHero3D = () => {
      const container = document.getElementById('hero-canvas');
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Геометрия: сфера из точек (Cloud of Innovation)
      const geometry = new THREE.IcosahedronGeometry(2.2, 3);
      const material = new THREE.PointsMaterial({
          color: 0xFF7675, // Коралловый акцент
          size: 0.045,
          transparent: true,
          opacity: 0.8
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      camera.position.z = 5;

      // Интерактив за мышью
      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX / window.innerWidth) - 0.5;
          mouseY = (e.clientY / window.innerHeight) - 0.5;
      });

      const animate = () => {
          requestAnimationFrame(animate);
          // Базовое вращение
          points.rotation.y += 0.0015;
          points.rotation.x += 0.0008;
          // Движение за курсором (сглаженное)
          points.rotation.y += (mouseX * 0.4 - points.rotation.y) * 0.05;
          points.rotation.x += (mouseY * 0.4 - points.rotation.x) * 0.05;
          renderer.render(scene, camera);
      };
      animate();

      window.addEventListener('resize', () => {
          camera.aspect = container.offsetWidth / container.offsetHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.offsetWidth, container.offsetHeight);
      });
  };
  initHero3D();

  // --- 4. МОБИЛЬНОЕ МЕНЮ (BURGER) ---
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (burger && mobileMenu) {
      burger.onclick = () => {
          burger.classList.toggle('active');
          mobileMenu.classList.toggle('active');
          document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      };

      mobileLinks.forEach(link => {
          link.onclick = () => {
              burger.classList.remove('active');
              mobileMenu.classList.remove('active');
              document.body.style.overflow = '';
          };
      });
  }

  // --- 5. ВАЛИДАЦИЯ ФОРМЫ, КАПЧА И ТЕЛЕФОН ---
  const phoneInput = document.getElementById('phoneInput');
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          // Разрешаем только цифры и знак +
          e.target.value = e.target.value.replace(/[^0-9+]/g, '');
      });
  }

  const captchaLabel = document.getElementById('captchaQuestion');
  const captchaInput = document.getElementById('captchaAnswer');
  let captchaResult = 0;

  const generateCaptcha = () => {
      if (!captchaLabel) return;
      const n1 = Math.floor(Math.random() * 10) + 1;
      const n2 = Math.floor(Math.random() * 7) + 1;
      captchaResult = n1 + n2;
      captchaLabel.innerText = `${n1} + ${n2} = `;
  };
  generateCaptcha();

  const form = document.getElementById('mainForm');
  if (form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (parseInt(captchaInput.value) !== captchaResult) {
              alert('Пожалуйста, решите математический пример корректно.');
              generateCaptcha();
              captchaInput.value = '';
              return;
          }

          const btn = form.querySelector('button');
          const originalText = btn.innerText;
          btn.innerText = 'Отправка...';
          btn.disabled = true;

          // Имитация AJAX
          setTimeout(() => {
              form.reset();
              document.getElementById('formSuccess').style.display = 'block';
              btn.innerText = originalText;
              btn.disabled = false;
              generateCaptcha();
              // Скрываем успех через 5 сек
              setTimeout(() => {
                  document.getElementById('formSuccess').style.display = 'none';
              }, 5000);
          }, 1500);
      });
  }

  // --- 6. GSAP SCROLL ANIMATIONS (С фиксом для списков) ---
  if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Анимация Hero секции
      const heroTimeline = gsap.timeline();
      heroTimeline.from(".hero__content > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2
      });

      // Универсальный Reveal для всех секций (About, Features, Blog и т.д.)
      const sections = gsap.utils.toArray('section');
      sections.forEach(section => {
          // Ищем элементы внутри секции, включая списки li
          const animTargets = section.querySelectorAll(
              '.section-title, .section-subtitle, .about__card, .about__list li, .inno-item, .blog-card, .features__list li'
          );

          if (animTargets.length > 0) {
              gsap.from(animTargets, {
                  scrollTrigger: {
                      trigger: section,
                      start: "top 85%",
                      toggleActions: "play none none none"
                  },
                  y: 30,
                  opacity: 0,
                  duration: 0.8,
                  stagger: 0.1,
                  ease: "power2.out",
                  clearProps: "all" // Очищаем стили после завершения для корректного Hover
              });
          }
      });

      // Принудительное обновление для корректных координат после загрузки Three.js
      window.addEventListener('load', () => {
          ScrollTrigger.refresh();
      });
  }

  // --- 7. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookiePopup');
  if (cookiePopup && !localStorage.getItem('orphiq_cookies')) {
      setTimeout(() => {
          cookiePopup.style.display = 'flex';
      }, 3000);

      document.getElementById('acceptCookies').onclick = () => {
          localStorage.setItem('orphiq_cookies', 'true');
          cookiePopup.style.display = 'none';
      };
  }

  // --- 8. HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  });
});
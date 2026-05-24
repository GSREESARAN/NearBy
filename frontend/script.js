// /* ============================================
//    NEARBY — Premium JavaScript v2
//    Cinematic • Immersive • Professional
//    ============================================ */
// /* ── GSAP REGISTER ── */
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// /* ── PAGE LOADER ── */
// // window.addEventListener('load', () => {
// //   const loader = document.getElementById('pageLoader');
// //   if (loader) {
// //     setTimeout(() => {
// //       loader.classList.add('hidden');
// //       initHeroAnimations();
// //     }, 1500);
// //   } else {
// //     initHeroAnimations();
// //   }
// // });

// /* ── PAGE LOADER ── */
// window.addEventListener('load', () => {
//   const loader = document.getElementById('pageLoader');
//   if (loader) {
//     setTimeout(() => {
//       loader.classList.add('hidden');
//       initHeroAnimations();
      
//       // Wait 600ms for the CSS fade transition to finish before recalculating
//       setTimeout(() => {
//         if (typeof AOS !== 'undefined') AOS.refresh();
//         if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
//       }, 600);

//     }, 1500);
//   } else {
//     initHeroAnimations();
//   }
// });

// /* ── AOS INIT ── */
// AOS.init({
//   duration: 800,
//   easing: 'ease-out-cubic',
//   once: true,
//   offset: 60,
// });


// /* ── ROTATING HERO CARD ── */
// const heroSlides = [
//   {
//     emoji: '🍱',
//     caption: 'Fresh Food',
//     sub: 'From local hotels & restaurants',
//   },
//   {
//     emoji: '🛒',
//     caption: 'Groceries',
//     sub: 'From kirana & supermarkets',
//   },
//   {
//     emoji: '💊',
//     caption: 'Medicine',
//     sub: 'From local medical shops',
//   },
//   {
//     emoji: '📦',
//     caption: 'Anything',
//     sub: 'From any shop in Proddatur',
//   },
// ];

// let currentSlide = 0;

// function updateHeroCard() {
//   const emoji   = document.getElementById('cardEmoji');
//   const caption = document.getElementById('cardCaption');
//   const sub     = document.getElementById('cardSubCaption');
//   if (!emoji || !caption || !sub) return;

//   // Fade out
//   gsap.to([emoji, caption, sub], {
//     opacity: 0, y: -10, duration: 0.25, ease: 'power2.in',
//     onComplete: () => {
//       currentSlide = (currentSlide + 1) % heroSlides.length;
//       emoji.textContent   = heroSlides[currentSlide].emoji;
//       caption.textContent = heroSlides[currentSlide].caption;
//       sub.textContent     = heroSlides[currentSlide].sub;
//       // Fade in
//       gsap.to([emoji, caption, sub], {
//         opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.05,
//       });
//     },
//   });
// }

// setInterval(updateHeroCard, 2000);

// /* ── HERO ENTRANCE ANIMATIONS ── */
// function initHeroAnimations() {
//   const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
//   tl.from('.navbar',        { y: -80, opacity: 0, duration: 0.8 })
//     .from('.hero-badge',    { y: 30,  opacity: 0, duration: 0.6 }, '-=0.4')
//     .from('.hero-title span',{ y: 40, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
//     .from('.hero-subtitle', { y: 30,  opacity: 0, duration: 0.5 }, '-=0.3')
//     .from('.hero-buttons',  { y: 30,  opacity: 0, duration: 0.5 }, '-=0.3')
//     .from('.hero-card',     { scale: 0.75, opacity: 0, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.4')
//     .from('.floating-badge',{ scale: 0, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)' }, '-=0.4');
// }

// /* ── NAVBAR SCROLL ── */
// const navbar = document.getElementById('navbar');
// let lastScroll = 0;

// window.addEventListener('scroll', () => {
//   const s = window.scrollY;
//   navbar.classList.toggle('scrolled', s > 50);

//   if (s > lastScroll && s > 300) {
//     gsap.to(navbar, { y: -80, duration: 0.3, ease: 'power2.in' });
//   } else {
//     gsap.to(navbar, { y: 0,   duration: 0.4, ease: 'power2.out' });
//   }
//   lastScroll = s;
// }, { passive: true });

// /* ── HAMBURGER ── */
// const hamburger  = document.getElementById('hamburger');
// const mobileMenu = document.getElementById('mobileMenu');

// hamburger?.addEventListener('click', () => {
//   hamburger.classList.toggle('active');
//   mobileMenu.classList.toggle('open');
// });
// document.querySelectorAll('.mobile-link').forEach(l => {
//   l.addEventListener('click', () => {
//     hamburger.classList.remove('active');
//     mobileMenu.classList.remove('open');
//   });
// });

// /* ── COUNTER ANIMATIONS ── */
// function animateCounter(el, target, duration = 2000) {
//   let start = 0;
//   const step = target / (duration / 16);
//   const timer = setInterval(() => {
//     start += step;
//     if (start >= target) { el.textContent = target; clearInterval(timer); }
//     else { el.textContent = Math.floor(start); }
//   }, 16);
// }

// const statsBar = document.querySelector('.stats-bar');
// if (statsBar) {
//   const observer = new IntersectionObserver(entries => {
//     if (entries[0].isIntersecting) {
//       document.querySelectorAll('.count[data-target]').forEach(el => {
//         animateCounter(el, parseInt(el.dataset.target));
//       });
//       observer.disconnect();
//     }
//   }, { threshold: 0.5 });
//   observer.observe(statsBar);
// }

// /* ── MOUSE PARALLAX ON HERO ── */
// const heroCard = document.getElementById('heroCard');

// document.addEventListener('mousemove', e => {
//   if (!heroCard) return;
//   const x = (e.clientX / window.innerWidth  - 0.5) * 18;
//   const y = (e.clientY / window.innerHeight - 0.5) * 18;
//   gsap.to(heroCard, {
//     rotateY: x, rotateX: -y,
//     duration: 0.6, ease: 'power2.out',
//     transformPerspective: 900,
//   });
//   gsap.to('.shape-1', { x: x * 0.6, y: y * 0.6, duration: 1, ease: 'power2.out' });
//   gsap.to('.shape-2', { x: -x * 0.3, y: -y * 0.3, duration: 1, ease: 'power2.out' });
//   gsap.to('.shape-3', { x: x * 0.2, y: y * 0.4, duration: 1, ease: 'power2.out' });
// });

// document.addEventListener('mouseleave', () => {
//   if (!heroCard) return;
//   gsap.to(heroCard, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out' });
// });

// /* ── VANILLA TILT ── */
// if (typeof VanillaTilt !== 'undefined') {
//   VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
//     max: 10, speed: 400, glare: true,
//     'max-glare': 0.12, perspective: 1000, scale: 1.03,
//   });
// }

// /* ── SCROLL ANIMATIONS ── */
// gsap.utils.toArray('.step-card').forEach((card, i) => {
//   gsap.from(card, {
//     scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
//     y: 50, opacity: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
//   });
// });

// gsap.utils.toArray('.why-card').forEach((card, i) => {
//   gsap.from(card, {
//     scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
//     y: 60, opacity: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
//   });
// });

// gsap.utils.toArray('.order-feature').forEach((f, i) => {
//   gsap.from(f, {
//     scrollTrigger: { trigger: f, start: 'top 88%', toggleActions: 'play none none none' },
//     x: -30, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
//   });
// });

// gsap.utils.toArray('.category-card').forEach((card, i) => {
//   gsap.from(card, {
//     scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
//     y: 40, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
//   });
// });

// /* ── ORDER FORM ── */
// const orderForm      = document.getElementById('orderForm');
// const submitBtn      = document.getElementById('submitBtn');
// const successMessage = document.getElementById('successMessage');

// orderForm?.addEventListener('submit', async e => {
//   e.preventDefault();

//   const name    = document.getElementById('customerName').value.trim();
//   const phone   = document.getElementById('customerPhone').value.trim();
//   const shop    = document.getElementById('shopName').value.trim();
//   const items   = document.getElementById('orderItems').value.trim();
//   const address = document.getElementById('deliveryAddress').value.trim();

//   if (!name || !phone || !shop || !items || !address) { shakeForm(); return; }
//   if (phone.replace(/\D/g, '').length < 10) {
//     highlightError(document.getElementById('customerPhone'));
//     return;
//   }

//   submitBtn.classList.add('loading');
//   submitBtn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 1s linear infinite"></i> Sending...';

//   try {
//     const res = await fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, phone, shop, items, address }),
//     });
//     if (res.ok) showSuccess();
//     else throw new Error();
//   } catch {
//     // Demo mode — show success before backend is ready
//     showSuccess();
//   }
// });

// function showSuccess() {
//   gsap.to(orderForm, {
//     opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
//     onComplete: () => {
//       orderForm.style.display = 'none';
//       successMessage.classList.add('show');
//       gsap.from(successMessage, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });
//     },
//   });
// }

// function shakeForm() {
//   gsap.to('.order-form-wrap', {
//     keyframes: { x: [-10, 10, -8, 8, -4, 4, 0] },
//     duration: 0.5, ease: 'power2.inOut',
//   });
// }

// function highlightError(field) {
//   gsap.to(field, { borderColor: '#ff4444', duration: 0.1 });
//   gsap.to(field, { borderColor: '', duration: 0.3, delay: 2 });
// }

// /* ── INPUT MICRO INTERACTIONS ── */
// document.querySelectorAll('.input-wrapper input, .input-wrapper textarea').forEach(input => {
//   input.addEventListener('focus', () => {
//     gsap.to(input.closest('.input-wrapper'), { scale: 1.015, duration: 0.2, ease: 'power2.out' });
//   });
//   input.addEventListener('blur', () => {
//     gsap.to(input.closest('.input-wrapper'), { scale: 1, duration: 0.2, ease: 'power2.out' });
//   });
// });

// /* ── RIPPLE EFFECT ── */
// document.querySelectorAll('.btn-primary, .btn-submit, .btn-nav').forEach(btn => {
//   btn.addEventListener('click', function(e) {
//     const rect   = this.getBoundingClientRect();
//     const size   = Math.max(rect.width, rect.height);
//     const ripple = document.createElement('span');
//     ripple.style.cssText = `
//       position:absolute; width:${size}px; height:${size}px;
//       left:${e.clientX - rect.left - size/2}px;
//       top:${e.clientY - rect.top - size/2}px;
//       background:rgba(255,255,255,0.2); border-radius:50%;
//       transform:scale(0); animation:rippleAnim 0.6s ease-out forwards;
//       pointer-events:none;
//     `;
//     this.style.position = 'relative';
//     this.style.overflow = 'hidden';
//     this.appendChild(ripple);
//     setTimeout(() => ripple.remove(), 600);
//   });
// });

// /* ── SMOOTH SCROLL ── */
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function(e) {
//     const target = document.querySelector(this.getAttribute('href'));
//     if (!target) return;
//     e.preventDefault();
//     gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 80 }, ease: 'power3.inOut' });
//   });
// });

// /* ── LANGUAGE TOGGLE ── */
// let currentLang = 'en';

// function toggleLanguage() {
//   currentLang = currentLang === 'en' ? 'te' : 'en';
//   const langText = document.getElementById('langText');

//   gsap.to('[data-lang-en], [data-lang-te]', {
//     opacity: 0, y: -4, duration: 0.15, stagger: 0.005,
//     onComplete: () => {
//       updateLanguage();
//       gsap.to('[data-lang-en], [data-lang-te]', {
//         opacity: 1, y: 0, duration: 0.25, stagger: 0.005, ease: 'power2.out',
//       });
//     },
//   });

//   if (langText) langText.textContent = currentLang === 'en' ? 'తెలుగు' : 'English';
// }

// function updateLanguage() {
//   const key = `data-lang-${currentLang}`;
//   document.querySelectorAll(`[${key}]`).forEach(el => {
//     const text = el.getAttribute(key);
//     if (text) el.textContent = text;
//   });

//   const ph = {
//     en: {
//       customerName:    'Ravi Kumar',
//       customerPhone:   '+91 98765 43210',
//       shopName:        'e.g. Raju Hotel near Bus Stand',
//       orderItems:      'e.g. 2 chicken biryani, 1 cold drink...',
//       deliveryAddress: 'Your street, area in Proddatur',
//     },
//     te: {
//       customerName:    'రవి కుమార్',
//       customerPhone:   '+91 98765 43210',
//       shopName:        'ఉదా. బస్ స్టాండ్ దగ్గర రాజు హోటల్',
//       orderItems:      'ఉదా. 2 చికెన్ బిర్యానీ, 1 కోల్డ్ డ్రింక్...',
//       deliveryAddress: 'మీ వీధి, ప్రొద్దుటూరులో ప్రాంతం',
//     },
//   };

//   Object.entries(ph[currentLang]).forEach(([id, text]) => {
//     const el = document.getElementById(id);
//     if (el) el.placeholder = text;
//   });
// }

// /* ── SECTION HEADER REVEAL ── */
// gsap.utils.toArray('.section-header').forEach(header => {
//   gsap.from(header, {
//     scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
//     y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
//   });
// });

// /* ── FOOTER REVEAL ── */
// gsap.from('.footer-brand, .footer-links, .footer-whatsapp', {
//   scrollTrigger: { trigger: '.footer', start: 'top 90%', toggleActions: 'play none none none' },
//   y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
// });

// /* ── STAT ITEMS HOVER ── */
// document.querySelectorAll('.stat-item').forEach(item => {
//   item.addEventListener('mouseenter', () => {
//     gsap.to(item.querySelector('.stat-number'), { scale: 1.08, duration: 0.2, ease: 'power2.out' });
//   });
//   item.addEventListener('mouseleave', () => {
//     gsap.to(item.querySelector('.stat-number'), { scale: 1, duration: 0.2, ease: 'power2.out' });
//   });
// });

// /* ── GLOBAL STYLES (injected) ── */
// const s = document.createElement('style');
// s.textContent = `
//   @keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }
//   @keyframes spin { to { transform: rotate(360deg); } }
// `;
// document.head.appendChild(s);

// console.log('%c NearBy 🛵 ', 'background:#8DBF3A;color:#141710;font-size:16px;padding:8px 16px;border-radius:8px;font-weight:bold;');
// ScrollTrigger.refresh();


// Gemini 

/* ============================================
   NEARBY — Premium JavaScript v2
   Cinematic • Immersive • Professional
   ============================================ */
/* ── GSAP REGISTER ── */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// Recalculate ScrollTrigger after everything loads
window.addEventListener('load', () => {
  ScrollTrigger.refresh(true);
});

/* ── PAGE LOADER & INITIALIZATION ── */
window.addEventListener('load', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      initHeroAnimations();
      
      // Wait for loader to fade, then initialize scroll animations
      setTimeout(() => {
        initScrollAnimations();
      }, 600);

    }, 1500);
  } else {
    initHeroAnimations();
    initScrollAnimations();
  }
});

/* ── SCROLL ANIMATIONS INIT FUNCTION ── */
function initScrollAnimations() {
  /* ── AOS INIT (Handles most of your HTML elements) ── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      offset: 60,
    });
  }

  /* ── SCROLL ANIMATIONS (GSAP) ── */
  // Kill existing ScrollTriggers first to avoid conflicts
  ScrollTrigger.getAll().forEach(t => t.kill());

  // Set initial hidden state
  gsap.utils.toArray('.order-feature').forEach((f, i) => {
    gsap.set(f, { x: -30, opacity: 0 });

    ScrollTrigger.create({
      trigger: f,
      start: 'top 88%',
      end: 'bottom 20%',
      onEnter: () => gsap.to(f, { 
        x: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'power3.out' 
      }),
      onEnterBack: () => gsap.to(f, { 
        x: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'power3.out' 
      }),
      onLeave: () => gsap.to(f, { 
        x: -30, opacity: 0, duration: 0.3 
      }),
      onLeaveBack: () => gsap.to(f, { 
        x: -30, opacity: 0, duration: 0.3 
      }),
    });
  });

  gsap.from('.footer-brand, .footer-links, .footer-whatsapp', {
    scrollTrigger: { 
      trigger: '.footer', 
      start: 'top 90%', 
      toggleActions: 'play none none reverse' 
    },
    y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
  });

  ScrollTrigger.refresh();
  // Refresh after fonts and images load
setTimeout(() => ScrollTrigger.refresh(true), 500);
}


// Instant navbar scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'instant' });
    }
  });
});
/* ── ROTATING HERO CARD ── */
const heroSlides = [
  { emoji: '🍱', caption: 'Fresh Food', sub: 'From local hotels & restaurants' },
  { emoji: '🛒', caption: 'Groceries', sub: 'From kirana & supermarkets' },
  { emoji: '💊', caption: 'Medicine', sub: 'From local medical shops' },
  { emoji: '📦', caption: 'Anything', sub: 'From any shop in the City' },
];

let currentSlide = 0;

function updateHeroCard() {
  const emoji   = document.getElementById('cardEmoji');
  const caption = document.getElementById('cardCaption');
  const sub     = document.getElementById('cardSubCaption');
  if (!emoji || !caption || !sub) return;

  gsap.to([emoji, caption, sub], {
    opacity: 0, y: -10, duration: 0.25, ease: 'power2.in',
    onComplete: () => {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      emoji.textContent   = heroSlides[currentSlide].emoji;
      caption.textContent = heroSlides[currentSlide].caption;
      sub.textContent     = heroSlides[currentSlide].sub;
      gsap.to([emoji, caption, sub], {
        opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.05,
      });
    },
  });
}
setInterval(updateHeroCard, 2000);

/* ── HERO ENTRANCE ANIMATIONS ── */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  // Notice we removed the text elements here because AOS is handling them in HTML!
  tl.from('.navbar',        { y: -80, opacity: 0, duration: 0.8 })
    .from('.hero-card',     { scale: 0.75, opacity: 0, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.4')
    .from('.floating-badge',{ scale: 0, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.5)' }, '-=0.4');
}

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const s = window.scrollY;
  navbar.classList.toggle('scrolled', s > 50);

  if (s > lastScroll && s > 300) {
    gsap.to(navbar, { y: -80, duration: 0.3, ease: 'power2.in' });
  } else {
    gsap.to(navbar, { y: 0,   duration: 0.4, ease: 'power2.out' });
  }
  lastScroll = s;
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

/* ── COUNTER ANIMATIONS ── */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); }
    else { el.textContent = Math.floor(start); }
  }, 16);
}

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.count[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(statsBar);
}

/* ── MOUSE PARALLAX ON HERO ── */
const heroCard = document.getElementById('heroCard');

document.addEventListener('mousemove', e => {
  if (!heroCard) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 18;
  const y = (e.clientY / window.innerHeight - 0.5) * 18;
  gsap.to(heroCard, {
    rotateY: x, rotateX: -y,
    duration: 0.6, ease: 'power2.out',
    transformPerspective: 900,
  });
  gsap.to('.shape-1', { x: x * 0.6, y: y * 0.6, duration: 1, ease: 'power2.out' });
  gsap.to('.shape-2', { x: -x * 0.3, y: -y * 0.3, duration: 1, ease: 'power2.out' });
  gsap.to('.shape-3', { x: x * 0.2, y: y * 0.4, duration: 1, ease: 'power2.out' });
});

document.addEventListener('mouseleave', () => {
  if (!heroCard) return;
  gsap.to(heroCard, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out' });
});

/* ── VANILLA TILT ── */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 10, speed: 400, glare: true,
    'max-glare': 0.12, perspective: 1000, scale: 1.03,
  });
}

/* ── ORDER FORM ── */
const orderForm      = document.getElementById('orderForm');
const submitBtn      = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

orderForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const name    = document.getElementById('customerName').value.trim();
  const phone   = document.getElementById('customerPhone').value.trim();
  const shop    = document.getElementById('shopName').value.trim();
  const items   = document.getElementById('orderItems').value.trim();
  const address = document.getElementById('deliveryAddress').value.trim();

  if (!name || !phone || !shop || !items || !address) { shakeForm(); return; }
  if (phone.replace(/\D/g, '').length < 10) {
    highlightError(document.getElementById('customerPhone'));
    return;
  }

  submitBtn.classList.add('loading');
  submitBtn.innerHTML = '<i class="ti ti-loader-2" style="animation:spin 1s linear infinite"></i> Sending...';

  try {
    const res = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, shop, items, address }),
    });
    if (res.ok) showSuccess();
    else throw new Error();
  } catch {
    showSuccess();
  }
});

function showSuccess() {
  gsap.to(orderForm, {
    opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
    onComplete: () => {
      orderForm.style.display = 'none';
      successMessage.classList.add('show');
      gsap.from(successMessage, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });
    },
  });
}

function shakeForm() {
  gsap.to('.order-form-wrap', {
    keyframes: { x: [-10, 10, -8, 8, -4, 4, 0] },
    duration: 0.5, ease: 'power2.inOut',
  });
}

function highlightError(field) {
  gsap.to(field, { borderColor: '#ff4444', duration: 0.1 });
  gsap.to(field, { borderColor: '', duration: 0.3, delay: 2 });
}

/* ── INPUT MICRO INTERACTIONS ── */
document.querySelectorAll('.input-wrapper input, .input-wrapper textarea').forEach(input => {
  input.addEventListener('focus', () => {
    gsap.to(input.closest('.input-wrapper'), { scale: 1.015, duration: 0.2, ease: 'power2.out' });
  });
  input.addEventListener('blur', () => {
    gsap.to(input.closest('.input-wrapper'), { scale: 1, duration: 0.2, ease: 'power2.out' });
  });
});

/* ── RIPPLE EFFECT ── */
document.querySelectorAll('.btn-primary, .btn-submit, .btn-nav').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.2); border-radius:50%;
      transform:scale(0); animation:rippleAnim 0.6s ease-out forwards;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 80 }, ease: 'power3.inOut' });
  });
});

/* ── LANGUAGE TOGGLE ── */
let currentLang = 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'te' : 'en';
  const langText = document.getElementById('langText');

  gsap.to('[data-lang-en], [data-lang-te]', {
    opacity: 0, y: -4, duration: 0.15, stagger: 0.005,
    onComplete: () => {
      updateLanguage();
      gsap.to('[data-lang-en], [data-lang-te]', {
        opacity: 1, y: 0, duration: 0.25, stagger: 0.005, ease: 'power2.out',
      });
    },
  });

  if (langText) langText.textContent = currentLang === 'en' ? 'తెలుగు' : 'English';
}

function updateLanguage() {
  const key = `data-lang-${currentLang}`;
  document.querySelectorAll(`[${key}]`).forEach(el => {
    const text = el.getAttribute(key);
    if (text) el.textContent = text;
  });

  const ph = {
    en: {
      customerName:    'Ravi Kumar',
      customerPhone:   '+91 98765 43210',
      shopName:        'e.g. Raju Hotel near Bus Stand',
      orderItems:      'e.g. 2 chicken biryani, 1 cold drink...',
      deliveryAddress: 'Your street, landmark',
    },
    te: {
      customerName:    'రవి కుమార్',
      customerPhone:   '+91 98765 43210',
      shopName:        'ఉదా. బస్ స్టాండ్ దగ్గర రాజు హోటల్',
      orderItems:      'ఉదా. 2 చికెన్ బిర్యానీ, 1 కోల్డ్ డ్రింక్...',
      deliveryAddress: 'మీ వీధి, మీ నగరంలో ప్రాంతం',
    },
  };

  Object.entries(ph[currentLang]).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = text;
  });
}

/* ── STAT ITEMS HOVER ── */
document.querySelectorAll('.stat-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item.querySelector('.stat-number'), { scale: 1.08, duration: 0.2, ease: 'power2.out' });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item.querySelector('.stat-number'), { scale: 1, duration: 0.2, ease: 'power2.out' });
  });
});

/* ── GLOBAL STYLES (injected) ── */
const s = document.createElement('style');
s.textContent = `
  @keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(s);

console.log('%c NearBy 🛵 ', 'background:#8DBF3A;color:#141710;font-size:16px;padding:8px 16px;border-radius:8px;font-weight:bold;');
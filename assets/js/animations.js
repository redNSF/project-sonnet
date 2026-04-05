/* ============================================================
   ANIMATIONS.JS — GSAP + ScrollTrigger setup
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Wait for GSAP to be available
  if (typeof gsap === 'undefined') {
    document.documentElement.classList.remove('js-loading');
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ── Hero Load Sequence ──────────────────────────────────────
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-sub');
  const heroActions = document.querySelector('.hero-actions');
  const nav         = document.querySelector('.nav');

  if (nav) {
    heroTimeline.from(nav, { opacity: 0, y: -20, duration: 0.4 });
  }
  if (heroEyebrow) {
    heroTimeline.from(heroEyebrow, { opacity: 0, y: 16, duration: 0.4 }, '-=0.1');
  }
  if (heroTitle) {
    heroTimeline.from(heroTitle, { opacity: 0, y: 20, duration: 0.5 }, '-=0.2');
  }
  if (heroSub) {
    heroTimeline.from(heroSub, { opacity: 0, y: 16, duration: 0.4 }, '-=0.25');
  }
  if (heroActions) {
    heroTimeline.from(heroActions, { opacity: 0, y: 12, duration: 0.4 }, '-=0.2');
  }

  // ── Scroll Reveal Helper ─────────────────────────────────────
  // Returns true if element is currently visible in the viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  if (typeof ScrollTrigger !== 'undefined') {

    // ── Section headers ────────────────────────────────────────
    gsap.utils.toArray('.section-header').forEach(el => {
      if (isInViewport(el)) {
        gsap.from(el, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          opacity: 0, y: 20, duration: 0.4, ease: 'power2.out',
        });
      }
    });

    // ── Card grids — staggered (Categories only, Products handled by shop.js) ─
    gsap.utils.toArray('.card-category').forEach((el, i) => {
      if (isInViewport(el)) {
        gsap.from(el, { opacity: 0, y: 20, duration: 0.4, delay: (i % 4) * 0.07, ease: 'power2.out' });
      } else {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 93%', once: true },
          opacity: 0, y: 20, duration: 0.4, delay: (i % 4) * 0.07, ease: 'power2.out',
        });
      }
    });

    // ── Trust bar items ────────────────────────────────────────
    gsap.utils.toArray('.trust-bar-item').forEach((el, i) => {
      if (isInViewport(el)) {
        gsap.from(el, { opacity: 0, y: 12, duration: 0.35, delay: 0.6 + i * 0.07, ease: 'power2.out' });
      } else {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          opacity: 0, y: 12, duration: 0.35, delay: i * 0.07, ease: 'power2.out',
        });
      }
    });

    // ── HIW strip items ────────────────────────────────────────
    gsap.utils.toArray('.hiw-strip-item, .hiw-step').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        opacity: 0, y: 20, duration: 0.4, delay: i * 0.08, ease: 'power2.out',
      });
    });

    // ── Testimonial cards ──────────────────────────────────────
    gsap.utils.toArray('.testimonial-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        opacity: 0, x: 20, duration: 0.35, delay: i * 0.06, ease: 'power2.out',
      });
    });

    // ── CTA banner ─────────────────────────────────────────────
    const ctaBanner = document.querySelector('.cta-banner');
    if (ctaBanner) {
      gsap.from(ctaBanner.children, {
        scrollTrigger: { trigger: ctaBanner, start: 'top 85%', once: true },
        opacity: 0, y: 20, duration: 0.4, stagger: 0.1, ease: 'power2.out',
      });
    }

    // ── Dashboard sub cards ────────────────────────────────────
    gsap.utils.toArray('.sub-card, .card-order').forEach((el, i) => {
      if (isInViewport(el)) {
        gsap.from(el, { opacity: 0, y: 12, duration: 0.3, delay: 0.2 + i * 0.05, ease: 'power2.out' });
      } else {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          opacity: 0, y: 12, duration: 0.3, delay: i * 0.05, ease: 'power2.out',
        });
      }
    });

    // ── Non-hero page headers ──────────────────────────────────
    const pageH1 = document.querySelector('main h1:not(.hero-title), .dash-page-title');
    if (pageH1 && isInViewport(pageH1)) {
      gsap.from(pageH1, { opacity: 0, y: 16, duration: 0.4, ease: 'power2.out' });
    }
  }

  // Remove loading class to reveal elements once GSAP has applied initial states
  document.documentElement.classList.remove('js-loading');
});

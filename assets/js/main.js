/* ============================================================
   MAIN.JS — Nav + Footer injection, page transitions, utils
   ============================================================ */

// ── Nav & Footer Templates ───────────────────────────────────
const NAV_HTML = `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">InfinityDigitalShop</a>
    <div class="nav-links" id="nav-links">
      <a href="shop.html" class="nav-link" data-page="shop">Shop</a>
      <a href="how-it-works.html" class="nav-link" data-page="how-it-works">How It Works</a>
      <a href="how-it-works.html#faq" class="nav-link" data-page="faq">FAQ</a>
    </div>
    <div class="nav-actions">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
      </button>
      <a href="cart.html" class="nav-cart-btn" id="nav-cart-btn" aria-label="Cart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="nav-cart-badge" id="nav-cart-count" style="display:none">0</span>
      </a>
      <a href="login.html" class="btn btn-outline btn-sm" style="padding:7px 16px;font-size:13px;">Login</a>
      <a href="shop.html" class="btn btn-primary btn-sm" style="padding:7px 16px;font-size:13px;">Get Started</a>
    </div>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile-menu" id="nav-mobile-menu">
    <a href="shop.html" class="nav-mobile-link" data-page="shop">Shop</a>
    <a href="how-it-works.html" class="nav-mobile-link" data-page="how-it-works">How It Works</a>
    <a href="how-it-works.html#faq" class="nav-mobile-link">FAQ</a>
    <a href="cart.html" class="nav-mobile-link" data-page="cart">Cart</a>
    <a href="login.html" class="nav-mobile-link" data-page="login">Login</a>
    <a href="dashboard.html" class="nav-mobile-link" data-page="dashboard">Dashboard</a>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name">InfinityDigitalShop</div>
        <p class="footer-tagline">Premium subscriptions at unbeatable prices. Instant delivery, 30-day warranty.</p>
      </div>
      <div>
        <div class="footer-col-title">Shop</div>
        <div class="footer-links">
          <a href="shop.html" class="footer-link">All Plans</a>
          <a href="shop.html?cat=streaming" class="footer-link">Streaming</a>
          <a href="shop.html?cat=ai-tools" class="footer-link">AI Tools</a>
          <a href="shop.html?cat=creative" class="footer-link">Creative Software</a>
          <a href="shop.html?cat=productivity" class="footer-link">Productivity</a>
          <a href="shop.html?cat=vpn" class="footer-link">VPN & Security</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Support</div>
        <div class="footer-links">
          <a href="how-it-works.html" class="footer-link">How It Works</a>
          <a href="how-it-works.html#faq" class="footer-link">FAQ</a>
          <a href="mailto:support@infinitydigitalshop.io" class="footer-link">Contact Us</a>
          <a href="dashboard.html" class="footer-link">My Account</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Legal</div>
        <div class="footer-links">
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
          <a href="#" class="footer-link">Refund Policy</a>
          <a href="#" class="footer-link">Cookie Policy</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© 2025 InfinityDigitalShop. All rights reserved.</span>
      <span class="footer-copy">All trademarks belong to their respective owners.</span>
    </div>
  </div>
</footer>
`;

// ── Inject Nav & Footer ──────────────────────────────────────
function injectLayout() {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (navEl) navEl.innerHTML = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Active nav detection
  const path = window.location.pathname;
  const pageName = path.split('/').pop().replace('.html', '') || 'index';

  document.querySelectorAll('.nav-link[data-page], .nav-mobile-link[data-page]').forEach(link => {
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });

  // Mobile menu toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Update cart badge
  updateCartBadge();
}

// ── Cart Utilities ───────────────────────────────────────────
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('substore_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('substore_cart', JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + (item.qty || 1), 0);
}

function updateCartBadge() {
  const badge = document.getElementById('nav-cart-count');
  if (!badge) return;
  const count = getCartCount();
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id && i.duration === item.duration);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`${item.name} added to cart`);
}

function removeFromCart(id, duration) {
  const cart = getCart().filter(i => !(i.id === id && i.duration === duration));
  saveCart(cart);
  updateCartBadge();
}

function clearCart() {
  localStorage.removeItem('substore_cart');
  updateCartBadge();
}

// ── Toast Notification ───────────────────────────────────────
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-container');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-container';
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      display: flex; flex-direction: column; gap: 8px;
    `;
    document.body.appendChild(toast);
  }

  const item = document.createElement('div');
  item.style.cssText = `
    background: var(--color-surface);
    border: 1px solid ${type === 'success' ? 'var(--color-success)' : 'var(--color-accent)'};
    border-radius: var(--radius-sm);
    padding: 12px 18px;
    font-size: 14px;
    color: var(--color-text);
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s ease;
    max-width: 300px;
  `;
  item.textContent = message;
  toast.appendChild(item);

  requestAnimationFrame(() => {
    item.style.opacity = '1';
    item.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    setTimeout(() => item.remove(), 300);
  }, 2800);
}

// ── Page Transition (Removed for better UX) ─────────────────────
function initPageTransitions() {
  // Disabled page transitions to prevent "fading out" effect
}

// ── Format Currency ──────────────────────────────────────────
function formatPrice(amount) {
  return '$' + parseFloat(amount).toFixed(2);
}

// ── Debounce ─────────────────────────────────────────────────
function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}



function initTheme() {
  // Toggle listener
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('substore_theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('substore_theme', 'light');
      }
    });
  }
}



document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initTheme();
  initPageTransitions();
});

// Export for use in other scripts
window.SubStore = {
  getCart, saveCart, addToCart, removeFromCart,
  clearCart, getCartCount, updateCartBadge,
  formatPrice, showToast, debounce
};

/* ============================================================
   CART.JS — Cart page rendering and checkout helpers
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Cart page
  if (document.getElementById('cart-items-list')) {
    renderCartPage();
  }

  // Checkout page
  if (document.getElementById('checkout-container')) {
    initCheckout();
  }
});

// ── Render Cart Page ─────────────────────────────────────────
function renderCartPage() {
  const listEl   = document.getElementById('cart-items-list');
  const emptyEl  = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary-section');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl   = document.getElementById('cart-total');
  const countEl   = document.getElementById('cart-item-count');

  function refreshCart() {
    const cart = window.SubStore ? window.SubStore.getCart() : JSON.parse(localStorage.getItem('substore_cart') || '[]');

    if (countEl) countEl.textContent = cart.reduce((s, i) => s + (i.qty || 1), 0);

    if (!cart.length) {
      listEl.innerHTML = '';
      emptyEl && (emptyEl.style.display = 'block');
      summaryEl && (summaryEl.style.display = 'none');
      return;
    }

    emptyEl && (emptyEl.style.display = 'none');
    summaryEl && (summaryEl.style.display = 'block');

    listEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-logo ${item.logoClass || 'logo-default'}">${item.initial || item.name?.[0] || '?'}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.duration} Month${item.duration > 1 ? 's' : ''} · ${item.qty > 1 ? `Qty: ${item.qty}` : ''}</div>
        </div>
        <div class="cart-item-price">$${(item.price * (item.qty || 1)).toFixed(2)}</div>
        <button class="cart-remove-btn" onclick="removeItem('${item.id}','${item.duration}')" title="Remove">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');

    const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  window.removeItem = function(id, duration) {
    if (window.SubStore) {
      window.SubStore.removeFromCart(id, duration);
    } else {
      const cart = JSON.parse(localStorage.getItem('substore_cart') || '[]')
        .filter(i => !(i.id === id && i.duration === duration));
      localStorage.setItem('substore_cart', JSON.stringify(cart));
    }
    refreshCart();
  };

  // Coupon code (UI only)
  const applyBtn = document.getElementById('apply-coupon');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const code = document.getElementById('coupon-code')?.value?.trim().toUpperCase();
      if (!code) return;
      const discountSection = document.getElementById('discount-row');
      if (code === 'SAVE10') {
        if (discountSection) {
          discountSection.style.display = 'flex';
          document.getElementById('discount-amount').textContent = '−10%';
        }
        window.SubStore?.showToast('Coupon applied: 10% off!');
      } else {
        window.SubStore?.showToast('Invalid coupon code', 'error');
      }
    });
  }

  refreshCart();
}

// ── Checkout Multi-step ──────────────────────────────────────
function initCheckout() {
  let currentStep = 1;

  const steps = {
    1: document.getElementById('step-1'),
    2: document.getElementById('step-2'),
    3: document.getElementById('step-3'),
  };

  const stepIndicators = document.querySelectorAll('.checkout-step');

  function goToStep(n) {
    currentStep = n;
    Object.values(steps).forEach((el, i) => {
      if (el) el.classList.toggle('active', i + 1 === n);
    });
    stepIndicators.forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i + 1 === n) el.classList.add('active');
      if (i + 1 < n) el.classList.add('done');
    });
  }

  // Step 1 → Step 2
  const toStep2Btn = document.getElementById('btn-to-step2');
  if (toStep2Btn) {
    toStep2Btn.addEventListener('click', () => {
      const email = document.getElementById('checkout-email')?.value?.trim();
      const name = document.getElementById('checkout-name')?.value?.trim();
      if (!email || !name) {
        window.SubStore?.showToast('Please fill in all fields', 'error');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        window.SubStore?.showToast('Enter a valid email address', 'error');
        return;
      }
      goToStep(2);
    });
  }

  // Step 2 → Step 3 (Confirmation)
  const completeBtn = document.getElementById('btn-complete-order');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const cardNum = document.getElementById('card-number')?.value?.trim();
      if (!cardNum || cardNum.length < 16) {
        window.SubStore?.showToast('Please enter a valid card number', 'error');
        return;
      }
      // Generate order number
      const orderNum = '#SS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const orderNumEl = document.getElementById('order-number');
      if (orderNumEl) orderNumEl.textContent = orderNum;
      // Clear cart
      if (window.SubStore) window.SubStore.clearCart();
      goToStep(3);
    });
  }

  // Card number formatting
  const cardInput = document.getElementById('card-number');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').substring(0, 16);
      v = v.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = v;
    });
  }

  // Expiry formatting
  const expiryInput = document.getElementById('card-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2);
      e.target.value = v;
    });
  }

  // CVC limit
  const cvcInput = document.getElementById('card-cvc');
  if (cvcInput) {
    cvcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
  }

  goToStep(1);

  // Expose for external back button calls
  window._checkoutGoToStep = goToStep;
}

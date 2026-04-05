/* ============================================================
   SHOP.JS — Product data, filter, search, sort
   ============================================================ */

// ── Product Catalog ──────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'netflix-premium',
    name: 'Netflix Premium',
    category: 'streaming',
    desc: 'Unlimited streaming in 4K Ultra HD. Watch on 4 screens simultaneously.',
    logoClass: 'logo-netflix',
    initial: 'N',
    prices: { '1': 8.99, '3': 24.99, '6': 44.99, '12': 79.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'spotify-premium',
    name: 'Spotify Premium',
    category: 'streaming',
    desc: 'Ad-free music streaming with offline listening and unlimited skips.',
    logoClass: 'logo-spotify',
    initial: 'S',
    prices: { '1': 5.99, '3': 15.99, '6': 28.99, '12': 49.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    category: 'streaming',
    desc: 'Marvel, Star Wars, Pixar, Disney classics and National Geographic.',
    logoClass: 'logo-disney',
    initial: 'D',
    prices: { '1': 5.49, '3': 14.99, '6': 26.99, '12': 47.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    category: 'streaming',
    desc: 'Ad-free YouTube, background play, YouTube Music and YouTube Originals.',
    logoClass: 'logo-youtube',
    initial: 'Y',
    prices: { '1': 6.99, '3': 18.99, '6': 34.99, '12': 59.99 },
    popular: false,
    newest: false,
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'ai-tools',
    desc: 'Access GPT-4o, advanced reasoning, DALL·E image generation and plugins.',
    logoClass: 'logo-chatgpt',
    initial: 'C',
    prices: { '1': 11.99, '3': 32.99, '6': 59.99, '12': 109.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'ai-tools',
    desc: 'Generate stunning AI artwork. Basic plan with 200 image generations/month.',
    logoClass: 'logo-midjourney',
    initial: 'M',
    prices: { '1': 7.99, '3': 21.99, '6': 39.99, '12': 71.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'ai-tools',
    desc: 'AI-powered workspace for notes, docs, wikis and project management.',
    logoClass: 'logo-notion',
    initial: 'N',
    prices: { '1': 7.49, '3': 20.99, '6': 37.99, '12': 67.99 },
    popular: false,
    newest: true,
  },
  {
    id: 'grammarly-premium',
    name: 'Grammarly Premium',
    category: 'ai-tools',
    desc: 'Advanced writing assistant with tone detection, plagiarism check and rewriting.',
    logoClass: 'logo-grammarly',
    initial: 'G',
    prices: { '1': 6.99, '3': 18.99, '6': 33.99, '12': 59.99 },
    popular: false,
    newest: true,
  },
  {
    id: 'adobe-cc',
    name: 'Adobe Creative Cloud',
    category: 'creative',
    desc: 'Full access to Photoshop, Illustrator, Premiere Pro, After Effects and more.',
    logoClass: 'logo-adobe',
    initial: 'A',
    prices: { '1': 19.99, '3': 54.99, '6': 99.99, '12': 179.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    category: 'creative',
    desc: 'Pro design tools with premium templates, brand kits, magic AI tools and more.',
    logoClass: 'logo-canva',
    initial: 'C',
    prices: { '1': 6.49, '3': 17.99, '6': 31.99, '12': 55.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'picsart-pro',
    name: 'Picsart Pro',
    category: 'creative',
    desc: 'Advanced photo and video editing with AI-powered creative tools.',
    logoClass: 'logo-picsart',
    initial: 'P',
    prices: { '1': 4.99, '3': 13.99, '6': 24.99, '12': 44.99 },
    popular: false,
    newest: true,
  },
  {
    id: 'capcut-pro',
    name: 'CapCut Pro',
    category: 'creative',
    desc: 'Professional video editing with AI features, effects and premium assets.',
    logoClass: 'logo-capcut',
    initial: 'C',
    prices: { '1': 4.49, '3': 11.99, '6': 21.99, '12': 39.99 },
    popular: false,
    newest: true,
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'productivity',
    desc: 'Word, Excel, PowerPoint, OneNote + 1TB OneDrive cloud storage.',
    logoClass: 'logo-microsoft',
    initial: 'M',
    prices: { '1': 7.99, '3': 21.99, '6': 39.99, '12': 71.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'duolingo-plus',
    name: 'Duolingo Plus',
    category: 'education',
    desc: 'Ad-free language learning with unlimited hearts, offline access and progress tracking.',
    logoClass: 'logo-duolingo',
    initial: 'D',
    prices: { '1': 3.99, '3': 10.99, '6': 18.99, '12': 32.99 },
    popular: false,
    newest: false,
  },
  {
    id: 'skillshare',
    name: 'Skillshare Premium',
    category: 'education',
    desc: 'Access thousands of creative and business classes from industry professionals.',
    logoClass: 'logo-skillshare',
    initial: 'S',
    prices: { '1': 5.99, '3': 15.99, '6': 27.99, '12': 47.99 },
    popular: false,
    newest: false,
  },
  {
    id: 'coursera-plus',
    name: 'Coursera Plus',
    category: 'education',
    desc: 'Unlimited access to 7,000+ courses, certificates and professional programs.',
    logoClass: 'logo-coursera',
    initial: 'C',
    prices: { '1': 12.99, '3': 35.99, '6': 64.99, '12': 115.99 },
    popular: false,
    newest: false,
  },
  {
    id: 'nordvpn',
    name: 'NordVPN',
    category: 'vpn',
    desc: 'Military-grade VPN with 5,500+ servers in 60 countries. 6 simultaneous connections.',
    logoClass: 'logo-nordvpn',
    initial: 'N',
    prices: { '1': 4.99, '3': 12.99, '6': 22.99, '12': 39.99 },
    popular: true,
    newest: false,
  },
  {
    id: 'expressvpn',
    name: 'ExpressVPN',
    category: 'vpn',
    desc: 'Ultra-fast VPN servers in 105 countries. Best-in-class privacy protection.',
    logoClass: 'logo-expressvpn',
    initial: 'E',
    prices: { '1': 5.99, '3': 15.99, '6': 27.99, '12': 47.99 },
    popular: false,
    newest: false,
  },
];

// ── Render Product Card ──────────────────────────────────────
function renderProductCard(product) {
  return `
    <div class="card-product" data-category="${product.category}" data-id="${product.id}" data-name="${product.name.toLowerCase()}">
      <div style="display:flex;align-items:center;gap:14px;">
        <div class="card-product-logo ${product.logoClass}">${product.initial}</div>
        <div>
          <div class="card-product-name">${product.name}</div>
          <span class="badge badge-gray" style="margin-top:4px;">${categoryLabel(product.category)}</span>
        </div>
      </div>
      <div class="card-product-desc">${product.desc}</div>
      <div class="card-product-footer">
        ${product.popular ? '<span class="badge badge-red" style="font-size:10px;">Popular</span>' : product.newest ? '<span class="badge badge-gray" style="font-size:10px;">New</span>' : '<span></span>'}
        <a href="product.html?id=${product.id}" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">Get Deal</a>
      </div>
    </div>
  `;
}

function categoryLabel(cat) {
  const map = {
    streaming: 'Streaming',
    'ai-tools': 'AI Tools',
    creative: 'Creative',
    productivity: 'Productivity',
    education: 'Education',
    vpn: 'VPN & Security',
  };
  return map[cat] || cat;
}

// ── Shop Page Init ───────────────────────────────────────────
function initShopPage() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const searchInput = document.getElementById('shop-search');
  const sortSelect  = document.getElementById('shop-sort');
  const filterTabs  = document.querySelectorAll('.filter-tab');

  let activeCategory = 'all';
  let activeSearch = '';
  let activeSort = 'popular';

  // Check for URL param category
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) activeCategory = catParam;

  function renderGrid() {
    let list = [...PRODUCTS];

    // Filter by category
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Filter by search
    if (activeSearch.trim()) {
      const q = activeSearch.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }

    // Sort
    if (activeSort === 'popular') {
      list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    } else if (activeSort === 'newest') {
      list.sort((a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0));
    } else if (activeSort === 'az') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--color-text-muted);">
          <div style="font-size:32px;margin-bottom:12px;">🔍</div>
          <div style="font-size:15px;">No products match your search.</div>
        </div>
      `;
    } else {
      grid.innerHTML = list.map(renderProductCard).join('');
    }

    // Trigger GSAP re-run if available
    if (typeof gsap !== 'undefined') {
      // Clear any existing card animations and reveal
      gsap.set('.card-product', { opacity: 0, y: 30 });
      gsap.to('.card-product', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }

  // Filter tabs
  // Set active tab based on URL param
  filterTabs.forEach(tab => {
    if (tab.dataset.cat === activeCategory) {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.cat;
      renderGrid();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', window.SubStore?.debounce
      ? window.SubStore.debounce(() => {
          activeSearch = searchInput.value;
          renderGrid();
        }, 300)
      : () => {
          activeSearch = searchInput.value;
          renderGrid();
        }
    );
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderGrid();
    });
  }

  renderGrid();
}

// ── Init on DOM ready ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initShopPage);

// Export for product.html
window.PRODUCTS = PRODUCTS;
window.renderProductCard = renderProductCard;
window.categoryLabel = categoryLabel;

/* =========================================================
   CAKES AMI — site script (no backend, no build step)
   ========================================================= */
(function () {
  "use strict";
  const C = window.CA_CONFIG;
  const D = window.CA_DATA;
  const B = C.business;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  /* ---------- Icons ---------- */
  const I = {
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.6l2.7 12.4a1.6 1.6 0 0 0 1.6 1.2h9.3a1.6 1.6 0 0 0 1.6-1.2L21.5 7H5.6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-5.2-8-11.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8 2.8C20 15.8 12 21 12 21z"/></svg>',
    insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2s-1 .3-3.4-.7a11.7 11.7 0 0 1-4.6-4.1c-.4-.5-1.1-1.7-1.1-3.1s.8-2.1 1-2.4a1.1 1.1 0 0 1 .8-.4h.6c.2 0 .4 0 .6.5l.9 2.1a.6.6 0 0 1 0 .5l-.3.5-.4.5c-.2.2-.3.3-.1.7a8.6 8.6 0 0 0 1.6 2 7.8 7.8 0 0 0 2.3 1.4c.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3a2.5 2.5 0 0 1-.1 1.3z"/></svg>',
    cake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7"/><path d="M5 16c1.5 1 2.5 1 3.5 0s2.5-1 3.5 0 2.5 1 3.5 0 2.5-1 3.5 0"/><path d="M12 12V8M12 5.5a1 1 0 1 0 0-.01"/></svg>',
    whisk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 10l7-7M12 4c3 0 6 3 6 6s-4 7-7 7-6-3-6-6 4-7 7-7z" transform="rotate(0)"/><path d="M8 14l-5 7"/></svg>',
    brush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3l3 3-9 9-3-3z"/><path d="M9 12c-3 0-5 2-5 5 0 2-1 3-1 3s5 1 7-1 2-4 2-4"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z"/></svg>',
    cherry: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="16" r="5"/><path d="M9 11c0-4 3-7 7-8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>',
    oven: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/><rect x="7" y="12" width="10" height="5" rx="1"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 9.5l-5.4 4.7 1.6 7.3L12 17.8 5.8 21.5l1.6-7.3L2 9.5l7.1-.6z"/></svg>'
  };
  window.CA_ICONS = I;

  /* ---------- Safe storage ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------- Header & footer ---------- */
  const NAV = [
    ["index.html", "Home", "home"], ["shop.html", "Shop", "shop"], ["gallery.html", "Gallery", "gallery"], ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"]
  ];
  const activeKey = { product: "shop", cart: "", checkout: "" }[page] ?? page;
  const tel = "tel:" + B.phone.replace(/[^\d+]/g, "");

  function renderChrome() {
    const header = document.createElement("div");
    header.innerHTML = `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header" id="siteHeader"><div class="container nav-wrap">
  <a class="brand" href="index.html" aria-label="${esc(B.name)} home">
    <img src="assets/img/logo.png" alt="" width="78" height="78">
    <span class="brand-text">Cakes Ami<small>Baked with love</small></span>
  </a>
  <nav class="main-nav" id="mainNav" aria-label="Main">
    <button class="icon-btn nav-close" type="button" aria-label="Close menu">${I.close}</button>
    <ul>${NAV.map(([h, t, k]) => `<li><a href="${h}"${k === activeKey ? ' class="active" aria-current="page"' : ""}>${t}</a></li>`).join("")}</ul>
  </nav>
  <div class="nav-actions">
    <a class="cart-btn" href="contact.html#custom" aria-label="Get a free quote">${I.mail}<span class="cart-label">Get a free quote</span></a>
    <button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav">${I.menu}</button>
  </div>
</div></header>
<div class="nav-backdrop"></div>`;
    document.body.prepend(...header.childNodes);

    const socials = [
      B.instagram && `<a href="${esc(B.instagram)}" target="_blank" rel="noopener" aria-label="Instagram" class="s-ig">${I.insta}</a>`,
      B.facebook && `<a href="${esc(B.facebook)}" target="_blank" rel="noopener" aria-label="Facebook" class="s-fb">${I.fb}</a>`,
      B.whatsapp && `<a href="https://wa.me/${esc(B.whatsapp)}" target="_blank" rel="noopener" aria-label="WhatsApp" class="s-wa">${I.wa}</a>`
    ].filter(Boolean).join("");

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
<div class="container">
  <div class="footer-grid">
    <div class="f-brand">
      <img src="assets/img/logo.png" alt="${esc(B.name)} logo" width="120" height="125" loading="lazy">
      <p>Custom cakes and cupcakes, made to order and decorated by hand for life's sweetest moments.</p>
      ${socials ? `<div class="socials">${socials}</div>` : ""}
    </div>
    <div><h4>Explore</h4><ul>
      <li><a href="shop.html">Shop cakes</a></li><li><a href="gallery.html">Gallery</a></li><li><a href="about.html">Our story</a></li><li><a href="contact.html">Contact us</a></li>
    </ul></div>
    <div><h4>Help</h4><ul>
      <li><a href="contact.html#custom">Request a quote</a></li>
      <li><a href="contact.html#faq">FAQ</a></li>
    </ul></div>
    <div><h4>Say hello</h4><ul>
      <li><a href="${tel}">${esc(B.phone)}</a></li>
      <li><a href="mailto:${esc(B.email)}">${esc(B.email)}</a></li>
      <li>${esc(B.area)}</li>
    </ul></div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} ${esc(B.name)}. All rights reserved.</span>
    <span>${esc(B.tagline)} ♥</span>
  </div>
</div>`;
    document.body.append(footer);

    const toast = document.createElement("div");
    toast.className = "toast"; toast.setAttribute("role", "status"); toast.setAttribute("aria-live", "polite");
    document.body.append(toast);

    // mobile menu
    const nav = $("#mainNav"), tog = $(".menu-toggle"), bd = $(".nav-backdrop");
    const setMenu = open => { nav.classList.toggle("open", open); bd.classList.toggle("show", open); tog.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : ""; };
    tog.addEventListener("click", () => setMenu(true));
    $(".nav-close").addEventListener("click", () => setMenu(false));
    bd.addEventListener("click", () => setMenu(false));
    nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

    const hdr = $("#siteHeader");
    const onScroll = () => hdr.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  let toastTimer;
  function showToast(html) {
    const t = $(".toast"); t.innerHTML = html; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 3800);
  }

  /* ---------- Forms (static): EmailJS → Formspree → mailto ----------
     kind:   "order" | "contact" | "newsletter"  (picks the EmailJS template)
     data:   human-readable fields (used for Formspree + mailto)
     params: EmailJS template variables (see EMAILJS-SETUP.md) */
  const EJ = C.emailjs || {};
  const emailjsReady = () => !!(EJ.publicKey && EJ.serviceId);
  function emailjsSend(templateId, params) {
    return fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service_id: EJ.serviceId, template_id: templateId, user_id: EJ.publicKey, template_params: params })
    }).then(r => { if (!r.ok) return r.text().then(t => { throw new Error("EmailJS: " + t); }); return "sent"; });
  }
  function sendForm(kind, subject, data, params, silentMailto) {
    const tpl = (EJ.templates || {})[kind];
    if (emailjsReady() && tpl) {
      const all = Object.assign({ subject, business_name: B.name, business_email: B.email, business_phone: B.phone,
        message: Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n") }, params || {});
      const main = emailjsSend(tpl, all);
      // Optional second email: confirmation to the customer
      if (kind === "order" && EJ.templates.orderCustomer && all.customer_email) main.then(() => emailjsSend(EJ.templates.orderCustomer, all)).catch(() => {});
      return main;
    }
    if (C.formEndpoint) {
      return fetch(C.formEndpoint, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ _subject: subject }, data))
      }).then(r => { if (!r.ok) throw new Error("send failed"); return "sent"; });
    }
    if (silentMailto) return Promise.resolve("local");
    const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${B.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return Promise.resolve("mailto");
  }

  /* ---------- Products (no prices: every cake is quoted on request) ---------- */
  const byId = id => D.products.find(p => p.id === id);
  const catName = id => (D.categories.find(c => c.id === id) || {}).name || "";
  const sizeList = p => D.SIZES[p.size];

  function productCard(p) {
    return `<article class="p-card reveal">
  <a class="p-img" href="product.html?id=${p.id}">
    <img src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy">
    ${p.tag ? `<span class="p-tag">${esc(p.tag)}</span>` : ""}
  </a>
  <div class="p-body">
    <span class="p-cat">${esc(catName(p.category))}</span>
    <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
    <div class="p-foot">
      <a class="quote-link" href="product.html?id=${p.id}#quote">Request a quote</a>
      <a class="icon-btn" href="product.html?id=${p.id}" aria-label="View ${esc(p.name)}">${I.plus}</a>
    </div>
  </div>
</article>`;
  }

  /* ---------- Reveal on scroll ---------- */
  let io;
  function reveal() {
    const els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    io = io || new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Lightbox ---------- */
  let lbItems = [], lbIdx = 0;
  function lightbox() {
    let lb = $(".lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photo viewer");
      lb.innerHTML = `<button class="lb-close" aria-label="Close">×</button><button class="lb-prev" aria-label="Previous">‹</button><img alt=""><button class="lb-next" aria-label="Next">›</button><div class="lb-cap"></div>`;
      document.body.append(lb);
      const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
      const go = d => { lbIdx = (lbIdx + d + lbItems.length) % lbItems.length; show(); };
      $(".lb-close", lb).onclick = close; $(".lb-prev", lb).onclick = () => go(-1); $(".lb-next", lb).onclick = () => go(1);
      lb.addEventListener("click", e => { if (e.target === lb) close(); });
      document.addEventListener("keydown", e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); });
      let sx = 0; lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
      lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); });
    }
    return lb;
  }
  function show() { const lb = lightbox(), it = lbItems[lbIdx]; $("img", lb).src = it.src; $("img", lb).alt = it.title || ""; $(".lb-cap", lb).textContent = it.title || ""; }
  function openLightbox(items, i) { lbItems = items; lbIdx = i; const lb = lightbox(); show(); lb.classList.add("open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); }

  function mosaic(container, items) {
    container.innerHTML = items.map((it, i) => `<figure class="reveal" tabindex="0" data-i="${i}"><img src="${esc(it.src)}" alt="${esc(it.title)}" loading="lazy"${it.fallbacks ? ` data-fallbacks="${esc(it.fallbacks.join("|"))}"` : ""}>${it.title ? `<figcaption>${esc(it.title)}</figcaption>` : ""}</figure>`).join("");
    // Try each fallback source in turn (Drive image links are sometimes rate-limited)
    $$("img[data-fallbacks]", container).forEach((img, n) => {
      const list = img.dataset.fallbacks.split("|");
      img.addEventListener("error", function next() {
        const src = list.shift();
        if (!src) { img.removeEventListener("error", next); img.closest("figure").style.display = "none"; return; }
        img.src = src;
        const it = items[+img.closest("figure").dataset.i]; if (it) it.src = src; // keep lightbox in sync
      });
    });
    $$("figure", container).forEach(f => {
      const open = () => openLightbox(items, +f.dataset.i);
      f.addEventListener("click", open);
      f.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    reveal();
  }

  /* =========================================================
     PAGES
     ========================================================= */
  const pages = {};

  pages.home = () => {
    const cats = $("#homeCats");
    if (cats) cats.innerHTML = D.categories.map(c => `
<a class="cat-tile reveal" href="shop.html?cat=${c.id}">
  <div class="arch"><img src="${D.IMG + c.cover}.jpg" alt="${esc(c.name)}" loading="lazy"></div>
  <h3>${esc(c.name)}</h3><span>${D.products.filter(p => p.category === c.id).length} designs</span>
</a>`).join("");
    const feat = $("#homeFeatured");
    if (feat) feat.innerHTML = ["rose-basket", "garden-rose-tiers", "little-shark", "tea-party-teapot", "rose-swirl-cupcakes", "maple-citizenship", "teddy-tiers", "glam-makeup"].map(id => productCard(byId(id))).join("");
    const m = $("#homeMosaic");
    if (m) mosaic(m, D.portfolio.slice(0, 8));
  };

  pages.shop = () => {
    const grid = $("#shopGrid"), chips = $("#shopCats"), q = $("#shopSearch"), sort = $("#shopSort"), countEl = $("#shopCount");
    let cat = params.get("cat") || "all";
    if (cat !== "all" && !D.categories.some(c => c.id === cat)) cat = "all";
    chips.innerHTML = [{ id: "all", name: "All" }].concat(D.categories).map(c => `<button class="chip${c.id === cat ? " active" : ""}" data-cat="${c.id}" type="button" aria-pressed="${c.id === cat}">${esc(c.name)}</button>`).join("");
    const draw = () => {
      const term = q.value.trim().toLowerCase();
      let list = D.products.filter(p => (cat === "all" || p.category === cat) && (!term || (p.name + " " + p.description + " " + catName(p.category)).toLowerCase().includes(term)));
      if (sort.value === "name") list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
      countEl.textContent = `${list.length} ${list.length === 1 ? "design" : "designs"}`;
      grid.innerHTML = list.length ? list.map(productCard).join("") :
        `<div class="empty" style="grid-column:1/-1"><h3>No cakes match that search</h3><p>Try another word, or <a href="contact.html#custom">ask us for a custom design</a>, we love a new challenge.</p></div>`;
      reveal();
    };
    chips.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      cat = b.dataset.cat;
      $$(".chip", chips).forEach(c => { c.classList.toggle("active", c === b); c.setAttribute("aria-pressed", c === b); });
      const u = new URL(location.href); cat === "all" ? u.searchParams.delete("cat") : u.searchParams.set("cat", cat); history.replaceState(null, "", u);
      draw();
    });
    q.addEventListener("input", draw); sort.addEventListener("change", draw);
    draw();
  };

  pages.product = () => {
    const p = byId(params.get("id"));
    const root = $("#product");
    if (!p) { root.innerHTML = `<div class="empty"><h3>We couldn't find that cake</h3><p><a class="btn" href="shop.html">Back to the shop</a></p></div>`; return; }
    document.title = `${p.name} | ${B.name}`;
    $("#crumbName").textContent = p.name;
    const sizes = sizeList(p);
    const isCup = p.size === "cupcake";
    const minDate = new Date(); minDate.setDate(minDate.getDate() + C.leadTimeDays);
    root.innerHTML = `
<div class="pd-grid">
  <div class="pd-media">
    <div class="pd-main"><img id="pdMain" src="${p.images[0]}" alt="${esc(p.name)}"></div>
    ${p.images.length > 1 ? `<div class="pd-thumbs">${p.images.map((s, i) => `<button type="button" class="${i ? "" : "active"}" data-src="${s}" aria-label="View photo ${i + 1}"><img src="${s}" alt=""></button>`).join("")}</div>` : ""}
  </div>
  <form class="pd-info" id="pdForm" novalidate>
    <span class="eyebrow">${esc(catName(p.category))}</span>
    <h1 style="font-size:clamp(2.2rem,4.5vw,3.4rem)">${esc(p.name)}</h1>
    <p><span class="quote-badge">Price on request</span><span class="serves" id="pdServes"></span></p>
    <p class="lead" style="font-size:1.05rem">${esc(p.description)}</p>
    <span id="quote"></span>
    <div class="opt"><span class="opt-label">${isCup ? "Quantity" : "Size"}</span>
      <div class="opt-row" role="radiogroup">${sizes.map((s, i) => `<input type="radio" name="size" id="sz${s.id}" value="${s.id}" ${i === (isCup ? 1 : 0) ? "checked" : ""}><label for="sz${s.id}">${s.label}<small>${s.note}</small></label>`).join("")}</div>
    </div>
    <div class="opt"><span class="opt-label">Flavour</span>
      <div class="opt-row" role="radiogroup">${D.FLAVOURS.map((f, i) => `<input type="radio" name="flavour" id="fl${i}" value="${esc(f)}" ${i ? "" : "checked"}><label for="fl${i}">${esc(f)}</label>`).join("")}</div>
    </div>
    <div class="opt field"><label for="pdMsg">${isCup ? "Colour or theme notes" : "Message on cake"} <span class="muted" style="text-transform:none;letter-spacing:0">(optional)</span></label>
      <input id="pdMsg" maxlength="60" placeholder="${isCup ? "e.g. pink & gold for a shower" : "e.g. Happy 30th Sarah"}"></div>
    <div class="opt"><span class="opt-label">Your details</span>
      <div class="form-grid">
        <div class="field"><label for="qName">Name <span class="req">*</span></label><input id="qName" name="qname" autocomplete="name" required></div>
        <div class="field"><label for="qEmail">Email <span class="req">*</span></label><input id="qEmail" name="qemail" type="email" autocomplete="email" required></div>
        <div class="field"><label for="qPhone">Phone</label><input id="qPhone" name="qphone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="qDate">Date needed</label><input id="qDate" name="qdate" type="date" min="${isoDate(minDate)}"></div>
        <div class="field full"><label for="qNotes">Anything else?</label><textarea id="qNotes" name="qnotes" placeholder="Colours, design changes, allergies, number of guests"></textarea></div>
      </div>
    </div>
    <input class="hp" name="company" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="buy-row"><button class="btn" type="submit">${I.mail} Request a quote</button></div>
    <div class="form-msg" id="qMsg" role="alert"></div>
    <div class="note-box">${I.info}<div>Every cake is made to order, so we'll reply with a personal quote. Please ask at least <strong>${C.leadTimeDays} days</strong> ahead (1–2 weeks for themed and sculpted designs). Pickup only.</div></div>
  </form>
</div>`;
    $$(".pd-thumbs button").forEach(b => b.addEventListener("click", () => { $("#pdMain").src = b.dataset.src; $$(".pd-thumbs button").forEach(x => x.classList.toggle("active", x === b)); }));
    const form = $("#pdForm"), out = $("#qMsg");
    const upd = () => { const s = sizes.find(x => x.id === form.size.value); $("#pdServes").textContent = s.note; };
    form.addEventListener("change", upd); upd();
    if (location.hash === "#quote") setTimeout(() => $("#qName").scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (form.company.value) return; // bot
      const bad = $$("[required]", form).find(f => !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value)));
      if (bad) { out.className = "form-msg err show"; out.textContent = "Please add your name and a valid email."; bad.focus(); return; }
      const s = sizes.find(x => x.id === form.size.value), fl = form.flavour.value, cakeMsg = $("#pdMsg").value.trim();
      const name = form.qname.value.trim(), email = form.qemail.value.trim(), phone = form.qphone.value.trim() || "-", date = form.qdate.value || "-";
      const details = [`Cake: ${p.name}`, `${isCup ? "Quantity" : "Size"}: ${s.label} (${s.note})`, `Flavour: ${fl}`, cakeMsg && `${isCup ? "Theme" : "Message on cake"}: ${cakeMsg}`, form.qnotes.value.trim() && `Notes: ${form.qnotes.value.trim()}`].filter(Boolean).join("\n");
      const data = { Name: name, Email: email, Phone: phone, Cake: p.name, "Date needed": date, Details: "\n" + details };
      const prm = { from_name: name, reply_to: email, phone, occasion: `Quote request: ${p.name}`, date_needed: date, guests: s.label + " (" + s.note + ")", enquiry: details };
      const btn = $("button[type=submit]", form); btn.disabled = true;
      sendForm("contact", `Quote request: ${p.name} (${name})`, data, prm).then(mode => {
        out.className = "form-msg ok show";
        out.textContent = mode === "mailto" ? "Your email app has opened with your request. Just press send!" : "Thank you! We'll reply with your quote within one business day.";
        if (mode !== "mailto") form.reset(), upd();
      }).catch(() => { out.className = "form-msg err show"; out.textContent = `Something went wrong. Please call us on ${B.phone}.`; })
        .finally(() => { btn.disabled = false; });
    });
    const rel = $("#related");
    if (rel) rel.innerHTML = D.products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4).map(productCard).join("");
    reveal();
  };

  const isoDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  /* ---------- Order tracking ---------- */
  const STEPS = [["Received", I.check], ["Confirmed", I.card], ["Baking", I.oven], ["Ready", I.box], ["Completed", I.heart]];
  function parseCSV(text) {
    const rows = []; let row = [], cur = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cur); rows.push(row); row = []; cur = ""; }
      else cur += c;
    }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  pages.track = () => {
    const form = $("#trackForm"), out = $("#trackResult"), input = $("#trackId");
    const render = (id, rec) => {
      if (!rec) {
        out.innerHTML = `<div class="card empty" style="padding:40px"><h3>We couldn't find order “${esc(id)}”</h3><p>Check the number in your confirmation, or contact us on <a href="${tel}">${esc(B.phone)}</a> and we'll help right away.</p></div>`;
        return;
      }
      const idx = Math.max(0, STEPS.findIndex(s => s[0].toLowerCase() === String(rec.status).trim().toLowerCase()));
      out.innerHTML = `
<div class="card">
  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;align-items:baseline">
    <div><span class="eyebrow" style="margin:0">Order</span><h3 style="margin:0">${esc(rec.id)}</h3></div>
    <div class="muted">${rec.pickup ? "Pickup: <strong style='color:var(--ink);font-weight:500'>" + esc(rec.pickup) + "</strong>" : ""}</div>
  </div>
  <ol class="timeline">${STEPS.map(([s, ic], i) => `<li class="${i < idx ? "done" : i === idx ? (idx === STEPS.length - 1 ? "done" : "current") : ""}"><span class="dot">${ic}</span>${s}</li>`).join("")}</ol>
  ${rec.note ? `<div class="note-box">${I.info}<div>${esc(rec.note)}</div></div>` : ""}
  ${rec.local ? `<p class="muted" style="font-size:.88rem;margin:22px 0 0">Status shown is from when the order was placed on this device. We'll contact you by email or phone as your order progresses.</p>` : ""}
</div>`;
    };
    const lookup = id => {
      id = id.trim().toUpperCase();
      if (!id) return;
      out.innerHTML = '<div class="spinner" aria-label="Loading"></div>';
      const local = () => {
        const o = store.get("cakesami_orders", []).find(x => x.id === id);
        render(id, o && { id: o.id, status: o.status, pickup: new Date(o.pickupDate + "T12:00").toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" }) + ", " + o.pickupTime, note: "", local: true });
      };
      if (!C.trackingSheetCsv) return local();
      fetch(C.trackingSheetCsv, { cache: "no-store" }).then(r => r.text()).then(t => {
        const rows = parseCSV(t).filter(r => r.length && r.some(Boolean));
        const head = rows.shift().map(h => h.trim().toLowerCase());
        const col = n => head.findIndex(h => h.includes(n));
        const r = rows.find(x => (x[col("order")] || "").trim().toUpperCase() === id);
        if (!r) return local();
        render(id, { id, status: r[col("status")], pickup: r[col("pickup")] || "", note: col("note") > -1 ? r[col("note")] : "" });
      }).catch(local);
    };
    form.addEventListener("submit", e => { e.preventDefault(); const v = input.value; const u = new URL(location.href); u.searchParams.set("id", v.trim().toUpperCase()); history.replaceState(null, "", u); lookup(v); });
    if (params.get("id")) { input.value = params.get("id"); lookup(params.get("id")); }
    const recent = store.get("cakesami_orders", []);
    if (recent.length && $("#recentOrders")) {
      $("#recentOrders").innerHTML = `<p class="muted center" style="margin-top:18px;font-size:.9rem">Orders from this device: ${recent.slice(0, 3).map(o => `<a href="#" data-id="${esc(o.id)}">${esc(o.id)}</a>`).join(" · ")}</p>`;
      $("#recentOrders").addEventListener("click", e => { const a = e.target.closest("a[data-id]"); if (!a) return; e.preventDefault(); input.value = a.dataset.id; form.requestSubmit(); });
    }
  };

  /* ---------- Gallery: Google Drive photos first, then the local photos (no repeats) ---------- */
  pages.gallery = () => {
    const grid = $("#galGrid"), status = $("#galStatus"), chips = $("#galFilters");
    const g = C.googleDrive || {};
    const local = (extra = []) => {
      const used = D.categories.filter(c => D.portfolio.some(p => p.category === c.id));
      chips.innerHTML = [{ id: "all", name: "All work" }].concat(used).map((c, i) => `<button class="chip${i ? "" : " active"}" type="button" data-cat="${c.id}" aria-pressed="${!i}">${esc(c.name)}</button>`).join("");
      const draw = cat => mosaic(grid, cat === "all" ? extra.concat(D.portfolio) : D.portfolio.filter(p => p.category === cat));
      chips.onclick = e => { const b = e.target.closest(".chip"); if (!b) return; $$(".chip", chips).forEach(c => { c.classList.toggle("active", c === b); c.setAttribute("aria-pressed", c === b); }); draw(b.dataset.cat); };
      draw("all");
    };
    if (!g.apiKey || !g.folderId) { local(); return; }
    grid.innerHTML = '<div class="spinner" aria-label="Loading photos"></div>';
    const all = [];
    const load = token => {
      const q = encodeURIComponent(`'${g.folderId}' in parents and mimeType contains 'image/' and trashed = false`);
      const url = `https://www.googleapis.com/drive/v3/files?q=${q}&key=${encodeURIComponent(g.apiKey)}&fields=nextPageToken,files(id,name,thumbnailLink)&pageSize=200&orderBy=createdTime desc${token ? "&pageToken=" + token : ""}`;
      return fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(j => {
        all.push(...(j.files || []));
        return j.nextPageToken && all.length < 1000 ? load(j.nextPageToken) : all;
      });
    };
    load().then(files => {
      const key = encodeURIComponent(g.apiKey);
      const drive = files.map(f => {
        const srcs = [
          f.thumbnailLink && f.thumbnailLink.replace(/=s\d+$/, "=s1200"),
          `https://lh3.googleusercontent.com/d/${f.id}=w1200`,
          `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media&key=${key}`
        ].filter(Boolean);
        return { src: srcs[0], fallbacks: srcs.slice(1), title: f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") };
      });
      local(drive);
      if (status) status.textContent = "";
    }).catch(() => local());
  };

  /* ---------- Contact ---------- */
  pages.contact = () => {
    const form = $("#contactForm"), msg = $("#ctMsg");
    const d = new Date(); d.setDate(d.getDate() + C.leadTimeDays); form.date.min = isoDate(d);
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (form.company.value) return;
      const bad = $$("[required]", form).find(f => !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value)));
      if (bad) { msg.className = "form-msg err show"; msg.textContent = "Please fill in your name, email and message."; bad.focus(); return; }
      const data = { Name: form.name.value, Email: form.email.value, Phone: form.phone.value || "-", Occasion: form.occasion.value, "Date needed": form.date.value || "-", Guests: form.guests.value || "-", Message: form.message.value };
      const params = { from_name: form.name.value, reply_to: form.email.value, phone: form.phone.value || "-", occasion: form.occasion.value,
        date_needed: form.date.value || "-", guests: form.guests.value || "-", enquiry: form.message.value };
      sendForm("contact", `Cake enquiry from ${form.name.value}`, data, params).then(mode => {
        msg.className = "form-msg ok show";
        msg.textContent = mode === "mailto" ? "Your email app has opened with your message. Just press send!" : "Thank you! We'll get back to you within one business day.";
        if (mode !== "mailto") form.reset();
      }).catch(() => { msg.className = "form-msg err show"; msg.textContent = `Something went wrong. Please call us on ${B.phone}.`; });
    });
  };

  /* ---------- Fill contact placeholders on any page ---------- */
  function fillBusiness() {
    $$("[data-biz]").forEach(el => {
      const k = el.dataset.biz;
      if (k === "phone") { el.textContent = B.phone; if (el.tagName === "A") el.href = tel; }
      else if (k === "email") { el.textContent = B.email; if (el.tagName === "A") el.href = "mailto:" + B.email; }
      else if (B[k] != null) el.textContent = B[k];
    });
    $$("[data-lead]").forEach(el => el.textContent = C.leadTimeDays);
    $$("[data-icon]").forEach(el => el.innerHTML = I[el.dataset.icon] || "");
  }

  /* ---------- Banner photo row on inner pages ---------- */
  const BANNER = {
    about: ["red-rose-bouquet", "woodland-fox", "rose-cupcakes"], shop: ["rose-basket", "garden-rose-tiers", "rose-cupcakes"],
    gallery: ["teapot", "silver-jubilee", "little-shark"],
    contact: ["bride-to-be", "frangipani-leaf", "glam-makeup"], track: ["dessert-cups", "dapper-shirt", "rose-cupcakes"]
  };
  function bannerPhotos() {
    const b = $(".page-banner .container"), imgs = BANNER[page];
    if (!b || !imgs) return;
    // wrap the text in its own column so the banner can sit side by side with the photos
    const txt = document.createElement("div"); txt.className = "banner-text";
    while (b.firstChild) txt.append(b.firstChild);
    b.append(txt);
    // the photo itself is a faded CSS backdrop (.page-banner.has-photo::after); no arch photos here any more
    b.closest(".page-banner").classList.add("has-photo");
  }

  /* ---------- Boot ---------- */
  renderChrome();
  fillBusiness();
  bannerPhotos();
  if (pages[page]) pages[page]();
  reveal();
})();

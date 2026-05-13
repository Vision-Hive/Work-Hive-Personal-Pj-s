/* ============================================
   THE VISION HIVE — Premium JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursor && cursorFollower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorFollower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '0.5';
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // ============================================
  // HAMBURGER / MOBILE MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ============================================
  // SCROLL REVEAL — INTERSECTION OBSERVER
  // ============================================
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // ============================================
  // HERO TITLE — STAGGERED LETTER ANIMATION
  // ============================================
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 300);
  }

  // ============================================
  // NUMBER COUNTER ANIMATION
  // ============================================
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '').trim();
        if (!isNaN(num)) animateCounter(el, 0, num, suffix, 1800);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  function animateCounter(el, start, end, suffix, duration) {
    const startTime = performance.now();
    const em = el.querySelector('em');
    const emContent = em ? em.outerHTML : '';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * eased);
      if (em) {
        el.innerHTML = current + emContent;
      } else {
        el.textContent = current + suffix;
      }
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ============================================
  // SERVICE CARD GLOW — MOUSE TRACKING
  // ============================================
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,102,255,0.1), transparent 60%)`;
      }
    });
  });

  // ============================================
  // CONTACT FORM
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn-primary');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span>Sending...</span>';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        btn.style.display = 'none';
        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.opacity = '';
          btn.disabled = false;
          btn.style.display = '';
          formSuccess.classList.remove('show');
        }, 5000);
      }, 1500);
    });

    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.closest('.form-group').querySelector('label').style.color = 'var(--blue)';
      });
      input.addEventListener('blur', () => {
        input.closest('.form-group').querySelector('label').style.color = '';
      });
    });
  }

  // ============================================
  // SMOOTH ACTIVE NAV LINK HIGHLIGHTING
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--blue-light)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  // ============================================
  // PARALLAX EFFECT — HERO ORBS
  // ============================================
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');

  if (orb1 && orb2) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        orb1.style.transform = `translateY(${scrollY * 0.15}px) scale(1)`;
        orb2.style.transform = `translateY(${scrollY * -0.1}px) scale(1)`;
      }
    }, { passive: true });

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      orb2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
    });
  }

  // ============================================
  // TILT EFFECT — WORK CARDS
  // ============================================
  const workCards = document.querySelectorAll('.work-card');

  workCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  // ============================================
  // PAGE LOAD ANIMATION
  // ============================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 800);

  // ============================================
  // MARQUEE — PAUSE ON HOVER
  // ============================================
  const marqueeInner = document.querySelector('.marquee-inner');
  if (marqueeInner) {
    marqueeInner.addEventListener('mouseenter', () => {
      marqueeInner.style.animationPlayState = 'paused';
    });
    marqueeInner.addEventListener('mouseleave', () => {
      marqueeInner.style.animationPlayState = 'running';
    });
  }

  // ============================================
  // PACKAGES & PRICING — CAROUSEL + TABS
  // ============================================
  const pkgStage = document.getElementById('carouselStage');
  if (pkgStage) {

    const PACKAGES = [
      {
        label: "CMS Web", cards: [
          { tier: "01", name: "Basic", price: "150–250", featured: false, suffix: "", features: ["4–5 page responsive website", "Basic theme customization", "Contact form integration", "Mobile-friendly design", "Basic SEO setup", "WhatsApp/chat integration"] },
          { tier: "02", name: "Standard", price: "250–400", featured: false, suffix: "", features: ["6–7 pages website", "Improved UI customization", "Basic blog setup", "Speed optimization", "On-page SEO setup", "Image optimization", "2 revisions"] },
          { tier: "03", name: "Pro", price: "400–600", featured: true, suffix: "", features: ["8–10 pages website", "Custom layout design", "Blog/news section", "Advanced SEO setup", "Lead generation forms", "Basic automation", "Performance optimization"] },
          { tier: "04", name: "Premium", price: "600–800", featured: false, suffix: "", features: ["Fully customized CMS website", "Advanced UI/UX design", "CRM or 3rd-party integrations", "Automation setup", "Security optimization", "Analytics integration"] },
          { tier: "05", name: "Elite", price: "800–1200+", featured: false, suffix: "", features: ["Enterprise-level CMS solution", "Fully custom structure", "Advanced automation workflows", "API integrations", "Scalable architecture", "Priority support + maintenance"] },
        ]
      },
      {
        label: "Custom Dev", cards: [
          { tier: "01", name: "Basic", price: "400–600", featured: false, suffix: "", features: ["Up to 5 pages custom website", "Responsive design", "Basic animations", "Contact forms", "Clean UI structure"] },
          { tier: "02", name: "Standard", price: "600–900", featured: false, suffix: "", features: ["6–8 pages custom website", "Modern UI/UX design", "Smooth animations", "Better performance optimization", "Basic API integration"] },
          { tier: "03", name: "Pro", price: "900–1500", featured: true, suffix: "", features: ["Advanced frontend + backend", "API integrations", "Authentication system", "Database setup", "Dashboard features"] },
          { tier: "04", name: "Premium", price: "1500–2500", featured: false, suffix: "", features: ["Custom web application", "Admin panel/dashboard", "Advanced automation features", "Third-party integrations", "High performance optimization"] },
          { tier: "05", name: "Elite", price: "2500–4000+", featured: false, suffix: "", features: ["Full enterprise system", "Complex backend architecture", "Scalable infrastructure", "Advanced security system", "Long-term support"] },
        ]
      },
      {
        label: "Design", cards: [
          { tier: "01", name: "Basic", price: "50–100", featured: false, suffix: "", features: ["3 social media posts", "Simple banner designs", "Basic standard-quality creatives", "Clean but minimal branding"] },
          { tier: "02", name: "Standard", price: "100–200", featured: false, suffix: "", features: ["7 social media posts", "Banner + ad creatives", "Instagram/Facebook post designs", "Better typography & visual balance", "Brand-consistent styling"] },
          { tier: "03", name: "Pro", price: "200–350", featured: true, suffix: "", features: ["12 custom social media posts", "High-quality banner & ad creatives", "Marketing campaign designs", "Modern, engaging visuals", "Strong brand identity consistency"] },
        ]
      },
      {
        label: "Logo", cards: [
          { tier: "01", name: "Basic", price: "20–40", featured: false, suffix: "", features: ["1 simple logo concept", "Basic design", "1 revision"] },
          { tier: "02", name: "Standard", price: "40–80", featured: false, suffix: "", features: ["2–3 logo concepts", "Better creativity", "2 revisions"] },
          { tier: "03", name: "Pro", price: "80–150", featured: true, suffix: "", features: ["Multiple concepts", "Brand-style logo design", "High-quality files"] },
          { tier: "04", name: "Premium", price: "150–250", featured: false, suffix: "", features: ["Full brand identity logo", "Color variations", "Mockups included"] },
          { tier: "05", name: "Elite", price: "250–400+", featured: false, suffix: "", features: ["Complete brand identity kit", "Logo usage guidelines", "Social media kit"] },
        ]
      },
      {
        label: "Video", cards: [
          { tier: "01", name: "Basic", price: "30–60", featured: false, suffix: "", features: ["Simple cuts & trimming", "Basic transitions", "Short reels editing"] },
          { tier: "02", name: "Standard", price: "60–120", featured: false, suffix: "", features: ["Captions & subtitles", "Transitions & effects", "Music syncing"] },
          { tier: "03", name: "Pro", price: "120–250", featured: true, suffix: "", features: ["Advanced editing", "Motion graphics", "Color grading"] },
          { tier: "04", name: "Premium", price: "250–500", featured: false, suffix: "", features: ["High-quality commercial videos", "Storytelling edits", "Branding elements"] },
          { tier: "05", name: "Elite", price: "500–1000+", featured: false, suffix: "", features: ["Cinematic video production", "Full brand commercials", "Advanced VFX"] },
        ]
      },
      {
        label: "Social Media", cards: [
          { tier: "01", name: "Basic", price: "80–150", featured: false, suffix: "/mo", features: ["8–10 posts per month", "Basic captions", "Post scheduling", "Simple hashtag research", "Monthly content plan"] },
          { tier: "02", name: "Standard", price: "150–300", featured: false, suffix: "/mo", features: ["12–15 posts per month", "Better captions + engagement focus", "Content scheduling + consistency", "Hashtag strategy", "Basic growth tracking"] },
          { tier: "03", name: "Pro", price: "300–600", featured: true, suffix: "/mo", features: ["20–25 posts per month", "Content strategy + planning", "Audience engagement handling", "Monthly performance report", "Brand-focused growth approach"] },
        ]
      },
      {
        label: "SEO", cards: [
          { tier: "01", name: "Basic", price: "80–150", featured: false, suffix: "/mo", features: ["On-page SEO setup", "Basic keyword optimization", "Website structure check", "Simple performance improvement"] },
          { tier: "02", name: "Standard", price: "150–300", featured: false, suffix: "/mo", features: ["On-page + basic off-page SEO", "Keyword research", "Basic backlink building", "Google indexing setup", "Monthly progress check"] },
          { tier: "03", name: "Pro", price: "300–600", featured: true, suffix: "/mo", features: ["Technical SEO improvements", "Content optimization", "Strong keyword strategy", "Quality backlink building", "Competitor analysis"] },
          { tier: "04", name: "Premium", price: "600–1000", featured: false, suffix: "/mo", features: ["Advanced SEO strategy", "In-depth competitor research", "High-quality backlinks", "Content growth strategy", "Ranking improvement plan"] },
          { tier: "05", name: "Elite", price: "1000–1500+", featured: false, suffix: "/mo", features: ["Full SEO growth system", "Strong local/international ranking", "Authority backlink building", "Full website optimization", "Long-term scaling plan"] },
        ]
      },
      {
        label: "Maintenance", cards: [
          { tier: "01", name: "1 Month", price: "80–150", featured: false, suffix: "/mo", features: ["Basic website monitoring", "Bug fixes & minor updates", "Plugin/theme updates", "Basic security checks", "Limited support (WhatsApp/Email)"] },
          { tier: "02", name: "3 Months", price: "220–400", featured: false, suffix: "", features: ["Everything in 1-month plan", "Regular performance checks", "Monthly backups", "Priority support", "Small content updates", "Save ~10%"] },
          { tier: "03", name: "6 Months", price: "400–700", featured: true, suffix: "", features: ["Everything in 3-month plan", "Continuous optimization", "Security monitoring", "Speed improvements", "Faster issue resolution", "Save ~15%"] },
          { tier: "04", name: "12 Months", price: "750–1300", featured: false, suffix: "", features: ["Full-year website care", "Complete maintenance & updates", "Advanced security protection", "Performance optimization", "Priority/emergency support", "Save ~25%"] },
        ]
      },
    ];

    let pkgActiveTab = 0;
    let pkgAnimating = false;
    let pkgTouchStartX = 0;
    const pkgOffsets = {};

    const pkgTabBtns = document.querySelectorAll('.tab-btn');
    const pkgPillBg = document.getElementById('tabPillBg');

    // Build card element
    function buildPkgCard(card) {
      const el = document.createElement('div');
      el.className = 'pkg-card' + (card.featured ? ' featured' : '');
      const feats = card.features.map(f => `
        <li class="feat-item">
          <span class="feat-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>${f}
        </li>`).join('');
      el.innerHTML = `
        <div class="card-glow"></div>
        <div class="card-tier">${card.tier}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-price"><sup>$</sup>${card.price}<small>${card.suffix}</small></div>
        <div class="card-divider"></div>
        <ul class="card-features">${feats}</ul>
        <button class="card-cta ${card.featured ? 'cta-solid' : 'cta-outline'}">
          Get Started
          <span class="cta-arrow"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </button>`;
      const glow = el.querySelector('.card-glow');
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        glow.style.left = (e.clientX - r.left) + 'px';
        glow.style.top = (e.clientY - r.top) + 'px';
      });
      if (window.gsap) {
        el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.02, duration: 0.35, ease: 'power2.out' }));
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect();
          gsap.to(el, { rotateX: ((e.clientY - r.top - r.height / 2) / r.height) * -8, rotateY: ((e.clientX - r.left - r.width / 2) / r.width) * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
        });
        el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' }));
      }
      return el;
    }

    // Build panel
    function buildPkgPanel(ti) {
      const data = PACKAGES[ti];
      const panel = document.createElement('div');
      panel.className = 'carousel-panel';
      panel.dataset.tab = ti;
      const viewport = document.createElement('div');
      viewport.className = 'cards-viewport';
      const track = document.createElement('div');
      track.className = 'cards-track';
      data.cards.forEach(c => track.appendChild(buildPkgCard(c)));
      viewport.appendChild(track);
      panel.appendChild(viewport);
      const controls = document.createElement('div');
      controls.className = 'carousel-controls';
      const dotsHTML = data.cards.map((_, i) => `<div class="nav-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></div>`).join('');
      controls.innerHTML = `
        <div class="nav-info">
          <div class="nav-counter"><span id="pkg-cnt-${ti}">1</span> / ${data.cards.length}</div>
          <div class="nav-dots" id="pkg-dots-${ti}">${dotsHTML}</div>
        </div>
        <div class="nav-arrows">
          <button class="arrow-btn" id="pkg-prev-${ti}" disabled>
            <svg viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <button class="arrow-btn" id="pkg-next-${ti}">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>`;
      panel.appendChild(controls);
      const hint = document.createElement('div');
      hint.className = 'swipe-hint';
      hint.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 8V6a2 2 0 00-2-2 2 2 0 00-2 2v6"/><path d="M14 8a2 2 0 012 2v2a6 6 0 01-12 0v-3a2 2 0 012-2 2 2 0 012 2"/></svg> Swipe`;
      panel.appendChild(hint);
      pkgOffsets[ti] = 0;
      return { panel, track };
    }

    function getPkgCardsVisible() {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1024) return 2;
      return 3;
    }

    // Slide track
    function pkgSlide(ti, newOff, instant) {
      const { track } = pkgPanelData[ti];
      const cards = track.querySelectorAll('.pkg-card');
      if (!cards.length) return;
      const cv = getPkgCardsVisible();
      const max = PACKAGES[ti].cards.length;
      newOff = Math.max(0, Math.min(newOff, max - cv));
      const gap = 20;
      let cardW = cards[0].getBoundingClientRect().width;
      if (!cardW) cardW = (track.parentElement.offsetWidth - gap * (cv - 1)) / cv;
      if (window.gsap) {
        gsap.to(track, { x: -newOff * (cardW + gap), duration: instant ? 0 : 0.65, ease: 'power3.out' });
      } else {
        track.style.transform = `translateX(${-newOff * (cardW + gap)}px)`;
      }
      pkgOffsets[ti] = newOff;
      const cntr = document.getElementById(`pkg-cnt-${ti}`);
      if (cntr) cntr.textContent = Math.min(newOff + 1, max);
      document.querySelectorAll(`#pkg-dots-${ti} .nav-dot`).forEach((d, i) => d.classList.toggle('active', i === newOff));
      const prev = document.getElementById(`pkg-prev-${ti}`);
      const next = document.getElementById(`pkg-next-${ti}`);
      if (prev) prev.disabled = newOff === 0;
      if (next) next.disabled = newOff >= max - cv;
    }

    // Build all panels
    const pkgPanelData = {};
    PACKAGES.forEach((_, i) => {
      const { panel, track } = buildPkgPanel(i);
      pkgStage.appendChild(panel);
      pkgPanelData[i] = { panel, track };
    });

    // Arrow clicks
    pkgStage.addEventListener('click', e => {
      const btn = e.target.closest('.arrow-btn');
      if (!btn || pkgAnimating) return;
      const ti = parseInt(btn.closest('.carousel-panel').dataset.tab);
      const cv = getPkgCardsVisible();
      const max = PACKAGES[ti].cards.length;
      let off = pkgOffsets[ti];
      off = btn.id.startsWith('pkg-prev-') ? Math.max(0, off - 1) : Math.min(max - cv, off + 1);
      if (window.gsap) gsap.fromTo(btn, { scale: 0.88 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1.2,0.5)' });
      pkgSlide(ti, off);
    });

    // Dot clicks
    pkgStage.addEventListener('click', e => {
      const dot = e.target.closest('.nav-dot');
      if (!dot) return;
      const ti = parseInt(dot.closest('.carousel-panel').dataset.tab);
      const cv = getPkgCardsVisible();
      const max = PACKAGES[ti].cards.length;
      pkgSlide(ti, Math.min(parseInt(dot.dataset.dot), max - cv));
    });

    // Touch/swipe
    pkgStage.addEventListener('touchstart', e => { pkgTouchStartX = e.touches[0].clientX; }, { passive: true });
    pkgStage.addEventListener('touchend', e => {
      const diff = pkgTouchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 40) return;
      const panel = e.target.closest('.carousel-panel');
      if (!panel) return;
      const ti = parseInt(panel.dataset.tab);
      const cv = getPkgCardsVisible();
      const max = PACKAGES[ti].cards.length;
      pkgSlide(ti, diff > 0 ? Math.min(max - cv, pkgOffsets[ti] + 1) : Math.max(0, pkgOffsets[ti] - 1));
    });

    // Pill positioning
    function getPkgPillX(btn) {
      const nav = document.getElementById('tabsNav');
      let el = btn, x = 0;
      while (el && el !== nav) { x += el.offsetLeft; el = el.offsetParent; }
      return x - 6;
    }

    function movePkgPill(btn) {
      if (!pkgPillBg || !window.gsap) return;
      gsap.to(pkgPillBg, { x: getPkgPillX(btn), width: btn.offsetWidth, duration: 0.45, ease: 'power3.inOut' });
    }

    // Tab switching
    function pkgSwitchTab(newTab) {
      if (newTab === pkgActiveTab || pkgAnimating) return;
      pkgAnimating = true;
      const oldPanel = pkgPanelData[pkgActiveTab].panel;
      const newPanel = pkgPanelData[newTab].panel;
      if (window.gsap) {
        gsap.to(oldPanel, {
          opacity: 0, y: 24, duration: 0.3, ease: 'power2.in', onComplete() {
            oldPanel.classList.remove('active');
            gsap.set(oldPanel, { y: 0, opacity: 0 });
            pkgSlide(newTab, 0, true);
            newPanel.classList.add('active');
            gsap.set(newPanel, { opacity: 0, y: 30 });
            gsap.to(newPanel, { opacity: 1, y: 0, duration: 0.15 });
            const cards = newPanel.querySelectorAll('.pkg-card');
            gsap.set(cards, { opacity: 0, y: 48, rotateX: -8 });
            gsap.to(cards, { opacity: 1, y: 0, rotateX: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07, onComplete() { pkgAnimating = false; } });
          }
        });
      } else {
        oldPanel.classList.remove('active');
        pkgSlide(newTab, 0, true);
        newPanel.classList.add('active');
        pkgAnimating = false;
      }
      pkgActiveTab = newTab;
      pkgTabBtns.forEach(b => b.classList.toggle('active', parseInt(b.dataset.tab) === newTab));
      movePkgPill(pkgTabBtns[newTab]);
    }

    pkgTabBtns.forEach(btn => {
      btn.addEventListener('click', () => pkgSwitchTab(parseInt(btn.dataset.tab)));
      if (window.gsap) {
        btn.addEventListener('mouseenter', () => { if (!btn.classList.contains('active')) gsap.to(btn, { scale: 1.06, duration: 0.25, ease: 'power2.out' }); });
        btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' }));
      }
    });

    // Arrow magnetic hover
    if (window.gsap) {
      pkgStage.addEventListener('mousemove', e => {
        const btn = e.target.closest('.arrow-btn');
        if (!btn) return;
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4, ease: 'power2.out' });
      });
      setTimeout(() => {
        pkgStage.querySelectorAll('.arrow-btn').forEach(btn => {
          btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' }));
        });
      }, 60);
    }

    // Init
    function pkgInit() {
      pkgPanelData[0].panel.classList.add('active');
      requestAnimationFrame(() => {
        const firstBtn = pkgTabBtns[0];
        if (pkgPillBg && window.gsap && firstBtn) {
          gsap.set(pkgPillBg, { x: getPkgPillX(firstBtn), width: firstBtn.offsetWidth });
        }
        if (window.gsap) {
          const cards = pkgPanelData[0].panel.querySelectorAll('.pkg-card');
          gsap.set(cards, { opacity: 0, y: 60, rotateX: -10 });
          gsap.to(cards, { opacity: 1, y: 0, rotateX: 0, duration: 0.65, ease: 'power3.out', stagger: 0.09, delay: 0.15 });
        }
        const cv = getPkgCardsVisible();
        PACKAGES.forEach((pkg, i) => {
          const nextBtn = document.getElementById(`pkg-next-${i}`);
          if (nextBtn && pkg.cards.length <= cv) nextBtn.disabled = true;
        });
      });
    }

    let pkgResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(pkgResizeTimer);
      pkgResizeTimer = setTimeout(() => {
        requestAnimationFrame(() => movePkgPill(pkgTabBtns[pkgActiveTab]));
        PACKAGES.forEach((_, i) => pkgSlide(i, pkgOffsets[i], true));
        const cv = getPkgCardsVisible();
        PACKAGES.forEach((pkg, i) => {
          const nextBtn = document.getElementById(`pkg-next-${i}`);
          if (nextBtn) nextBtn.disabled = pkgOffsets[i] >= pkg.cards.length - cv;
        });
      }, 150);
    });

    pkgInit();

  } // end pkgStage

  console.log('%c THE VISION HIVE ', 'background:#0066ff;color:#fff;font-size:18px;font-weight:bold;padding:8px 16px;border-radius:4px;');
  console.log('%c Built with 💙 and precision.', 'color:#0066ff;font-size:13px;');

});

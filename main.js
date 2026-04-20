document.addEventListener('DOMContentLoaded', () => {

  // --- Hamburger mobile menu ---
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // --- Reveal on scroll ---
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Nav activo por sección ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a, .mobile-menu a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const id = entry.target.id;
        document.querySelectorAll(`.nav__links a[href="#${id}"]`).forEach(l => l.classList.add('active'));
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => navObserver.observe(s));

  // --- Parallax sutil en foto del hero ---
  const heroPhoto = document.querySelector('.hero__photo');
  if (heroPhoto) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroPhoto.style.transform = `translateY(${y * 0.2}px)`;
      }
    }, { passive: true });
  }

  // --- Cursor personalizado (solo desktop) ---
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');

    dot.style.cssText = `
      position:fixed; width:5px; height:5px;
      background:#CCFF00; border-radius:50%;
      pointer-events:none; z-index:9999;
      transform:translate(-50%,-50%);
    `;
    ring.style.cssText = `
      position:fixed; width:26px; height:26px;
      border:1px solid rgba(204,255,0,0.3); border-radius:50%;
      pointer-events:none; z-index:9998;
      transform:translate(-50%,-50%);
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, left 0.1s ease, top 0.1s ease;
    `;

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    document.addEventListener('mousemove', e => {
      dot.style.left  = e.clientX + 'px';
      dot.style.top   = e.clientY + 'px';
      ring.style.left = e.clientX + 'px';
      ring.style.top  = e.clientY + 'px';
    });

    document.querySelectorAll('a, .proj-card, .step, .btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '44px';
        ring.style.height = '44px';
        ring.style.borderColor = 'rgba(204,255,0,0.55)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '26px';
        ring.style.height = '26px';
        ring.style.borderColor = 'rgba(204,255,0,0.3)';
      });
    });
  }

});

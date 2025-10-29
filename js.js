// Util: select
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));

// Ano no rodapé
(() => { const y = new Date().getFullYear(); const el = $('#year'); if (el) el.textContent = y; })();

// Menu mobile
(() => {
  const btn = $('.nav-toggle');
  const menu = $('#menu');
  if (!btn || !menu) return;
  const toggle = () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', toggle);
  $$('#menu a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }));
})();

// Scroll reveal com IntersectionObserver
(() => {
  const elements = $$('[data-reveal]');
  if (!('IntersectionObserver' in window) || elements.length === 0) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => io.observe(el));
})();

// Lightbox acessível
(() => {
  const lb = $('#lightbox');
  const lbImg = $('.lightbox-img');
  const lbClose = $('.lightbox-close');
  if (!lb || !lbImg || !lbClose) return;

  const open = (src) => {
    lbImg.src = src;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    lbClose.focus();
  };
  const close = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
  };

  $$('[data-lightbox]').forEach(btn => btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    if (src) open(src);
  }));
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// Validação do JSON-LD no console (para checar localmente)
(() => {
  const ld = document.querySelector('script[type="application/ld+json"]');
  if (!ld) return;
  try {
    JSON.parse(ld.textContent);
    console.info('Dados estruturados OK');
  } catch (e) {
    console.error('Erro no JSON-LD:', e);
  }
})();



import { animate, inView, stagger } from 'motion';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Paginated scroll-snap carousel. Progressive enhancement over native scroll. */
function initCarousel() {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const slides = Array.from(
      root.querySelectorAll<HTMLElement>('[data-carousel-slide]')
    );
    if (!track || slides.length < 2) return;

    const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const dots = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]')
    );
    const status = root.querySelector<HTMLElement>('[data-carousel-status]');

    let index = 0;

    const goTo = (i: number) => {
      const target = Math.max(0, Math.min(i, slides.length - 1));
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: reduced ? 'auto' : 'smooth',
      });
    };

    const sync = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i === index) return;
      index = i;

      dots.forEach((d, n) => {
        d.classList.toggle('is-active', n === index);
        d.setAttribute('aria-current', String(n === index));
      });
      // `inert` keeps off-screen cards out of the tab order without
      // hiding them from the DOM (aria-hidden alone would leave them tabbable).
      slides.forEach((s, n) => s.toggleAttribute('inert', n !== index));

      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
      if (status) status.textContent = `Página ${index + 1} de ${slides.length}`;
    };

    prev?.addEventListener('click', () => goTo(index - 1));
    next?.addEventListener('click', () => goTo(index + 1));
    dots.forEach((d, n) => d.addEventListener('click', () => goTo(n)));

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(index - 1); }
    });

    let frame = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    }, { passive: true });

    // Keep the snap offset correct when the viewport width changes.
    let rw = 0;
    addEventListener('resize', () => {
      clearTimeout(rw);
      rw = setTimeout(() => {
        track.scrollTo({ left: index * track.clientWidth, behavior: 'auto' });
      }, 150) as unknown as number;
    });

    index = -1; // force the first sync to paint initial state
    sync();
  });
}

/** Staggered scroll reveal for every [data-reveal] container. */
function initReveal() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((group) => {
    const items = Array.from(
      group.querySelectorAll<HTMLElement>('[data-reveal-item]')
    );
    if (!items.length) return;

    if (reduced) {
      items.forEach((el) => (el.style.opacity = '1'));
      return;
    }

    inView(
      group,
      () => {
        animate(
          items,
          { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
          { duration: 0.5, delay: stagger(0.08), ease: [0.22, 1, 0.36, 1] }
        );
      },
      { amount: 0.2 }
    );
  });
}

/** Navbar turns solid once the 100px sentinel scrolls away. */
function initNav() {
  const nav = document.querySelector<HTMLElement>('#mainNav');
  const sentinel = document.querySelector<HTMLElement>('#nav-sentinel');
  if (!nav || !sentinel) return;

  new IntersectionObserver(([entry]) => {
    nav.classList.toggle('is-scrolled', !entry.isIntersecting);
  }).observe(sentinel);
}

/** Scrollspy — replaces Bootstrap's. Picks the most-visible section. */
function initScrollspy() {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-spy]')
  );
  if (!links.length) return;

  const setActive = (id: string) =>
    links.forEach((l) => l.classList.toggle('is-active', l.hash === `#${id}`));

  const io = new IntersectionObserver(
    (entries) => {
      const top = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (top) setActive(top.target.id);
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  links.forEach((l) => {
    const section = document.querySelector(l.hash);
    if (section) io.observe(section);
  });
}

/** CRT typewriter — replaces ~400 lines of generated @keyframes. */
function initTypewriter() {
  const el = document.querySelector<HTMLElement>('#code-text');
  if (!el) return;

  const strings = ['Code, code, code...', '🐛', 'Enjoy ☕'];

  if (reduced) {
    el.textContent = strings[2];
    return;
  }

  let s = 0;
  let i = 0;
  let deleting = false;

  (function tick() {
    const word = strings[s];
    el.textContent = word.slice(0, i);

    let wait = deleting ? 40 : 72;
    if (!deleting && i === word.length) {
      deleting = true;
      wait = 1800;
    } else if (deleting && i === 0) {
      deleting = false;
      s = (s + 1) % strings.length;
      wait = 400;
    } else {
      i += deleting ? -1 : 1;
    }

    setTimeout(tick, wait);
  })();
}

initReveal();
initNav();
initScrollspy();
initCarousel();
initTypewriter();
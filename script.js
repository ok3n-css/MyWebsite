// Reveal sections on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document
  .querySelectorAll('.hobbies, .education, .skills, .gallery, .feedback')
  .forEach((sec) => revealObserver.observe(sec));

// Header style on scroll + hide on scroll down / show on scroll up
const header = document.querySelector('header');
let lastY = window.pageYOffset;

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;

  // add subtle background/shadow after 80px
  header.classList.toggle('scrolled', y > 80);

  // hide when scrolling down, show when scrolling up
  if (y > lastY && y > 120) {
    header.classList.add('nav-hidden');
  } else {
    header.classList.remove('nav-hidden');
  }

  lastY = y;
});

// Animate skill bars when skills section becomes visible
const bars = document.querySelectorAll('.bar div');
const skillSection = document.querySelector('.skills');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      bars.forEach((b) => {
        const m = b.getAttribute('style')?.match(/width:(\d+%)/);
        if (m) b.style.width = m[1];
      });
      barObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

if (skillSection) barObserver.observe(skillSection);

// Smooth scroll for in-page links with header offset
const smoothLinks = document.querySelectorAll('a[href^="#"]');
const smoothScrollTo = (target) => {
  const el = document.querySelector(target);
  if (!el) return;
  const headerHeight = header?.offsetHeight || 0;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
  window.scrollTo({ top, behavior: 'smooth' });
};

smoothLinks.forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    smoothScrollTo(href);
  });
});

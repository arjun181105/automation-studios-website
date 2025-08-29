// ===== Config =====
const CAL_LINK = "arjun-sharma-l5xsle/ai-automation-demo-call";

// ===== Mobile nav =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn) menuBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const targetId = a.getAttribute('href').substring(1);
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    }
  });
});

// ===== GSAP animations (refined slower) =====
function animate() {
  if (!window.gsap) return;

  const D = 1.25; // base duration slower
  const STAG = 0.14; // gentle stagger

  // Hero
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: D } });
  tl.fromTo('.reveal-left',  { x:-36, opacity:0 }, { x:0, opacity:1 })
    .fromTo('.reveal-right', { x: 36, opacity:0 }, { x:0, opacity:1 }, "<");

  function groupReveal(sectionSel, useStagger = true) {
    const section = document.querySelector(sectionSel);
    if (!section) return;
    const items = section.querySelectorAll('.reveal-up, .card, .step, .faq-item, .reveal-up-group > *');
    if (!items.length) return;

    gsap.set(items, { y:24, opacity:0 });
    gsap.to(items, {
      y:0, opacity:1,
      duration: D,
      ease: "power2.out",
      stagger: useStagger ? STAG : 0,
      scrollTrigger: { trigger: section, start: "top 82%" }
    });
  }

  groupReveal('#services', true);
  groupReveal('#how', true);
  groupReveal('#usecases', true);
  groupReveal('#faq', false);

  // Transcript lines (slower + typing cursor)
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    gsap.to(line, { opacity:1, x:0, delay: .5 + i * 1.2, onStart(){
      line.classList.add('typing');
      setTimeout(()=> line.classList.remove('typing'), 1000);
    } });
  });
}
window.addEventListener('load', animate);

// ===== Book Demo: open Cal.com modal in-site =====
const bookBtns = document.querySelectorAll('[data-open-book]');
bookBtns.forEach(btn => btn.addEventListener('click', () => {
  if (window.Cal) {
    Cal("ui", { calLink: "arjun-sharma-l5xsle/ai-automation-demo-call", open: true, layout: "month_view", theme: "dark" });
  } else {
    window.open("https://cal.com/arjun-sharma-l5xsle/ai-automation-demo-call", "_blank");
  }
}));

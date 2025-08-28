// Mobile nav
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn) menuBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for in-page anchors
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

// GSAP animations
function animate() {
  if (!window.gsap) return;
  const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: .8 } });
  tl.fromTo('.reveal-left', {x:-40, opacity:0}, {x:0, opacity:1, stagger:.15});
  tl.fromTo('.reveal-right', {x:40, opacity:0}, {x:0, opacity:1, stagger:.15}, "<");
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.fromTo(el, {y:24, opacity:0}, {
      y:0, opacity:1,
      scrollTrigger: { trigger: el, start: "top 85%" }
    });
  });
  // typing-like transcript reveal
  const lines = document.querySelectorAll('.t-line');
  lines.forEach((line, i) => {
    gsap.to(line, {opacity:1, x:0, delay: .2 + i * .6});
  });
}
window.addEventListener('load', animate);

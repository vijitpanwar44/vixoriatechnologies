// ── Scroll reveal ────────────────────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal, .reveal-float").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 55, 260)}ms`;
  observer.observe(el);
});

// ── Mobile menu ───────────────────────────────────────────────────────────────
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

// ── Sticky nav shadow on scroll ───────────────────────────────────────────────
const nav = document.querySelector(".nav-wrap");
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 10
    ? "0 2px 20px rgba(0,0,0,.09)"
    : "none";
}, { passive: true });

// ── Contact form ──────────────────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true") {
  const form = document.querySelector(".cta-form");
  const success = document.getElementById("form-success");

  if (form && success) {
    form.style.display = "none";
    success.style.display = "block";
  }
}

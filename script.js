/* ── Reveal on scroll ──────────────────────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
  }),
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6 * 65, 260)}ms`;
  observer.observe(el);
});

/* ── Mobile nav ────────────────────────────────────────────────────────── */
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));
}

/* ── Sticky nav shadow ─────────────────────────────────────────────────── */
const nav = document.querySelector(".nav-wrap");
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 20 ? "0 2px 20px rgba(0,0,0,.08)" : "none";
}, { passive: true });

/* ── Contact form ──────────────────────────────────────────────────────── */
const form    = document.getElementById("contact-form");
const success = document.getElementById("form-success");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    const orig = btn.textContent;
    btn.textContent = "Sending…";
    btn.disabled = true;
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (res.ok) {
        form.style.display = "none";
        if (success) success.style.display = "block";
      } else {
        btn.textContent = orig;
        btn.disabled = false;
        alert("Something went wrong. Please email us at vijit.panwar42@gmail.com");
      }
    } catch {
      btn.textContent = orig;
      btn.disabled = false;
      alert("Something went wrong. Please email us at vijit.panwar42@gmail.com");
    }
  });
}

/* ── Show success if redirected back ──────────────────────────────────── */
if (new URLSearchParams(window.location.search).get("success") === "true") {
  if (form && success) { form.style.display = "none"; success.style.display = "block"; }
}

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

// ── Loss calculator + live drain ticker ──────────────────────────────────────
let teamSize = 20;
const WORK_DAYS   = 25;   // working days per month
const HOURLY_RATE = 500;  // ₹500/hr average fully-loaded cost
const HRS_DAY     = 1;    // hours wasted per person per day

function calcMonthly(n)    { return n * HRS_DAY * HOURLY_RATE * WORK_DAYS; }
function calcHourlyRate(n) { return calcMonthly(n) / (30 * 24); } // spread over continuous 30-day month

let tickerRatePerMs = calcHourlyRate(teamSize) / 3_600_000;
const tickerStart   = Date.now();

function formatINR(n) {
  return n.toLocaleString("en-IN");
}

function updateCalc() {
  const monthly = calcMonthly(teamSize);
  const hourly  = calcHourlyRate(teamSize);
  tickerRatePerMs = hourly / 3_600_000;

  const elMonth = document.getElementById("hc-month");
  const elHour  = document.getElementById("hc-hour");
  if (elMonth) elMonth.textContent = formatINR(monthly);
  if (elHour)  elHour.textContent  = Math.round(hourly);

  // Keep drain section ticker rate label in sync
  const dtRate = document.querySelector(".drain-ticker-rate");
  if (dtRate) {
    dtRate.innerHTML =
      `running at <strong>₹${Math.round(hourly)}/hour</strong> &nbsp;·&nbsp; ` +
      `<strong>₹${(hourly / 60).toFixed(2)}/minute</strong> &nbsp;·&nbsp; ` +
      `based on ${teamSize} people × 1 hr/day × ₹${HOURLY_RATE}/hr`;
  }
}

const hcDec = document.getElementById("hc-dec");
const hcInc = document.getElementById("hc-inc");
const hcNum = document.getElementById("hc-n");

if (hcDec && hcInc && hcNum) {
  hcDec.addEventListener("click", () => {
    if (teamSize > 1) { teamSize--; hcNum.textContent = teamSize; updateCalc(); }
  });
  hcInc.addEventListener("click", () => {
    if (teamSize < 500) { teamSize++; hcNum.textContent = teamSize; updateCalc(); }
  });
}

// Live ticker
const tickerEl = document.getElementById("dt-amount");
if (tickerEl) {
  (function tick() {
    const loss = (Date.now() - tickerStart) * tickerRatePerMs;
    tickerEl.textContent = loss.toFixed(2);
    requestAnimationFrame(tick);
  })();
}

// ── Analytics — CTA click events ─────────────────────────────────────────────
document.querySelectorAll('a[href="#contact"], button[type="submit"]').forEach((el) => {
  el.addEventListener("click", () => {
    if (typeof gtag !== "undefined") {
      gtag("event", "cta_click", {
        event_category: "engagement",
        event_label: el.textContent.trim().slice(0, 60),
      });
    }
  });
});

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

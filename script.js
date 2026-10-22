const header = document.querySelector(".site-header");
const menuButton = document.getElementById("menu-button");
const mobileNav = document.getElementById("mobile-nav");

function closeMenu() {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileNav.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

const navDrops = [...document.querySelectorAll(".nav-drop")];
function closeNavDrops(except) {
  navDrops.forEach((drop) => {
    if (drop === except) return;
    drop.dataset.open = "false";
    drop.querySelector(".nav-trigger")?.setAttribute("aria-expanded", "false");
  });
}
navDrops.forEach((drop) => {
  const trigger = drop.querySelector(".nav-trigger");
  trigger?.addEventListener("click", () => {
    const shouldOpen = drop.dataset.open !== "true";
    closeNavDrops();
    drop.dataset.open = String(shouldOpen);
    trigger.setAttribute("aria-expanded", String(shouldOpen));
  });
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-drop")) closeNavDrops();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavDrops();
    closeMenu();
  }
});

function updateHeader() {
  if (header) header.classList.toggle("scrolled", window.scrollY > 12);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in"));
}

const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const originalText = button.innerHTML;
    button.textContent = "Sending…";
    button.disabled = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("Request failed");
      form.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
    } catch {
      button.innerHTML = originalText;
      button.disabled = false;
      window.alert("We could not send your enquiry. Please contact us by email or WhatsApp.");
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const whatsappWidget = document.createElement("aside");
whatsappWidget.className = "whatsapp-widget";
whatsappWidget.setAttribute("aria-label", "Contact Vixoria on WhatsApp");
whatsappWidget.innerHTML = `
  <button class="whatsapp-launcher" type="button" aria-controls="whatsapp-panel" aria-expanded="false">
    <span class="whatsapp-launcher-icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="currentColor" focusable="false"><path d="M16.01 2.67A13.26 13.26 0 0 0 4.52 22.55L2.67 29.33l6.94-1.82A13.32 13.32 0 1 0 16.01 2.67Zm0 24.19a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-4.12 1.08 1.1-4.02-.27-.41a10.9 10.9 0 1 1 9.25 5.11Zm5.98-8.17c-.33-.16-1.95-.96-2.25-1.07-.3-.11-.52-.16-.74.17-.22.32-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.39-.51-2.65-1.64-.98-.87-1.64-1.95-1.83-2.28-.19-.33-.02-.51.14-.67.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71 0 1.6 1.17 3.15 1.33 3.37.16.22 2.3 3.51 5.57 4.93.78.34 1.39.54 1.87.69.79.25 1.51.21 2.08.13.63-.09 1.95-.8 2.22-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.38Z"/></svg>
    </span>
    <span>Connect with our team</span>
    <span class="whatsapp-online-dot" aria-hidden="true"></span>
  </button>
  <div class="whatsapp-panel" id="whatsapp-panel" role="region" aria-label="WhatsApp enquiry" hidden>
    <div class="whatsapp-panel-header">
      <img class="whatsapp-panel-brand" src="/assets/vixoria-mark.svg" alt="" aria-hidden="true" width="40" height="40" />
      <div><strong>Vixoria Technologies</strong><span>Message us on WhatsApp</span></div>
      <button class="whatsapp-close" type="button" aria-label="Close WhatsApp panel">&times;</button>
    </div>
    <div class="whatsapp-panel-body">
      <p class="whatsapp-greeting">Hello! 👋</p>
      <p>Tell us what you would like to build. We’ll help you find a practical next step.</p>
      <a class="whatsapp-continue" href="https://wa.me/917022146813?text=Hi%20Vixoria%2C%20I%27d%20like%20to%20discuss%20a%20software%20project." target="_blank" rel="noopener noreferrer">Continue to WhatsApp <span aria-hidden="true">→</span></a>
    </div>
  </div>`;
document.body.append(whatsappWidget);

const whatsappLauncher = whatsappWidget.querySelector(".whatsapp-launcher");
const whatsappPanel = whatsappWidget.querySelector(".whatsapp-panel");
const whatsappClose = whatsappWidget.querySelector(".whatsapp-close");

function closeWhatsApp(focusLauncher = false) {
  if (whatsappPanel.hidden) return;
  whatsappPanel.hidden = true;
  whatsappLauncher.setAttribute("aria-expanded", "false");
  if (focusLauncher) whatsappLauncher.focus();
}

whatsappLauncher.addEventListener("click", () => {
  if (!whatsappPanel.hidden) {
    closeWhatsApp();
    return;
  }
  whatsappPanel.hidden = false;
  whatsappLauncher.setAttribute("aria-expanded", "true");
  whatsappClose.focus();
});
whatsappClose.addEventListener("click", () => closeWhatsApp(true));
document.addEventListener("click", (event) => {
  if (!whatsappWidget.contains(event.target)) closeWhatsApp();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeWhatsApp(true);
});

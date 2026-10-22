import { copyFileSync, cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { industries, serviceGroups, services } from "../site/catalog.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const origin = "https://www.vixoriatechnologies.com";
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const serviceUrl = (service) => `/services/${service.slug}/`;
const industryUrl = (industry) => `/industries/${industry.slug}/`;

const work = [
  {
    name: "TrueWorker", slug: "trueworker", type: "Matching platform", image: "/assets/trueworker-logo.png", imageAlt: "TrueWorker logo",
    summary: "A WhatsApp-first experience that connects people in India with nearby verified job opportunities.",
    challenge: "Job discovery can be confusing when opportunities are scattered and people need a simple way to start.",
    approach: "Vixoria built TrueWorker around a clear path from a person's location and interests to relevant opportunities, using a familiar WhatsApp-first experience.",
    delivered: ["A focused job-discovery journey", "A mobile-friendly product experience", "A foundation that can grow as the product evolves"],
    url: "https://trueworker.co.in/",
  },
  {
    name: "WikiSchools", slug: "wikischools", type: "Education data platform", image: "/assets/wikischools-social-card.png", imageAlt: "WikiSchools school comparison preview",
    summary: "A Delhi NCR school discovery platform that makes official UDISE+ records easier to search and compare.",
    challenge: "Families need school facts in a format they can find, understand and compare without digging through raw records.",
    approach: "Vixoria built a searchable school directory with clear profiles and comparisons, while showing where the underlying information comes from.",
    delivered: ["Search and browse by school or area", "Readable school profiles based on official records", "Source and methodology information"],
    url: "https://www.wikischools.in/",
  },
];

function groupLinks() {
  return serviceGroups.map((group) => `<div class="mega-column"><a class="mega-heading" href="/services/#${group.slug}">${escapeHtml(group.name)}</a>${group.items.map(([name, slug]) => `<a href="/services/${slug}/">${escapeHtml(name)}</a>`).join("")}</div>`).join("");
}

function renderHeader() {
  const mobileGroups = serviceGroups.map((group) => `<details class="mobile-group"><summary>${escapeHtml(group.name)}</summary>${group.items.map(([name, slug]) => `<a href="/services/${slug}/">${escapeHtml(name)}</a>`).join("")}</details>`).join("");
  return `<header class="site-header" id="top">
    <div class="container nav-inner">
      <a class="brand" href="/" aria-label="Vixoria Technologies home"><img class="brand-logo" src="/assets/vixoria-logo.svg" alt="" width="230" height="60" /></a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <div class="nav-drop"><button class="nav-trigger" type="button" aria-expanded="false" aria-controls="services-panel">Services</button><div class="mega-panel services-panel" id="services-panel"><div class="mega-top"><div><strong>How we can help</strong><p>Build a project or add development capacity to your team.</p></div><a href="/services/">View all services →</a></div><div class="mega-grid">${groupLinks()}</div></div></div>
        <a href="/services/staff-augmentation/">Hire developers</a>
        <div class="nav-drop"><button class="nav-trigger" type="button" aria-expanded="false" aria-controls="industries-panel">Industries</button><div class="mega-panel industries-panel" id="industries-panel"><div class="mega-top"><div><strong>Where software can help</strong><p>Practical ideas for different business workflows.</p></div><a href="/industries/">View all industries →</a></div><div class="industry-menu-grid">${industries.map((item) => `<a href="${industryUrl(item)}">${escapeHtml(item.name)}</a>`).join("")}</div></div></div>
        <a href="/work/">Case studies</a><a class="nav-cta" href="/#contact">Free consultation</a>
      </nav>
      <button class="menu-button" id="menu-button" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation"><a class="mobile-main-link" href="/services/">All services</a><a class="mobile-main-link" href="/services/staff-augmentation/">Hire developers</a>${mobileGroups}<a class="mobile-main-link" href="/industries/">All industries</a><details class="mobile-group"><summary>Industries</summary>${industries.map((item) => `<a href="${industryUrl(item)}">${escapeHtml(item.name)}</a>`).join("")}</details><a class="mobile-main-link" href="/work/">Case studies</a><a href="/#about">About</a><a href="/#contact">Free consultation</a></nav>
  </header>`;
}

function renderFooter() {
  return `<footer><div class="container footer-inner"><a class="brand" href="/" aria-label="Vixoria Technologies home"><img class="brand-logo" src="/assets/vixoria-logo.svg" alt="" width="230" height="60" /></a><nav class="footer-links" aria-label="Footer"><a href="/services/">Services</a><a href="/services/staff-augmentation/">Hire developers</a><a href="/industries/">Industries</a><a href="/work/">Case Studies</a><a href="/#contact">Contact</a></nav><p>© <span id="year"></span> Vixoria Technologies</p></div></footer>`;
}

function layout({ title, description, path, body }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const canonical = `${origin}${path}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${safeTitle} | Vixoria Technologies</title><meta name="description" content="${safeDescription}" /><link rel="canonical" href="${canonical}" /><meta name="theme-color" content="#ffffff" /><link rel="icon" href="/assets/vixoria-mark.svg" type="image/svg+xml" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&display=swap" rel="stylesheet" /><link rel="stylesheet" href="/styles.css" /><link rel="stylesheet" href="/site-pages.css" /></head>
<body>${renderHeader()}<main>${body}</main>${renderFooter()}<script src="/script.js"></script></body></html>`;
}

function contactBand(label = "Tell us about your project", description = "Share the problem you want to solve. We’ll help identify a practical next step.", action = "Discuss your project") {
  return `<section class="page-cta"><div class="container page-cta-inner"><div><p class="section-label light">Start a conversation</p><h2>${escapeHtml(label)}</h2><p>${escapeHtml(description)}</p></div><a class="button button-primary" href="/#contact">${escapeHtml(action)} →</a></div></section>`;
}

function card({ title, description, url, label }) {
  return `<a class="catalog-card" href="${url}"><span class="catalog-card-kicker">${escapeHtml(label)}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><span class="catalog-card-arrow" aria-hidden="true">Explore →</span></a>`;
}

function catalogPage(type) {
  const isService = type === "services";
  const title = isService ? "Software services for the work ahead" : "Software ideas for your industry";
  const description = isService ? "Explore Vixoria's software projects and dedicated developer and tester support." : "Explore practical software, website and app ideas for 15 industries.";
  const intro = isService ? "We can build a complete software project or help your existing team add a developer. Explore the work you need." : "Every business has its own workflows. These pages show the kinds of digital experiences and tools we can discuss for each industry.";
  const sections = isService ? serviceGroups.map((group) => `<section class="catalog-section" id="${group.slug}"><div class="catalog-section-head"><div><p class="section-label">Services</p><h2>${escapeHtml(group.name)}</h2></div><p>${escapeHtml(group.description)}</p></div><div class="catalog-grid">${services.filter((item) => item.groupSlug === group.slug).map((item) => card({ title: item.name, description: item.description, url: serviceUrl(item), label: group.name })).join("")}</div></section>`).join("") : `<section class="catalog-section" id="all-industries"><div class="catalog-section-head"><div><p class="section-label">Industries</p><h2>Find your field</h2></div><p>Start with a business need, then we can shape the right website, app or internal tool.</p></div><div class="catalog-grid">${industries.map((item) => card({ title: item.name, description: item.description, url: industryUrl(item), label: "Industry" })).join("")}</div></section>`;
  return layout({ title, description, path: `/${type}/`, body: `<section class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / ${isService ? "Services" : "Industries"}</p><p class="eyebrow"><span></span>${isService ? "What we do" : "Who we help"}</p><h1>${title}</h1><p class="page-intro">${intro}</p></div></section><div class="container catalog-sections">${sections}</div>${contactBand()}` });
}

const staffSkills = [
  ["BACK END", ".NET / C#", "APIs, business applications and integrations."],
  ["FRONT END", "React / TypeScript", "Product interfaces, dashboards and web apps."],
  ["FRONT END", "Angular", "Structured interfaces for larger applications."],
  ["BACK END", "Java / Spring Boot", "Services, APIs and enterprise systems."],
  ["BACK END", "Node.js", "JavaScript services and real-time features."],
  ["BACK END", "Python", "APIs, automation and data workflows."],
  ["MOBILE", "Mobile development", "iOS and Android apps, including cross-platform work."],
  ["DATA", "SQL / Data engineering", "Databases, pipelines and reporting-ready data."],
  ["CLOUD", "AWS / Azure", "Cloud applications, infrastructure and deployment."],
  ["DELIVERY", "DevOps", "CI/CD, containers and release workflows."],
  ["TESTING", "QA / Test automation", "Manual testing and reliable automated checks."],
  ["AI", "AI integration", "Useful AI features added to existing products and workflows."],
];

function staffAugmentationPage() {
  return layout({
    title: "Dedicated Developers and Testers",
    description: "Add developers and testers to your existing team for a defined project period. Explore .NET, React, Python, cloud, QA and other skills.",
    path: "/services/staff-augmentation/",
    body: `<section class="page-hero staff-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/services/">Services</a> / Dedicated Developers</p><p class="eyebrow"><span></span>Development capacity</p><h1>Add a developer or tester to your team.</h1><p class="page-intro">When a live project needs extra capacity, Vixoria can help you find developers and testers who work within your team, tools and priorities.</p><div class="hero-actions"><a class="button button-primary" href="/#contact">Tell us the role →</a><a class="text-link" href="#how-it-works">How it works <span>↓</span></a></div></div></section>
    <section class="staff-section"><div class="container"><div class="staff-section-heading"><p class="section-label">Development and testing</p><h2>The development skills we know best.</h2><p>Tell us the role and stack you need. We review technical fit before arranging an introduction.</p></div><div class="staff-role-grid">${staffSkills.map(([category, name, description], index) => `<div class="staff-role-card"><span>${String(index + 1).padStart(2, "0")} / ${escapeHtml(category)}</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(description)}</p></div>`).join("")}</div></div></section>
    <section class="staff-section staff-process" id="how-it-works"><div class="container"><div class="staff-section-heading"><p class="section-label">How it works</p><h2>A straightforward way to add capacity.</h2></div><div class="staff-step-grid"><div><span>01</span><h3>Tell us what you need</h3><p>Share the role, skills, working hours and the project timeline.</p></div><div><span>02</span><h3>Meet a suitable specialist</h3><p>We review technical fit, then you interview the person before deciding.</p></div><div><span>03</span><h3>Work as one team</h3><p>The person joins your tools and process. Your team sets daily priorities.</p></div></div></div></section>
    <section class="staff-section"><div class="container staff-two-ways"><div><p class="section-label">Built around your team</p><h2>Your project stays in your hands.</h2></div><div><p>Staff augmentation works when you already manage the project and need more development or testing capacity. We can agree on hours, overlap and duration around the role.</p><p>If you want Vixoria to own delivery instead, <a href="/services/software-development/">explore our software development service</a>.</p></div></div></section>
    ${contactBand("Need a developer or tester?", "Tell us the role, technology and timing. We'll discuss whether Vixoria can help and what the next step would be.", "Discuss a role")}`,
  });
}

function detailPage(item, type) {
  if (type === "services" && item.slug === "staff-augmentation") return staffAugmentationPage();
  const isService = type === "services";
  const category = isService ? item.group : "Industry";
  const parent = isService ? "/services/" : "/industries/";
  const path = isService ? serviceUrl(item) : industryUrl(item);
  const related = isService
    ? services.filter((other) => other.groupSlug === item.groupSlug && other.slug !== item.slug).slice(0, 3).map((other) => ({ title: other.name, description: other.description, url: serviceUrl(other), label: other.group }))
    : ["software-development", "web-development", "mobile-apps"].map((slug) => services.find((service) => service.slug === slug)).map((service) => ({ title: service.name, description: service.description, url: serviceUrl(service), label: "Service" }));
  return layout({ title: `${item.name} ${isService ? "Services" : "Software Solutions"}`, description: item.description, path,
    body: `<section class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="${parent}">${isService ? "Services" : "Industries"}</a> / ${escapeHtml(item.name)}</p><p class="eyebrow"><span></span>${escapeHtml(category)}</p><h1>${escapeHtml(item.name)}</h1><p class="page-intro">${escapeHtml(item.description)}</p><div class="hero-actions"><a class="button button-primary" href="/#contact">Discuss a project →</a><a class="text-link" href="${parent}">Explore ${isService ? "services" : "industries"} <span>→</span></a></div></div></section>
    <section class="detail-section"><div class="container detail-grid"><div><p class="section-label">How we approach it</p><h2>Start with the real workflow.</h2><p>${isService ? `A useful ${escapeHtml(item.name.toLowerCase())} project starts with the people using it and the result your business needs. We can plan the scope, build the right experience and improve it after launch.` : `For ${escapeHtml(item.name.toLowerCase())} teams, the right solution depends on how customers and staff already work. We can identify the bottleneck, plan the user journey and build around it.`}</p></div><div class="detail-list"><h3>${isService ? "What this could include" : "Ideas we can discuss"}</h3>${item.examples.map((example) => `<div><span aria-hidden="true">✓</span>${escapeHtml(example)}</div>`).join("")}</div></div></section>
    <section class="related-section"><div class="container"><div class="catalog-section-head"><div><p class="section-label">Keep exploring</p><h2>${isService ? "Related services" : "Useful services"}</h2></div><a class="text-link" href="${parent}">View all →</a></div><div class="catalog-grid">${related.map(card).join("")}</div></div></section>${contactBand(`Let's plan your ${item.name.toLowerCase()} project`)}` });
}

function workIndex() {
  return layout({ title: "Case Studies & Products", description: "Explore TrueWorker and WikiSchools, products built by Vixoria Technologies.", path: "/work/",
    body: `<section class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / Case Studies</p><p class="eyebrow"><span></span>Our work</p><h1>Products built by Vixoria.</h1><p class="page-intro">These products show how we turn a real information or service problem into a working digital experience.</p></div></section><section class="catalog-section container"><div class="work-grid">${work.map((item) => `<a class="work-card" href="/work/${item.slug}/"><div class="work-visual"><img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" /></div><div class="work-copy"><span class="catalog-card-kicker">${escapeHtml(item.type)}</span><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.summary)}</p><span class="catalog-card-arrow">Read case study →</span></div></a>`).join("")}</div></section>${contactBand()}` });
}

function workDetail(item) {
  const other = work.find((entry) => entry.slug !== item.slug);
  return layout({ title: `${item.name} Case Study`, description: item.summary, path: `/work/${item.slug}/`,
    body: `<section class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/work/">Case Studies</a> / ${escapeHtml(item.name)}</p><p class="eyebrow"><span></span>${escapeHtml(item.type)}</p><h1>${escapeHtml(item.name)}</h1><p class="page-intro">${escapeHtml(item.summary)}</p><div class="hero-actions"><a class="button button-primary" href="${item.url}" target="_blank" rel="noopener noreferrer">Explore ${escapeHtml(item.name)} ↗</a><a class="text-link" href="/work/">All work <span>→</span></a></div></div></section><section class="detail-section"><div class="container work-detail-grid"><div class="work-detail-image"><img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" /></div><div><p class="section-label">The problem</p><h2>A simpler way to get the right information.</h2><p>${escapeHtml(item.challenge)}</p><p class="section-label work-subhead">What we built</p><p>${escapeHtml(item.approach)}</p></div></div></section><section class="related-section"><div class="container"><div class="catalog-section-head"><div><p class="section-label">The product</p><h2>What it brings together</h2></div></div><div class="deliverable-grid">${item.delivered.map((value, index) => `<div><span>0${index + 1}</span><h3>${escapeHtml(value)}</h3></div>`).join("")}</div><p class="next-work">Next case study: <a href="/work/${other.slug}/">${escapeHtml(other.name)} →</a></p></div></section>${contactBand("Have a product or platform in mind?")}` });
}

function writePage(path, html) {
  const directory = join(root, path);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), html, "utf8");
}

writePage("services", catalogPage("services"));
for (const service of services) writePage(join("services", service.slug), detailPage(service, "services"));
writePage("industries", catalogPage("industries"));
for (const industry of industries) writePage(join("industries", industry.slug), detailPage(industry, "industries"));
writePage("work", workIndex());
for (const item of work) writePage(join("work", item.slug), workDetail(item));

const homePath = join(root, "index.html");
const home = readFileSync(homePath, "utf8");
const headerPattern = /<!-- SITE_HEADER_START -->[\s\S]*?<!-- SITE_HEADER_END -->/;
if (!headerPattern.test(home)) throw new Error("Homepage header markers are missing");
writeFileSync(homePath, home.replace(headerPattern, `<!-- SITE_HEADER_START -->\n${renderHeader()}\n<!-- SITE_HEADER_END -->`), "utf8");

const paths = ["/", "/services/", ...services.map(serviceUrl), "/industries/", ...industries.map(industryUrl), "/work/", ...work.map((item) => `/work/${item.slug}/`)];
writeFileSync(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}\n</urlset>\n`, "utf8");
const output = resolve(root, "public");
if (dirname(output) !== resolve(root) || basename(output) !== "public") throw new Error("Unexpected build output path");
rmSync(output, { recursive: true, force: true });
mkdirSync(output);
for (const file of ["index.html", "styles.css", "site-pages.css", "script.js", "privacy-policy.html", "thank-you.html", "robots.txt", "sitemap.xml"]) copyFileSync(join(root, file), join(output, file));
for (const directory of ["assets", "services", "industries", "work"]) cpSync(join(root, directory), join(output, directory), { recursive: true });
console.log(`Built ${paths.length} pages (${services.length} services, ${industries.length} industries, ${work.length} case studies).`);

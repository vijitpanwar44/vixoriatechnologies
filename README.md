# Vixoria Technologies website

The public website at `https://www.vixoriatechnologies.com/` is a static site deployed on Vercel. The contact form uses the Vercel function in `api/contact.js` and needs `RESEND_API_KEY` in the Vercel project environment.

## Content and pages

- `index.html`, `styles.css`, `site-pages.css` and `script.js` provide the homepage and shared design.
- `site/catalog.mjs` is the source for the 34 service and technology offerings and 15 industry pages.
- `scripts/build-site.mjs` generates the navigation, service pages, industry pages, TrueWorker and WikiSchools case studies, and `sitemap.xml`.
- Generated pages are checked in under `services/`, `industries/` and `work/` so static hosting can serve them directly.

After editing the catalog or page generator, run:

```powershell
npm run build
npm run check:site
```

To preview locally, run `python -m http.server 4179` from the repository root and open `http://localhost:4179/`. The local static preview cannot submit the contact form to Vercel's `/api/contact` function.

The service and industry pages describe possible solutions. They do not claim completed client projects or results. Case studies cover Vixoria's own products only.

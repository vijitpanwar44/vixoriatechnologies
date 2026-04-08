# Vixoria Technologies Website

This is a static site. The fastest way to make it live is Netlify.

## What is already prepared

- Static hosting works directly from the repo root
- `netlify.toml` points Netlify at the correct publish directory
- The contact form is configured for Netlify Forms so submissions are captured after deployment

## Deploy on Netlify

1. Push this folder to a GitHub repository.
2. Sign in to Netlify and click `Add new site` -> `Import an existing project`.
3. Connect your GitHub account and select the repository.
4. Use these settings:
   - Build command: leave blank
   - Publish directory: `.`
5. Click `Deploy site`.

## Custom domain

After deployment:

1. Open the site in Netlify.
2. Go to `Domain management`.
3. Add your domain, for example `vixoriatech.com`.
4. Update your DNS records where the domain is registered using the values Netlify shows.

## Contact form submissions

Netlify will collect form submissions automatically once the deployed site has received its first real submission. You can view entries in:

`Netlify -> Site -> Forms`

# Light Work Exterior Services — Website

Single-page marketing site for Light Work Exterior Services (power washing, gutter cleaning, A/C condenser cleaning, lawn care, landscape design, yard cleanups) in Cedar Rapids, Iowa. Pure static HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html      — the whole site (SEO meta + JSON-LD schema in <head>)
css/style.css   — design tokens (brand palette from the logo) + all styles
js/main.js      — theme toggle, mobile nav, form validation, scroll reveals
assets/         — logo
404.html        — not-found page
_headers        — Cloudflare Pages cache/security headers
robots.txt / sitemap.xml — SEO
```

## Live site

Deployed as a git-connected Cloudflare Worker, auto-deploys on push to `main`:
https://lightwork.launchauxo.workers.dev/

## Before real launch — replace placeholders

All marked with a comment at the top of `index.html`:

- [x] **Phone** `(319) 423-9063` — in header, hero, quote section, FAQ, footer, and LocalBusiness JSON-LD
- [x] **Email** `Kijenkins@lightworkexteriorservicesll.onmicrosoft.com` — quote section, footer, JSON-LD, form action
- [x] **Domain** `lightworkexterior.com` — canonical, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`. DNS/Worker custom domain configured on the apex in Cloudflare (2026-08-31); add `www` as a second custom domain too if you want that variant to resolve.
- [ ] **Quote form** — wired to FormSubmit (`js/main.js` posts via fetch to FormSubmit's AJAX endpoint, action = FormSubmit with the real email above). FormSubmit emails a one-time confirmation link to that inbox on the *first* real submission — **Ki needs to click it**, or every submission before that is silently dropped.
- [ ] **Verify claims** — "fully insured" / "owner on every job" appear on the page and in FAQ schema; confirm they're accurate.
- [ ] **Photos** — Unsplash stock for now; swap in real job photos when available.

## After launch — local SEO checklist

1. **Google Business Profile** (biggest local-ranking lever) — create/claim it, category "Landscaper", link the site.
2. **Google Search Console** — verify the domain, submit `sitemap.xml`.
3. **Bing Places / Webmaster Tools** — same, takes 10 minutes.
4. Keep the business name, address, and phone (NAP) identical everywhere — site, Google, Facebook, Nextdoor, Yelp.
5. Ask early customers for Google reviews; reviews + photos move local rankings more than anything on-page.

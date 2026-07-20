# Light Work Exterior Services — Website

Single-page marketing site for Light Work Exterior Services, a landscaping company in Cedar Rapids, Iowa. Pure static HTML/CSS/JS — no build step, no dependencies.

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

## Local preview

```
python -m http.server 3111
# → http://localhost:3111/
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Settings: Framework preset **None**, build command **(leave empty)**, build output directory **/**.
4. Deploy. Add the custom domain under **Custom domains** once purchased.

## Before real launch — replace placeholders

All marked with a comment at the top of `index.html`:

- [ ] **Phone** `(319) 555-0148` — in header, hero, quote section, FAQ, footer, and LocalBusiness JSON-LD
- [ ] **Email** `quotes@lightworkexteriors.com` — quote section, footer, JSON-LD, form action
- [ ] **Domain** `lightworkexteriors.com` — canonical, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`
- [ ] **Quote form** — currently demo mode (shows success, sends nothing). Sign up at [formspree.io](https://formspree.io) or [formsubmit.co](https://formsubmit.co) with the business email, set the endpoint in the form `action`, then delete the `data-demo` attribute. See the comment above the `<form>` in `index.html`.
- [ ] **Verify claims** — "fully insured" / "owner on every job" appear on the page and in FAQ schema; confirm they're accurate.
- [ ] **Photos** — Unsplash stock for now; swap in real job photos when available.

## After launch — local SEO checklist

1. **Google Business Profile** (biggest local-ranking lever) — create/claim it, category "Landscaper", link the site.
2. **Google Search Console** — verify the domain, submit `sitemap.xml`.
3. **Bing Places / Webmaster Tools** — same, takes 10 minutes.
4. Keep the business name, address, and phone (NAP) identical everywhere — site, Google, Facebook, Nextdoor, Yelp.
5. Ask early customers for Google reviews; reviews + photos move local rankings more than anything on-page.

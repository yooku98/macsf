# MACSF — Website

Website for MACSF, a youth-led charity in Accra, Ghana that mentors, feeds and supports vulnerable children through Mentorship 101 and community outreach.

**Live demo:** https://yooku98.github.io/macsf/

## What's on the page

- Mission hero and impact story
- The four programs, including Mentorship 101
- Mentorship 101 photo gallery (coverflow carousel)
- Get-involved section: donate or volunteer via WhatsApp or email

## Stack

Static HTML, CSS and vanilla JavaScript. Fonts are self-hosted (`woff2`) rather than loaded from a CDN. No build step.

## Structure

```
index.html        Page markup
css/style.css     Styles
js/carousel.js    Gallery carousel
assets/fonts/     Self-hosted web fonts
public/           Logo, favicon and event photos
```

## Run locally

```bash
python3 -m http.server 8000
```

## Deployment

Served by GitHub Pages from the root of `main`.

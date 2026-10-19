# Art Visionary Pixel — AVP Studio Site

A responsive, static portfolio site for **Art Visionary Pixel (AVP)**, focused on cinematic dark fantasy, gothic, cosmic and donghua-inspired digital art.

## Structure

- `index.html` — one-page site, featured gallery, commissions, contact and lightbox
- `css/style.css` — layout, responsive styling and visual effects
- `js/main.js` — navigation, scroll reveals and gallery lightbox
- `assets/img/` — current header and featured gallery artwork
- `assets/fonts/` — self-hosted fonts
- `robots.txt` and `sitemap.xml` — search-engine files

## Run locally

No build step is required. Open `index.html`, or run a local server:

```bash
python3 -m http.server 8080
```

## Updating artwork

The live page references images in `assets/img/`. Keep those filenames unchanged when replacing artwork, or update the corresponding image paths in `index.html` and the social-sharing metadata in the document head.

Current featured images:
- `hero-main.jpg`
- `work-01-crimson-moon.jpg`
- `work-02-screaming-void.jpg`
- `work-03-phoenix-wide.jpg`
- `work-04-beyond-form.jpg`
- `work-05-black-beacon.jpg`
- `work-06-apex-in-the-rain.jpg`
- `work-07-from-above.jpg`

Keep the filenames and paths aligned with the HTML so the published gallery continues to load correctly.

# Art Visionary Pixel — AVP Studio Site

A responsive, static portfolio site for **Art Visionary Pixel (AVP)**, focused on cinematic dark fantasy, gothic, cosmic and donghua-inspired digital art.

## Structure

- `index.html` — one-page site, featured gallery, commissions, contact and lightbox
- `css/style.css` — layout, responsive styling and visual effects
- `js/main.js` — navigation, scroll reveals and gallery lightbox
- `assets/img/` — current header and featured gallery artwork
- `assets/fonts/` — self-hosted fonts
- `projects/` — project notes and production case studies
- `robots.txt` and `sitemap.xml` — search-engine files

## Featured motion study

**Crimson Dragon Awakening** is an AVP motion study exploring a colossal crimson Eastern dragon, ancient cultivation architecture, crimson spiritual energy and cinematic atmosphere.

- [Read the project notes, creative direction and Instagram publishing checklist](projects/crimson-dragon-awakening.md)
- Current cut: vertical cinematic fantasy short, 1080p MP4, 24 fps.
- The final video asset still needs to be uploaded to a stable public URL before it can be embedded directly on the live website.

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

Keep filenames and paths aligned with the HTML so the published gallery continues to load correctly.

## Publishing workflow

1. Upload final media to a stable public host or the repository's `assets/video/` directory.
2. Verify the media URL loads directly.
3. Add the video to the live portfolio with a poster frame, title, and accessible caption.
4. Test the website on desktop and mobile before sharing it publicly.

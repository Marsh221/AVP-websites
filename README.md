# Art Visionary Pixel — AVP Studio Site

Static one-page site for **Art Visionary Pixel (AVP)** — a cinematic digital-art
studio focused on dark fantasy, gothic, cosmic and donghua-inspired visual
storytelling.

Black / crimson visual identity · premium gallery aesthetic · fully responsive
(desktop + mobile).

## Structure

```
index.html          — single-page site (nav, hero, brand statement, featured
                      works gallery, studio, commissions, contact, footer, lightbox)
css/style.css       — design tokens + all styling (sections are labelled 1–13)
js/main.js          — sticky nav, mobile drawer, scroll reveal, gallery lightbox
assets/img/         — artwork (ALL CURRENT IMAGES ARE PLACEHOLDERS)
PLACEHOLDERS.md     — step-by-step guide for swapping in real portfolio pieces
```

## Run locally

No build step. Either open `index.html` directly, or serve the folder:

```bash
npx serve .        # or: python3 -m http.server 8080
```

## Editing notes

- **Artwork** — every image and project title is an intentional placeholder.
  See `PLACEHOLDERS.md` for the swap checklist.
- **Commission status** — presented as *closed* with a waitlist note; there are
  deliberately no invented client counts, booking forms or fake social proof.
- **Positioning** — AVP is described everywhere as a *cinematic digital-art
  studio*; no wording implies traditional painting.
- **Brand statement** — the old statistics strip ("240+ Works / 7 yrs Painting /
  30+ Clients") was replaced by a quiet full-width brand statement.

## Image credits

All images in `assets/img/` are AI-generated stand-ins created purely to demo
the layout. Replace them with your own licensed portfolio artwork before
publishing.

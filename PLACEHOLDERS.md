# Replacing the Placeholder Artwork

Everything visual in this gallery is a **stand-in**. All artwork, titles, tags
and alt text are meant to be swapped for your real portfolio pieces.

## Where things live

| Item | File / location |
|---|---|
| Hero artwork | `assets/img/hero-main.jpg` |
| Work 01 — “The Ashen Crown” | `assets/img/work-01-ashen-crown.jpg` |
| Work 02 — “Cathedral of Quiet Embers” | `assets/img/work-02-cathedral.jpg` |
| Work 03 — “The Devourer of Stars” | `assets/img/work-03-devourer.jpg` |
| Work 04 — “Moonlit Sword Saint” | `assets/img/work-04-sword-saint.jpg` |
| Work 05 — “Wraith of the Black Orchard” | `assets/img/work-05-black-orchard.jpg` |
| Placeholder email | `index.html` → `hello@artvisionarypixel.example` |
| Social links (ArtStation / Instagram / X) | `index.html` → footer “Elsewhere” column |

## Swapping a piece (per work)

1. Drop your image into `assets/img/` using the same naming pattern, e.g.
   `work-05-your-title.jpg`. Tip: export around 1600–2000 px on the long edge,
   JPG quality ~80.
2. In `index.html`, find that work’s block (each one is marked
   `░░ WORK 0X — REPLACE ME ░░` with a comment above it).
3. Update:
   - `<img src="assets/img/...">` → your file
   - `alt` → describe your real artwork
   - `<h3 class="work-title">` → your title
   - `<span class="work-kind">` → its category (e.g. `Dark Fantasy · Character`)
   - the `data-title` attribute on the `<figure>` (used by the lightbox caption)
4. Delete the `<span class="placeholder-flag">Replace Me</span>` line and the
   `<p class="work-note">` line for that piece — those are only placeholder cues.
5. Update the caption text inside the figure — the lightbox reuses it
   automatically.

## Layout roles (keep art dominant)

The gallery is built from three row types inside `.works-grid`:

- `.works-row` — a pair: `.work-tall` (dominant 7fr slot) + `.work-lean`
  (5fr companion slot). Frames share one height so bottoms always align.
- `.works-row.flip` — the mirrored pair (lean slot first, tall slot second).
- `.work-wide` — full-width cinematic slot for wide key art (21:9 crop).

Current rhythm: **pair → wide → flipped pair** (5 pieces). Add a new work by
copying any `figure.work` block into a row — or add a whole new
`<div class="works-row">` with two figures. Grid, hover treatment and the
lightbox pick it up automatically. Portrait crops suit the tall/lean slots;
wide landscape art suits `.work-wide`.

## Also replace when ready

- Favicon (currently an inline SVG monogram in `<head>`)
- `mailto:` placeholder address in the Contact section
- Social links in the footer (currently `href="#"`)

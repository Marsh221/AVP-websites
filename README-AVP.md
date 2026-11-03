# Art Visionary Pixel — Storefront

This is a rebranded Next.js storefront starter for **Art Visionary Pixel (AVP)**.

## Important before publishing

This package is a customized starter, not a finished live-commerce system.

- The product catalogue still contains starter/demo artwork images, sample descriptions, and placeholder prices. Replace these with your own approved artwork, titles, descriptions, and real prices before you promote the shop.
- The checkout currently creates a **demo order only**. It does not process payments. Do not accept real orders until a payment provider and order fulfilment workflow are connected.
- The review section contains sample starter reviews. Remove them or replace them with genuine customer reviews before launch.
- The newsletter endpoint currently needs a database. Connect a PostgreSQL database and configure `DATABASE_URL`.
- Add your actual contact email, Instagram/Pinterest links, terms, privacy policy, delivery policy and refund policy before launch.

## Recommended free hosting: Vercel + Neon

### 1. Put the project on GitHub

1. Extract this ZIP on your computer.
2. Create a new GitHub repository, e.g. `avp-storefront`.
3. Upload the **contents** of this folder to the repository (not the ZIP file itself).
4. Commit the files to the `main` branch.

### 2. Create a PostgreSQL database

1. Create a free project at https://neon.tech/
2. Copy its PostgreSQL connection string.
3. In the project root, copy `.env.example` to `.env.local`.
4. Replace the sample `DATABASE_URL` with your Neon connection string.
5. Keep `.env.local` private. Never upload it to GitHub or share it publicly.
6. In PowerShell from the project folder, run `npm run db:push` once to create the required tables in Neon.

### 3. Deploy on Vercel

1. Sign in at https://vercel.com/ using GitHub.
2. Choose **Add New → Project** and import `avp-storefront`.
3. Framework should be detected as **Next.js**.
4. In **Environment Variables**, add `DATABASE_URL` with the Neon connection string.
5. Deploy. Vercel will build the site and give you a public `*.vercel.app` address.
6. For later updates, push commits to GitHub; Vercel will redeploy automatically.

### 4. Optional custom domain

In Vercel, open your project → **Settings → Domains** and add a domain you own. Follow Vercel's DNS instructions at your domain registrar.

## Run locally on Windows

Install Node.js LTS from https://nodejs.org/ and Git from https://git-scm.com/.

In PowerShell, open the project folder and run:

```powershell
npm install
Copy-Item .env.example .env.local
# Edit .env.local and add your real DATABASE_URL
npm run db:push
npm run dev
```

Open `http://localhost:3000`.

To check the project before deploying:

```powershell
npm run typecheck
npm run build
```

## AVP brand details currently applied

- Brand: Art Visionary Pixel
- Positioning: mystical, cinematic digital art; cosmic worlds, symbolism, shadow and ascension
- Instagram handle: `@art._visionary`
- Known artwork/product reference: **Eclipse Guardian: Shadows of the Shattered Void**
- Currency display: Kenyan shillings (KES)

## What still needs your input

1. Your actual artwork image files for each product.
2. Real prices and what each product includes (download, print, licence, etc.).
3. The Gumroad or other payment/product links you want to use, or the payment provider you want integrated.
4. Your preferred public contact email and any additional social links.

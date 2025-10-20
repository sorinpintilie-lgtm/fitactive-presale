# FitActive Vitan — Next.js 14 + Tailwind Presale One‑Pager

## Quick start
```bash
# 1) Unzip, then install deps
npm i

# 2) Run dev
npm run dev

# App will be on http://localhost:3000/
```

## Where to edit
- `components/FitActivePresale.tsx` — main landing component
- `app/page.tsx` — renders the component
- `app/globals.css` — Tailwind + brand variables
- `components/FitActivePresale.tsx` has:
  - `CHECKOUT_URL` for your Netopia/checkout link
  - Countdown end date: `2025-10-31T21:00:00+03:00`
  - Brand colors via CSS vars (`--brand`, `--brand-dark`)

## Production build
```bash
npm run build
npm start
```

## Notes
- This is App Router (Next 14) and Tailwind 3.4.
- If you need a classic `pages/` router instead, tell me and I’ll export that variant.

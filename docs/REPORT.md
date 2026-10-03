# LAPORAN AKHIR — Melly's Garden

Tanggal: 2026-10-03 · Semua tugas BUILD.md §8 selesai (0–10).

## 1. Ringkasan file dan arsitektur

**Stack:** Vite 8 + React 19 + `motion` 14, JSX murni (tanpa TypeScript/Tailwind) — fallback BUILD.md §2 karena Next.js/swc berisiko gagal di Termux+proot. Font self-host via `@fontsource` (Anton + DM Sans), ikon `@phosphor-icons/react`. Total source ±2.800 baris.

| Path | Isi |
|---|---|
| `index.html` | Shell + meta SEO/og + JSON-LD `BarOrPub` + preload poster hero |
| `src/main.jsx` | Bootstrap React |
| `src/App.jsx` | Komposisi 12 komponen satu halaman + state modal video |
| `src/components/` | Header, Hero, Garden, Spaces, Food, LiveMusic, Gallery, Rating, Visit, Footer, MusicPlayer, OpeningModal — masing-masing dengan `.css` sendiri |
| `src/components/Overlay.jsx` | Dasar modal bersama: portal, scroll-lock, `inert` sibling, Escape/klik-latar/`[data-close]`, fokus simpan-pulih |
| `src/components/Reveal.jsx` | Scroll reveal di atas motion (`useInView`, opacity+translateY, once); reduced-motion → tanpa animasi |
| `src/data/site.js` | Satu-sumber data: kontak, jam, area, menu foto, poster, galeri, rating |
| `src/hooks.js` | `useReducedMotion`, `useTodayDow` (waktu Jakarta), `pauseBackgroundMusic` (event window, tanpa mengangkat state audio) |
| `src/styles/tokens.css` | Token tema: `--ink` #080807 + permukaan gelap, oranye brand `#EF6524` (diukur dari logo), glow, kill-switch reduced-motion global |
| `scripts/optimize.sh` | Pipeline aset: `assets-source/` → `public/assets/` (WebP srcset, mp4, mp3, favicon) |
| `public/assets/` | 33 MB aset teroptimasi (84 WebP, video 10 MB, mp3 8,3 MB, poster, logo) |
| `docs/` | PROGRESS, AUDIT, CONTENT_CONFLICTS, ASSETS_NEEDED, QA_CHECKLIST, REPORT ini |

**Pola penting:**
- Aturan "Server Components / `use client`" tidak berlaku: ini Vite SPA statis, bukan Next — tidak ada directive client; komponen hanya interaktif bila memang perlu (modal, tab, player).
- Animasi hanya `transform`/`opacity`; seluruh motion menghormati `prefers-reduced-motion` (guard per komponen + kill-switch CSS global).
- Video opening (`opening-full.mp4`, 8,7 MB) hanya di-mount saat modal dibuka (`preload="none"`) → tidak membebani load awal.
- Data tak terverifikasi TIDAK dikarang: harga menu, nama band, dan ulasan asli tidak ditampilkan; rating tampil dengan label sumber + "±"; konflik di `docs/CONTENT_CONFLICTS.md`.
- Aksesibilitas: skip-link, tablist aksesibel (LiveMusic + filter Galeri: roving tabIndex, Arrow/Home/End), lightbox (keyboard + swipe), tombol ≥44 px, `lang="id"` pada teks Indonesia, alt semua foto.

## 2. Hasil build

`npm run build` **LOLOS** — ✓ built in **7.17 s** (Node v22).

| Artefak | Ukuran | gzip |
|---|---|---|
| `index-*.js` (React+motion+ikon) | 428,65 kB | **133,45 kB** |
| `index-*.css` | 24,24 kB | **5,34 kB** |
| Total `dist/` (termasuk salinan `public/assets/`) | ±34 MB | — |

Rincian `dist/` (aset served on-demand, bukan beban awal): video 9,6 MB · mp3 8,3 MB · WebP 7,4 MB (84 file) · JPG fallback 7,2 MB · font 0,4 MB · HTML 2,4 kB.

Beban first paint: HTML 2,4 kB + CSS 5,34 kB gzip + JS 133,45 kB gzip + poster hero WebP 60 kB (sudah di-`preload`; LCP element). Hero loop mp4 1,2 MB autoplay non-audio, lazy-by-attribute poster.

Verifikasi responsif: `vite preview` (semua asset 200, hash cocok) + review statis breakpoint 860/900/620 pada 375/768/1440 — Playwright/Chromium tidak dapat dipasang di proot. QA manual di perangkat: `docs/QA_CHECKLIST.md`.

## 3. Cara menjalankan

```bash
npm install          # Node ≥ 20 (dev environment: v22)
npm run dev          # http://localhost:5173 (host: true — bisa dibuka dari HP lain di jaringan)
npm run build        # hasil ke dist/
npm run preview      # sajikan dist/ produksi (setara "npm start" pada BUILD.md §9)
```

### Deploy Vercel

1. **Via dashboard (disarankan):** push repo ke GitHub → vercel.com → *Add New Project* → import. Vite terdeteksi otomatis: Build `npm run build`, Output `dist`.
2. **Via CLI:** `npm i -g vercel` (global, bukan dependency proyek) → `vercel` di folder ini → accept preset Vite → `vercel --prod`.
3. **Setelah live di domain `*.vercel.app`** (BUILD.md §33): `index.html` sudah berisi `<meta name="robots" content="noindex,nofollow">` — biarkan sampai domain final.
4. **Saat domain final ada** (mis. `mellysgarden.id`): ganti `og:image` URL absolut (ada penanda `TODO_VERIFY` di `index.html:16-17`), lalu ganti robots → `index,follow`, dan daftarkan di Google Search Console. Deploy ulang.

## 4. Status konten & tindak lanjut pemilik

- `docs/ASSETS_NEEDED.md`: aset §5 BUILD.md **lengkap**, tidak ada placeholder di build.
- Menunggu: hasil QA manual (`docs/QA_CHECKLIST.md` di 375/768/1440 + perangkat nyata). Temuan → perbaiki sebelum domain final.
- Bila pemilik kirim: harga menu, nama band per hari, teks ulasan → tinggal tambah ke `src/data/site.js` + tampilkan (slot sudah dipikirkan, tanpa mengarang sekarang).

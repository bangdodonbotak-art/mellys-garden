# AUDIT — Aset & Repo (Phase 1, 2026-10-03)

## Keputusan stack

- **Vite + React 19 + TS-less JSX + `motion`** — scaffold Vite sudah ada di commit awal;
  Next.js di proot Android berisiko gagal swc/turbopack dan belum ada jejak install.
  BUILD.md mengizinkan fallback ini. Catatan: aturan "Server Components" jadi N/A —
  digantikan komponen `.jsx` + `data/site.js`.
- Dependensi terpasang: react, react-dom, motion 14, @phosphor-icons/react,
  @fontsource/anton, @fontsource/dm-sans. Tidak perlu install baru.
- `index-1.html` = referensi struktur/salus, bukan sumber warna (lihat KONFLIK).

## Inventaris aset (semua ada, tidak ada yang kurang)

| Kelompok | Lokasi | Jumlah | Dimensi | Ukuran |
|---|---|---|---|---|
| Logo | `assets-source/photos/files/` = `assets/logo/` | 1 | 1254×1254 PNG | 1.1 MB |
| Gallery (5 area) | `assets/gallery/` → `public/assets/gallery/` | 24 (garden 4, terrace 5, lounge 5, corner 5, warkop 5) | 768×1376 | 4.7 MB |
| Drinks | `assets/drinks/` | 10 | 768×1376 | 1.2 MB |
| Poster band | `assets/bands/` | 7 (monday–sunday) | 810×1441 | 1.5 MB |
| Musik | `assets/music/` | 2 MP3 @192kbps (239 dtk / 283 dtk) | — | 13 MB total |
| Video | `assets/video/` | hero-loop 10.4 dtk h264 720×1280 1.2 MB; opening-full 51.7 dtk h264 720×1280 8.4 MB; hero-poster 720×1280 | — | 9.7 MB |

`assets/` dan `public/assets/` identik (copy serving). Sumber asli di `assets-source/` (gitignored) tetap utuh.

## Warna oranye (diukur dari logo, bukan ditebak)

`magick logo.png -colors 6 -unique-colors` → cluster oranye: `#E45604` (dominan) dan `#FCA537` (lampu/higlight).
Brief BUILD.md pin `#EF6524` — konsisten dengan hasil ukur. **Pakai `#EF6524`**.
`index-1.html` memakai `#ff641f` — SIMPAN DI KONFLIK, ditolak.

## Hasil Tugas 1 (selesai, via `scripts/optimize.sh`)

- 41 foto + hero-poster → WebP q80 lebar asli + `@480.webp` (480w q75) untuk srcset. JPG asli di `public/` tetap ada sebagai fallback `<img>`/poster.
- Logo: varian 512 PNG+WebP, apple-touch 180, favicon-32 di `public/assets/logo/`; PNG 1254 dihapus dari public (sumber aman di `assets/logo/`).
- Musik: 128 kbps + loudnorm −16 LUFS, total 12.2→8.3 MB.
- Video: tidak diubah. Total `public/assets` 33 MB (±20 MB WebP+varian baru).

## Referensi struktur dari index-1.html

Section, data band 7 hari (nama = label hari, tanpa mengarang nama band), filter galeri per area,
lightbox, pemutar musik, modal video opening, JSON-LD BarOrPub, WA deeplink + teks pesan.
Aksesibilitas yang sudah ada di sana (skip link, focus-visible, inert modal, reduced-motion) dipertahankan di build baru.

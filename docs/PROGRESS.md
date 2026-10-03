# PROGRESS

Brief sebenarnya = `BUILD.md` (§8 STATUS = sumber kebenaran centang tugas).
File ini hanya ringkasan + keputusan + berikutnya. Keputusan detail: `docs/AUDIT.md`, `docs/CONTENT_CONFLICTS.md`.

## Status (2026-10-03)

Selesai: Tugas 0 (audit) · 1 (optimasi aset) · 2 (scaffold Vite+React+motion, `src/data/site.js`, token tema) · 3 (Hero + nav + pemutar musik) · 4 (Suasana/Garden + 5 kartu Area, scroll reveal + parallax + glow) — `npm run build` lolos.

## Keputusan

- Vite + React + motion (JSX, tanpa TS/Tailwind) — fallback §2 BUILD.md; Next berisiko di proot.
- Oranye `#EF6524` (diukur dari logo; `index-1.html` #ff641f ditolak).
- Tanpa Tailwind/TS: token CSS manual + `@fontsource` sudah cukup; hindari dependency baru (§CLAUDE.md).
- Video hero autoplay hanya jika tidak reduced-motion dan tidak saveData/2g.
- Nama band tidak dibaca dari poster → tab hanya label hari.
- Tema Tugas 4: dark black (`--ink #080807` + permukaan #101010/#1b1a18) dengan token glow oranye (`--glow/--glow-soft/--neon-text`, semua diturunkan dari #EF6524).
- `Reveal.jsx` ditulis ulang di atas motion (`useInView`, opacity+translateY, once, transisi 0.7s easeOut); reduced-motion → render tanpa animasi. Blok CSS `.reveal` lama retired.
- Copy Garden + kartu Garden/Terrace/Lounge salin verbatim dari `index-1.html`; judul Corner/Warkop ditulis dari yang terlihat di foto (corner_03 lampu tali, warkop_03 seduh manual) — sesuai §4 BUILD.md, tanpa klaim baru.
- Foto kartu: garden_03 / terrace_02 / lounge_03 / corner_03 / warkop_03 (srcset 480w+768w webp, width/height 768×1376, lazy, alt "<Area> at Melly's Garden").

## Berikutnya

Tugas 5 — Foods & Drinks + Live Music (7 poster, tab hari). Lalu 6→7, 8 polish, 9 uji 375/768/1440, 10 laporan akhir.

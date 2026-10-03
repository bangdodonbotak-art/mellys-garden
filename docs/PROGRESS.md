# PROGRESS

Brief sebenarnya = `BUILD.md` (§8 STATUS = sumber kebenaran centang tugas).
File ini hanya ringkasan + keputusan + berikutnya. Keputusan detail: `docs/AUDIT.md`, `docs/CONTENT_CONFLICTS.md`.

## Status (2026-10-03)

Selesai: Tugas 0 (audit) · 1 (optimasi aset) · 2 (scaffold Vite+React+motion, `src/data/site.js`, token tema) · 3 (Hero + nav + pemutar musik) — `npm run build` lolos, preview 200 untuk semua aset.

## Keputusan

- Vite + React + motion (JSX, tanpa TS/Tailwind) — fallback §2 BUILD.md; Next berisiko di proot.
- Oranye `#EF6524` (diukur dari logo; `index-1.html` #ff641f ditolak).
- Tanpa Tailwind/TS: token CSS manual + `@fontsource` sudah cukup; hindari dependency baru (§CLAUDE.md).
- Video hero autoplay hanya jika tidak reduced-motion dan tidak saveData/2g.
- Nama band tidak dibaca dari poster → tab hanya label hari.

## Berikutnya

Tugas 4 — Suasana/The Garden + Area (5 kartu, motion scroll). Lalu 5→7, 8 polish, 9 uji 375/768/1440, 10 laporan akhir.

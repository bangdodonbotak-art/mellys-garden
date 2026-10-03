# PROGRESS

Brief sebenarnya = `BUILD.md` (§8 STATUS = sumber kebenaran centang tugas).
File ini hanya ringkasan + keputusan + berikutnya. Keputusan detail: `docs/AUDIT.md`, `docs/CONTENT_CONFLICTS.md`.

## Status (2026-10-03)

Selesai: Tugas 0 (audit) · 1 (optimasi aset) · 2 (scaffold Vite+React+motion, `src/data/site.js`, token tema) · 3 (Hero + nav + pemutar musik) · 4 (Suasana/Garden + 5 kartu Area, scroll reveal + parallax + glow) · 5 (Foods & Drinks 10 foto rak bleed + Live Music 7 poster dengan tab hari) — `npm run build` lolos.

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
- Tugas 5 penomoran section: Food = "03 / The table", Live Music = "04 / The lineup" (melanjutkan 01/02 Garden/Spaces; salin dari index-1.html).
- Food: rak foto bleed ke tepi kanan (satu-satunya section keluar grid), gulir horizontal (`overflow-x:auto`, `tabIndex=0` + `role=group` agar bisa diakses keyboard), tile selang-seling `translateY` (irama lampu gantung) + glow counter oranye di bawah; alt generik "Food and drink at Melly's Garden, photo NN" — tanpa nama/harga menu (§CLAUDE.md; CTA "Ask the menu" → WA + IG @mellysgarden).
- Live Music: tab aksesibel (role=tablist/tab/tabpanel, roving tabIndex, Arrow/Home/End, aria-selected/controls); label hari tetap Indonesia Senin–Minggu (keputusan CONTENT_CONFLICTS), teks UI lain bahasa Inggris (page `lang="en"`); "hari ini" disorot via `useTodayDow()` (waktu Jakarta) — titik amber + sr-only "(today)"; poster ditampilkan UTUH (`height:auto`, rasio asli 810/1441, TIDAK di-crop), transisi fade+slide 0.35s (dinihilkan saat reduced-motion).
- Copy Live Music verbatim index-1.html: "Every night. One garden." / "Select a day to open its live music poster. Band names and times follow the poster." / "Posters by day, Monday to Sunday. Today is highlighted."

## Berikutnya

Tugas 6 — Galeri lightbox/filter + modal video. Lalu 7 (Rating + Reservasi/Kontak/Lokasi + footer + JSON-LD), 8 polish, 9 uji 375/768/1440, 10 laporan akhir. Catatan QA visual manual masih menumpuk dari Tugas 3–5 (Playwright tak tersedia).

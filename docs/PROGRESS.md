# PROGRESS

Brief sebenarnya = `BUILD.md` (§8 STATUS = sumber kebenaran centang tugas).
File ini hanya ringkasan + keputusan + berikutnya. Keputusan detail: `docs/AUDIT.md`, `docs/CONTENT_CONFLICTS.md`.

## Status (2026-10-03)

Selesai: Tugas 0 (audit) · 1 (optimasi aset) · 2 (scaffold Vite+React+motion, `src/data/site.js`, token tema) · 3 (Hero + nav + pemutar musik) · 4 (Suasana/Garden + 5 kartu Area, scroll reveal + parallax + glow) · 5 (Foods & Drinks 10 foto rak bleed + Live Music 7 poster dengan tab hari) · 6 (Galeri masonry 24 foto + filter area + lightbox + modal video opening) · 7 (Rating + Visit/reservasi/kontak/lokasi + Footer + JSON-LD BarOrPub) · 8 (polish motion/a11y/perf) — `npm run build` lolos.

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
- Tugas 6 `Overlay.jsx` = dasar modal bersama (portal ke body, scroll lock, sibling `inert`, Escape + klik latar + `[data-close]`, fokus simpan/pulih). z-index 100: di atas Header 90 / MusicPlayer 95, di bawah skip-link 200 (tak terfokus saat modal buka karena sibling inert).
- Galeri: masonry CSS `column-count` 3→2 (≤900px), gap menyusut ≤620px; 24 foto disusun SILING antar area (garden_01, terrace_01, …) seperti referensi agar kolom tercampur; label area pendek (Garden/Terrace/…) di chip/alt/caption — bukan `areas[].label` "The Garden", mengikuti index-1.html.
- Filter area = tablist aksesibel (pola LiveMusic diulang): All + 5 area, roving tabIndex, Arrow/Home/End, `aria-controls="gal-grid"` → satu `role="tabpanel"`; tanpa tabIndex di panel (tab fokus ikut seleksi, sama dengan LiveMusic).
- Lightbox berjalan atas daftar TERFILTER (prev/next/swipe tak melompat ke foto tersembunyi), wrap-around, panah keyboard, sapuan jari |dx|>45px, caption "Area · n / total", guard indeks di-clamp saat filter diperkecil while open; tiap ganti foto fade (key=src).
- Modal video opening: `<video>` hanya ter-mount saat modal buka → opening-full.mp4 (8.7MB) tidak di-download saat load; `preload="none"` + poster webp hero; `play().catch(()=>{})` aman (dipicu klik user, bukan autoplay otomatis); musik latar dipause via event window `mellys:pause-music` (`pauseBackgroundMusic()` di hooks.js) tanpa mengangkat state audio ke App.
- Nama band tidak dibaca dari poster → caption lightbox & alt hanya label area (selaras aturan CONTENT_CONFLICTS).
- Tugas 7 penomoran eyebrow: Rating = "06 / The verdict", Visit = "07 / Visit" (melanjutkan 01–05). Latar berselang: Gallery `--ink` → Rating `--ink-2` → Visit `--ink` → Footer `--ink` + border-top halus.
- Rating: angka dari `data/site.js` (`±4.5` Google, `4.0` Tripadvisor) tampil apa adanya beserta label sumber + "±"; bintang (phosphor `Star`/`StarHalf`, `--amber`) hanya dekorasi `aria-hidden` dengan sr-only "Rated X on Y" per kartu — tidak membulatkan/mengarang.
- Visit (`id="reserve"`, sesuai nav): `<address>` semantik berisi alamat + tautan Maps nyata (`contact.mapsUrl`), jam (en + id), WA, telepon (`tel:`) — ikon phosphor seragam 20px; "map art" dari referensi dihapus karena tak dapat diverifikasi. Kartu CTA kanan: Reserve via WhatsApp + Call.
- Footer: nama + tagline + nav (`data nav`) + sosial IG/TikTok/WA (aria-label, rel noopener noreferrer) + © tahun dinamis.
- JSON-LD `BarOrPub` di `index.html` dari data §3 BUILD.md: nama, alamat lengkap, telepon, `openingHoursSpecification` 06:00 semua hari, `sameAs` IG+TikTok. TANPA `aggregateRating` — nilai aproksimasi "±" dan jumlah review tak terverifikasi (§CLAUDE.md: jangan mengarang review/klaim).
- Ikon phosphor yang benar: `WhatsappLogo`, `InstagramLogo`, `TiktokLogo`, `MapPinLine` (bukan `WhatsApp`/`MapPin`).
- Tugas 8 performa: `@fontsource/dm-sans` impor eksplisit 400/500/600/700 (index.css hanya ships 400; kode pakai 500–700 → bold sintetis browser). Tanpa dependency baru.
- Tugas 8 LCP: `<link rel="preload" as="image" href="/assets/video/hero-poster.webp">` (poster 60KB = elemen terbesar first paint); `theme-color` disamakan `--ink` #080807; og:image URL absolut + komentar `TODO_VERIFY` domain final (robot `noindex,nofollow` tetap sampai domain nyata — BUILD.md §33).
- Tugas 8 reduced-motion: kill-switch global di tokens.css (`*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important }` — bukan `0`, agar event *end tetap fired; guard per-file dipertahankan sebagai lapis pertama). Komponen motion JS sudah pakai `useReducedMotion`; tidak ada listener transitionend/animationend di kodebase → aman.
- Tugas 8 a11y: `.mp-mute` 36→44px (hapus override, ikut rule `.mp-toggle,.mp-mute` 44px); `lang="id"` pada label hari Senin–Minggu (LiveMusic tab) dan `hours.id` (Visit) — halaman `lang="en"`, pengucapan screen reader benar. Fokus & skip-link & alt & kontras (audit): sudah lolos, tanpa perubahan.
- Tugas 8 motion Hero: entrance satu blok → stagger ringan via motion variants parent (`staggerChildren 0.09, delayChildren 0.1`) + children (opacity + y20, 0.7s easeOut, transform/opacity saja); `reduced` → prop variants dihilangkan total (render langsung, tanpa animasi).

## Berikutnya

Tugas 9 — `npm run build` + uji responsif 375/768/1440 + perbaikan. Lalu 10 laporan akhir. Catatan QA visual manual masih menumpuk dari Tugas 3–8 (Playwright tak tersedia) → rangkum jadi checklist manual untuk user.

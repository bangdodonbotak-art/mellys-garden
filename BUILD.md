# BUILD.md — Melly's Garden (satu file brief + status)

> Mulai dari bagian 8 (STATUS). Kerjakan satu tugas yang belum dicentang, commit, update STATUS, lalu berhenti.

## 1. Tugas

Bangun website baru Melly's Garden dengan kualitas premium setara proyek $10.000: desain orisinal, sinematik, immersive, elegan, interaktif, responsif.

- `index-1.html` jadi referensi struktur dan info.
- Pakai aset asli di `assets/` dan `assets-source/`, semuanya tetap utuh.
- Manfaatkan kemampuan terbaik Claude Code, paket `motion` (`import { motion } from "motion/react"`), UI UX Pro Max, dan 21st.dev bila tersedia dan relevan.
- Pilih arsitektur terbaik sesuai kondisi project, instal dependensi sendiri.
- Optimalkan performa, aksesibilitas, dan pengalaman mobile.
- Implementasikan menyeluruh: `npm run build` (production), uji fungsi dan responsivitas (375, 768, 1440 px), perbaiki error, lalu laporkan hasil dan cara menjalankan.

## 2. Stack

Default: Next.js (App Router) + TypeScript + Tailwind + `motion`.
Jika swc/turbopack error di proot: `npm run dev -- --webpack`. Jika tetap gagal: Vite + React + TS + Tailwind + `motion`.
Satu halaman bersambung, komponen per section di `components/`, semua data di `data/site.ts`.

## 3. Data resmi

- Nama: Melly's Garden
- Alamat: Jl. Kebon Sirih Timur Dalam No. 37-39, Kebon Sirih, Menteng, Jakarta Pusat 10340
- WhatsApp/reservasi: 081316044666 → `https://wa.me/6281316044666`
- Telepon: (021) 31925138
- Instagram: @mellysgarden — TikTok: @mellysgardenjakarta
- Jam: "Buka setiap hari mulai 06:00 — Until you are happy" (ID: "Sampai kamu bahagia")
- Live music setiap malam
- Rating dengan label sumber: Google sekitar 4.5, Tripadvisor 4.0 (simpan di config `reviews`)
- Brand: oranye `#EF6524` (teks gelap di atas tombol oranye), hijau botani gelap, kayu, lampu anyaman hangat
- Selama domain `vercel.app`: `<meta name="robots" content="noindex,nofollow">`

## 4. Isi konten

- Teks ditulis dari data bagian 3 dan dari apa yang terlihat di foto.
- Foods & Drinks: galeri foto dengan judul "Foods & Drinks" dan tombol ke @mellysgarden.
- Live Music: 7 poster band tampil sebagai gambar utuh, dipilih lewat tab Senin–Minggu.
- Musik: dua lagu buatan pemilik, pemutar manual dengan tombol play/pause.
- Foto dan video ditampilkan apa adanya sebagai karya Melly's Garden.
- Fokus cerita pada suasana: taman, kayu, lampu hangat, musik, makanan, minuman, teman.
- Kontak dan reservasi lewat WhatsApp, telepon, dan Instagram.

## 5. Aset

Detail: `docs/ASSETS.md`.

- Logo terbaru: `mellys-garden-logo.png` di `assets/` atau `assets-source/` (`find assets assets-source -iname 'mellys-garden-logo*'`). Buat favicon dan versi 512 px.
- Video opening: file `.mp4` di `assets/` (`find assets -iname '*.mp4'`). Siapkan `hero-loop.mp4` (15 dtk, 540x960, tanpa suara, 2-4 MB), `opening-full.mp4` (8-15 MB, diputar setelah klik), `hero-poster.jpg`. Di layar lebar tampil sebagai panel vertikal di tengah dengan latar blur.
- Foto: the-garden 4, the-terrace 5, the-lounge 5, the-corner 5, warkop 5, foods-drinks 10.
- Poster band: `monday_band.jpg` … `sunday_band.jpg`.
- Musik: `mellys-chillout-lounge-01/02.mp3`, 128 kbps, judul "Chillout Lounge 01/02".
- Optimasi: nama file huruf kecil tanpa spasi; WebP 480/960/1440 (q~78); `width`/`height`; lazy kecuali hero.
- Metadata aset lewat `identify`, PIL, `ffprobe`.

## 6. Section (urutan)

1. Hero sinematik: video loop + poster, logo, CTA WhatsApp dan Instagram
2. Suasana / The Garden
3. Area: Garden, Terrace, Lounge, Corner, Warkop (motion scroll)
4. Foods & Drinks
5. Live Music: poster 7 hari
6. Galeri + lightbox dan filter area
7. Video opening (modal)
8. Rating
9. Reservasi, kontak, lokasi, jam
10. Footer (IG, TikTok)

Tambahan: pemutar musik, nav responsif, JSON-LD BarOrPub dari data bagian 3.

Kualitas: animasi `motion/react` (scroll reveal, parallax halus, transisi), `prefers-reduced-motion`, kontras AA, fokus terlihat, alt teks, tombol ≥44 px, tanpa horizontal scroll, LCP cepat.

## 7. Cara kerja hemat konteks

- Satu sesi satu tugas; selesai → commit, update STATUS, `/clear`.
- Baca maksimal 2 file sebelum menulis; output panjang dengan `| tail -n 20`.
- MCP: 21st saat membangun UI, context7 untuk cek API, playwright/chrome untuk QA.
- Kunci API disimpan di env.

## 8. STATUS

- [x] 0. Audit aset (metadata, path logo terbaru dan video) → `docs/AUDIT.md`
- [x] 1. Optimasi aset (video, foto WebP, musik, favicon) → `public/`
- [x] 2. Scaffold (Vite+React+motion, fallback §2; `src/data/site.js`, token tema, shell)
- [x] 3. Hero + nav + pemutar musik
- [x] 4. Suasana + Area
- [x] 5. Foods & Drinks + Live Music
- [x] 6. Galeri lightbox/filter + modal video
- [x] 7. Rating + Reservasi/Kontak/Lokasi + footer + JSON-LD
- [x] 8. Polish motion, aksesibilitas, performa
- [x] 9. `npm run build` + uji 375/768/1440 + perbaikan
- [ ] 10. Laporan akhir

Catatan sesi terakhir: (maks 3 baris)
- Tugas 9: Playwright tetap tak tersedia (binary Chromium tak ter-install, `install` menggantung di proot) → uji responsif via review statis breakpoint (375/768/1440) + `vite preview` (html/js/css → 200). Temuan diperbaiki: `.mp-meta{display:none}` ≤900px menyembunyikan pemilih trek → kini hanya `.mp-title` yang hidden, `select` tetap tersentuh (pill ~262px, muat di 375).
- Build lolos (10.16s; CSS 24.24 kB gzip 5.34; JS 428.65 kB gzip 133.45). Checklist QA manual: `docs/QA_CHECKLIST.md`. Berikutnya: Tugas 10.

## 9. Laporan akhir

1. Ringkasan file dan arsitektur
2. Hasil build (status, ukuran)
3. Cara menjalankan (`npm install`, `npm run dev`, `npm run build && npm start`, deploy Vercel)

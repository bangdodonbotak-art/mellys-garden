# Checklist QA Manual — Tugas 9

Playwright/Chrome tidak tersedia di lingkungan (proot). Jalankan `npm run preview` (sajikan `dist/`, sudah terverifikasi: html/js/css → HTTP 200), buka di browser + DevTools device toolbar, centang tiap baris.

## Lebar 375 (iPhone SE / kecil)

- [ ] Tidak ada horizontal scroll halaman di section mana pun (rak Food boleh scroll horizontal internal saja).
- [ ] Hero: judul clamp 3.4rem tidak terpotong; CTA WhatsApp + Instagram wrap rapi; video loop mengisi panel penuh.
- [ ] Nav: tombol hamburger muncul (<900px), menu drop-down menutup saat link diklik / Escape / scrim.
- [ ] Pemutar musik (kiri bawah): pill muat di 375px; **play/pause, mute, dan dropdown pemilih trek bisa disentuh**; tidak menutupi konten penting.
- [ ] Garden: stack foto (main + small + chip + note) rapi tanpa tumpang tindih jelek; chip "OPEN DAILY…" tidak keluar layar.
- [ ] Spaces: kartu area jadi 1 kolom, gambar utuh.
- [ ] Food: geser rak horizontal lancar (touch), tile tidak kedodoran.
- [ ] Live Music: tab hari wrap; poster utuh (rasio 810/1441), titik "hari ini" terlihat; tabpanel keyboard OK.
- [ ] Gallery: masonry 2 kolom; chip label area terbaca.
- [ ] Lightbox: tombol ‹ › ukuran 44px di ≤620, tidak menutupi gambar; swipe kiri/kanan bekerja; caption "Area · n / total".
- [ ] Modal video: tombol close 44px di kanan atas; video loading hanya saat dibuka; musik pause otomatis.
- [ ] Rating: kartu stacked; angka "±4.5" tampil dengan label sumber.
- [ ] Visit: 1 kolom; tautan Maps/WA/tel bisa disentuh ≥44px; alamat & jam terbaca.
- [ ] Footer: nav & sosial wrap; tidak menabrak pemutar musik.

## Lebar 768 (tablet)

- [ ] Nav masih mode hamburger (breakpoint ≤900) — konsisten.
- [ ] Garden: masih 1 kolom (breakpoint 860) — pastikan foto & teks tidak canggung.
- [ ] Gallery: masih 2 kolom (≤900).
- [ ] Pemutar musik: label "Owner's mix / Now playing" + dropdown terlihat penuh.
- [ ] Tidak ada horizontal scroll (kecuali rak Food internal).

## Lebar 1440 (desktop)

- [ ] Hero: video jadi panel vertikal tengah (min 900px) dengan latar blur, sesuai BUILD.md §5.
- [ ] Nav inline; semua anchor (Garden, Spaces, Food, Music, Gallery, Reserve) bekerja + `scroll-margin-top` tidak tertutup header.
- [ ] Garden & Spaces: 2 kolom (≥860); kartu area auto-fit; parallax hover halus.
- [ ] Food: rak bleed ke tepi kanan; tepi kiri sejajar container.
- [ ] Live Music: grid teks + poster 420px (≥860); poster UTUH tidak di-crop.
- [ ] Gallery: masonry 3 kolom; lightbox panah keyboard + klik latar + Escape.
- [ ] Rating & Visit: layout dua sisi; JSON-LD valid (cek `view-source` / validator schema.org).
- [ ] OG/meta: preload poster hero terhitung LCP; `robots noindex,nofollow` masih ada (belum publik).

## Aksesibilitas & motion (semua lebar)

- [ ] Skip link: Tab pertama memunculkan "Skip to content", Enter melompat ke `#main`.
- [ ] Semua interaktif fokus-ring terlihat (oranye), target ≥44px.
- [ ] `prefers-reduced-motion: reduce` aktifkan di OS → entrance Hero tanpa stagger, reveal langsung tampil, chip tidak float, transisi poster mati.
- [ ] Screen reader (VoiceOver/NVDA): sr-only "Rated ±4.5 on Google" ada; bintang `aria-hidden`; tab Live/Gallery diumumkan sebagai tablist.
- [ ] Modal: fokus pindah ke dialog, latar `inert`, Escape mengembalikan fokus ke pemicu.

## Perbaikan yang sudah dibuat di Tugas 9

- MusicPlayer mobile: `.mp-meta` `display:none` (≤900px) menyembunyikan pemilih trek → pengguna HP tak bisa ganti lagu. Kini yang disembunyikan hanya label teks (`--mp-title`), `select` tetap tampil (max-width 128px). Build lolos, CSS 24.24 kB / gzip 5.34.

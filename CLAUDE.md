# MELLY'S GARDEN — Panduan Proyek untuk Claude Code

Website hospitality premium untuk Melly's Garden, Jakarta.
Brief lengkap: `BRIEF.md`. Progres: `docs/PROGRESS.md`.

## AWAL SETIAP SESI (WAJIB, hemat token)

1. Baca `docs/PROGRESS.md` terlebih dahulu.
2. Baca hanya bagian `BRIEF.md` yang relevan dengan tugas berikutnya, bukan seluruh file.
3. Jika `docs/AUDIT.md` dan `docs/ART_DIRECTION.md` sudah ada, **jangan audit ulang repo**. Rujuk file itu.
4. Lanjutkan dari bagian "BERIKUTNYA" di PROGRESS.md.
5. Jangan mengerjakan ulang item berstatus `DONE` kecuali saya minta.

## SELAMA BEKERJA

- Kerjakan satu tugas kecil pada satu waktu.
- Setelah tiap tugas/section selesai, **sebelum lanjut**:
  1. Update `docs/PROGRESS.md` (status, keputusan, masalah, berikutnya).
  2. `git add -A && git commit -m "<pesan singkat dan jelas>"`.
- Jika konteks mulai panjang, sarankan saya menjalankan `/compact` atau `/clear`. Pastikan PROGRESS.md sudah mutakhir dulu.
- Berhenti di tiap CHECKPOINT (A-D) dan laporkan ringkas. Tunggu instruksi "lanjut".

## ATURAN TETAP

- Jangan mengarang data (harga, event, artis, jam buka, kontak, review, klaim). Data tak terverifikasi ditandai `TODO_VERIFY`.
- Konflik antar sumber dicatat di `docs/CONTENT_CONFLICTS.md`, jangan ditebak.
- Aset yang belum ada dicatat di `docs/ASSETS_NEEDED.md`; pakai placeholder yang jelas ditandai.
- Jangan scrape Instagram. Hormati robots.txt dan ToS.
- Jangan install dependency baru tanpa menjelaskan alasannya lebih dulu.
- Jangan commit secret/API key. Pakai env var.
- Warna oranye diturunkan dari logo yang ada, bukan ditebak.
- Animasi: hanya `transform`/`opacity`, wajib hormati `prefers-reduced-motion`.
- Server Components sebisa mungkin; `"use client"` hanya untuk yang interaktif.

## LINGKUNGAN

Termux + Ubuntu proot (mobile, headless). Jika Playwright/Chrome tidak bisa jalan, jangan berputar-putar: laporkan, gunakan build + lint + typecheck, dan beri saya checklist QA manual.

## FILE PENTING

| File | Fungsi |
|---|---|
| `BRIEF.md` | Brief lengkap proyek |
| `docs/PROGRESS.md` | Sumber kebenaran progres |
| `docs/AUDIT.md` | Hasil audit repo (Phase 1) |
| `docs/ART_DIRECTION.md` | Art direction + strategi (Phase 2-3) |
| `docs/CONTENT_CONFLICTS.md` | Konflik data antar sumber |
| `docs/ASSETS_NEEDED.md` | Daftar foto/video yang dibutuhkan |

#!/usr/bin/env bash
# Optimasi aset -> public/assets (BUILD.md §5). Idempotent.
# Sumber: assets-source/ (gitignored) via salinan kerja di assets/.
# Foto asli JANGAN pernah diubah — hasil optimasi ditulis sebagai file baru.
set -euo pipefail
cd "$(dirname "$0")/.."

PUB=public/assets

# 1) Foto (gallery, drinks, bands, hero-poster): WebP q80 lebar asli + q75 @480w.
for dir in gallery drinks bands; do
  for f in assets/$dir/*.jpg; do
    base="${PUB}/${dir}/$(basename "${f%.jpg}")"
    magick "$f" -quality 80 -define webp:method=6 "${base}.webp"
    magick "$f" -resize 480x -quality 75 -define webp:method=6 "${base}@480.webp"
  done
done
magick assets/video/hero-poster.jpg -quality 80 -define webp:method=6 "${PUB}/video/hero-poster.webp"

# 2) Logo: varian kecil dari PNG 1254 (sumber tetap utuh di assets/logo).
magick assets/logo/mellys-garden-logo.png -resize 512x512 "${PUB}/logo/logo-512.png"
magick assets/logo/mellys-garden-logo.png -resize 512x512 -quality 85 "${PUB}/logo/logo-512.webp"
magick assets/logo/mellys-garden-logo.png -resize 180x180 "${PUB}/logo/apple-touch-icon.png"
magick assets/logo/mellys-garden-logo.png -resize 32x32 "${PUB}/logo/favicon-32.png"
magick assets/logo/mellys-garden-logo.png -resize 32x32 public/favicon.ico

# 3) Musik: 192k -> 128k + normalisasi loudness (BUILD.md §5).
mkdir -p "${PUB}/music"
for f in assets/music/*.mp3; do
  out="${PUB}/music/$(basename "$f")"
  ffmpeg -y -hide_banner -loglevel error -i "$f" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11" -b:a 128k -ar 44100 "$out"
done

# 4) Video: tidak diutak-atik (sudah dalam budget spec).

echo "OK — jalankan: du -sh ${PUB}/*"

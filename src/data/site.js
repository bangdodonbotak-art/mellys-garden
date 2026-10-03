// Semua data resmi dari BUILD.md §3 + hasil audit aset (docs/AUDIT.md).
// Jangan menambah fakta yang tidak bersumber (harga, nama band, ulasan) — lihat docs/ASSETS_NEEDED.md.

export const brand = {
  name: "Melly’s Garden",
  kicker: "Menteng · Jakarta",
  address: "Jl. Kebon Sirih Timur Dalam No. 37-39, Kebon Sirih, Menteng, Jakarta Pusat 10340",
  hours: { en: "Open every day from 6 AM — until you are happy", id: "Buka setiap hari mulai 06.00 — Sampai kamu bahagia" },
  liveMusic: "Live music every night",
};

export const contact = {
  waNumber: "6281316044666",
  phoneDisplay: "(021) 31925138",
  phoneTel: "+622131925138",
  instagram: { handle: "@mellysgarden", url: "https://www.instagram.com/mellysgarden/" },
  tiktok: { handle: "@mellysgardenjakarta", url: "https://www.tiktok.com/@mellysgardenjakarta" },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.+Kebon+Sirih+Timur+Dalam+No.+37-39,+Menteng,+Jakarta+Pusat+10340",
};

export const waLink = (message) =>
  `https://wa.me/${contact.waNumber}?text=${encodeURIComponent(message)}`;

export const wa = {
  reserve: waLink("Halo Melly's Garden, saya ingin reservasi meja"),
  menu: waLink("Halo Melly's Garden, saya ingin menanyakan menu"),
};

// Rating selalu dengan label sumber; angka = perkiraan ("sekitar") sesuai brief.
export const reviews = [
  { source: "Google", value: "±4.5" },
  { source: "Tripadvisor", value: "4.0" },
];

const A = "/assets";

// Foto: webp = lebar asli (768/810), small = 480w untuk srcset. JPG fallback tersedia.
const photo = (folder, name) => ({
  webp: `${A}/${folder}/${name}.webp`,
  jpg: `${A}/${folder}/${name}.jpg`,
  small: `${A}/${folder}/${name}@480.webp`,
});

export const areas = [
  { key: "garden", label: "The Garden", count: 4 },
  { key: "terrace", label: "The Terrace", count: 5 },
  { key: "lounge", label: "The Lounge", count: 5 },
  { key: "corner", label: "The Corner", count: 5 },
  { key: "warkop", label: "Warkop", count: 5 },
].map((a) => ({
  ...a,
  photos: Array.from({ length: a.count }, (_, i) =>
    photo("gallery", `${a.key}_${String(i + 1).padStart(2, "0")}`)
  ),
}));

export const gardenPhotos = areas[0].photos;

export const drinks = Array.from({ length: 10 }, (_, i) =>
  photo("drinks", `drink_${String(i + 1).padStart(2, "0")}`)
);

// Nama penampil TIDAK dibaca dari poster (tidak dikonfirmasi) — label hari saja.
export const days = [
  { key: "monday", label: "Senin", dow: 1 },
  { key: "tuesday", label: "Selasa", dow: 2 },
  { key: "wednesday", label: "Rabu", dow: 3 },
  { key: "thursday", label: "Kamis", dow: 4 },
  { key: "friday", label: "Jumat", dow: 5 },
  { key: "saturday", label: "Sabtu", dow: 6 },
  { key: "sunday", label: "Minggu", dow: 0 },
].map((d) => ({ ...d, poster: photo("bands", `${d.key}_band`) }));

export const music = {
  tracks: [
    { title: "Chillout Lounge 01", src: `${A}/music/mellys-chillout-lounge-01.mp3` },
    { title: "Chillout Lounge 02", src: `${A}/music/mellys-chillout-lounge-02.mp3` },
  ],
};

export const video = {
  heroLoop: `${A}/video/hero-loop.mp4`,
  heroPoster: `${A}/video/hero-poster.jpg`,
  heroPosterWebp: `${A}/video/hero-poster.webp`,
  openingFull: `${A}/video/opening-full.mp4`,
};

export const nav = [
  { href: "#garden", label: "Garden" },
  { href: "#spaces", label: "Spaces" },
  { href: "#food", label: "Food & Drinks" },
  { href: "#music", label: "Live Music" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reserve", label: "Visit" },
];

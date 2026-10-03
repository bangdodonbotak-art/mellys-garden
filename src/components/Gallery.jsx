import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal.jsx";
import Overlay from "./Overlay.jsx";
import { areas } from "../data/site.js";
import "./Gallery.css";

// Copy judul/lead salin verbatim dari index-1.html (section "05 / Visual memories").
// Foto disusun SILING (garden_01, terrace_01, ... garden_02, ...) seperti referensi,
// agar kolom masonry tercampur antar area. Lightbox hanya menampilkan foto yang sedang difilter.

const SHORT = { garden: "Garden", terrace: "Terrace", lounge: "Lounge", corner: "Corner", warkop: "Warkop" };
const FILTERS = [{ key: "all", label: "All" }, ...areas.map((a) => ({ key: a.key, label: SHORT[a.key] }))];

const PHOTOS = (() => {
  const out = [];
  const max = Math.max(...areas.map((a) => a.count));
  for (let i = 0; i < max; i++) {
    for (const a of areas) {
      if (a.photos[i]) out.push({ ...a.photos[i], area: a.key, seq: i + 1 });
    }
  }
  return out;
})();

export default function Gallery() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(-1); // indeks ke kiri -1 = tertutup
  const tabRefs = useRef([]);

  const shown = filter === "all" ? PHOTOS : PHOTOS.filter((p) => p.area === filter);
  const current = lightbox >= 0 ? shown[lightbox] : null;

  // Guard: ganti filter/resize saat lightbox terbuka tidak boleh di luar rentang.
  useEffect(() => {
    if (lightbox >= shown.length) setLightbox(shown.length ? shown.length - 1 : -1);
  }, [shown.length, lightbox]);

  function onTabKeyDown(e, index) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % FILTERS.length;
    if (e.key === "ArrowLeft") next = (index - 1 + FILTERS.length) % FILTERS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = FILTERS.length - 1;
    setFilter(FILTERS[next].key);
    tabRefs.current[next]?.focus();
  }

  const step = (d) =>
    setLightbox((i) => (i < 0 || shown.length === 0 ? i : (i + d + shown.length) % shown.length));

  function onLightboxKey(e) {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  }

  // Sapuan jari di lightbox (|dx| > 45px, seperti referensi).
  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx < -45) step(1);
    if (dx > 45) step(-1);
  };

  const closeLightbox = () => setLightbox(-1);

  return (
    <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal as="div" className="gal-top">
          <p className="gal-eyebrow">05 / Visual memories</p>
          <h2 className="h2" id="gallery-title">
            Corners of the <span className="gal-accent">garden.</span>
          </h2>
          <p className="lead">Tap a photo to view it full size.</p>
        </Reveal>

        <Reveal as="div" className="gal-tabs" role="tablist" aria-label="Filter photos by area">
          {FILTERS.map((f, i) => {
            const selected = f.key === filter;
            return (
              <button
                key={f.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`gal-tab-${f.key}`}
                aria-controls="gal-grid"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className={`gal-tab${selected ? " is-active" : ""}`}
                onClick={() => setFilter(f.key)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
              >
                {f.label}
              </button>
            );
          })}
        </Reveal>

        <div
          className="gal-masonry"
          id="gal-grid"
          role="tabpanel"
          aria-labelledby={`gal-tab-${filter}`}
        >
          {shown.map((p, i) => (
            <motion.div
              key={p.webp}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: reduced ? 0 : Math.min(i, 11) * 0.04 }}
              className="gal-cell"
            >
              <button
                type="button"
                className="gal-item"
                onClick={() => setLightbox(i)}
                aria-label={`View ${SHORT[p.area]} photo ${p.seq} full size`}
              >
                <img
                  src={p.webp}
                  srcSet={`${p.small} 480w, ${p.webp} 768w`}
                  sizes="(max-width: 900px) 45vw, 30vw"
                  width={768}
                  height={1376}
                  loading="lazy"
                  decoding="async"
                  alt={`${SHORT[p.area]} at Melly's Garden, photo ${p.seq}`}
                />
                <span className="gal-chip">{SHORT[p.area]}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <Overlay
        open={current != null}
        onClose={closeLightbox}
        className="gal-lightbox"
        label="Photo viewer"
        onKeyDown={onLightboxKey}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {current && (
          <>
            <button type="button" className="ov-close" data-close aria-label="Close photo">
              <X size={20} weight="bold" />
            </button>
            <button
              type="button"
              className="gal-nav gal-prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              <ArrowLeft size={24} weight="bold" />
            </button>
            <figure className="gal-fig">
              <motion.img
                key={current.webp}
                className="gal-full"
                src={current.webp}
                width={768}
                height={1376}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                alt={`${SHORT[current.area]} at Melly's Garden, photo ${current.seq}`}
              />
              <figcaption className="gal-cap">
                {SHORT[current.area]} · {lightbox + 1} / {shown.length}
              </figcaption>
            </figure>
            <button
              type="button"
              className="gal-nav gal-next"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              <ArrowRight size={24} weight="bold" />
            </button>
          </>
        )}
      </Overlay>
    </section>
  );
}

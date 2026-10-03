import { InstagramLogo } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { drinks, contact, wa } from "../data/site.js";
import "./Food.css";

// 10 foto minuman/makanan (drink_01..10) — karya Melly's Garden sendiri (BUILD §4).
// Nama menu dan harga tidak diarang (docs/ASSETS_NEEDED.md); CTA: tanya via WA + IG.
function DrinkTile({ photo, i }) {
  const n = String(i + 1).padStart(2, "0");
  return (
    <figure className={`food-tile${i % 2 ? " is-even" : ""}`}>
      <img
        src={photo.webp}
        srcSet={`${photo.small} 480w, ${photo.webp} 768w`}
        sizes="(min-width: 900px) 300px, 62vw"
        width={768}
        height={1376}
        loading="lazy"
        decoding="async"
        alt={`Food and drink at Melly's Garden, photo ${n}`}
      />
      <figcaption aria-hidden="true">{n}</figcaption>
    </figure>
  );
}

export default function Food() {
  return (
    <section className="food section" id="food" aria-labelledby="food-title">
      <div className="container">
        <Reveal as="div" className="food-top">
          <div>
            <p className="food-eyebrow">03 / The table</p>
            <h2 className="h2" id="food-title">
              Good food,
              <br />
              <span className="food-accent">good drinks.</span>
            </h2>
          </div>
          <p className="lead">
            A look at what we pour and serve, photographed right here in the garden.
            For the current menu and prices, ask us on WhatsApp or Instagram.
          </p>
        </Reveal>
      </div>

      {/* Rak foto bleed ke tepi layar — bar yang memanjang; gulir horizontal di ponsel. */}
      <Reveal
        as="div"
        className="food-rack"
        role="group"
        aria-label="Foto makanan dan minuman (10)"
        tabIndex={0}
      >
        {drinks.map((photo, i) => (
          <DrinkTile key={photo.webp} photo={photo} i={i} />
        ))}
      </Reveal>

      <div className="container">
        <Reveal as="div" className="food-actions">
          <a className="btn btn-primary" href={wa.menu} target="_blank" rel="noopener">
            Ask the menu
          </a>
          <a className="btn btn-ghost" href={contact.instagram.url} target="_blank" rel="noopener">
            <InstagramLogo size={18} /> {contact.instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

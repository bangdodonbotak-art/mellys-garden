import { Star, StarHalf } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { reviews, wa } from "../data/site.js";
import "./Rating.css";

// Angka rating selalu tampil dengan label sumber + perkiraan ("±") — jangan
// membulatkan/mengarang. Bintang hanya ilustrasi visual (aria-hidden),
// angka aslinya tetap terbaca (sr-only per kartu).

const toNumber = (v) => Number(String(v).replace(/[^\d.]/g, ""));

function Stars({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.25 && full < 5;
  return (
    <span className="rt-stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= full ? (
          <Star key={i} size={18} weight="fill" />
        ) : i === full + 1 && half ? (
          <StarHalf key={i} size={18} weight="fill" />
        ) : (
          <Star key={i} size={18} weight="regular" className="rt-star-empty" />
        )
      )}
    </span>
  );
}

export default function Rating() {
  return (
    <section className="rating section" id="rating" aria-labelledby="rating-title">
      <div className="container">
        <Reveal as="div" className="rt-top">
          <p className="rt-eyebrow">06 / The verdict</p>
          <h2 className="h2" id="rating-title">
            Rated around <span className="rt-accent">town.</span>
          </h2>
          <p className="lead">
            Approximate numbers, shown with their source — not a curated selection.
          </p>
        </Reveal>

        <Reveal as="ul" className="rt-list">
          {reviews.map((r) => (
            <li className="rt-card" key={r.source}>
              <p className="rt-value">{r.value}</p>
              <Stars value={toNumber(r.value)} />
              <p className="rt-source">{r.source}</p>
              <span className="rt-sr-only">
                Rated {r.value} on {r.source}
              </span>
            </li>
          ))}
        </Reveal>

        <Reveal as="p" className="rt-note">
          Live music every night, open daily from 6 AM.{" "}
          <a className="rt-link" href={wa.reserve} target="_blank" rel="noopener">
            Reserve a table on WhatsApp ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}

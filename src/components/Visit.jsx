import { Clock, MapPinLine, Phone, WhatsappLogo } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { brand, contact, wa } from "../data/site.js";
import "./Visit.css";

// Data salin dari brand/contact (BUILD.md §3) — tanpa fakta baru.
// "Map art" diganti tombol Google Maps nyata (mapsUrl) agar dapat diverifikasi.

export default function Visit() {
  return (
    <section className="visit section" id="reserve" aria-labelledby="visit-title">
      <div className="container">
        <Reveal as="div" className="visit-top">
          <p className="visit-eyebrow">07 / Visit</p>
          <h2 className="h2" id="visit-title">
            Find us in <span className="visit-accent">Menteng.</span>
          </h2>
        </Reveal>

        <div className="visit-grid">
          <Reveal as="address" className="visit-info">
            <p className="visit-line">
              <MapPinLine size={20} />
              <span>
                {brand.address}
                <br />
                <a
                  className="visit-link"
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps ↗
                </a>
              </span>
            </p>
            <p className="visit-line">
              <Clock size={20} />
              <span>
                {brand.hours.en}
                <br />
                <em>{brand.hours.id}</em>
              </span>
            </p>
            <p className="visit-line">
              <WhatsappLogo size={20} />
              <a href={wa.reserve} target="_blank" rel="noopener noreferrer">
                +62 813 1604 4666
              </a>
            </p>
            <p className="visit-line">
              <Phone size={20} />
              <a href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a>
            </p>
          </Reveal>

          <Reveal as="div" className="visit-cta" delay={0.1}>
            <h3 className="visit-cta-title">
              See you in
              <br />
              the garden.
            </h3>
            <p className="visit-cta-copy">{brand.liveMusic}.</p>
            <a className="btn btn-primary" href={wa.reserve} target="_blank" rel="noopener">
              <WhatsappLogo size={18} /> Reserve via WhatsApp
            </a>
            <a className="btn btn-ghost" href={`tel:${contact.phoneTel}`}>
              <Phone size={18} /> Call {contact.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

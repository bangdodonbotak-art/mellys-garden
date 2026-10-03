import { InstagramLogo, TiktokLogo, WhatsappLogo } from "@phosphor-icons/react";
import { brand, contact, nav, wa } from "../data/site.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="foot-name">{brand.name}</p>
        <p className="foot-tag">{brand.kicker} · {brand.liveMusic}</p>

        <nav className="foot-nav" aria-label="Footer">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="foot-social">
          <li>
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${contact.instagram.handle}`}
            >
              <InstagramLogo size={20} /> {contact.instagram.handle}
            </a>
          </li>
          <li>
            <a
              href={contact.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`TikTok ${contact.tiktok.handle}`}
            >
              <TiktokLogo size={20} /> {contact.tiktok.handle}
            </a>
          </li>
          <li>
            <a
              href={wa.reserve}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <WhatsappLogo size={20} /> WhatsApp
            </a>
          </li>
        </ul>

        <p className="foot-copy">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

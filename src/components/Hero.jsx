import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { InstagramLogo, Phone, Play } from "@phosphor-icons/react";
import { brand, contact, video, wa } from "../data/site.js";
import { useReducedMotion } from "../hooks.js";
import "./Hero.css";

export default function Hero({ onOpenVideo }) {
  const reduced = useReducedMotion();
  const videoRef = useRef(null);
  const [playable, setPlayable] = useState(false);

  // Putar video hanya jika user mengizinkan motion dan tidak di jaringan hemat.
  useEffect(() => {
    if (reduced) return;
    const c = navigator.connection;
    if (c && (c.saveData || /^(2g|slow-2g)$/.test(c.effectiveType || ""))) return;
    const v = videoRef.current;
    if (!v) return;
    v.preload = "auto";
    setPlayable(true);
    v.play().catch(() => {});
  }, [reduced]);

  const rise = reduced
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="hero" id="top" aria-label="Enter the garden">
      <div className="hero-bg" aria-hidden="true" style={{ backgroundImage: `url(${video.heroPosterWebp})` }} />
      <div className="hero-panel">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          poster={video.heroPosterWebp}
          aria-hidden="true"
        >
          {playable && <source src={video.heroLoop} type="video/mp4" />}
        </video>
      </div>

      <motion.div
        className="hero-copy container"
        {...rise}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="hero-kicker">{brand.kicker} · Open Every Day</p>
        <h1 className="hero-title">
          Enter the
          <span className="hero-title-accent">Garden.</span>
        </h1>
        <p className="hero-sub">
          Food, drinks, music, friends — and garden lights. {brand.hours.en}.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={wa.reserve} target="_blank" rel="noopener">
            <Phone size={18} weight="fill" /> Reserve a table
          </a>
          <a className="btn btn-ghost" href={contact.instagram.url} target="_blank" rel="noopener">
            <InstagramLogo size={18} /> {contact.instagram.handle}
          </a>
          <button type="button" className="btn btn-ghost" onClick={onOpenVideo}>
            <Play size={16} weight="fill" /> Watch the opening
          </button>
        </div>
      </motion.div>

      <p className="scroll-note" aria-hidden="true">
        <i />
        Scroll to enter
      </p>
    </section>
  );
}

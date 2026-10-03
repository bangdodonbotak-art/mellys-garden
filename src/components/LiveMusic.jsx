import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal.jsx";
import { days, wa } from "../data/site.js";
import { useTodayDow } from "../hooks.js";
import "./LiveMusic.css";

// Copy judul/lead salin verbatim dari index-1.html (referensi resmi, section "04 / The lineup").
// Nama band TIDAK dibaca dari poster (docs/CONTENT_CONFLICTS.md) — tab hanya label hari.

const EN_NAME = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function todayKey(dowToday) {
  const d = days.find((day) => day.dow === dowToday);
  return d ? d.key : "monday";
}

export default function LiveMusic() {
  const reduced = useReducedMotion();
  const today = todayKey(useTodayDow());
  const [active, setActive] = useState(today);
  const tabRefs = useRef([]);

  const poster = days.find((d) => d.key === active) ?? days[0];

  function onTabKeyDown(e, index) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % days.length;
    if (e.key === "ArrowLeft") next = (index - 1 + days.length) % days.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = days.length - 1;
    setActive(days[next].key);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="live section" id="music" aria-labelledby="live-title">
      <div className="container">
        <Reveal as="div" className="live-top">
          <div>
            <p className="live-eyebrow">04 / The lineup</p>
            <h2 className="h2" id="live-title">
              Every night.
              <br />
              <span className="live-accent">One garden.</span>
            </h2>
          </div>
          <p className="lead">
            Select a day to open its live music poster. Band names and times follow the
            poster.
          </p>
        </Reveal>

        <Reveal as="div" className="live-grid">
          <div className="live-picker">
            <div className="live-tabs" role="tablist" aria-label="Days of the week">
              {days.map((day, i) => {
                const selected = day.key === active;
                return (
                  <button
                    key={day.key}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${day.key}`}
                    aria-selected={selected}
                    aria-controls="live-poster"
                    tabIndex={selected ? 0 : -1}
                    className={`live-tab${selected ? " is-active" : ""}`}
                    onClick={() => setActive(day.key)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                  >
                    {day.label}
                    {day.key === today && (
                      <span className="live-today-dot" aria-hidden="true" />
                    )}
                    {day.key === today && (
                      <span className="live-sr-only"> (today)</span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="live-note">Posters by day, Monday to Sunday. Today is highlighted.</p>

            <a className="btn btn-primary" href={wa.reserve} target="_blank" rel="noopener">
              Book a table <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div
            className="live-stage"
            role="tabpanel"
            id="live-poster"
            aria-labelledby={`tab-${poster.key}`}
          >
            <motion.div
              key={poster.key}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="live-poster"
            >
              <img
                src={poster.poster.webp}
                srcSet={`${poster.poster.small} 480w, ${poster.poster.webp} 810w`}
                sizes="(min-width: 860px) 380px, 78vw"
                width={810}
                height={1441}
                loading="lazy"
                decoding="async"
                alt={`Live music poster for ${EN_NAME[poster.key]} at Melly's Garden`}
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

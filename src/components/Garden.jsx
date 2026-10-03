import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal.jsx";
import { areas } from "../data/site.js";
import "./Garden.css";

// Tumpukan visual Garden: foto utama + kartu kecil sudut.
// Parallax halus per kedalaman scroll (transform saja, non-reduced-motion).
function VisualStack({ main, small }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [44, -44]);
  const ySmall = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [88, -88]);

  return (
    <div className="garden-stack" ref={ref}>
      <motion.div className="garden-main" style={reduced ? undefined : { y: yMain }}>
        <img
          src={main.webp}
          srcSet={`${main.small} 480w, ${main.webp} 768w`}
          sizes="(min-width: 860px) 580px, 92vw"
          width={768}
          height={1376}
          loading="lazy"
          decoding="async"
          alt="The garden at Melly's Garden"
        />
      </motion.div>
      <motion.div className="garden-small" style={reduced ? undefined : { y: ySmall }}>
        <img
          src={small.webp}
          srcSet={`${small.small} 480w, ${small.webp} 768w`}
          sizes="(min-width: 860px) 300px, 60vw"
          width={768}
          height={1376}
          loading="lazy"
          decoding="async"
          alt="The corner at Melly's Garden"
        />
        <span className="garden-note">
          See you
          <br />
          in the garden.
        </span>
      </motion.div>
      <span className="garden-chip">Good vibes only</span>
    </div>
  );
}

export default function Garden() {
  const garden = areas.find((a) => a.key === "garden");
  const corner = areas.find((a) => a.key === "corner");

  return (
    <section className="garden section container" id="garden" tabIndex={-1} aria-labelledby="garden-title">
      <div className="garden-grid">
        <Reveal as="div" className="garden-copy">
          <p className="garden-eyebrow">01 / The garden</p>
          <h2 className="h2" id="garden-title">
            A garden
            <br />
            after <span className="garden-accent">dark.</span>
          </h2>
          <p className="lead garden-body">
            Same place, different stories. Come as you are, stay for the food, drinks and good vibes.
          </p>
          <a className="btn btn-ghost garden-cta" href="#music">
            Feel the music <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
        <Reveal as="div" className="garden-visual" delay={180}>
          <VisualStack main={garden.photos[0]} small={corner.photos[1]} />
        </Reveal>
      </div>
    </section>
  );
}

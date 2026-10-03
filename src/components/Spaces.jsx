import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Reveal from "./Reveal.jsx";
import { areas } from "../data/site.js";
import "./Spaces.css";

// Judul kartu: Garden/Terrace/Lounge salin dari referensi (index-1.html,
// copy resmi situs lama). Corner/Warkop ditulis dari yang terlihat di foto
// (corner_03: lampu tali hangat di sela dedaunan; warkop_03: seduh manual).
// photoIndex merujuk ke area.photos: 0..count-1 (0 = _01, dst).
const CARDS = {
  garden: { photoIndex: 2, l1: "Same place,", l2: "different stories." }, // garden_03
  terrace: { photoIndex: 1, l1: "Good food.", l2: "Good drinks." },       // terrace_02
  lounge: { photoIndex: 2, l1: "Good vibes", l2: "only." },                // lounge_03
  corner: { photoIndex: 2, l1: "Warm lights", l2: "in the leaves." },      // corner_03
  warkop: { photoIndex: 2, l1: "Slow-brewed,", l2: "cup by cup." },        // warkop_03
};

function AreaCard({ area, index }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 180, damping: 22, mass: 0.5 };
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), spring);
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), spring);

  const headline = CARDS[area.key];
  const photo = area.photos[headline.photoIndex];

  function onPointerMove(e) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <Reveal className="area" delay={index * 90}>
      <motion.figure
        ref={ref}
        className="area-card"
        style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <img
          src={photo.webp}
          srcSet={`${photo.small} 480w, ${photo.webp} 768w`}
          sizes="(min-width: 1100px) 420px, (min-width: 640px) 50vw, 92vw"
          width={768}
          height={1376}
          loading="lazy"
          decoding="async"
          alt={`${area.label} at Melly's Garden`}
        />
        <figcaption className="area-caption">
          <small>
            {String(index + 1).padStart(2, "0")} / {area.label}
          </small>
          <h3>
            {headline.l1}
            <br />
            {headline.l2}
          </h3>
        </figcaption>
      </motion.figure>
    </Reveal>
  );
}

export default function Spaces() {
  return (
    <section className="spaces section container" id="spaces" aria-labelledby="spaces-title">
      <Reveal as="div" className="spaces-top">
        <div>
          <p className="spaces-eyebrow">02 / The spaces</p>
          <h2 className="h2" id="spaces-title">
            Made for
            <br />
            <span className="spaces-accent">good nights.</span>
          </h2>
        </div>
        <p className="lead">
          Garden, terrace, lounge, corner and warkop. Find your spot and stay a little longer.
        </p>
      </Reveal>

      <div className="areas">
        {areas.map((area, i) => (
          <AreaCard key={area.key} area={area} index={i} />
        ))}
      </div>
    </section>
  );
}

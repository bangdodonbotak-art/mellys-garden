import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "../hooks.js";

// motion.create() dipanggil sekali per tag (cache module-level) agar
// komponen tidak berganti tipe tiap render (mencegah remount).
const cache = new Map();
function motionOf(Tag) {
  if (typeof Tag !== "string") return Tag;
  let M = cache.get(Tag);
  if (!M) {
    M = motion.create(Tag);
    cache.set(Tag, M);
  }
  return M;
}

// Scroll reveal berbasis motion: opacity + translateY saat masuk viewport.
// Reduced motion / tanpa dukungan -> children dirender apa adanya (selalu tampil).
export default function Reveal({
  as: Tag = "div",
  children,
  delay = 0,
  y = 28,
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -8% 0px",
    amount: 0.15,
  });

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MTag = motionOf(Tag);
  return (
    <MTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: "easeOut", delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </MTag>
  );
}

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import "./Overlay.css";

// Overlay modal dasar (Tugas 6): portal ke <body>, scroll lock, sibling di-inert-kan,
// Escape/bklik latar menutup, fokus disimpan lalu dikembalikan saat tutup.
// Pemakai: lightbox Galeri + modal video opening.
export default function Overlay({
  open,
  onClose,
  className = "",
  label,
  labelledBy,
  onKeyDown,
  onTouchStart,
  onTouchEnd,
  children,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const overlay = ref.current;
    const prevActive = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siblings = [...document.body.children].filter(
      (el) => el !== overlay && el.nodeType === 1
    );
    siblings.forEach((el) => el.setAttribute("inert", ""));
    (overlay.querySelector("[data-close]") ?? overlay).focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      siblings.forEach((el) => el.removeAttribute("inert"));
      if (prevActive instanceof HTMLElement) prevActive.focus();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <motion.div
      ref={ref}
      tabIndex={-1}
      className={`ov${className ? ` ${className}` : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-labelledby={labelledBy}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={(e) => {
        if (e.target === ref.current || e.target.closest("[data-close]")) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
        onKeyDown?.(e);
      }}
    >
      {children}
    </motion.div>,
    document.body
  );
}

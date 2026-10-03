import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import Overlay from "./Overlay.jsx";
import { video } from "../data/site.js";
import { pauseBackgroundMusic } from "../hooks.js";
import "./OpeningModal.css";

// Video opening HANYA dimuat & diputar setelah klik (BUILD.md §5) — saat tertutup
// <video> tidak ter-mount, jadi tidak ada download 8.7MB. Musik pemutar dipause.
export default function OpeningModal({ open, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    pauseBackgroundMusic();
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {}); // browser boleh menolak; user selalu bisa play manual
  }, [open]);

  return (
    <Overlay open={open} onClose={onClose} className="opening" label="Melly’s Garden opening video">
      <button type="button" className="ov-close" data-close aria-label="Close video">
        <X size={20} weight="bold" />
      </button>
      <div className="opening-video">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="none"
          poster={video.heroPosterWebp}
          src={video.openingFull}
        />
      </div>
    </Overlay>
  );
}

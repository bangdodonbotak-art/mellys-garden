import { useEffect, useRef, useState } from "react";
import { Pause, Play, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { music } from "../data/site.js";
import "./MusicPlayer.css";

// Dua lagu buatan pemilik — diputar manual, tanpa autoplay (BUILD.md §4).
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !playing) return;
    a.play().catch(() => setPlaying(false));
  }, [playing, track]);

  // Pemutar otomatis dijeda saat video opening diputar (event dari hooks.js).
  useEffect(() => {
    const onPause = () => {
      const a = audioRef.current;
      if (!a) return;
      a.pause();
      setPlaying(false);
    };
    window.addEventListener("mellys:pause-music", onPause);
    return () => window.removeEventListener("mellys:pause-music", onPause);
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return (
    <aside className="music-player" aria-label="Melly’s Garden music player">
      <audio
        ref={audioRef}
        src={music.tracks[track].src}
        preload="none"
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        className="mp-toggle"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
      >
        {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
      </button>
      <div className="mp-meta">
        <span className="mp-title">{playing ? "Now playing" : "Owner’s mix"}</span>
        <select
          aria-label="Choose soundtrack"
          value={track}
          onChange={(e) => setTrack(Number(e.target.value))}
        >
          {music.tracks.map((t, i) => (
            <option key={t.src} value={i}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="mp-mute"
        aria-label={muted ? "Unmute" : "Mute"}
        aria-pressed={muted}
        onClick={() => {
          const a = audioRef.current;
          if (a) a.muted = !muted;
          setMuted((m) => !m);
        }}
      >
        {muted ? <SpeakerSlash size={18} /> : <SpeakerHigh size={18} />}
      </button>
    </aside>
  );
}

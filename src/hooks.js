import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

const DOW_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Hari ini di Jakarta (0=Minggu..6=Sabtu) — untuk menyorot poster hari ini.
function dowJakarta() {
  const short = new Date().toLocaleDateString("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
  });
  return DOW_NAMES.indexOf(short);
}

export function useTodayDow() {
  const [dow, setDow] = useState(dowJakarta);
  useEffect(() => {
    const t = setInterval(() => setDow(dowJakarta()), 60_000);
    return () => clearInterval(t);
  }, []);
  return dow;
}

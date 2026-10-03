import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { brand, nav } from "../data/site.js";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-row">
        <a className="brandmark" href="#top" aria-label={`${brand.name} home`} onClick={() => setOpen(false)}>
          <img src="/assets/logo/logo-512.webp" alt="" width="40" height="40" />
          <span>Melly’s Garden</span>
        </a>
        <nav aria-label="Main navigation" className={`main-nav ${open ? "open" : ""}`}>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
      {open && <div className="nav-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}

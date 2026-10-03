import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

export default function App() {
  const [openingOpen, setOpeningOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#garden">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero onOpenVideo={() => setOpeningOpen(true)} />
        {/* Tugas 4+: Suasana, Area, Food & Music, Galeri, Reservasi, Footer */}
        <section className="section container" id="garden" tabIndex={-1}>
          <h2 className="h2">Placeholder</h2>
        </section>
      </main>
      <MusicPlayer />
    </>
  );
}

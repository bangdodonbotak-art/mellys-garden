import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Garden from "./components/Garden.jsx";
import Spaces from "./components/Spaces.jsx";
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
        {/* Tugas 5+: Food & Music, Galeri, Reservasi, Footer */}
        <Garden />
        <Spaces />
      </main>
      <MusicPlayer />
    </>
  );
}

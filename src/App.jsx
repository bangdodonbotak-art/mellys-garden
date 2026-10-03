import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Garden from "./components/Garden.jsx";
import Spaces from "./components/Spaces.jsx";
import Food from "./components/Food.jsx";
import LiveMusic from "./components/LiveMusic.jsx";
import Gallery from "./components/Gallery.jsx";
import OpeningModal from "./components/OpeningModal.jsx";
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
        {/* Tugas 7+: Reservasi, Footer */}
        <Garden />
        <Spaces />
        <Food />
        <LiveMusic />
        <Gallery />
      </main>
      <MusicPlayer />
      <OpeningModal open={openingOpen} onClose={() => setOpeningOpen(false)} />
    </>
  );
}

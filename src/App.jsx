import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Garden from "./components/Garden.jsx";
import Spaces from "./components/Spaces.jsx";
import Food from "./components/Food.jsx";
import LiveMusic from "./components/LiveMusic.jsx";
import Gallery from "./components/Gallery.jsx";
import Rating from "./components/Rating.jsx";
import Visit from "./components/Visit.jsx";
import Footer from "./components/Footer.jsx";
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
        <Garden />
        <Spaces />
        <Food />
        <LiveMusic />
        <Gallery />
        <Rating />
        <Visit />
      </main>
      <Footer />
      <MusicPlayer />
      <OpeningModal open={openingOpen} onClose={() => setOpeningOpen(false)} />
    </>
  );
}

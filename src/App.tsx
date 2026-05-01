import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Showcase from "./components/Showcase";
import Process from "./components/Process";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis(!loading);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{loading && <Loader key="loader" />}</AnimatePresence>
      <Cursor />
      <div className="grain" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Showcase />
        <Process />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

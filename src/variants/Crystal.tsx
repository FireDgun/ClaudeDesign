import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Manifesto from "../components/Manifesto";
import About from "../components/About";
import Showcase from "../components/Showcase";
import Process from "../components/Process";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function CrystalVariant() {
  return (
    <div className="bg-ink-900 text-white">
      <Cursor />
      <div className="grain" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Manifesto />
        <Showcase />
        <Process />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import HowItWorksSection from "./components/HowItWorksSection";
import MapSection from "./components/MapSection";
import CalculatorSection from "./components/CalculatorSection";
import SimulationSection from "./components/SimulationSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import JourneySection from "./components/JourneySection";
import ConsumptionLeaderboard from "./components/ConsumptionLeaderboard";
import "./index.css";

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

export default function App() {
  return (
    <div className="page-shell">
      <SmoothScroll />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <MapSection />
        <ConsumptionLeaderboard />
        <CalculatorSection />
        <SimulationSection />
        <JourneySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

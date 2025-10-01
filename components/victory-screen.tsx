"use client";

import { useEffect, useState } from "react";

interface VictoryScreenProps {
  onComplete: () => void;
  onPhaseChange: (phase: "waiting" | "dark" | "light") => void;
}

export default function VictoryScreen({ onComplete, onPhaseChange }: VictoryScreenProps) {
  const [phase, setPhase] = useState<"waiting" | "dark" | "light">("waiting");

  useEffect(() => {
    // After 6 seconds (lightning phase), go to dark screen
    const darkTimer = setTimeout(() => {
      setPhase("dark");
      onPhaseChange("dark");
    }, 6000);

    // After another 4 seconds of dark screen, show victory message
    const lightTimer = setTimeout(() => {
      setPhase("light");
      onPhaseChange("light");
    }, 10000);

    return () => {
      clearTimeout(darkTimer);
      clearTimeout(lightTimer);
    };
  }, [onPhaseChange]);

  if (phase === "waiting") {
    return null; // Let lightning play in background
  }

  if (phase === "dark") {
    return (
      <div className="fixed inset-0 bg-black z-[100]" />
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
      <h1
        className="text-6xl md:text-8xl font-bold text-black tracking-wider text-center px-8"
        style={{
          fontFamily: 'Orbitron, sans-serif',
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
          letterSpacing: '0.15em'
        }}
      >
        THE FORCE IS<br />STRONG WITH YOU<br />MASTER
      </h1>
    </div>
  );
}

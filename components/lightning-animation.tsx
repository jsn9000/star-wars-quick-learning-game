"use client";

import { useEffect, useState, useRef } from "react";

interface LightningAnimationProps {
  victoryMode?: boolean;
}

export default function LightningAnimation({ victoryMode = false }: LightningAnimationProps) {
  const [flashes, setFlashes] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Create random lightning flashes
    const createLightning = () => {
      const flashId = Date.now();
      setFlashes((prev) => [...prev, flashId]);

      // Play thunder sound
      playThunder();

      // Remove flash after animation
      setTimeout(() => {
        setFlashes((prev) => prev.filter((id) => id !== flashId));
      }, 400);
    };

    if (victoryMode) {
      // Victory mode: Fast lightning every 0.3-0.8 seconds
      const scheduleNextLightning = () => {
        const delay = 300 + Math.random() * 500;
        return setTimeout(() => {
          createLightning();
          timeout = scheduleNextLightning();
        }, delay);
      };

      let timeout = scheduleNextLightning();

      return () => {
        clearTimeout(timeout);
      };
    } else {
      // Normal mode: Create lightning at random intervals (2-6 seconds)
      const scheduleNextLightning = () => {
        const delay = 2000 + Math.random() * 4000;
        return setTimeout(createLightning, delay);
      };

      let timeout = scheduleNextLightning();
      const interval = setInterval(() => {
        clearTimeout(timeout);
        timeout = scheduleNextLightning();
      }, 6000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [victoryMode]);

  const playThunder = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create thunder sound using multiple oscillators
      const now = audioContext.currentTime;

      // Low rumble
      const oscillator1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      oscillator1.type = 'sawtooth';
      oscillator1.frequency.setValueAtTime(50, now);
      oscillator1.frequency.exponentialRampToValueAtTime(30, now + 0.5);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      oscillator1.connect(gain1);
      gain1.connect(audioContext.destination);
      oscillator1.start(now);
      oscillator1.stop(now + 1.5);

      // Mid crack
      const oscillator2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      oscillator2.type = 'square';
      oscillator2.frequency.setValueAtTime(200, now);
      oscillator2.frequency.exponentialRampToValueAtTime(100, now + 0.2);
      gain2.gain.setValueAtTime(0.2, now);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      oscillator2.connect(gain2);
      gain2.connect(audioContext.destination);
      oscillator2.start(now);
      oscillator2.stop(now + 0.3);

      // High crack
      const oscillator3 = audioContext.createOscillator();
      const gain3 = audioContext.createGain();
      oscillator3.type = 'triangle';
      oscillator3.frequency.setValueAtTime(800, now + 0.05);
      oscillator3.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      gain3.gain.setValueAtTime(0.15, now + 0.05);
      gain3.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      oscillator3.connect(gain3);
      gain3.connect(audioContext.destination);
      oscillator3.start(now + 0.05);
      oscillator3.stop(now + 0.2);

      // Cleanup
      setTimeout(() => {
        audioContext.close();
      }, 2000);
    } catch (error) {
      console.log('Thunder sound generation failed:', error);
    }
  };

  return (
    <>
      {flashes.map((flashId) => (
        <div
          key={flashId}
          className="fixed inset-0 pointer-events-none z-50 animate-lightning"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(200, 220, 255, 0.3) 50%, transparent 100%)',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes lightning {
          0%, 100% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          20% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          40%, 100% {
            opacity: 0;
          }
        }
        .animate-lightning {
          animation: lightning 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
}

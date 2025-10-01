"use client";

import { useEffect, useState, useRef } from "react";

interface RainDrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  width: number;
  height: number;
}

export default function RainAnimation() {
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Generate 250 rain drops for heavy rain effect
    const drops: RainDrop[] = [];
    for (let i = 0; i < 250; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100, // Random horizontal position (0-100%)
        animationDuration: 0.3 + Math.random() * 0.4, // Duration between 0.3s and 0.7s (faster)
        animationDelay: Math.random() * 2, // Random delay up to 2s
        opacity: 0.4 + Math.random() * 0.5, // Opacity between 0.4 and 0.9 (more visible)
        width: 1 + Math.random() * 1.5, // Width between 1px and 2.5px
        height: 15 + Math.random() * 20, // Height between 15px and 35px
      });
    }
    setRainDrops(drops);

    // Create rain sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create a gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.15; // Adjust volume
      gainNode.connect(audioContext.destination);
      gainNodeRef.current = gainNode;

      // Create continuous rain sound using pink noise
      const bufferSize = audioContext.sampleRate * 2;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate pink noise for rain sound
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gainNode);
      source.start(0);

      // Cleanup function
      return () => {
        source.stop();
        audioContext.close();
      };
    } catch (error) {
      console.log('Rain sound generation failed:', error);
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-gradient-to-b from-blue-300 via-blue-400 to-transparent"
          style={{
            left: `${drop.left}%`,
            width: `${drop.width}px`,
            height: `${drop.height}px`,
            opacity: drop.opacity,
            animation: `rainFall ${drop.animationDuration}s linear ${drop.animationDelay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes rainFall {
          0% {
            top: -50px;
          }
          100% {
            top: 100vh;
          }
        }
      `}</style>
    </div>
  );
}

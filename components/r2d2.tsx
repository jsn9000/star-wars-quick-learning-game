"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function R2D2() {
  const [isHeadOpen, setIsHeadOpen] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [materials, setMaterials] = useState<Array<{id: number, x: number, delay: number}>>([]);

  const handleClick = () => {
    if (!isHeadOpen) {
      // Opening sequence
      setIsHeadOpen(true);

      // Generate falling materials after dome opens
      setTimeout(() => {
        setShowMaterials(true);
        const newMaterials = Array.from({ length: 8 }, (_, i) => ({
          id: i,
          x: Math.random() * 80 + 10, // Random x position between 10-90%
          delay: Math.random() * 300, // Random delay up to 300ms
        }));
        setMaterials(newMaterials);
      }, 800);

      // Close sequence after materials fall
      setTimeout(() => {
        setShowMaterials(false);
        setMaterials([]);
      }, 3000);

      setTimeout(() => {
        setIsHeadOpen(false);
      }, 3500);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div
        className="relative cursor-pointer transition-transform hover:scale-105"
        onClick={handleClick}
      >
        <Image
          src="https://static.wikia.nocookie.net/starwars/images/e/eb/ArtooTFA2-Fathead.png"
          alt="R2-D2"
          width={200}
          height={300}
          className="drop-shadow-2xl"
        />

        {/* Head dome separation effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Top dome piece that lifts up */}
          <div
            className={`absolute top-[8%] left-[25%] w-[50%] h-[25%] bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-full border border-gray-500 transition-all duration-1000 ease-out ${
              isHeadOpen ? 'transform -translate-y-6 rotate-2' : ''
            }`}
            style={{
              clipPath: 'ellipse(50% 100% at 50% 100%)',
              opacity: isHeadOpen ? 0.95 : 0,
            }}
          />

          {/* Head cavity/interior when open */}
          {isHeadOpen && (
            <div className="absolute top-[15%] left-[30%] w-[40%] h-[20%] bg-gray-800 rounded-b-lg border border-gray-600 opacity-90">
              <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg">
                {/* Interior details */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-400 rounded"></div>
              </div>
            </div>
          )}

          {/* Falling materials (white dots) */}
          {showMaterials && materials.map((material) => (
            <div
              key={material.id}
              className="absolute w-2 h-2 bg-white rounded-full animate-bounce"
              style={{
                top: '18%',
                left: `${material.x}%`,
                animationDelay: `${material.delay}ms`,
                animationDuration: '1.5s',
                animationIterationCount: '1',
                animationFillMode: 'forwards',
                transform: showMaterials ? 'translateY(40px)' : 'translateY(0)',
                transition: `transform 1.5s ease-in ${material.delay}ms`,
              }}
            />
          ))}

          {/* Glowing effect around head when open */}
          {isHeadOpen && (
            <div className="absolute top-[10%] left-[20%] w-[60%] h-[30%] border-2 border-blue-400 rounded-full opacity-50 animate-pulse" />
          )}
        </div>
      </div>

      {/* Sound effect and status text */}
      {isHeadOpen && (
        <div className="text-center mt-4 space-y-2">
          <div className="text-blue-400 font-mono text-lg animate-bounce">
            *WHIRRRR* *CLICK* *BEEP*
          </div>
          {showMaterials && (
            <div className="text-yellow-300 text-sm animate-pulse">
              Loading materials...
            </div>
          )}
          {!showMaterials && isHeadOpen && (
            <div className="text-green-400 text-sm">
              Compartment sealing...
            </div>
          )}
        </div>
      )}

      <div className="text-gray-400 text-sm mt-4">
        Click R2-D2 to open his head compartment!
      </div>
    </div>
  );
}
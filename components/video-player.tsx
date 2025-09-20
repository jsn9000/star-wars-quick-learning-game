"use client";

import { useState, useEffect } from "react";

export default function VideoPlayer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-[400px] h-[300px]" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <video
        width="400"
        height="300"
        autoPlay
        loop
        playsInline
      >
        <source src="/videos/r2d2-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
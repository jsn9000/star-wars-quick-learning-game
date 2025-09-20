"use client";

interface DeathStarTimerProps {
  timeRemaining: number;
}

export default function DeathStarTimer({ timeRemaining }: DeathStarTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-32 h-32">
      {/* Death Star Circle */}
      <div className="w-full h-full rounded-full bg-gray-800 border-4 border-gray-600 relative overflow-hidden shadow-2xl">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          {/* Horizontal lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gray-400"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {/* Vertical lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-400"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {/* Curved lines for sphere effect */}
          <div className="absolute inset-4 rounded-full border border-gray-400" />
          <div className="absolute inset-8 rounded-full border border-gray-400" />
        </div>

        {/* Super laser focus lens (top right quadrant) */}
        <div className="absolute top-6 right-6 w-6 h-6 rounded-full bg-gray-900 border-2 border-gray-500">
          <div className="absolute inset-1 rounded-full bg-black">
            <div className="absolute inset-1 rounded-full border border-gray-600" />
          </div>
        </div>

        {/* Digital timer display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-70 px-2 py-1 rounded border border-cyan-400">
            <span className="text-cyan-400 font-mono text-lg font-bold tracking-wider">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Small antenna/details */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gray-500" />
      </div>
    </div>
  );
}
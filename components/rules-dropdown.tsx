"use client";

import { useState } from "react";

export default function RulesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 rounded-lg p-3 shadow-lg transition-all duration-200 flex items-center gap-2"
      >
        <span className="font-bold text-white font-orbitron tracking-wider">RULES</span>
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white bg-opacity-95 rounded-lg p-4 shadow-xl z-10 animate-in slide-in-from-top-2 duration-200">
          <h3 className="font-bold text-gray-800 mb-3 text-lg font-orbitron tracking-wider">GAME RULES</h3>
          <ul className="text-sm text-gray-900 space-y-2 leading-relaxed font-exo font-medium">
            <li>• Choose your path, let your progress and knowledge guide you.</li>
            <li>• Click each card to learn some quick facts for fun.</li>
            <li>• Complete all topics to unlock the surprise.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
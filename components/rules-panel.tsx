"use client";

export default function RulesPanel() {
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-lg max-w-xs">
      <h3 className="font-bold text-gray-800 mb-3 text-lg">Rules</h3>
      <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
        <li>• Choose your path, let your progress and knowledge guide you.</li>
        <li>• Click cards to activate bonus rounds.</li>
        <li>• Complete all topics to unlock the surprise.</li>
      </ul>
    </div>
  );
}
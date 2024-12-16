import React from 'react';

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div
        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 rounded-full
          shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`
      relative bg-gray-900/90 rounded-xl
      border border-gray-800
      shadow-[0_0_15px_rgba(0,0,0,0.3)]
      backdrop-blur-sm
      ${className}
    `}>
      {children}
    </div>
  );
};
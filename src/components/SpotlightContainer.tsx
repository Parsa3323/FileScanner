import React, { useRef, useState, useEffect } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface SpotlightContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightContainer: React.FC<SpotlightContainerProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setSpotlightPosition({
        x: mousePosition.x - rect.left,
        y: mousePosition.y - rect.top,
      });
    }
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 300px at ${spotlightPosition.x}px ${spotlightPosition.y}px, 
            rgba(34, 211, 238, 0.15), 
            rgba(34, 211, 238, 0.05) 30%,
            transparent 70%)`
        }}
      />
      {children}
    </div>
  );
};
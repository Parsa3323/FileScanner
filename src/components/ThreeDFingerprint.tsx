import React from 'react';
import { Fingerprint } from 'lucide-react';
import { SpotlightContainer } from './SpotlightContainer';

export const ThreeDFingerprint = ({ isScanning }: { isScanning: boolean }) => {
  return (
    <SpotlightContainer className="w-48 h-48 mx-auto">
      <div className="group relative w-full h-full rounded-full overflow-hidden bg-gray-900/50 p-4">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-cyan-500/5 rounded-full" />
        
        {/* 3D Layers */}
        <div className="absolute inset-0 transform-gpu -translate-y-1 scale-95 opacity-30 blur-sm rounded-full">
          <Fingerprint className="w-full h-full text-cyan-500 rounded-full" strokeLinecap="round" strokeLinejoin="round" />
        </div>
        <div className="absolute inset-0 transform-gpu -translate-y-0.5 scale-98 opacity-50 rounded-full">
          <Fingerprint className="w-full h-full text-cyan-400 rounded-full" strokeLinecap="round" strokeLinejoin="round" />
        </div>
        
        {/* Main Fingerprint */}
        <div 
          className={`absolute inset-0 transform-gpu transition-all duration-500 rounded-full
            ${isScanning ? 'animate-pulse scale-105' : 'scale-100'}
            group-hover:scale-110`}
        >
          <Fingerprint 
            className="w-full h-full text-cyan-300 rounded-full" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </div>
        
        {/* Scanning Glow Effect */}
        {isScanning && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-cyan-400/10 to-transparent animate-glow rounded-full" />
            <div className="absolute inset-0 bg-gradient-radial from-cyan-400/20 to-transparent opacity-50 rounded-full" />
          </>
        )}

        {/* Edge Highlight */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
      </div>
    </SpotlightContainer>
  );
};
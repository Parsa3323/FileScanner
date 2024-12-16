import React from 'react';
import { ThreeDFingerprint } from './ThreeDFingerprint';
import { ProgressBar } from './ProgressBar';

export const ScanningAnimation = ({ isScanning, progress }: { isScanning: boolean; progress: number }) => {
  return (
    <div className="relative">
      <div className="mb-8">
        <ThreeDFingerprint isScanning={isScanning} />
      </div>
      <div className="mt-4 space-y-2">
        <ProgressBar progress={progress} />
        <p className="text-cyan-400/80 text-sm">
          {isScanning ? `Scanning... ${progress}%` : 'Scan Complete'}
        </p>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { ScanningAnimation } from './components/ScanningAnimation';
import { ScanResult } from './components/ScanResult';
import { Card } from './components/Card';
import { FileUpload } from './components/FileUpload';
import { SpotlightContainer } from './components/SpotlightContainer';
import { scanFile } from './services/fileScanner';
import type { FileAnalysisResult, Threat } from './types/scanner';

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanResult, setScanResult] = useState<FileAnalysisResult | null>(null);

  useEffect(() => {
    if (isScanning && selectedFile) {
      let progressInterval: NodeJS.Timeout;
      
      const performScan = async () => {
        try {
          // Start progress animation
          progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 1, 95));
          }, 50);

          // Perform actual file scan
          const result = await scanFile(selectedFile);
          
          // Ensure we show 100% at the end
          setProgress(100);
          setScanResult(result);
          setScanComplete(true);
        } catch (error) {
          console.error('Scan failed:', error);
        } finally {
          setIsScanning(false);
          clearInterval(progressInterval);
        }
      };

      performScan();

      return () => {
        clearInterval(progressInterval);
      };
    }
  }, [isScanning, selectedFile]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProgress(0);
    setScanComplete(false);
    setScanResult(null);
  };

  const startScan = () => {
    if (selectedFile) {
      setIsScanning(true);
      setProgress(0);
      setScanComplete(false);
    }
  };

  return (
    <SpotlightContainer className="min-h-screen bg-gray-950 text-gray-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]" />
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">SecureGuard Antivirus</h1>
            <p className="text-cyan-400/60">Advanced Protection for Your Files</p>
          </div>

          {/* Main Content */}
          <Card className="p-8 mb-8">
            {/* File Upload Section */}
            {!isScanning && !scanComplete && (
              <div className="text-center">
                <div className="mb-6">
                  <FileUpload onFileSelect={handleFileSelect} />
                </div>
                {selectedFile && (
                  <div className="mb-6">
                    <p className="text-sm text-cyan-400/60">Selected: {selectedFile.name}</p>
                    <button
                      onClick={startScan}
                      className="mt-4 px-8 py-3 bg-cyan-600 text-white rounded-lg 
                        transform transition-all duration-300
                        shadow-[0_0_20px_rgba(34,211,238,0.3)]
                        hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]
                        hover:bg-cyan-500 hover:scale-105
                        active:scale-95"
                    >
                      Start Scan
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Scanning Animation */}
            {(isScanning || scanComplete) && (
              <div className="text-center">
                <ScanningAnimation isScanning={isScanning} progress={progress} />
              </div>
            )}

            {/* Results Section */}
            {scanComplete && scanResult && (
              <div className="mt-8">
                <ScanResult 
                  threats={scanResult.threats}
                  fileName={scanResult.fileName}
                  fileSize={scanResult.fileSize}
                  timestamp={scanResult.timestamp}
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </SpotlightContainer>
  );
}

export default App;
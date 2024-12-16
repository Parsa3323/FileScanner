import React from 'react';
import { Shield, CheckCircle, XCircle, FileText, Clock } from 'lucide-react';
import { Card } from './Card';
import type { Threat } from '../types/scanner';

interface ScanResultProps {
  threats: Threat[];
  fileName: string;
  fileSize: number;
  timestamp: string;
}

export const ScanResult = ({ threats, fileName, fileSize, timestamp }: ScanResultProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimestamp = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-cyan-300">Scan Results</h3>
        <Shield className="w-6 h-6 text-cyan-400" />
      </div>

      {/* File Information */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
        <div className="flex items-center gap-4 mb-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span className="text-gray-200">{fileName}</span>
        </div>
        <div className="flex items-center gap-4">
          <Clock className="w-5 h-5 text-cyan-400" />
          <div className="text-sm text-gray-400">
            <div>Size: {formatFileSize(fileSize)}</div>
            <div>Scanned: {formatTimestamp(timestamp)}</div>
          </div>
        </div>
      </div>
      
      {/* Threats List */}
      <div className="space-y-3">
        {threats.length === 0 ? (
          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-800/50">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400">No threats detected</p>
          </div>
        ) : (
          threats.map((threat, index) => (
            <div key={index} 
              className="flex items-center justify-between p-4 rounded-md
                bg-gray-800/50 backdrop-blur-sm
                border border-gray-700/50
                hover:border-gray-600/50 transition-colors">
              <div>
                <p className="font-medium text-gray-200">{threat.name}</p>
                <span className={`text-sm ${
                  threat.severity === 'high' ? 'text-red-400' :
                  threat.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)} Risk
                </span>
                {threat.details && (
                  <p className="text-sm text-gray-400 mt-1">{threat.details}</p>
                )}
              </div>
              {threat.status === 'cleaned' ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
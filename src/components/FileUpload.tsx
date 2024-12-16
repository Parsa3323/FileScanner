import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="text-center">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="*/*"
      />
      <button
        onClick={handleClick}
        className="inline-flex items-center px-6 py-3 
          border-2 border-dashed border-cyan-800 rounded-lg
          hover:border-cyan-600 transition-all duration-300
          group relative overflow-hidden"
      >
        <Upload className="w-6 h-6 mr-2 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
        <span className="text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
          Select file to scan
        </span>
      </button>
    </div>
  );
};
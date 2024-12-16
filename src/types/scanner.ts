export type Severity = 'low' | 'medium' | 'high';
export type Status = 'detected' | 'cleaned';

export interface Threat {
  name: string;
  severity: Severity;
  status: Status;
  details?: string;
}

export interface FileSignature {
  pattern: RegExp;
  name: string;
  severity: Severity;
}

export interface FileAnalysisResult {
  fileName: string;
  fileSize: number;
  scanComplete: boolean;
  threats: Threat[];
  timestamp: string;
}
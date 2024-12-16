import { FileAnalysisResult, Threat, FileSignature } from '../types/scanner';

// Common malicious file signatures
const KNOWN_SIGNATURES: FileSignature[] = [
  { pattern: /eval\(\w+\)/, name: 'Suspicious eval() usage', severity: 'high' },
  { pattern: /<script>[^<>]+<\/script>/, name: 'Embedded Script', severity: 'medium' },
  { pattern: /document\.cookie/i, name: 'Cookie Access', severity: 'low' },
  { pattern: /base64_decode|eval\(base64_decode/, name: 'Base64 Encoded Content', severity: 'high' },
  { pattern: /shell_exec|system\(|exec\(/, name: 'Shell Command Execution', severity: 'high' },
  { pattern: /\.exe$|\.dll$/, name: 'Executable File', severity: 'medium' },
];

export const scanFile = async (file: File): Promise<FileAnalysisResult> => {
  const threats: Threat[] = [];
  const reader = new FileReader();

  try {
    // Read file content
    const content = await new Promise<string>((resolve, reject) => {
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });

    // Check file size
    if (file.size > 50 * 1024 * 1024) { // 50MB
      threats.push({
        name: 'Large File Size',
        severity: 'medium',
        status: 'detected',
        details: 'File exceeds recommended size limit'
      });
    }

    // Check file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension && ['exe', 'dll', 'bat', 'cmd', 'vbs'].includes(fileExtension)) {
      threats.push({
        name: 'Suspicious File Extension',
        severity: 'high',
        status: 'detected',
        details: `${fileExtension.toUpperCase()} files may be harmful`
      });
    }

    // Scan for known signatures
    for (const signature of KNOWN_SIGNATURES) {
      if (signature.pattern.test(content)) {
        threats.push({
          name: signature.name,
          severity: signature.severity,
          status: 'detected',
          details: 'Matched known malicious pattern'
        });
      }
    }

    // Check for encrypted/encoded content
    const encodedContentCheck = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    if (encodedContentCheck.test(content.trim())) {
      threats.push({
        name: 'Encoded Content',
        severity: 'medium',
        status: 'detected',
        details: 'File contains encoded content'
      });
    }

    return {
      fileName: file.name,
      fileSize: file.size,
      scanComplete: true,
      threats: threats,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Scan failed:', error);
    return {
      fileName: file.name,
      fileSize: file.size,
      scanComplete: false,
      threats: [{
        name: 'Scan Error',
        severity: 'high',
        status: 'detected',
        details: 'Unable to analyze file content'
      }],
      timestamp: new Date().toISOString()
    };
  }
};
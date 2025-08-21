import { Component } from '@angular/core';

export interface ScanResult {
  content: string;
  type: 'url' | 'json' | 'text';
  timestamp: Date;
  formattedContent?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QR Scanner App';
  scanResult: ScanResult | null = null;
  isScanning = true;
  error: string | null = null;

  onScanSuccess(result: string) {
    try {
      this.isScanning = false;
      this.error = null;
      
      // Try to parse as JSON first
      let parsedContent;
      let type: 'url' | 'json' | 'text' = 'text';
      
      try {
        parsedContent = JSON.parse(result);
        type = 'json';
      } catch {
        // Check if it's a URL
        if (this.isValidUrl(result)) {
          type = 'url';
          // Open URL in new tab
          window.open(result, '_blank');
        }
      }

      this.scanResult = {
        content: result,
        type,
        timestamp: new Date(),
        formattedContent: parsedContent
      };
    } catch (err) {
      this.error = 'Error processing scan result';
      console.error('Scan processing error:', err);
    }
  }

  onScanError(error: any) {
    this.error = 'Scanner error: ' + (error?.message || 'Unknown error');
    console.error('Scanner error:', error);
  }

  onRescan() {
    this.isScanning = true;
    this.scanResult = null;
    this.error = null;
  }

  onDownload() {
    if (!this.scanResult) return;

    const data = {
      content: this.scanResult.content,
      type: this.scanResult.type,
      timestamp: this.scanResult.timestamp.toISOString(),
      formattedContent: this.scanResult.formattedContent
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qr-scan-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private isValidUrl(string: string): boolean {
    try {
      const url = new URL(string);
      // Check if it has a valid protocol (http, https, ftp, etc.)
      return ['http:', 'https:', 'ftp:', 'mailto:', 'tel:'].includes(url.protocol);
    } catch (_) {
      return false;
    }
  }
}

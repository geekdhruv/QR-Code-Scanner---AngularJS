import { Component, Input } from '@angular/core';
import { ScanResult } from '../app.component';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent {
  @Input() scanResult!: ScanResult;

  get isUrl(): boolean {
    return this.scanResult.type === 'url';
  }

  get isJson(): boolean {
    return this.scanResult.type === 'json';
  }

  get isText(): boolean {
    return this.scanResult.type === 'text';
  }

  get formattedJson(): string {
    if (this.isJson && this.scanResult.formattedContent) {
      return JSON.stringify(this.scanResult.formattedContent, null, 2);
    }
    return '';
  }

  get contentTypeIcon(): string {
    switch (this.scanResult.type) {
      case 'url':
        return 'fas fa-link';
      case 'json':
        return 'fas fa-code';
      case 'text':
        return 'fas fa-file-alt';
      default:
        return 'fas fa-file';
    }
  }

  get contentTypeLabel(): string {
    switch (this.scanResult.type) {
      case 'url':
        return 'URL';
      case 'json':
        return 'JSON Data';
      case 'text':
        return 'Text';
      default:
        return 'Unknown';
    }
  }

  get contentTypeColor(): string {
    switch (this.scanResult.type) {
      case 'url':
        return 'text-blue-600';
      case 'json':
        return 'text-green-600';
      case 'text':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  }

  openUrl() {
    if (this.isUrl) {
      window.open(this.scanResult.content, '_blank');
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.scanResult.content).then(() => {
      // Could add a toast notification here
      console.log('Content copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy content: ', err);
    });
  }
}

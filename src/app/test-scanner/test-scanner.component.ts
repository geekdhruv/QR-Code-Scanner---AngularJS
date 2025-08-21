import { Component } from '@angular/core';
import { ScanResult } from '../app.component';

@Component({
  selector: 'app-test-scanner',
  templateUrl: './test-scanner.component.html',
  styleUrls: ['./test-scanner.component.css']
})
export class TestScannerComponent {
  testResults: ScanResult[] = [
    {
      content: 'https://www.google.com',
      type: 'url',
      timestamp: new Date(),
      formattedContent: null
    },
    {
      content: JSON.stringify({ name: 'John Doe', age: 30, city: 'New York' }, null, 2),
      type: 'json',
      timestamp: new Date(),
      formattedContent: { name: 'John Doe', age: 30, city: 'New York' }
    },
    {
      content: 'Hello World! This is a test QR code content.',
      type: 'text',
      timestamp: new Date(),
      formattedContent: null
    }
  ];

  currentResult: ScanResult | null = null;
  showResults = false;

  simulateScan(type: 'url' | 'json' | 'text') {
    this.currentResult = this.testResults.find(r => r.type === type) || null;
    this.showResults = true;
    
    // Simulate URL opening
    if (type === 'url' && this.currentResult) {
      setTimeout(() => {
        window.open(this.currentResult!.content, '_blank');
      }, 500);
    }
  }

  resetTest() {
    this.currentResult = null;
    this.showResults = false;
  }
}

import { Component, EventEmitter, Output, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-qr-scanner-fallback',
  templateUrl: './qr-scanner-fallback.component.html',
  styleUrls: ['./qr-scanner-fallback.component.css']
})
export class QrScannerFallbackComponent implements OnInit, OnDestroy {
  @Output() scanSuccess = new EventEmitter<string>();
  @Output() scanError = new EventEmitter<any>();
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;

  hasDevices = false;
  hasPermission = false;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;
  isScanning = false;
  permissionError = false;
  stream: MediaStream | null = null;
  scanInterval: any = null;

  ngOnInit() {
    this.checkPermissions();
  }

  ngOnDestroy() {
    this.stopScanning();
  }

  async checkPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      this.hasPermission = true;
      this.permissionError = false;
      this.getAvailableDevices();
    } catch (error) {
      this.hasPermission = false;
      this.permissionError = true;
      this.scanError.emit({ message: 'Camera permission denied. Please allow camera access to scan QR codes.' });
    }
  }

  async getAvailableDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableDevices = devices.filter(device => device.kind === 'videoinput');
      this.hasDevices = this.availableDevices.length > 0;
      
      if (this.availableDevices.length > 0) {
        this.selectedDevice = this.availableDevices[0];
      }
    } catch (error) {
      console.error('Error getting devices:', error);
      this.scanError.emit({ message: 'Error accessing camera devices.' });
    }
  }

  onDeviceSelectChange(event: any) {
    const deviceId = event.target.value;
    this.selectedDevice = this.availableDevices.find(device => device.deviceId === deviceId);
    if (this.isScanning) {
      this.stopScanning();
      this.startScanning();
    }
  }

  async startScanning() {
    if (!this.selectedDevice) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: this.selectedDevice.deviceId ? { exact: this.selectedDevice.deviceId } : undefined
        }
      });

      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
        this.videoElement.nativeElement.play();
        this.isScanning = true;
        
        // Start scanning loop
        this.scanInterval = setInterval(() => {
          this.scanFrame();
        }, 1000); // Scan every second
      }
    } catch (error) {
      console.error('Error starting scanner:', error);
      this.scanError.emit({ message: 'Error starting camera scanner.' });
    }
  }

  stopScanning() {
    this.isScanning = false;
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.videoElement && this.videoElement.nativeElement) {
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  scanFrame() {
    if (!this.videoElement || !this.canvasElement || !this.isScanning) return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (!context || video.videoWidth === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // For now, we'll simulate QR detection
    // In a real implementation, you would use a QR code library here
    this.simulateQRDetection();
  }

  simulateQRDetection() {
    // This is a placeholder for actual QR code detection
    // In a real implementation, you would use a library like jsQR or similar
    // For now, we'll just emit a test result after a few seconds
    if (Math.random() < 0.1) { // 10% chance per scan
      const testData = {
        url: 'https://example.com',
        json: JSON.stringify({ test: 'data', timestamp: new Date().toISOString() }),
        text: 'Hello World!'
      };
      
      const testTypes = ['url', 'json', 'text'];
      const randomType = testTypes[Math.floor(Math.random() * testTypes.length)];
      const testResult = testData[randomType as keyof typeof testData];
      
      this.scanSuccess.emit(testResult);
      this.stopScanning();
    }
  }

  async requestPermission() {
    try {
      await this.checkPermissions();
    } catch (error) {
      this.scanError.emit({ message: 'Failed to request camera permission.' });
    }
  }
}

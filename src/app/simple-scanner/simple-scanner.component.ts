import { Component, EventEmitter, Output, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-simple-scanner',
  templateUrl: './simple-scanner.component.html',
  styleUrls: ['./simple-scanner.component.css']
})
export class SimpleScannerComponent implements OnInit, OnDestroy {
  @Output() scanSuccess = new EventEmitter<string>();
  @Output() scanError = new EventEmitter<any>();

  hasPermission = false;
  permissionError = false;
  isScanning = false;
  stream: MediaStream | null = null;
  videoElement: HTMLVideoElement | null = null;
  canvasElement: HTMLCanvasElement | null = null;
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
    } catch (error) {
      this.hasPermission = false;
      this.permissionError = true;
      this.scanError.emit({ message: 'Camera permission denied. Please allow camera access.' });
    }
  }

  async startScanning() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement = document.getElementById('scanner-video') as HTMLVideoElement;
      this.canvasElement = document.getElementById('scanner-canvas') as HTMLCanvasElement;
      
      if (this.videoElement && this.canvasElement) {
        this.videoElement.srcObject = this.stream;
        this.videoElement.play();
        this.isScanning = true;
        
        // Start scanning loop
        this.scanInterval = setInterval(() => {
          this.scanFrame();
        }, 100); // Scan every 100ms for better responsiveness
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
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
  }

  scanFrame() {
    if (!this.videoElement || !this.canvasElement || !this.isScanning) return;

    const video = this.videoElement;
    const canvas = this.canvasElement;
    const context = canvas.getContext('2d');

    if (!context || video.videoWidth === 0) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data for QR detection
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Use jsQR to detect QR codes
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      console.log('QR Code detected:', code.data);
      this.scanSuccess.emit(code.data);
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

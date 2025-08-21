import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit, OnDestroy {
  @Output() scanSuccess = new EventEmitter<string>();
  @Output() scanError = new EventEmitter<any>();

  hasDevices = false;
  hasPermission = false;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;
  isScanning = false;
  permissionError = false;

  ngOnInit() {
    this.checkPermissions();
  }

  ngOnDestroy() {
    this.stopScanning();
  }

  async checkPermissions() {
    try {
      // Check if we have permission to access camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      this.hasPermission = true;
      this.permissionError = false;
    } catch (error) {
      this.hasPermission = false;
      this.permissionError = true;
      this.scanError.emit({ message: 'Camera permission denied. Please allow camera access to scan QR codes.' });
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    this.hasDevices = devices.length > 0;
    
    if (devices.length > 0) {
      // Select the first available camera
      this.selectedDevice = devices[0];
      this.isScanning = true;
    }
  }

  onDeviceSelectChange(event: any) {
    const deviceId = event.target.value;
    this.selectedDevice = this.availableDevices.find(device => device.deviceId === deviceId);
  }

  onScanSuccess(result: any) {
    if (result && typeof result === 'string') {
      this.isScanning = false;
      this.scanSuccess.emit(result);
    } else if (result && result.getText && typeof result.getText === 'function') {
      this.isScanning = false;
      this.scanSuccess.emit(result.getText());
    }
  }

  onScanError(error: any) {
    console.error('Scanner error:', error);
    this.scanError.emit(error);
  }

  onScanFailure(error: any) {
    console.error('Scan failure:', error);
    // Don't emit error for scan failures, just log them
  }

  stopScanning() {
    this.isScanning = false;
  }

  async requestPermission() {
    try {
      await this.checkPermissions();
    } catch (error) {
      this.scanError.emit({ message: 'Failed to request camera permission.' });
    }
  }
}

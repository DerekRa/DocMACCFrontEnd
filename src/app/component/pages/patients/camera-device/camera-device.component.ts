import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera-device',
  templateUrl: './camera-device.component.html',
  styleUrls: ['./camera-device.component.scss'],
})
export class CameraDeviceComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  capturedImage: string = '';
  startCapture: boolean = false;
  startCaptureHidden: boolean = true;

  ngAfterViewInit() {
    // this.startCamera();
  }

  startCamera() {
    this.startCapture = true;
    this.startCaptureHidden = false;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream: MediaStream) => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing camera: ', err);
      });
  }

  capture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video feed
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data as a Data URL (base64 string)
    this.capturedImage = canvas.toDataURL('image/png');

    // The image data can now be displayed or downloaded
    // For direct download, the user can click the link provided in the HTML
  }
}

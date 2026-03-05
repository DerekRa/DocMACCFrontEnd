import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CustomHttpResponse } from 'src/app/model/interface/shared/custom-http-response';
import { AlertService } from 'src/app/service/_alert/alert.service';
import { ProfileModelService } from 'src/app/service/clientProfile/profile-model.service';

@Component({
  selector: 'app-camera-device',
  templateUrl: './camera-device.component.html',
  styleUrls: ['./camera-device.component.scss'],
})
export class CameraDeviceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  capturedImage: string = '';
  startCapture: boolean = false;
  startCaptureHidden: boolean = true;
  mediaStream: MediaStream | null = null; // store reference to close it
  @Input() id!: string;
  @Output() pictureCaptured = new EventEmitter<{
    dataUrl: string;
    file: File;
  }>();
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  ngAfterViewInit() {
    // this.startCamera();
  }

  ngOnDestroy() {
    // stop camera stream and release resources when component is destroyed
    this.stopCamera();
  }

  constructor(
    private profileModelService: ProfileModelService,
    public alertService: AlertService,
  ) {}

  startCamera() {
    this.startCapture = true;
    this.startCaptureHidden = false;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream: MediaStream) => {
        this.mediaStream = stream; // store reference
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.style.width = '100%';
        this.videoElement.nativeElement.style.height = 'auto';
        this.videoElement.nativeElement.play();
      })
      .catch((err) => {
        console.error('Error accessing camera: ', err);
      });
  }

  /**
   * Stop camera stream and reset UI state
   */
  stopCamera() {
    if (this.mediaStream) {
      // stop all tracks in the stream
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    this.startCapture = false;
    this.startCaptureHidden = true;
    this.capturedImage = '';
  }

  capture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video feed
    canvas.width = video.videoWidth - 100; // adjust as needed for cropping
    canvas.height = video.videoHeight - 100; // adjust as needed for cropping

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data as a Data URL (base64 string)
    this.capturedImage = canvas.toDataURL('image/png');

    const file = this.dataURLtoFile(this.capturedImage, 'captured-image.png');
    console.log('Generated File object:', file);

    // emit to parent component so it can update preview or upload
    this.pictureCaptured.emit({ dataUrl: this.capturedImage, file });

    // The image data can now be displayed or downloaded
    // For direct download, the user can click the link provided in the HTML
  }

  /**
   * Convert a data URL (base64 string) to a File instance.
   * @param dataUrl the data URL to convert
   * @param filename the desired filename for the resulting File
   */
  dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}

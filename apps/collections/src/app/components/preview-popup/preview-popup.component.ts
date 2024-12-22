import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface PreviewPhoto {
  urls: {
    regular: string;
  };
  alt_description?: string;
}

@Component({
  selector: 'app-preview-popup',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './preview-popup.component.html',
  styleUrls: ['./preview-popup.component.scss']
})
export class PreviewPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: PreviewPhoto) {}
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-download-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './download-form.component.html',
  styleUrl: './download-form.component.scss'
})
export class DownloadFormComponent {
  fileName = new FormControl('');

  @Output() downloadHtmlEvent = new EventEmitter<string>();

  downloadHtml() {
    if (this.fileName.value) {
      this.downloadHtmlEvent.emit(this.fileName.value);
    } else {
      this.downloadHtmlEvent.emit('unnamed');
    }
  }
}

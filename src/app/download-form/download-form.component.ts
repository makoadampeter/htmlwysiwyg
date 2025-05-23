import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-download-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule],
  templateUrl: './download-form.component.html',
  styleUrl: './download-form.component.scss'
})
export class DownloadFormComponent {
  fileName = new FormControl('');

  @Output() downloadHtmlEvent = new EventEmitter<string>();

  @Output() errorEvent = new EventEmitter();

  downloadHtml($event: Event) {
    $event.preventDefault();
    if (this.fileName.value) {
      this.errorEvent.emit(false);
      this.downloadHtmlEvent.emit(this.fileName.value);
    } else {
      this.errorEvent.emit(true);
    }
  }
}

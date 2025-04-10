import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';
import { Format } from '../types/Format';

@Component({
  selector: 'app-toolbar',
  imports: [MatButtonToggleModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @ViewChild('buttonBold') buttonBold!: MatButtonToggle;
  @ViewChild('buttonItalic') buttonItalic!: MatButtonToggle;
  @ViewChild('buttonUnderline') buttonUnderline!: MatButtonToggle;
  
  @Input({ required: true }) selectionFormat!: Format;

  @Output() formatTextEvent = new EventEmitter<string>();

  ngOnChanges() {
    this.buttonBold.checked = this.selectionFormat.bold;
    this.buttonItalic.checked = this.selectionFormat.italic;
    this.buttonUnderline.checked = this.selectionFormat.underline;
  }

  formatText(command: string) {
    console.log(this.selectionFormat);
    this.formatTextEvent.emit(command);
  }
}

import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';
import { Format } from '../interfaces/Format';

@Component({
  selector: 'app-toolbar',
  imports: [MatButtonToggleModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  @ViewChild('buttonBold') buttonBold!: MatButtonToggle;
  @ViewChild('buttonItalic') buttonItalic!: MatButtonToggle;
  @ViewChild('buttonUnderline') buttonUnderline!: MatButtonToggle;
  
  @Input({ required: true }) selectionFormat!: Format;

  @Output() formatTextEvent = new EventEmitter<string>();

  initialized: boolean = false;

  ngOnInit() {
    this.initialized = true;
  }

  ngOnChanges() {
    if (this.initialized) {
      this.buttonBold.checked = this.selectionFormat.bold;
      this.buttonItalic.checked = this.selectionFormat.italic;
      this.buttonUnderline.checked = this.selectionFormat.underline;
    }
  }

  formatText(command: string) {
    console.log(this.selectionFormat);
    this.formatTextEvent.emit(command);
  }
}

import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MatButtonToggleModule, MatButtonToggle } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { Format } from '../interfaces/Format';
import { Command } from '../interfaces/Command';

@Component({
  selector: 'app-toolbar',
  imports: [MatFormFieldModule, MatSelectModule, MatButtonToggleModule, MatToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  @ViewChild('buttonBold') buttonBold!: MatButtonToggle;
  @ViewChild('buttonItalic') buttonItalic!: MatButtonToggle;
  @ViewChild('buttonUnderline') buttonUnderline!: MatButtonToggle;
  @ViewChild('selectHeading') selectHeading!: MatSelect;
  
  @Input({ required: true }) selectionFormat!: Format;

  @Output() formatTextEvent = new EventEmitter<Command>();

  @Output() selectClickEvent = new EventEmitter();

  initialized: boolean = false;

  ngOnInit() {
    this.initialized = true;
  }

  ngOnChanges() {
    if (this.initialized) {
      this.buttonBold.checked = this.selectionFormat.bold;
      this.buttonItalic.checked = this.selectionFormat.italic;
      this.buttonUnderline.checked = this.selectionFormat.underline;
      this.selectHeading.value = this.selectionFormat.tag;
    }
  }

  formatText(commandName: string, parameter?: string) {
    console.log(this.selectionFormat);
    let command: Command = {
      name: commandName,
      parameter: parameter
    };
    this.formatTextEvent.emit(command);
    console.log("formatText(", command.name, ", ", command.parameter, ")")
  }

  handleSelectClick() {
    this.selectClickEvent.emit();
  }
}

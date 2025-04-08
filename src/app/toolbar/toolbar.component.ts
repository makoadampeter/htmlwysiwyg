import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-toolbar',
  imports: [MatButtonToggleModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() formatTextEvent = new EventEmitter<string>();

  formatText(command: string) {
    this.formatTextEvent.emit(command);
  }
}

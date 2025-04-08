import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { StageComponent } from '../stage/stage.component';

@Component({
  selector: 'app-editor',
  imports: [ToolbarComponent, StageComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  ngOnInit() {
    
  }

  formatText(command: string, value: string = '') {
    document.execCommand(command, false, value);
  }
}

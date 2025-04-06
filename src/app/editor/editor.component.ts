import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { StageComponent } from '../stage/stage.component';

@Component({
  selector: 'app-editor',
  imports: [MatCard, MatCardContent, ToolbarComponent, StageComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

}

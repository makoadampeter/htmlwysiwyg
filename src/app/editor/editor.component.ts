import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { StageComponent } from '../stage/stage.component';

@Component({
  selector: 'app-editor',
  imports: [ToolbarComponent, StageComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  static readonly htmlprefix: string = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Htmlwysiwyg</title>
      <style>
        html {
          all: unset;
          margin: 0;
          border: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }

        body {
          overflow: auto;
        }
      </style>
    </head>
    <body>`;

  static readonly htmlpostfix: string = `
    </body>
    </html>
  `;

  htmlContent: string = `
    <h1>Placeholder HTML</h1>
    Start editing!
  `;

  formatText(command: string, value: string = '') {
    document.execCommand(command, false, value);
  }
}

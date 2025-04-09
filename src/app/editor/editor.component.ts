import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { StageComponent } from '../stage/stage.component';
import { Format } from '../types/Format';

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

  selectionFormat: Format = {
    bold: false,
    italic: false,
    underline: false
  }

  formatText(command: string, value: string = '') {
    document.execCommand(command, false, value);
  }

  setSelectionFormat(format: Format) {
    this.selectionFormat = {
      bold: !format.bold,
      italic: !format.italic,
      underline: !format.underline
    };
    console.log("negated: " + this.selectionFormat);
      this.selectionFormat = {...format};
      console.log("final: " + this.selectionFormat);
  }
}

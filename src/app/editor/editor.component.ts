import { Component, HostListener } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { StageComponent } from '../stage/stage.component';
import { Format } from '../interfaces/Format';
import { DownloadFormComponent } from "../download-form/download-form.component";
import { Command } from '../interfaces/Command';

@Component({
  selector: 'app-editor',
  imports: [ToolbarComponent, StageComponent, DownloadFormComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent): string | void {
    if (this.isHtmlContentDirty) {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes! Are you sure you want to leave?';
      return event.returnValue;
    }
  }

  static readonly HTMLPREFIX: string = `
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

  static readonly HTMLPOSTFIX: string = `
    </body>
    </html>
  `;

  htmlContent: string = `
    <h1>Placeholder HTML</h1>
    <p>Start editing!</p>
  `;

  isHtmlContentDirty: boolean = false;

  selectionRange: Range | undefined = undefined;

  selectionFormat: Format = {
    bold: false,
    italic: false,
    underline: false,
    heading: 0
  }

  onHtmlContentChange() {
    this.isHtmlContentDirty = true;
  }

  formatText(command: Command) {
    if (command.parameter) {
      document.execCommand(command.name, false, command.parameter);
    } else {
      document.execCommand(command.name, false);
    }
    this.saveSelection();
  }

  setSelectionFormat(format: Format) {
    this.selectionFormat = {...format};
  }

  downloadHtml(filename: string) {
    const html = EditorComponent.HTMLPREFIX + this.htmlContent + EditorComponent.HTMLPOSTFIX;
    this.download(filename + '.html', html);
  }

  download(filename: string, text: string) {
    console.log("Downloading " + filename);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  saveSelection() {
    let range = window.getSelection()?.getRangeAt(0);
    this.selectionRange = range;
    console.log("Saved " + this.selectionRange);
  }

  restoreSelection() {
    if (this.selectionRange) {
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(this.selectionRange);
      console.log("Restored " + this.selectionRange);
    }
  }
}

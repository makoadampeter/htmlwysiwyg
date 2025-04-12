import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Format } from "../interfaces/Format";
import { Command } from '../interfaces/Command';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss'
})

export class StageComponent implements AfterViewInit {
  @Input() content = '';
  @Output() contentChange = new EventEmitter();

  @Output() selectionFormatChange = new EventEmitter<Format>();

  @Output() selectionRangeChange = new EventEmitter();

  @Output() formatTextEvent = new EventEmitter();

  @ViewChild('stage') stage!: ElementRef;

  ngAfterViewInit() {
    this.stage.nativeElement.innerHTML = this.content;
  }

  handleInput() {
    this.contentChange.emit(this.stage.nativeElement.innerHTML);
  }

  handleKeyDown($event: KeyboardEvent) {
    const format: Format = this.getSelectionFormat();

    if ($event.key === "Enter") {
      setTimeout(() => {
        let command: Command = {
          name: 'formatBlock',
          parameter: format.tag
        }
        this.formatText(command.name, command.parameter);
      });
    }
    this.selectionFormatChange.emit(format);
    this.selectionRangeChange.emit();
  }

  formatText(commandName: string, parameter?: string) {
      let command: Command = {
        name: commandName,
        parameter: parameter
      };
      this.formatTextEvent.emit(command);
    }

  handleSelect() {
    const format: Format = this.getSelectionFormat();
    this.selectionFormatChange.emit(format);
    this.selectionRangeChange.emit();
  }

  private getSelectionFormat(): Format {
    const selection = window.getSelection();
    
    return this.getFormat((selection!.anchorNode!).parentElement!);
  }
  
  private getFormat(element: HTMLElement): Format {
    let tag: string = "P";
    
    let heading: string | undefined = element.closest('H1, H2, H3, H4, H5, H6')?.tagName;
    if (heading) {
      tag = heading;
    }

    let res: Format = {
      bold: parseInt(window.getComputedStyle(element).fontWeight) >= 700,
      italic: window.getComputedStyle(element).fontStyle.includes('italic'),
      underline: window.getComputedStyle(element).textDecoration.includes('underline'),
      tag: tag
    };

    return res;
  }
}

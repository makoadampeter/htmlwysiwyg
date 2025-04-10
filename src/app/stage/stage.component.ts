import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Format } from "../types/Format";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss'
})

export class StageComponent implements AfterViewInit {
  @Input() content = '';
  @Output() contentChange = new EventEmitter();

  @Output() selectionFormatChange = new EventEmitter<Format>();

  @ViewChild('stage') stage!: ElementRef;

  ngAfterViewInit() {
    this.stage.nativeElement.innerHTML = this.content;
  }

  onEdit() {
    this.contentChange.emit(this.stage.nativeElement.innerHTML);
  }

  handleSelect() {
    console.log("Checking format...");

    const format: Format = this.getSelectionFormat();
    console.log(format);
    this.selectionFormatChange.emit(format);
  }

  private getSelectionFormat(): Format {
    const selection = window.getSelection();
    
    return this.getFormat((selection!.anchorNode!).parentElement!);
  }
  
  private getFormat(element: HTMLElement): Format {
    let res: Format = {
      bold : parseInt(window.getComputedStyle(element).fontWeight) >= 700,
      italic: window.getComputedStyle(element).fontStyle.includes('italic'),
      underline: window.getComputedStyle(element).textDecoration.includes('underline')
    };

    return res;
  }
}

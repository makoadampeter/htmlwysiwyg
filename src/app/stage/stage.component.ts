import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Format } from "../interfaces/Format";

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
    console.log("Format ", format);
    this.selectionFormatChange.emit(format);
    this.selectionRangeChange.emit();
  }

  private getSelectionFormat(): Format {
    const selection = window.getSelection();
    
    return this.getFormat((selection!.anchorNode!).parentElement!);
  }
  
  private getFormat(element: HTMLElement): Format {
    let heading: number;

    switch (element.closest('H1, H2, H3, H4, H5, H6')?.tagName) {
      case "H1":
        heading = 1;
        break;
      case "H2":
        heading = 2;
        break;
      case "H3":
        heading = 3;
        break;
      case "H4":
        heading = 4;
        break;
      case "H5":
        heading = 5;
        break;
      case "H6":
        heading = 6;
        break;
      default:
        heading = 0;
        break;
    }

    let res: Format = {
      bold : parseInt(window.getComputedStyle(element).fontWeight) >= 700,
      italic: window.getComputedStyle(element).fontStyle.includes('italic'),
      underline: window.getComputedStyle(element).textDecoration.includes('underline'),
      heading: heading
    };

    return res;
  }
}

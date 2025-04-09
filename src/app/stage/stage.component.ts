import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss'
})

export class StageComponent implements AfterViewInit {
  @Input() content = '';
  @Output() contentChange = new EventEmitter();

  @ViewChild('stage') stage!: ElementRef;

  ngAfterViewInit() {
    this.stage.nativeElement.innerHTML = this.content;
  }

  onEdit() {
    this.contentChange.emit(this.stage.nativeElement.innerHTML);
  }

  logFormat() {
    console.log("Checking format...");

    console.log(this.getSelectionFormat());
  }

  getSelectionFormat(): Format | null {
    const selection = window.getSelection();
    if (!selection) return null;
    
    return this.getFormat((selection.anchorNode!).parentElement!);
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

type Format = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}
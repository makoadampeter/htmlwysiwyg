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

  checkFormat() {
    console.log("Checking format...");

    console.log("Beginning of selection is bold: " + this.isSelectionBold());
  }

  isSelectionBold(): boolean {
    const selection = window.getSelection();
    if (!selection) return false;
    
    return this.getFormat((selection.anchorNode!).parentElement!);
  }
  
  private getParentElement(node: Node): HTMLElement {
    return node.nodeType === Node.ELEMENT_NODE 
      ? node as HTMLElement 
      : node.parentElement!;
  }
  
  private getFormat(element: HTMLElement): boolean {
    return parseInt(window.getComputedStyle(element).fontWeight) >= 700;
  }
}

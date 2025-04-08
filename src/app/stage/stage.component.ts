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

  input() {
    this.contentChange.emit(this.stage.nativeElement.innerHTML);
  }
}

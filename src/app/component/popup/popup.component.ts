import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input()
  popupTitle = '';


  @ViewChild('popup') popup: ElementRef;

  @Output()
  onPopupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
    
  }

  ngOnInit(): void {
  }

  click(event: Event): void {
    if (this.popup.nativeElement === event.target) {
      this.onPopupClosed.emit(true)
    }
  }
}

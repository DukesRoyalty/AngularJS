import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input()
  options: TabOption[] = [];

  @Output()
  optionSelected: EventEmitter<TabOption[]> = new EventEmitter<TabOption[]>();

  constructor() { }

  ngOnInit(): void {
    if(this.options.length && !this.options.some(option => option.active)) {
      this.options[0].active = true;
    }
  }

  onClick(option: TabOption) {
    this.options.forEach(option => option.active = false);
    option.active = true;
    this.optionSelected.emit(this.options);
  }

}


export interface TabOption {
  id: string;
  tabTitle: string;
  active?: boolean;
}
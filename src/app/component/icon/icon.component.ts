import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input()
  icon?: string;

  @Input()
  bgcolor?: 'transparent' |'octane' | 'green' | 'orange' | 'blue' | 'red' = 'transparent';

  @Input()
  fgcolor?: 'white' |'gray' | 'green' | 'red' | 'orange' = 'white';


  constructor() { }

  ngOnInit(): void {
  }

}

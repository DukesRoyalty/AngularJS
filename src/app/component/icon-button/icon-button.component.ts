import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {

  @Input()
  text: string = '';

  @Input()
  icon: string = '';

  @Input()
  bgcolor?: 'transparent' |'octane' | 'green' | 'orange' | 'blue' | 'red' | 'gray' = 'octane';

  @Input()
  fgcolor?: 'white' |'gray' | 'green' | 'red' | 'orange' | 'octane' = 'white';


  @Input()
  size?: 'small' | 'medium' | 'big' = 'medium';

  @Input()
  disable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

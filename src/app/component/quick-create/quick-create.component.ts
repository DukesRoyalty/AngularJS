import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-quick-create',
  templateUrl: './quick-create.component.html',
  styleUrls: ['./quick-create.component.css']
})
export class QuickCreateComponent implements OnInit {

  @Input()
  quickCreateTask: Task;

  constructor() { }

  ngOnInit(): void {
  }

}

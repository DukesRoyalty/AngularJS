import { Component, Input, OnInit } from '@angular/core';
import { Change } from 'src/app/model/change';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {

  @Input()
  change: Change;

  @Input()
  mostRecent?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

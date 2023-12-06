import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  online = true;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

}

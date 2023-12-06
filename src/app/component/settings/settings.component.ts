import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Change } from 'src/app/model/change';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  webhookForm = this.fb.group({
    webhook: ['', Validators.required]
  });
  settingsObject:any = {
    "discord":"",
    "2CaptchaKey":"",
    "timeouts":{
      "error":"4500",
      "delay":"2500"
    },
    "harvesters":[]
  }

  changes: Change[] = [
    {
      version: "2.0.0",
      date: "2020-01-29",
      updates: [
        "lorem ipsum sit amet",
        "lorem ipsum sit amet",
        "lorem ipsum sit amet"
      ]
    },{
      version: "1.0.1",
      date: "2020-01-28",
      updates: [
        "lorem ipsum sit amet",
        "lorem ipsum sit amet",
        "lorem ipsum sit amet"
      ]
    }

  ]

  constructor(private fb: FormBuilder, private storageService: StorageService) { 
    let initialSettings = this.storageService.getSettingsFromDisk() ;
    if(initialSettings && initialSettings.discord){
      this.webhookForm.patchValue({
        webhook:initialSettings.discord
      })
    }
  }

  ngOnInit(): void {
  }

  save(){
    if(this.webhookForm.controls["webhook"].value){
      this.settingsObject.discord = this.webhookForm.controls["webhook"].value
      this.storageService.store("settings", JSON.stringify(this.settingsObject))
    }
  }

  test(){
    if(this.webhookForm.controls["webhook"].value){
    }
  }

}

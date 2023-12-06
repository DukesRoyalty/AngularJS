import { Component } from '@angular/core';
import { IpcRenderer } from 'electron';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello World';

  private ipc: IpcRenderer;
  constructor(private storageService:StorageService) {
    if ((<any>window).require) {
      try {
        console.log(`ipc loadded`)
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
    let initialGroups = this.storageService.getTasksFromDisk()
    if(initialGroups && initialGroups.length > 0 && initialGroups.some(group => group.tasks && group.tasks.length > 0)){
      this.storageService.setInitialTasks(true);
    }
    localStorage.setItem("tasks", JSON.stringify(initialGroups))
    localStorage.setItem("proxies", JSON.stringify(this.storageService.getProxiesFromDisk()))
    localStorage.setItem("profiles", JSON.stringify(this.storageService.getProfilesFromDisk()));
    localStorage.setItem("settings", JSON.stringify(this.storageService.getSettingsFromDisk()));
  }

  openModal(){
    console.log("Open a modal");
    this.ipc.send("openModal");
  }

}

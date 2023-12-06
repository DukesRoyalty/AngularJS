import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  private ipc: IpcRenderer
  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  startTaskMessage(id: string, group: string): void {
    this.ipc.send("startTask", { id, group });
  };

  startTasksByGroupMessage(group: string): void {
    this.ipc.send("startTasksByGroup", group);
  };

  startAllTasksMessage(): void {
    this.ipc.send("startAllTasks");
  };

  stopTaskMessage(id: string, group: string): void {
    this.ipc.send("stopTask", { id, group });
  };

  stopTasksByGroupMessage(group: string): void {
    this.ipc.send("stopTasksByGroup", group);
  };

  stopAllTasksMessage(): void {
    this.ipc.send("stopAllTasks");
  };

  // deleteAllTaskMessage(id: string, group: string): void {
  //   this.ipc.send("stopTaskByIdAndGroup", { id, group, del:true });
  // };

  deleteTaskMessage(id: string, group: string): void {
    this.ipc.send("stopTaskByIdAndGroup", { id, group, del:true });
  };

  deleteTasksByGroupMessage(group: string): void {
    this.ipc.send("stopTasksByGroup", { group, del:true });
  };
}

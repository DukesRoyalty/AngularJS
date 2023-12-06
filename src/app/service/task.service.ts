import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { TaskGroup } from '../model/task-group';
import { StorageService } from './storage.service';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private storageService: StorageService, private electronService: ElectronService) {}

  onTaskGroupSave(group: TaskGroup): void {
    /* determine is we currently have tasks */
    if(JSON.parse(localStorage.getItem("tasks")).length > 0) {
      let currentTasks = this.storageService.getStorageByKey("tasks");

      /* if we have tasks determine if we are adding more to a list */
      if(currentTasks.filter(gro => gro.name === group.name).length > 0) {
        return this.updateTaskGroup(currentTasks, group);
      };

      /* New group */
      currentTasks.push(group);
      this.saveTaskGroupsToMemory(JSON.stringify(currentTasks))
    } else {

      /* First group */
      this.saveTaskGroupsToMemory(JSON.stringify([group]))
    };
  };

  /* update functions */
  /* group */
  updateTaskGroup(groups: TaskGroup[], group: TaskGroup):void {
    groups.forEach(gro => {
      if(gro.name === group.name) {
        gro.tasks = group.tasks;
      }
    })
    this.saveTaskGroupsToMemory(JSON.stringify(groups))
  }
  /* task */
  updateTaskInGroup(groupName: string, task: Task): void {
    /* determine is we currently have tasks */
    let groups = this.getAllTaskGroupsFromMemory();
    let group = groups.filter(gro => gro.name === groupName)[0];
    group.tasks.forEach(ta => {
      if(ta.id === task.id) {
        ta = task;
      }
    });

    this.updateTaskGroup(groups, group);
  };

  /* delete functions */
  /* all */
  deleteAllTaskGroupsFromMemory():void {
    this.storageService.clear("tasks")
    localStorage.setItem("tasks", JSON.stringify([]))
  }
  /* group */
  deleteTaskGroupFromMemory(groupName: string):void {
    let allTaskGroups = this.getAllTaskGroupsFromMemory();
    allTaskGroups = allTaskGroups.filter(group => group.name !== groupName);
    this.electronService.deleteTasksByGroupMessage(groupName)
    this.saveTaskGroupsToMemory(JSON.stringify(allTaskGroups))
  }
  /* task  */
  deleteTaskFromTaskGroupInMemory(groupName: string, task: Task):void {
    let groups = this.getAllTaskGroupsFromMemory();
    let group = groups.filter(gro => gro.name === groupName)[0];
    group.tasks = group.tasks.filter(ta => ta.id !== task.id);
    this.updateTaskGroup(groups, group);
  }

  getAllTaskGroupsFromMemory():TaskGroup[] {
    return this.storageService.getStorageByKey("tasks");
  }

  saveTaskGroupsToMemory(groups: string):void {
    this.storageService.store("tasks", groups)
  }

  /* send call to create tasks and start */
  onTaskStartAll(group:string){
    this.electronService.startTasksByGroupMessage(group)
  }

  onTaskStart(id:string, group:string){
    this.electronService.startTaskMessage(id, group)
  }

  /* send call to call stop tasks listneners */
  onTaskStopAll(group:string){
    this.electronService.stopTasksByGroupMessage(group)
  }

  onTaskStop(id:string, group:string){
    this.electronService.stopTaskMessage(id, group)
  }

}

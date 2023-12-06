import { Component, OnInit, ElementRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskGroup } from 'src/app/model/task-group';
import { Profile } from 'src/app/model/profile-form';
import { ProxyGroup } from 'src/app/model/proxy-group';
import { TaskService } from 'src/app/service/task.service';
import { Task } from 'src/app/model/task';
import { IpcRenderer } from 'electron';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-task-groups',
  templateUrl: './task-groups.component.html',
  styleUrls: ['./task-groups.component.css']
})
export class TaskGroupsComponent implements OnInit {

  shouldShowTaskCreation = false;
  shouldShowGroupCreation = false;
  @ViewChild('proxyDropDownList') proxyDropDownList: ElementRef;
  @ViewChild('profileDropDownList') profileDropDownList: ElementRef;
  @ViewChild('sizeDropDownList') sizeDropDownList: ElementRef;
  @ViewChild('siteDropDownList') siteDropDownList: ElementRef;


  taskForm: FormGroup;
  taskGroupForm: FormGroup;

  taskGroups: TaskGroup[] = [];
  
  private ipc: IpcRenderer
  selectedTaskGroup:TaskGroup;
  profiles:Profile[];
  proxies:ProxyGroup[];
  subscription: Subscription
  sites:any[] = []
  sizes:any[] = [
    {
      item:"random",
      value:"Random"
    },
    {
      item:"03.5",
      value:"3.5"
    },
    {
      item:"04.0",
      value:"4"
    },
    {
      item:"04.5",
      value:"4.5"
    },
    {
      item:"05.0",
      value:"5"
    },
    {
      item:"05.5",
      value:"5.5"
    },
    {
      item:"06.0",
      value:"6"
    },
    {
      item:"06.5",
      value:"6.5"
    },
    {
      item:"07.0",
      value:"7"
    },
    {
      item:"07.5",
      value:"7.5"
    },
    {
      item:"08.0",
      value:"8"
    },
    {
      item:"08.5",
      value:"8.5"
    },
    {
      item:"09.0",
      value:"9"
    },
    {
      item:"09.5",
      value:"9.5"
    },
    {
      item:"10.0",
      value:"10"
    },
    {
      item:"10.5",
      value:"10.5"
    },
    {
      item:"11.0",
      value:"11"
    },
    {
      item:"11.5",
      value:"11.5"
    },
    {
      item:"12.0",
      value:"12"
    },
    {
      item:"13.0",
      value:"13.0"
    },
    {
      item:"14.0",
      value:"14.0"
    },
    {
      item:"S",
      value:"S"
    },
    {
      item:"M",
      value:"M"
    },
    {
      item:"L",
      value:"L"
    },
    {
      item:"XL",
      value:"XL"
    }
  ]

  constructor(private fb: FormBuilder, private taskService: TaskService, private ref:ChangeDetectorRef, private storageService:StorageService) { 
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

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("tasks")).length > 0){
      this.taskGroups = JSON.parse(localStorage.getItem("tasks"));
    }

    if(this.storageService.getInitialTasks()){
      this.taskGroups.forEach(group => {
        group.tasks.map(task => this.createStatusListener(group.name, task.id))
      })
      this.storageService.setInitialTasks(false)
    }
    this.proxies = JSON.parse(localStorage.getItem("proxies"));
    this.profiles = JSON.parse(localStorage.getItem("profiles"));
    if(this.taskGroups && this.taskGroups.length > 0) {
      this.selectedTaskGroup = this.taskGroups[0];
    }
  }

  updateTasksByGroup(group:TaskGroup){
    this.taskGroups.forEach(gro => {
      if(gro.name === group.name){
        gro.tasks = group.tasks;
      }
    });

  }

  showTaskCreation(taskGroup: TaskGroup): void {
    this.taskForm = this.fb.group({
      monitorInput: ['', [Validators.required]],
      size: ['', [Validators.required]],
      profile: ['', [Validators.required]],
      proxy: ['', [Validators.required]],
      quantity: [1, [Validators.required]]
    });
    this.shouldShowTaskCreation = true;
  }

  showTaskGroupCreation(): void {
    this.taskGroupForm = this.fb.group({
      name: ['', [Validators.required]],
      site: ['', [Validators.required]]
    });
    this.shouldShowGroupCreation = true;
  }

  selectTaskGroup(taskGroup: TaskGroup): void {
    this.selectedTaskGroup = taskGroup;
  }

  save():void {
    console.log(`creating tasks`)
    for(var x = 0; x < this.taskForm.controls['quantity'].value; x++){
      let id = this.uuidv4()
      this.selectedTaskGroup.tasks.push({
        id: id,
        store: this.selectedTaskGroup.store,
        item: {name:this.taskForm.value.monitorInput, size:this.taskForm.value.size},
        profile: this.taskForm.value.profile,
        proxy: this.taskForm.value.proxy,
        status: 'Idle'
      });
      this.createStatusListener(this.selectedTaskGroup.name, id);

    };
    this.taskService.onTaskGroupSave(this.selectedTaskGroup);
  }

  saveTaskGroup():void {
    console.log(`creating task group`)
    this.taskGroups.push({
      id: this.taskGroups.length + 1,
      name: this.taskGroupForm.value.name,
      store: this.taskGroupForm.value.site,
      tasks: []
    })

    this.taskService.onTaskGroupSave(this.taskGroups[this.taskGroups.length - 1]);
  }

  onProfileDropDownChange(value): void {
    this.taskForm.patchValue({
      profile:value
    })
  }

  onProxyDropDownChange(value): void {
    this.taskForm.patchValue({
      proxy:value
    })
  }

  onSizeDropDownChange(value): void {
    this.taskForm.patchValue({
      size:value
    })
  }

  onSiteDropDownChange(value): void {
    this.taskGroupForm.patchValue({
      site: value
    })
  }

  deleteAllByGroupName(groupName: string): void {
    this.taskGroups.forEach(group => {
      if(group.name === groupName) {
        group.tasks = []
      }
    });
    this.taskService.deleteTaskGroupFromMemory(groupName);
    this.taskGroups = this.taskGroups.filter(group => group.name !== groupName);
    if(this.taskGroups.length > 0) {
      this.selectedTaskGroup = this.taskGroups[0];
    }
    this.ipc.send("stopTasksByGroup", {group: groupName, del:true})
  }

  deleteTaskFromList(groupName:string, task: Task):void {
    this.taskService.deleteTaskFromTaskGroupInMemory(groupName, task);
    let selectedGroup = this.taskGroups.filter(group => group.name === groupName)[0];
    selectedGroup.tasks = selectedGroup.tasks.filter(ta => ta.id !== task.id);

    this.ipc.send("stopTaskByIdAndGroup", {id: task.id, group: groupName, del:true})
    if(selectedGroup.tasks.length === 0) {
      this.taskGroups = this.taskGroups.filter(group => group.name !== groupName);
      if(this.taskGroups && this.taskGroups.length > 0) {
        this.selectedTaskGroup = this.taskGroups[0];
      }
    }
  }

  startAllByGroupName(groupName:string):void {
    this.taskService.onTaskStartAll(groupName);
  }

  startTaskFromList(groupName:string, task: Task):void {
    console.log(`Start task lisner`)
    this.ipc.send("startTaskByIdAndGroup", { task, group: groupName})
  }

  stopTaskFromList(groupName:string, task: Task):void {
    console.log(`stop task listener`)
    this.ipc.send("stopTaskByIdAndGroup", {id: task.id, group: groupName});
    this.updateStatus(groupName, task, "Stopping");
  }

  stopAllByGroupName(groupName:string):void{
    this.taskService.onTaskStopAll(groupName)

    this.taskGroups.forEach(group=>{
      if(group.name == groupName){
        group.tasks.map(task => this.updateStatus(group.name, task, "Stopping"))
      }
    })
  }

  updateStatus(groupName:string, task: Task, status:string){
    let group = this.taskGroups.filter(x => x.name === groupName)[0];
    group.tasks.forEach(t => {
      if(t.id === task.id) {
        t.status = status
      }
    });
    this.ref.detectChanges()
  }

  createStatusListener(name:string, id:string){
    console.log(`Created listener`)
    this.ipc.on("statusUpdate" + id + name, (e, args) => {
      console.log(`Status Updateee ${args}`)
      let group = this.taskGroups.filter(x => x.name === name)[0];
      group.tasks.forEach(task => {
        if(task.id === id) {
          task.status = args
        }
      });
      
      this.ref.detectChanges()
    })
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

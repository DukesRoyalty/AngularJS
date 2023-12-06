import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
// import * as ElectronStore from 'electron-store';
import { StorageItem } from '../model/storage-item';
// const     schema = {
//   "tasks": {
//       "type": "array",
//       "items": {
//           "type":"object",
//           "properties": {
//               "id":{"type":"number"},
//               "name": {"type":"string"},
//               "store": {"type": "string"},
//               "tasks": {
//                   "type":"object",
//                   "properties": {
//                       "id":{"type":"string"},
//                       "item":{
//                           "type": "object",
//                           "properties": {
//                               "name":{"type":"string"},
//                               "size": {"type":"string"},
//                               "image":{"type":"string"},
//                               "cost":{"type":"number"}
//                           }
//                       },
//                       "status":{"type":"string"},
//                       "profile":{"type":"string"},
//                       "proxy":{"type":"string"},
//                       "date":{"type":"string"},
//                   }
//               }
//           }
//       }
//   },
//   "proxies": {
//       "type":"array",
//       "items": {
//           "type": "object",
//           "properties": {
//               "name":{"type":"string"},
//               "list":{"type":"array"}
//           }
//       }
//   },
//   "profiles": {
//       "type":"array",
//       "items": {
//           "type": "object",
//           "properties":{
//               "shipping": {
//                   "type":"object",
//                   "properties": {
//                       "name": { "type": "string" },
//                       "shipping": { 
//                           "type": "object",
//                           "properties":{
//                               "firstName": {"type": "string"},
//                               "lastName": {"type": "string"},
//                               "email": {"type": "string"},
//                               "phone": {"type": "string"},
//                               "address": {"type": "string"},
//                               "address2": {"type": "string"},
//                               "city": {"type": "string"},
//                               "state": {"type": "string"},
//                               "zip": {"type": "string"},
//                               "country": {"type": "string"},
//                           }
//                       }
//                   },
//                   "required": ["firstName", "lastName", "email", "phone",
//                   "address", "city","state","zip", "country"]
//               },
//               "type": "object",
//               "billing": {
//                   "type":"object",
//                   "properties":{
//                       "firstName": {"type": "string"},
//                       "lastName": {"type": "string"},
//                       "email": {"type": "string"},
//                       "phone": {"type": "string"},
//                       "address": {"type": "string"},
//                       "address2": {"type": "string"},
//                       "city": {"type": "string"},
//                       "state": {"type": "string"},
//                       "zip": {"type": "string"},
//                       "country": {"type": "string"},
//                       "sameAsShipping": {"type":"boolean"}
//                   },
//                   "required": ["firstName", "lastName", "email", "phone",
//                   "address", "city","state","zip", "country"]
//               },
//               "type": "object",
//               "payment": {
//                   "type":"object",
//                   "properties":{
//                       "name": {"type": "string"},
//                       "number": {"type": "string"},
//                       "month": {"type": "string"},
//                       "year": {"type": "string"},
//                       "cvv": {"type": "string"},
//                       "useOnce": {"type": "boolean"},
//                       "used": {"type": "boolean"}
//                   },
//                   "required": ["name", "number", "month", "year",
//                   "cvv"]
//               }
//           }
//       }
//   }
// };
@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
    private onSubject = new Subject<{ key: string, value: any }>();
    public changes = this.onSubject.asObservable().pipe(share());

    private eStore:any;
    private eStoreSetting:StorageItem;
    public initialTasks:boolean;
    constructor() {
      if ((<any>window).require) {
        try {
          this.eStore = new (<any>window).Store({watch:true});
        } catch (e) {
          throw e;
        }
      } else {
        console.warn('App not running inside Electron!');
      }

      this.start();
    }

    public getInitialTasks(): boolean {
      return this.initialTasks;
    }

    setInitialTasks(bool: boolean): void{
      this.initialTasks = bool;
    }
  
    ngOnDestroy() {
      this.stop();
    }
  
    public getStorage() {
      let s = [];
      for (let i = 0; i < localStorage.length; i++) {
        s.push({
          key: localStorage.key(i),
          value: JSON.parse(localStorage.getItem(localStorage.key(i)))
        });
      }
      return s;
    }

    public getStorageByKey(desiredKey: string) {
        let s = [];
        for (let i = 0; i < localStorage.length; i++) {
          s.push({
            key: localStorage.key(i),
            value: JSON.parse(localStorage.getItem(localStorage.key(i)))
          });
        }
        return s.filter(item => item.key === desiredKey)[0].value;
    }
  
    public store(key: string, data: any): void {
      localStorage.setItem(key, data);
      this.eStore.set(key, JSON.parse(data));
      this.onSubject.next({ key: key, value: data})
    }
  
    public clear(key) {
      localStorage.removeItem(key);
      this.eStore.delete(key);
      this.onSubject.next({ key: key, value: null });
    }

    private start(): void {
      window.addEventListener("storage", this.storageEventListener.bind(this));
    }
  
    private storageEventListener(event: StorageEvent) {
      if (event.storageArea == localStorage) {
        let v;
        try { v = JSON.parse(event.newValue); }
        catch (e) { v = event.newValue; }
        this.onSubject.next({ key: event.key, value: v });
      }
    }
  
    private stop(): void {
      window.removeEventListener("storage", this.storageEventListener.bind(this));
      this.onSubject.complete();
    }

    getTasksFromDisk(){
      return this.eStore.get("tasks")
    }

    getProxiesFromDisk(){
      return this.eStore.get("proxies")
    }

    getProfilesFromDisk(){
      return this.eStore.get("profiles")
    }

    getSettingsFromDisk(){
      return this.eStore.get("settings")
    }
}
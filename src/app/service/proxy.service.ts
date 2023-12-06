import { Injectable } from '@angular/core';
import { ProxyGroup } from '../model/proxy-group';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private storageService: StorageService) {}

  onProxyFormSaved(group: ProxyGroup): void {
    /* determine is we currently have proxies */
    if(JSON.parse(localStorage.getItem("proxies")).length > 0) {
      let currentProxies = this.storageService.getStorageByKey("proxies");
      
      if(currentProxies.some(gro => gro.name === group.name)) {
        return this.updateProxiesInMemory(currentProxies, group);
      }

      currentProxies.push(group);
      this.saveProxiesToMemory(JSON.stringify(currentProxies))
    } else {
      
      this.saveProxiesToMemory(JSON.stringify([group]))
    };
  };

  saveProxiesToMemory(proxies: string):void {
    this.storageService.store("proxies", proxies)
  }

  updateProxiesInMemory(groups: ProxyGroup[], group: ProxyGroup):void {
    groups.forEach(gro => {
      if(gro.name === group.name) {
        gro.list = group.list;
      }
    })
    this.saveProxiesToMemory(JSON.stringify(groups))
  }

  deleteProxiesFromMemory():void {
    this.storageService.clear("proxies")
    localStorage.setItem("proxies", JSON.stringify([]))
  }

  getAllProxiesFromMemory():ProxyGroup[] {
    return this.storageService.getStorageByKey("proxies");
  }
}

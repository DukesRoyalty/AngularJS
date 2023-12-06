import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../service/proxy.service';
import { Proxy } from '../../model/proxy';
import { ProxyGroup } from '../../model/proxy-group';

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.css']
})
export class ProxyComponent implements OnInit {

  constructor(private proxyService: ProxyService) { }
  
  proxyGroup: ProxyGroup;
  proxies: Proxy[] = (this.proxyService.getAllProxiesFromMemory().length > 0) ? this.proxyService.getAllProxiesFromMemory()[0].list : [];
  userInput:string = '';
  inputName:string = '';


  ngOnInit(): void {
  }

  save(): void {
    let formattedProxies = this.formatTextAreaInput();
    if(this.inputName !== "" && formattedProxies.every(this.formatCheck)) {
      formattedProxies.forEach(proxy => {
        this.proxies.push({
          proxy,
          status: ""
        })
      });

      this.proxyService.onProxyFormSaved({name:this.inputName, list: this.proxies});
      this.inputName = '';
      this.userInput = '';
    }
  }

  formatTextAreaInput(): string[] {
    return this.userInput.split('\n');
  }

  formatCheck(proxy:string): boolean {
    return (proxy === "" || proxy.split(":").length == 2 || proxy.split(":").length == 4) 
  }

  deleteAll():void {
    this.proxyService.deleteProxiesFromMemory();
    this.proxies = [];
  }

}

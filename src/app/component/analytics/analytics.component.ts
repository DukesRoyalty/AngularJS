import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Task } from '../../model/task';
import { Checkout } from '../../model/checkout';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy {

  date: Date = new Date();
  subscriptions: Subscription[] = [];
  
  checkouts: Checkout[] = [];

  constructor() { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(timer(1000, 1000).subscribe(i => this.date = new Date()));
  }

}
import { Component, Input, OnInit } from '@angular/core';
import { Checkout } from '../../model/checkout';

@Component({
  selector: 'app-recent-purchase',
  templateUrl: './recent-purchase.component.html',
  styleUrls: ['./recent-purchase.component.css']
})
export class RecentPurchaseComponent implements OnInit {

  @Input()
  checkout: Checkout;

  constructor() { }

  ngOnInit(): void {
  }

}

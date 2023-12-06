import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/data/card';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  @Input()
  card: Card;
  @Output()
  onProfileEdit = new EventEmitter<String>();
  @Output()
  onProfileDelete = new EventEmitter<String>();

  backgroundStyle = '';
  constructor() { }

  ngOnInit(): void {
    this.backgroundStyle = this.getRandomBackground();
  }

  getRandomBackground(): string {
    return `credit-card--background-${Math.floor(Math.random() * 4)}`;
  }

  updateProfile(name:string):  void {
    this.onProfileEdit.emit(name)
  }

  deleteProfile(name:string):  void {
    this.onProfileDelete.emit(name)
  }

}

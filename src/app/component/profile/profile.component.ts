import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Card } from '../../data/card';
import { TabComponent, TabOption } from '../tab/tab.component';
import { Profile } from '../../model/profile-form';
import { ShippingForm } from '../../model/shipping-form';
import { BillingForm } from '../../model/billing-form';
import { PaymentForm } from '../../model/payment-form';
import { ProfileFormService } from 'src/app/service/profile-form.service';
import { ShippingFormComponent } from '../shipping-form/shipping-form.component';
import { BillingFormComponent } from '../billing-form/billing-form.component';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  tabOptions: TabOption[] = [];
  cards: Card[] = [];
  profile: Profile = new Profile();
  @ViewChild('ShippingForm') shippingForm:ShippingFormComponent;
  @ViewChild('BillingForm') billinForm:BillingFormComponent;
  @ViewChild('PaymentForm') paymentForm:PaymentFormComponent;

  @ViewChild('Tab') tab:TabComponent;

  constructor(private profileFormService: ProfileFormService) { 
    this.tabOptions = [
      {
        id: 'shipping',
        tabTitle: 'Shipping',
        active: true
      },
      {
        id: 'billing',
        tabTitle: 'Billing'
      },
      {
        id: 'payment',
        tabTitle: 'Payment'
      }
    ]
  }

  ngOnInit(): void {
    this.loadCards();
  }

  ngOnChanges(): void {
    this.loadCards();
  }

  tabChange(options: TabOption[]): void {
    this.tabOptions = options;
    
  }

  isActive(tabId: string): boolean {
    return this.tabOptions.find(option => option.id === tabId).active;
  }

  saveShipping() {
    if(!this.saveProfile()){
      this.tab.onClick(this.tabOptions[1]);
    }
  }

  saveBilling() {
    if(!this.saveProfile()){
      this.tab.onClick(this.tabOptions[2]);
    }
  }

  savePayment() {
    if(!this.saveProfile()){
      this.tab.onClick(this.tabOptions[0]);
    }
  }

  saveProfile() : boolean {
    if(this.allFormsValid() && this.profile && this.profile.shipping && this.profile.billing && this.profile.payment) {
      this.successfulProfileCreation();
      return true;
    };
    return false;
  };

  successfulProfileCreation() {
    this.profileFormService.onPaymentFormSaved(this.profile);
    this.ngOnChanges();
    this.clearAllFields();
    this.tab.onClick(this.tabOptions[0]);
    this.profile = new Profile();
  }

  clearAllFields(): void {
    this.shippingForm.clearAllFields();
    this.billinForm.clearAllFields();
    this.paymentForm.clearAllFields();
  }

  allFormsValid(): boolean {
    return this.shippingForm.shippingForm.valid &&
    (this.billinForm.billingForm.valid || this.billinForm.billingForm.disabled) &&
    this.paymentForm.paymentForm.valid;
  }

  loadCards(): void {
    this.cards = [];
    let profiles = this.profileFormService.getAllProfilesFromMemory();
    if(profiles){
      profiles.forEach(profile => 
        this.cards.push(this.profileFormService.createCard(profile)));
    }
  }

  deleteAllProfiles():void {
    this.profileFormService.deleteProfilesFromMemory();
    this.cards = [];
  }

  deleteProfile(name:string):void {
    this.profileFormService.deleteProfileFromMemory(name);
    this.cards = this.cards.filter(card => card.profileName !== name);
  }

  editProfile(name:string):void {
    let profiles = JSON.parse(localStorage.getItem("profiles"));
    let profile = profiles.filter(pro => pro.shipping.name === name)[0];
    console.log(`editing ${JSON.stringify(profile)}`)
    this.profile = profile
  }
}

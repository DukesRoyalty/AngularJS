import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BillingForm } from 'src/app/model/billing-form';
import { Profile } from 'src/app/model/profile-form';
import { States } from '../../data/states'

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.css']
})
export class BillingFormComponent implements OnInit, OnChanges {
  @ViewChild('stateDropDownList') stateDropDownList: ElementRef;
  @Input() profile:Profile;
  @Output() sendBillingInfo = new EventEmitter<BillingForm>();

  billingInfo:BillingForm;
  sameAsShipping = false;
  states = States
  valid = false;
  billingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: this.fb.group({
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      country: ['US']
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.billingForm.valid) {
      this.valid = true;
    }
  }


  onSameAsShippingToggled(notSameAsShipping: boolean) {
    if(notSameAsShipping) {
      this.billingForm.enable();
      this.valid = false;
    }
    else {
      this.updateForm();
      this.valid = true;
      this.billingForm.disable();
    }
    this.sameAsShipping = notSameAsShipping;
  }

  save(): void {
    this.profile.billing = this.mapToProfile(this.billingForm);
    this.sendBillingInfo.emit()
    //this.billingInfo = this.mapToProfile(this.billingForm);
    //this.sendBillingInfo.emit(this.billingInfo);
  }

  mapToProfile(form: FormGroup): BillingForm {
    return {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        address: form.controls['address'].value.address1,
        address2: form.controls['address'].value.address2,
        city: form.controls['address'].value.city,
        state: form.controls['address'].value.state,
        zip: form.controls['address'].value.zip,
        country: form.controls['address'].value.country,
        sameAsShipping: this.sameAsShipping
      }
  }

  updateForm(): void {
    this.billingForm.patchValue({
      firstName: this.profile.shipping.shipping.firstName,
      lastName: this.profile.shipping.shipping.lastName,
      email: this.profile.shipping.shipping.email,
      phone: this.profile.shipping.shipping.phone,
      address: {
        address1: this.profile.shipping.shipping.address,
        address2: this.profile.shipping.shipping.address2,
        city: this.profile.shipping.shipping.city,
        state: this.profile.shipping.shipping.state,
        zip: this.profile.shipping.shipping.zip,
        country: this.profile.shipping.shipping.country,
      }
    })
    this.valid = true;
  }

  mapShippingToBilling(): BillingForm {
    return {
      firstName: this.profile.shipping.shipping.firstName,
      lastName: this.profile.shipping.shipping.lastName,
      email: this.profile.shipping.shipping.email,
      phone: this.profile.shipping.shipping.phone,
      address: this.profile.shipping.shipping.address,
      address2: this.profile.shipping.shipping.address2,
      city: this.profile.shipping.shipping.city,
      state: this.profile.shipping.shipping.state,
      zip: this.profile.shipping.shipping.zip,
      country: this.profile.shipping.shipping.country,
      sameAsShipping: true
    }
  }

  clearAllFields():void {
    this.billingForm.reset()
  }

  determineValidation(): boolean {
    return !this.billingForm.valid && !this.valid
  }

  onStateDropDownChange(value): void {
    this.billingForm.patchValue({
      address:{
        state: value
      }
    })
  }
}

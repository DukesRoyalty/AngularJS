import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingForm } from 'src/app/model/shipping-form';
import { States } from '../../data/states'
import { Profile } from 'src/app/model/profile-form';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnChanges {
  @ViewChild('stateDropDownList') stateDropDownList: ElementRef;
  @Output() sendShippingInfo = new EventEmitter<ShippingForm>();
  @Input() profile:Profile;

  shippingInfo:ShippingForm;
  states = States;
  shippingForm = this.fb.group({
    profileName: ['', Validators.required],
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
    if(this.profile.shipping){
      console.log(this.profile.shipping)
      this.shippingForm.patchValue({ profileName: this.profile.shipping.name })
    }

  }


  save(): void {
    //this.shippingInfo = this.mapToProfile(this.shippingForm);
    this.profile.shipping = this.mapToProfile(this.shippingForm);
    this.sendShippingInfo.emit();
    //this.sendShippingInfo.emit(this.shippingInfo);
  }

  mapToProfile(form: FormGroup): ShippingForm {
    return {
      name: form.value.profileName,
      shipping: {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        address: form.controls['address'].value.address1,
        address2: form.controls['address'].value.address2,
        city: form.controls['address'].value.city,
        state: form.controls['address'].value.state,
        zip: form.controls['address'].value.zip,
        country: form.controls['address'].value.country
      }
    };
  }

  clearAllFields():void {
    this.shippingForm.reset()
  }

  onStateDropDownChange(value): void {
    this.shippingForm.patchValue({
      address:{
        state: value
      }
    })
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentForm } from 'src/app/model/payment-form';
import { Profile } from 'src/app/model/profile-form';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  @Input() profile:Profile;
  @Output() sendPaymentInfo = new EventEmitter<PaymentForm>();

  paymentInfo:PaymentForm;
  paymentForm = this.fb.group({
    cardHolder: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expirationMonth: ['', Validators.required],
    expirationYear: ['', [Validators.required]],
    cvv: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  save(): void {
    this.profile.payment = this.mapToProfile(this.paymentForm);
    this.sendPaymentInfo.emit();
    //this.paymentInfo = this.mapToProfile(this.paymentForm);
    // this.sendPaymentInfo.emit(this.paymentInfo);
  }

  mapToProfile(form: FormGroup): PaymentForm {
    return {
      name: form.value.cardHolder,
      number: form.value.cardNumber,
      month: form.value.expirationMonth,
      year: form.value.expirationYear,
      cvv: form.value.cvv,
      useOnce: true,
      used: false
    };
  }

  clearAllFields():void {
    this.paymentForm.reset()
  }
}

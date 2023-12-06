import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-validation-warning',
  templateUrl: './form-validation-warning.component.html',
  styleUrls: ['./form-validation-warning.component.css']
})
export class FormValidationWarningComponent implements OnInit {

  @Input()
  control: AbstractControl;

  @Input()
  message?: string = 'Invalid';

  constructor() { }

  ngOnInit(): void {
  }

}

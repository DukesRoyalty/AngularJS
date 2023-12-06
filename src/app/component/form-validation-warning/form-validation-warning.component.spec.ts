import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidationWarningComponent } from './form-validation-warning.component';

describe('FormValidationWarningComponent', () => {
  let component: FormValidationWarningComponent;
  let fixture: ComponentFixture<FormValidationWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormValidationWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidationWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

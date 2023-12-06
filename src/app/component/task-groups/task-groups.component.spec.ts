import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGroupsComponent } from './task-groups.component';

describe('TaskGroupsComponent', () => {
  let component: TaskGroupsComponent;
  let fixture: ComponentFixture<TaskGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

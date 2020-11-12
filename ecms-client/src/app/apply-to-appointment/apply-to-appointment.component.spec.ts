import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyToAppointmentComponent } from './apply-to-appointment.component';

describe('ApplyToAppointmentComponent', () => {
  let component: ApplyToAppointmentComponent;
  let fixture: ComponentFixture<ApplyToAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyToAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyToAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

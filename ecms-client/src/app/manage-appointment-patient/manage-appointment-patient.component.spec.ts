import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppointmentPatientComponent } from './manage-appointment-patient.component';

describe('ManageAppointmentPatientComponent', () => {
  let component: ManageAppointmentPatientComponent;
  let fixture: ComponentFixture<ManageAppointmentPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAppointmentPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppointmentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

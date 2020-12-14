import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationDoctorComponent } from './examination-doctor.component';

describe('ExaminationDoctorComponent', () => {
  let component: ExaminationDoctorComponent;
  let fixture: ComponentFixture<ExaminationDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

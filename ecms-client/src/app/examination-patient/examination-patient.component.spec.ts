import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationPatientComponent } from './examination-patient.component';

describe('ExaminationPatientComponent', () => {
  let component: ExaminationPatientComponent;
  let fixture: ComponentFixture<ExaminationPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

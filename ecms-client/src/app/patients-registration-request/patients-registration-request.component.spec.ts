import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsRegistrationRequestComponent } from './patients-registration-request.component';

describe('PatientsRegistrationRequestComponent', () => {
  let component: PatientsRegistrationRequestComponent;
  let fixture: ComponentFixture<PatientsRegistrationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsRegistrationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsRegistrationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

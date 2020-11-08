import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorsComponent } from './edit-doctors.component';

describe('EditDoctorsComponent', () => {
  let component: EditDoctorsComponent;
  let fixture: ComponentFixture<EditDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoctorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPharmaciesComponent } from './edit-pharmacies.component';

describe('EditPharmaciesComponent', () => {
  let component: EditPharmaciesComponent;
  let fixture: ComponentFixture<EditPharmaciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPharmaciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

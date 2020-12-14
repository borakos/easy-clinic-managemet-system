import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPatientComponent } from './order-patient.component';

describe('OrderPatientComponent', () => {
  let component: OrderPatientComponent;
  let fixture: ComponentFixture<OrderPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

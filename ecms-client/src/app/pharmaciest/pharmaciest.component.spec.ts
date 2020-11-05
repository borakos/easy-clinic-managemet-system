import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciestComponent } from './pharmaciest.component';

describe('PharmaciestComponent', () => {
  let component: PharmaciestComponent;
  let fixture: ComponentFixture<PharmaciestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmaciestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaciestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

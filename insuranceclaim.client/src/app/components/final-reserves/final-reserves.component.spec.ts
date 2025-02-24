import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalReservesComponent } from './final-reserves.component';

describe('FinalReservesComponent', () => {
  let component: FinalReservesComponent;
  let fixture: ComponentFixture<FinalReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalReservesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

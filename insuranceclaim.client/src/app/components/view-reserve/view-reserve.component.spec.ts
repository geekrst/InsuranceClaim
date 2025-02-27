import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReserveComponent } from './view-reserve.component';

describe('ViewReserveComponent', () => {
  let component: ViewReserveComponent;
  let fixture: ComponentFixture<ViewReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReserveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedEntityComponent } from './approved-entity.component';

describe('ApprovedEntityComponent', () => {
  let component: ApprovedEntityComponent;
  let fixture: ComponentFixture<ApprovedEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedEntityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

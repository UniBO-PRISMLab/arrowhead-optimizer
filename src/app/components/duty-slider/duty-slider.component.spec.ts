import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutySliderComponent } from './duty-slider.component';

describe('DutySliderComponent', () => {
  let component: DutySliderComponent;
  let fixture: ComponentFixture<DutySliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutySliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

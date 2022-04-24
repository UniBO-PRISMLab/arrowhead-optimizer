import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageSpinnerComponent } from './percentage-spinner.component';

describe('PercentageSpinnerComponent', () => {
  let component: PercentageSpinnerComponent;
  let fixture: ComponentFixture<PercentageSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentageSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

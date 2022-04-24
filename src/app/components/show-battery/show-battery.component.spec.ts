import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBatteryComponent } from './show-battery.component';

describe('ShowBatteryComponent', () => {
  let component: ShowBatteryComponent;
  let fixture: ComponentFixture<ShowBatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBatteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

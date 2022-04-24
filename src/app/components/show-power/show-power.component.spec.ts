import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPowerComponent } from './show-power.component';

describe('ShowPowerComponent', () => {
  let component: ShowPowerComponent;
  let fixture: ComponentFixture<ShowPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

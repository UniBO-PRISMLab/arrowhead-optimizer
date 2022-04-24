import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlDutyComponent } from './control-duty.component';

describe('ControlDutyComponent', () => {
  let component: ControlDutyComponent;
  let fixture: ComponentFixture<ControlDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

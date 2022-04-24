import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDutyComponent } from './show-duty.component';

describe('ShowDutyComponent', () => {
  let component: ShowDutyComponent;
  let fixture: ComponentFixture<ShowDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

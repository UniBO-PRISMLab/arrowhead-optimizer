import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseHarvesterComponent } from './choose-harvester.component';

describe('ChooseHarvesterComponent', () => {
  let component: ChooseHarvesterComponent;
  let fixture: ComponentFixture<ChooseHarvesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseHarvesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseHarvesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

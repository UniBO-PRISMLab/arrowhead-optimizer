import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHarvesterComponent } from './show-harvester.component';

describe('ShowHarvesterComponent', () => {
  let component: ShowHarvesterComponent;
  let fixture: ComponentFixture<ShowHarvesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowHarvesterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHarvesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowThingComponent } from './show-thing.component';

describe('ShowThingComponent', () => {
  let component: ShowThingComponent;
  let fixture: ComponentFixture<ShowThingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowThingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

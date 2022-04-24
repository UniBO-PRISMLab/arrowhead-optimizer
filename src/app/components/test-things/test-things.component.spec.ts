import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThingsComponent } from './test-things.component';

describe('TestThingsComponent', () => {
  let component: TestThingsComponent;
  let fixture: ComponentFixture<TestThingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestThingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

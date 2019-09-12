import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodHoursComponent } from './period-hours.component';

describe('PeriodHoursComponent', () => {
  let component: PeriodHoursComponent;
  let fixture: ComponentFixture<PeriodHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

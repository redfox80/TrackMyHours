import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHoursComponent } from './view-hours.component';

describe('ViewHoursComponent', () => {
  let component: ViewHoursComponent;
  let fixture: ComponentFixture<ViewHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

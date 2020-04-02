import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeaveRequestsComponent } from './all-leave-requests.component';

describe('AllLeaveRequestsComponent', () => {
  let component: AllLeaveRequestsComponent;
  let fixture: ComponentFixture<AllLeaveRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLeaveRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeaveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

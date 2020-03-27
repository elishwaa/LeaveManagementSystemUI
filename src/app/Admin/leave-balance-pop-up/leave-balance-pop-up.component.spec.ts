import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalancePopUpComponent } from './leave-balance-pop-up.component';

describe('LeaveBalancePopUpComponent', () => {
  let component: LeaveBalancePopUpComponent;
  let fixture: ComponentFixture<LeaveBalancePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalancePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalancePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

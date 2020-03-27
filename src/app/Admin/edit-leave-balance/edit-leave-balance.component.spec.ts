import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveBalanceComponent } from './edit-leave-balance.component';

describe('EditLeaveBalanceComponent', () => {
  let component: EditLeaveBalanceComponent;
  let fixture: ComponentFixture<EditLeaveBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeaveBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeaveBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

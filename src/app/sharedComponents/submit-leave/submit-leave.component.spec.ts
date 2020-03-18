import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLeaveComponent } from './submit-leave.component';

describe('SubmitLeaveComponent', () => {
  let component: SubmitLeaveComponent;
  let fixture: ComponentFixture<SubmitLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

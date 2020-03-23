import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndApproveComponent } from './edit-and-approve.component';

describe('EditAndApproveComponent', () => {
  let component: EditAndApproveComponent;
  let fixture: ComponentFixture<EditAndApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAndApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAndApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

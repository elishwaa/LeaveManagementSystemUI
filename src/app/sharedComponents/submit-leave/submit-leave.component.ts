import { Component, OnInit, Inject } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeHomePageComponent } from 'src/app/Employee/employee-home-page/employee-home-page.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-submit-leave',
  templateUrl: './submit-leave.component.html',
  styleUrls: ['./submit-leave.component.css'],
  providers: [LeaveMgmtService]
})
export class SubmitLeaveComponent implements OnInit {
  leaveRequest: FormGroup;
  leave = [];
  leaveStartDate;
  leaveEndDate;
  constructor(public dialogRef: MatDialogRef<EmployeeHomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public httpClient: HttpClient, public _service: LeaveMgmtService) { }

  ngOnInit() {

    this._service.getLeaves().subscribe(
      data => {
        this.leave = data;
      }
    )
    this.leaveRequest = new FormGroup({
      empId: new FormControl(),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      leave: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submitLeave() {

    let data = { ...this.leaveRequest.value, empId: parseInt(this.leaveRequest.value.empId), leave: parseInt(this.leaveRequest.value.leave) }
    let date = new Date();
    if (data.startDate >= date && data.endDate >= data.startDate) {

      this._service.addLeaveRequest(data).subscribe(
        data => {
          if (data) {
            this.onNoClick();
            this._service.openSnackBar("Leave request submitted", "Successfully")
          }
          else {
            this._service.openSnackBar("Some error occured", "Check leave balance or leave dates")
          }
        }
      )
    }
    else {
      this._service.openSnackBar("Invalid dates", "Check leave dates")
    }



  }

}


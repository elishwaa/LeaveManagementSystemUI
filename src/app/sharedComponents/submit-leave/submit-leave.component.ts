import { Component, OnInit, Inject } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment} from '../../../environments/environment'
import { EmployeeHomePageComponent } from 'src/app/Employee/employee-home-page/employee-home-page.component';

@Component({
  selector: 'app-submit-leave',
  templateUrl: './submit-leave.component.html',
  styleUrls: ['./submit-leave.component.css'],
  providers: [LeaveMgmtService]
})
export class SubmitLeaveComponent implements OnInit {
 
  // webApi = 'https://localhost:44398/api/LeaveRequest/SaveLeave';
  leaveRequest: FormGroup;
  leave =[];
  // returnData:any;
  constructor(public dialogRef: MatDialogRef<EmployeeHomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public httpClient:HttpClient, public _service:LeaveMgmtService){ }

  ngOnInit() {

    this._service.getLeaves().subscribe(
      data=>{
        this.leave = data;
      }
    )
    this.leaveRequest = new FormGroup({
      empId: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      leave: new FormControl(),
      reason: new FormControl(),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  SubmitLeave() {
    
    let data = {...this.leaveRequest.value, empId:parseInt(this.leaveRequest.value.empId), leave:parseInt(this.leaveRequest.value.leave)}
    
    this._service.AddLeaveRequest(data). subscribe(
        data =>
        {
           if (data) {  
            this.onNoClick();
            this._service.OpenSnackBar("Leave Request","Success!!")
          }
        },
        err =>{
          if(err.status == 500)
           this._service.OpenSnackBar("No Leave Balance","Sorry!" )
        }
      )
      
    }

  }
   
   
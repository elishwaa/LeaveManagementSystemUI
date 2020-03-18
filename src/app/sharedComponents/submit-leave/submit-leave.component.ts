import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog} from '@angular/material/dialog';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment} from '../../../environments/environment'

@Component({
  selector: 'app-submit-leave',
  templateUrl: './submit-leave.component.html',
  styleUrls: ['./submit-leave.component.css'],
  providers: [LeaveMgmtService]
})
export class SubmitLeaveComponent implements OnInit {
 
  // webApi = 'https://localhost:44398/api/LeaveRequest/SaveLeave';
  leaveRequest: FormGroup;
  returnData:any;
  constructor(public _service: LeaveMgmtService, public httpClient:HttpClient, public route: Router) { }

  ngOnInit() {
    this.leaveRequest = new FormGroup({
      empId: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      leaveId: new FormControl(),
      reason: new FormControl(),
    });
  }
  
  SubmitLeave() : Observable<any>{
    
    let data = {...this.leaveRequest.value, empId:parseInt(this.leaveRequest.value.empId), leaveId:parseInt(this.leaveRequest.value.leaveId)}
       this.httpClient.post(environment.apiUrl + 'LeaveRequest/SaveLeave',data ).subscribe(
        data =>
        {
          this.returnData = data;
          console.log(this.returnData);
        }
      )
      return this.returnData;
      
    }

  }
   
   
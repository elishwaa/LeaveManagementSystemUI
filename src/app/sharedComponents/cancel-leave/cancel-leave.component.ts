import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment'


@Component({
  selector: 'app-cancel-leave',
  templateUrl: './cancel-leave.component.html',
  styleUrls: ['./cancel-leave.component.css']
})
export class CancelLeaveComponent implements OnInit {
  //  webApi = 'https://localhost:44398/api/LeaveRequest/delete';
   leaveRequests: LeaveRequests[];
   data :any;
   loginparameters:LoginParameters;
  constructor(public _service : LeaveMgmtService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));
    this.leaveRequests = JSON.parse(sessionStorage.getItem('leaveRequests'));
    console.log(this.leaveRequests);
    
  }
  CancelLeave(i: number){
    let leaverequestId = Number(this.leaveRequests[i].id);
    let params = new HttpParams().set('id',leaverequestId.toString())
    this.httpClient.delete(environment.apiUrl+'LeaveRequest/delete' ,{params:params} ).subscribe(
        (data) =>{
          console.log(data);
            if(data = true){
              this.leaveRequests.splice(i, 1); }
        },
        (err) => {
          console.log(err)
        }
    );
 } 
}

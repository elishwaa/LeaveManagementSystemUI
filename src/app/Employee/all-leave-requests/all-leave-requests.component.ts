import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

@Component({
  selector: 'app-all-leave-requests',
  templateUrl: './all-leave-requests.component.html',
  styleUrls: ['./all-leave-requests.component.css']
})
export class AllLeaveRequestsComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate','leave','status','reason','actions'];
  // dataSource = new MatTableDataSource<leaveRequests>(ELEMENT_DATA);
  constructor(public httpClient: HttpClient, public _service :LeaveMgmtService){}
  leaveRequests: LeaveRequests[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    
    this.leaveRequests = JSON.parse(sessionStorage.getItem('AllLeaveRequests'));
    console.log(this.leaveRequests);
  }
  ApproveRequest(employee: LeaveRequests){
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/Approve/'+ employee.id).subscribe(
      data =>{
        if(data){
          employee.status = 'Approved';
          this._service.openSnackBar("Leave Request","Approved!!");
        }
        else{
          this._service.openSnackBar("Leave Request","Failed!!");

        }
      }
    );
   }
    
}


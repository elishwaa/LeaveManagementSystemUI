import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { MatDialog } from '@angular/material';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { EditAndApproveComponent } from '../edit-and-approve/edit-and-approve.component';

@Component({
  selector: 'app-all-leave-requests',
  templateUrl: './all-leave-requests.component.html',
  styleUrls: ['./all-leave-requests.component.css']
})
export class AllLeaveRequestsComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate','leave','status','reason','approve','editAndApprove'];
  // dataSource = new MatTableDataSource<leaveRequests>(ELEMENT_DATA);
  constructor(public httpClient: HttpClient, public dialog: MatDialog,public _service :LeaveMgmtService){}
  leaveRequests: LeaveRequests[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    
    this.leaveRequests = JSON.parse(sessionStorage.getItem('AllLeaveRequests'));
    console.log(this.leaveRequests);
  }
  ApproveRequest(employee: LeaveRequests){
    this._service.ApproveRequest(employee.id).subscribe(
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
   EditAndApproveRequests(leaveRequest: LeaveRequests):void {
      const dialogRef = this.dialog.open(EditAndApproveComponent, {
        width: '30%',
        height: '75%',
        data: {
          id: leaveRequest.id, empId:leaveRequest.empId, employeeName: leaveRequest.employeeName, startDate:leaveRequest.startDate, endDate: leaveRequest.endDate,
          leave:leaveRequest.leave,leaveId:leaveRequest.leaveId, status:leaveRequest.status, reason:leaveRequest.reason
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let data = { ...result, id: parseInt(result.id), typeId: parseInt(result.empId), salary: parseInt(result.leaveId) }
          this.httpClient.post(environment.apiUrl + 'LeaveRequest/EditAndApprove', data).subscribe(
            data => {
              if (data) {
                sessionStorage.setItem('AllLeaveRequests',JSON.stringify(result) )
                this.leaveRequests = result;
              }
            }
          )
        }
      });
  
    }
    
}


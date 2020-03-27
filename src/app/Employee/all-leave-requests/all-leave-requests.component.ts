import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { MatDialog } from '@angular/material';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { EditAndApproveComponent } from '../edit-and-approve/edit-and-approve.component';
import { DeletePopUpComponent } from 'src/app/sharedComponents/delete-pop-up/delete-pop-up.component';
import { element } from 'protractor';

@Component({
  selector: 'app-all-leave-requests',
  templateUrl: './all-leave-requests.component.html',
  styleUrls: ['./all-leave-requests.component.css']
})
export class AllLeaveRequestsComponent implements OnInit {
  leaveRequests: LeaveRequests[];
  data;
  dataSource;

  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate','leave','status','reason','approve','editAndApprove'];
  constructor(public httpClient: HttpClient, public dialog: MatDialog,public _service :LeaveMgmtService){}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    
    this.leaveRequests = JSON.parse(sessionStorage.getItem('AllLeaveRequests'));
    this.data = Object.assign( this.leaveRequests);
    this.dataSource = new MatTableDataSource<Element>(this.data);
    console.log(this.leaveRequests);
  }
  ApproveRequest(employee: LeaveRequests,i){
    this._service.ApproveRequest(employee.id).subscribe(
      data =>{
        if(data){

          this.data.splice(i,1)
          this.dataSource = new MatTableDataSource<Element>(this.data);
         
        }
        else{
          this._service.openSnackBar("Leave Request","Failed!!");

        }
      }
    );
   }

   openDialog(element: LeaveRequests, i:number): void {
   
    const dialogRef = this.dialog.open(DeletePopUpComponent, {
     width: '25%',
     height: '25%',
     data: {
       message: "Are you sure want to Approve this request?"
     }
   });
 
   dialogRef.afterClosed().subscribe(result => {
     if (result) {
       this.ApproveRequest(element ,i);
     }
   });
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
          console.log(data);
          
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


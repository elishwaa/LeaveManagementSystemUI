import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { HttpClient } from '@angular/common/http';
import { EmployeeInfo } from 'src/app/models/employeeInfo';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DeletePopUpComponent } from '../delete-pop-up/delete-pop-up.component';


@Component({
  selector: 'app-cancel-leave',
  templateUrl: './cancel-leave.component.html',
  styleUrls: ['./cancel-leave.component.css']
})
export class CancelLeaveComponent implements OnInit {
  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate','leave','status','reason','cancel'];
   leaveRequests: LeaveRequests[];
   data:any ;
   dataSource:any;
   loginparameters:EmployeeInfo;
  constructor(public _service : LeaveMgmtService, public httpClient: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.loginparameters = JSON.parse(localStorage.getItem('employee'));
    this.leaveRequests = JSON.parse(localStorage.getItem('leaveRequests'));
    this.data = Object.assign( this.leaveRequests);
    this.dataSource = new MatTableDataSource<Element>(this.data)
    
  }
  cancelLeave(index: number){
    this._service.cancelLeave(this.leaveRequests[index].id).subscribe(
        (data) =>{
            if(data){
              this.data.splice(index,1)
              this.dataSource = new MatTableDataSource<Element>(this.data);
              }
        },
        err =>{
          if(err.status == 500)
           this._service.openSnackBar("Cancelation","Failed" )
        }
    );
 } 
 cancelDialog(i:number): void {
   
   const dialogRef = this.dialog.open(DeletePopUpComponent, {
    width: '25%',
    height: '25%',
    data: {
      message: "Are you sure want to delete this request?"
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.cancelLeave(i);
    }
  });
}

}

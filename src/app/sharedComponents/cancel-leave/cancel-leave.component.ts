import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment'
import { MatDialog } from '@angular/material';
import { DeletePopUpComponent } from '../delete-pop-up/delete-pop-up.component';


@Component({
  selector: 'app-cancel-leave',
  templateUrl: './cancel-leave.component.html',
  styleUrls: ['./cancel-leave.component.css']
})
export class CancelLeaveComponent implements OnInit {
  //  webApi = 'https://localhost:44398/api/LeaveRequest/delete';
  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate','leave','status','reason','cancel'];
   leaveRequests: LeaveRequests[];
   data :any;
   status:any;
   index:number;
   loginparameters:LoginParameters;
  constructor(public _service : LeaveMgmtService, public httpClient: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));
    this.leaveRequests = JSON.parse(sessionStorage.getItem('leaveRequests'));
    console.log(this.leaveRequests);
    
  }
  CancelLeave(index: number){
    debugger
    this._service.CancelLeave(this.leaveRequests[index].id).subscribe(
        (data) =>{
          console.log(data);
            if(data = true){
              //  this.leaveRequests.splice(index, 1);
              // this.displayedColumns.splice(index,1);
              // this._service.getLeaveRequests(this.leaveRequests[index].empId)
              }
        },
        (err) => {
          console.log(err)
        }
    );
 } 
 openDialog(i:number): void {
   
   const dialogRef = this.dialog.open(DeletePopUpComponent, {
    width: '25%',
    height: '25%',
    data: {
      message: "Are you sure want to delete this request?"
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.CancelLeave(i);
    }
  });
}

}

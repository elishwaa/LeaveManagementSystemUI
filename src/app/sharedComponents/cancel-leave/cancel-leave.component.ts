import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment'
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
   data ;
   dataSource;;
   status:any;
   index:number;
   loginparameters:LoginParameters;
  constructor(public _service : LeaveMgmtService, public httpClient: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.loginparameters = JSON.parse(localStorage.getItem('employee'));
    this._service.visible.emit({LoggedInStatus: true});
    if(this.loginparameters.id == 2 || this.loginparameters.id == 3){
      
    }
    this.leaveRequests = JSON.parse(localStorage.getItem('leaveRequests'));
    this.data = Object.assign( this.leaveRequests);
    this.dataSource = new MatTableDataSource<Element>(this.data)
    console.log(this.leaveRequests);
    
  }
  cancelLeave(index: number){
    debugger
    this._service.cancelLeave(this.leaveRequests[index].id).subscribe(
        (data) =>{
          console.log(data);
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

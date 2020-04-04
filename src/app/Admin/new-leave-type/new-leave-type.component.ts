import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-new-leave-type',
  templateUrl: './new-leave-type.component.html',
  styleUrls: ['./new-leave-type.component.css']
})
export class NewLeaveTypeComponent implements OnInit {
  newLeave:string;
  constructor(public dialogRef: MatDialogRef<AdminHomePageComponent>, public _service: LeaveMgmtService) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveNewLeave(){
    this._service.addNewLeave(this.newLeave).subscribe(
      data=>{
        if(data){
          this.onNoClick();
          this._service.openSnackBar("New Leave Type","Added Succesfully!!")
        }
      },
      err =>{
        if(err.status == 500)
         this._service.openSnackBar("Invalid  Details","Failed" )
      }
    )
   
  }
}
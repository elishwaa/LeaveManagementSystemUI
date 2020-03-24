import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdminHomePageComponent } from 'src/app/Employee/admin-home-page/admin-home-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

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

  SaveNewLeave(){
    this._service.AddNewLeave(this.newLeave).subscribe(
      data=>{
        if(data){
          this.onNoClick();
          this._service.openSnackBar("New Leave Type","Added Succesfully!!")
        }
        else{
          this._service.openSnackBar("New Leave Type","Failed!!")

        }
      }
    )
   
  }
}
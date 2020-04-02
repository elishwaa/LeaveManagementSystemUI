import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-new-designation',
  templateUrl: './new-designation.component.html',
  styleUrls: ['./new-designation.component.css']
})
export class NewDesignationComponent implements OnInit {

  newDesignation:string;
  constructor(public dialogRef: MatDialogRef<AdminHomePageComponent>, public _service: LeaveMgmtService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SaveNewDesignation(){
    this._service.AddNewDesignation(this.newDesignation).subscribe(
      data=>{
        if(data){
          this.onNoClick();
          this._service.openSnackBar("New Employee Designation","Added Succesfully!!")
        }
        else{
          this._service.openSnackBar("New Employee Designation","Failed!!")

        }
      }
    )
   
  }
}

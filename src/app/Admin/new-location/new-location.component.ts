import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css']
})
export class NewLocationComponent implements OnInit {

  newLocation:string;
  constructor(public dialogRef: MatDialogRef<AdminHomePageComponent>, public _service: LeaveMgmtService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SaveNewLocation(){
    this._service.AddNewLocation(this.newLocation).subscribe(
      data=>{
        if(data){
          this.onNoClick();
          this._service.OpenSnackBar("New Location","Added Succesfully!!")
        }
        else{
          this._service.OpenSnackBar("New Location","Failed!!")

        }
      }
    )
   
  }

}

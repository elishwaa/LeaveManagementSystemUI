import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdminHomePageComponent } from 'src/app/Employee/admin-home-page/admin-home-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

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
          this._service.openSnackBar("New Location","Added Succesfully!!")
        }
        else{
          this._service.openSnackBar("New Location","Failed!!")

        }
      }
    )
   
  }

}

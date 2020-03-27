import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdminHomePageComponent } from 'src/app/Employee/admin-home-page/admin-home-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  newProject:string;
  constructor(public dialogRef: MatDialogRef<AdminHomePageComponent>, public _service: LeaveMgmtService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SaveProject(){
    this._service.AddNewProject(this.newProject).subscribe(
      data=>{
        if(data){
          this.onNoClick();
          this._service.openSnackBar("New Project","Added Succesfully!!")
        }
        else{
          this._service.openSnackBar("New Project","Failed!!")

        }
      }
    )
   
  }
}

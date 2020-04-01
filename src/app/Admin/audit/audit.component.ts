import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { MatDialogRef } from '@angular/material';
import { AdminHomePageComponent } from 'src/app/Employee/admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  leave=[];
  auditData: FormGroup;
  constructor(public dialogRef: MatDialogRef<AdminHomePageComponent>,public _service: LeaveMgmtService) { }

  ngOnInit() {
    this._service.getLeaves().subscribe(
      data=>{
        this.leave = data;
      }
    )
    this.auditData = new FormGroup({
      year: new FormControl(),
      leaveId: new FormControl(),
      numberOfDays: new FormControl()
      
    });
  }
  Audit(){
    let data = {...this.auditData.value, year:parseInt(this.auditData.value.year), leaveId:parseInt(this.auditData.value.leaveId),
    numberOfDays: parseInt(this.auditData.value.numberOfDays)}

    this._service.Audit(data).subscribe(
      data =>
        {
           if (data) {  
            this.auditData.reset();
            this._service.openSnackBar("Audit Process","Success!!")
          }
          else{
            this._service.openSnackBar("Audit Process", "Failed")
          }
        }
    )

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

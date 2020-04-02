import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { AllLeaveRequestsComponent } from 'src/app/sharedComponents/all-leave-requests/all-leave-requests.component';

@Component({
  selector: 'app-edit-and-approve',
  templateUrl: './edit-and-approve.component.html',
  styleUrls: ['./edit-and-approve.component.css']
})
export class EditAndApproveComponent implements OnInit {

  leave = [];

  constructor( public _service:LeaveMgmtService,
    public dialogRef: MatDialogRef<AllLeaveRequestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this._service.getLeaves().subscribe(
      data =>{
        this.leave = data;
        console.log(this.leave);
        
      }
    )
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}

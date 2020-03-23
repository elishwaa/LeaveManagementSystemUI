import { Component, OnInit, Inject } from '@angular/core';
import { AllLeaveRequestsComponent } from '../all-leave-requests/all-leave-requests.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../edit-details/edit-details.component';

@Component({
  selector: 'app-edit-and-approve',
  templateUrl: './edit-and-approve.component.html',
  styleUrls: ['./edit-and-approve.component.css']
})
export class EditAndApproveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AllLeaveRequestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}

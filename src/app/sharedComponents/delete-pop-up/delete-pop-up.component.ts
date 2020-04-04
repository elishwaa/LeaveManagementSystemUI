import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CancelLeaveComponent } from '../cancel-leave/cancel-leave.component';
@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.css']
})
export class DeletePopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CancelLeaveComponent>,@Inject(MAT_DIALOG_DATA) public data: any
) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

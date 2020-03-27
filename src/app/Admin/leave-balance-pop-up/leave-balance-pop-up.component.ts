import { Component, OnInit, Inject } from '@angular/core';
import { EditLeaveBalanceComponent } from '../edit-leave-balance/edit-leave-balance.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/Employee/edit-details/edit-details.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

@Component({
  selector: 'app-leave-balance-pop-up',
  templateUrl: './leave-balance-pop-up.component.html',
  styleUrls: ['./leave-balance-pop-up.component.css']
})
export class LeaveBalancePopUpComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EditLeaveBalanceComponent>, public _service:LeaveMgmtService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
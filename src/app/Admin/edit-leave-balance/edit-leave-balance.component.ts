import { Component, OnInit } from '@angular/core';
import { LeaveMgmt } from 'src/app/leave-mgmt';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LeaveBalanceDetails } from 'src/app/models/leaveBalanceDetails';
import { MatDialog } from '@angular/material';
import { LeaveBalancePopUpComponent } from '../leave-balance-pop-up/leave-balance-pop-up.component';
import { LoginParameters } from 'src/app/models/LoginParameters';

@Component({
  selector: 'app-edit-leave-balance',
  templateUrl: './edit-leave-balance.component.html',
  styleUrls: ['./edit-leave-balance.component.css']
})
export class EditLeaveBalanceComponent implements OnInit {

  leaveBalance :LeaveBalanceDetails[];
  loginparameters :LoginParameters;
  displayedColumns: string[] = ['employeeId','employeeName','casualLeave','sick','other','action'];

  constructor(public _service: LeaveMgmtService, public dialog:MatDialog) { }

  ngOnInit() {

    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));
    this._service.GetLeaveBalance(this.loginparameters.id).subscribe(
      data=>{
          // this.leaveBalance = data;
          console.log(this.leaveBalance);
          
      });
  }
  // Edit(element:LeaveBalanceDetails){
  //   this.dialog.open(LeaveBalancePopUpComponent,{
  //     width: '30%',
  //     height: '75%',
  //     data:{
  //       employeeId:element.employeeId, leaveId: element.casualLeave, 
  //       leaveType: element.sick, total: element.other
  //     }
  //   });
  // }

}

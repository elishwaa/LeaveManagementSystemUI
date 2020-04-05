import { Component, OnInit } from '@angular/core';
import { LeaveMgmt } from 'src/app/leave-mgmt';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LeaveBalanceDetails } from 'src/app/models/leaveBalanceDetails';
import { MatDialog } from '@angular/material';
import { LeaveBalancePopUpComponent } from '../leave-balance-pop-up/leave-balance-pop-up.component';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-leave-balance',
  templateUrl: './edit-leave-balance.component.html',
  styleUrls: ['./edit-leave-balance.component.css']
})
export class EditLeaveBalanceComponent implements OnInit {

  loginparameters: LoginParameters;
  headers: string[] = [];
  rowData = [];
  leaves = [];
  selectedRow: number;

  returnData = [{
    employeeId: '',
    year: '',
    leaves: [
      { leaveId: 0, value: 0 }
    ],

  }]
  constructor(public _service: LeaveMgmtService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this._service.back.emit({ back: true });
    this.loginparameters = JSON.parse(localStorage.getItem('employee'));
    this._service.getLeaveBalance(this.loginparameters.id).subscribe(
      data => {
        this.headers = Object.keys(data['LeaveBalanceData'][0]);
        this.headers.push('Edit');
        this.leaves = data['Leaves']
        this.rowData = data['LeaveBalanceData'];
      });
  }
  updateLeaveBalance(data) {
    let window = this.dialog.open(LeaveBalancePopUpComponent, {
      width: '25%',
      height: '75%',
    })
    window.componentInstance.data = data;

    window.afterClosed().subscribe(result => {
      if (result) {
        this.returnData[0]['employeeId'] = (result.Id);
        this.returnData[0]['leaves'] = [];
        this.returnData[0]['year'] = (result.Year);

        Object.keys(result).forEach(element => {
          this.leaves.forEach(leave => {

            if (element == leave.EType) {
              this.returnData[0]['leaves'].push({ leaveId: leave.Id, value: Number(result[element]) })
            }
          })
        })
      }
      this._service.updatedLeaveBalance(this.returnData).subscribe(
        data => {
          if (data) {
            this._service.openSnackBar("Leave Balance Updated", "Success!!")
          }
        },
        err => {
          if (err.status == 500)
            this._service.openSnackBar("Invalid Details", "Failed")
        }
      )
    });

  }
}

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
  // displayedColumns: string[] = ['action'];
  constructor(public _service: LeaveMgmtService, public dialog: MatDialog) {

  }

  ngOnInit() {

    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));
    this._service.GetLeaveBalance(this.loginparameters.id).subscribe(
      data => {
        this.headers = Object.keys(data['Table'][0]);
        this.headers.push('Edit');
        this.leaves = data['Table1']
        this.rowData = data['Table'];
        console.log(this.leaves);

      });
  }
  UpdateLeaveBalance(data) {
    let window = this.dialog.open(LeaveBalancePopUpComponent, {
      width: '25%',
      height: '75%',
    })
    window.componentInstance.data = data;

    window.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.returnData[0]['employeeId'] = (result.Id);
        this.returnData[0]['leaves'] = [];
        this.returnData[0]['year'] = (result.Year);

        Object.keys(result).forEach(element => {
          this.leaves.forEach(leave => {

            if (element == leave.EType) {
              this.returnData[0]['leaves'].push({ leaveId: leave.Id, value: Number(result[element] )})
            }
          })
        })
      }

      console.log(this.returnData);


      this._service.UpdatedLeaveBalance(this.returnData).subscribe(
        data => {
          if (data) {
            this._service.openSnackBar("Leave Balance Updated", "Success!!")
          }
          else {
            this._service.openSnackBar("Leave Balance Updation", "Failed!!")
          }
        }
      )
    });

  }
}

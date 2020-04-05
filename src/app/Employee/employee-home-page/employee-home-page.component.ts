import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { TransactionListingComponent } from '../../sharedComponents/transaction-listing/transaction-listing.component';
import { LeaveBalanceDetails } from 'src/app/models/leaveBalanceDetails';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { SubmitLeaveComponent } from 'src/app/sharedComponents/submit-leave/submit-leave.component';
import { environment } from 'src/environments/environment';
import { ChangePasswordPopUpComponent } from '../change-password-pop-up/change-password-pop-up.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.css']
})
export class EmployeeHomePageComponent implements OnInit {
  loginparameters: LoginParameters;
  leaveRequests: LeaveRequests;
  Type: boolean = false;
  success: boolean = false;
  employeeType: any;
  LRStatus: any;
  returnData: any;
  newPassword: string;
  reEnterdpassword: string;
  leaveBalance: LeaveBalanceDetails;
  headers: string[] = [];
  rowData = [];
  hideComponent: boolean = false;
  displayedColumns: string[] = ['casualLeave', 'sickLeave', 'other'];

  constructor(public _service: LeaveMgmtService, private _snackBar: MatSnackBar,
    public httpClient: HttpClient, public route: Router, public dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('employee') != null) {
      this.loginparameters = JSON.parse(localStorage.getItem('employee'));
      this.hideComponent = true;
      if (this.loginparameters.typeName == 'Manager') {
        this.Type = true;
      }
    }
 
    this._service.getLeaveBalance(this.loginparameters.id).subscribe(
      data => {
        console.log(data);

        this.headers = Object.keys(data['LeaveBalanceData'][0]);
        console.log(this.headers);
        this.rowData = data['LeaveBalanceData'];
        console.log(this.rowData);
      });
  }
  getLeaveRequests() {

    this._service.getLeaveRequests(this.loginparameters.id).subscribe(
      (details) => {
        if (details[0] != null) {
          localStorage.setItem('leaveRequests', JSON.stringify(details));
          this.route.navigateByUrl('cancel-leave');
        }
        else {
          this._service.openSnackBar("No Leave Requests", "Sorry!")
        }

      });
  }
  openSubmitLeave(id: number): void {
    this.dialog.open(SubmitLeaveComponent, {
      width: '30%',
      height: '75%',
      data: {
        empId: id
      }
    });

  }
  edit(): void {
    const dialogRef = this.dialog.open(EditDetailsComponent, {
      width: '30%',
      height: '75%',
      data: {
        id: this.loginparameters.id, typeId: this.loginparameters.typeId, typeName: this.loginparameters.typeName, firstName: this.loginparameters.firstName,
        middleName: this.loginparameters.middleName, lastName: this.loginparameters.lastName, email: this.loginparameters.email,
        salary: this.loginparameters.salary, username: this.loginparameters.username, locationId: this.loginparameters.locationId, locationName: this.loginparameters.locationName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = { ...result, id: parseInt(result.id), typeId: parseInt(result.typeId), salary: parseInt(result.salary) }
        this._service.editEmployee(data)
          .subscribe(
            data => {
              if (data) {
                this.loginparameters = result;
              }
            },
            err => {
              if (err.status == 500)
                this._service.openSnackBar("Updations", "Failed")
            }
          )
      }
    });

  }
  openChangePassDialog(id: number): void {
    this._service.openChangePassDialog(id);
  }
  logout() {
    this._service.logout();
  }

  allLeaveRequests() {
    this._service.allLeaveRequests(this.loginparameters.id).subscribe((details) => {
      if (details[0] != null) {
        localStorage.setItem('AllLeaveRequests', JSON.stringify(details));
        this.route.navigateByUrl('all-leave-requests');
      }
      else {
        this._service.openSnackBar("No Leave Requests", "Have a nice day!")
      }

    });

  }
  transactionListing(): void {
    this.route.navigateByUrl('/report');
  }
}

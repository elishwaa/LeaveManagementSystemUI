import { Component, OnInit } from '@angular/core';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { environment } from 'src/environments/environment';
import { ChangePasswordPopUpComponent } from 'src/app/sharedComponents/change-password-pop-up/change-password-pop-up.component';
import { MatSnackBar } from '@angular/material';
// import { environment} from '../../../environments/environment'

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.css']
})
export class EmployeeHomePageComponent implements OnInit {
  // webApi = 'https://localhost:44398/api/LeaveRequest'
  loginparameters: LoginParameters;
  loginEmpId: number;
  Type: boolean = false;
  success:boolean =false;
  employeeType: any;
  LRStatus: any;
  returnData: any;
  newPassword:string ;
  reEnterdpassword:string ;
  constructor(public _service: LeaveMgmtService,private _snackBar: MatSnackBar, public httpClient: HttpClient, public route: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));

    this.employeeType = this._service.employeeType;
    if (this.employeeType == 3) {
      this.Type = true;
    }
  }
  getLeaveRequests() {

    this._service.getLeaveRequests(this.loginparameters.id).subscribe((details) => {
      debugger;
      console.log(details);
      if (details) {
        sessionStorage.setItem('leaveRequests', JSON.stringify(details));
      }
      this.route.navigateByUrl('cancel-leave');
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EditDetailsComponent, {
      width: '30%',
      height: '75%',
      data: {
        id: this.loginparameters.id, typeId: this.loginparameters.typeId, firstName: this.loginparameters.firstName,
        middleName: this.loginparameters.middleName, lastName: this.loginparameters.lastName, email: this.loginparameters.email,
        salary: this.loginparameters.salary, username: this.loginparameters.username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = { ...result, id: parseInt(result.id), typeId: parseInt(result.typeId), salary: parseInt(result.salary) }
        this.httpClient.post(environment.apiUrl + 'LeaveRequest/Edit', data).subscribe(
          data => {
            if (data) {
              this._service.updateSessionStorage(result);
              this.loginparameters = result;
            }
          }
        )
      }
    });''

  }
  openChangePassDialog(id:number): void{

    const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
      width: '25%',
      height: '40%',
      data: {
        password1: this.newPassword  , password2:this.reEnterdpassword
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && (result.password1 == result.password2)) {
        this.httpClient.post(environment.apiUrl + 'LeaveRequest/ChangePassword', {id, password: result.password1}).subscribe(
          data => {
            debugger
            if (data) {
             console.log(data);
             this.openSnackBar("Password updation","Success!!");
            }
          }
        )
      }
    });
  }
  logout() {
    this.route.navigateByUrl('');
  }

  openSnackBar(message: string, action:string) {
    console.log(123);
    
    this._snackBar.open(message,action ,{
      duration: 2000,
    });
  }
}
import { Component, OnInit, Inject } from '@angular/core';
import { SignInPageComponent } from 'src/app/sign-in-page/sign-in-page.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/Employee/edit-details/edit-details.component';
import { EmployeeHomePageComponent } from 'src/app/Employee/employee-home-page/employee-home-page.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  employeeId:any;
  loginparameters:LoginParameters;
  emailId:string ;
  Error:boolean = false;
  constructor(public dialogRef: MatDialogRef<SignInPageComponent>, public _service: LeaveMgmtService, public httpClient:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'))
  }

  ForgotPassword(){
  let params = new HttpParams().set('emailId',this.emailId)
  this.httpClient.get(environment.apiUrl+'LeaveRequest/ConfirmEmail', {params}).subscribe(
    data =>{
      if(data != 0){
        this.employeeId = data;
        this.onNoClick();
        this._service.openChangePassDialog(this.employeeId)
        debugger
      }
      else{
        debugger
        this.Error = true;
      }
    }
  );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

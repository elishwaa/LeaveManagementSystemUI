import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveMgmtService } from '../services/leave-mgmt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '../sharedComponents/forgot-password/forgot-password.component';
import { NewLoginComponent } from '../sharedComponents/new-login/new-login.component';
import { EmployeeInfo } from '../models/employeeInfo';
import { CookieService } from 'ngx-cookie-service';
import { AdalService } from 'adal-angular4';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  signInForm: FormGroup;
  loginParameters: EmployeeInfo;
  constructor(public route: Router, public dialog: MatDialog, public _service: LeaveMgmtService, public cookieService: CookieService, private authService: AdalService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl(),
      // password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(10)]))
    });
    if (this.cookieService.get('LoggedIn')) {
      this._service.visible.emit({ LoggedInStatus: true });
      this.loginParameters = JSON.parse(localStorage.getItem('employee'));
      if (this.loginParameters.typeName = 'Admin') {
        this.route.navigateByUrl('admin-home');
      }
      else if ((this.loginParameters.typeName != 'Admin')) {
        this.route.navigateByUrl('employee-home');
      }
    }
  }

  login() {
    debugger
    this._service.getEmployeeInfo(this.signInForm.value).subscribe(
      (data) => {
        if (data.id != 0) {
          this.cookieService.set('LoggedIn', data.typeName,0.25);
          localStorage.setItem('employee', JSON.stringify(data));
          localStorage.setItem('empType', data.typeId);
          this._service.routeToHome(data.typeId);
          this._service.visible.emit({ LoggedInStatus: true });
        }
        else {
          this._service.openSnackBar("Invalid Login Details", "Login again")
        }
      });
  }
  confirmEmail() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '25%',
      height: '35%',
    });


  }
  newLogin() {
    this.dialog.open(NewLoginComponent, {
      width: '30%',
      height: '60%',
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { LeaveMgmtService } from '../services/leave-mgmt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '../sharedComponents/forgot-password/forgot-password.component';
import { NewLoginComponent } from '../sharedComponents/new-login/new-login.component';
import { LoginParameters } from '../models/LoginParameters';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  signInForm: FormGroup;
  empType = [];
  loginDetails: string;
  loginParameters: LoginParameters;
  constructor(public route: Router, public dialog: MatDialog, public _service: LeaveMgmtService, public cookieService: CookieService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    if (this.cookieService.get('LoggedIn') != null) {
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
    this._service.getEmployeeInfo(this.signInForm.value).subscribe(
      (details) => {
        if (details.id != 0) {
          this.cookieService.set('LoggedIn', details.typeName);
          localStorage.setItem('employee', JSON.stringify(details));
          localStorage.setItem('empType', details.typeId);
          if (details.typeId == 1 ) {
            this.route.navigateByUrl('admin-home');
          }
          else if(details.typeId != 1){
            this.route.navigateByUrl('employee-home');
          }
        }
        else {
          this._service.OpenSnackBar("Invalid Login Details", "Login Again")
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
      width: '25%',
      height: '45%',
    });
  }
}

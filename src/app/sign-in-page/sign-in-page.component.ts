import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { LeaveMgmtService } from '../services/leave-mgmt.service';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from '../sharedComponents/forgot-password/forgot-password.component';
import { environment } from 'src/environments/environment';
import { NewLoginComponent } from '../sharedComponents/new-login/new-login.component';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
  signInForm: FormGroup;
  empType = [];
  loginDetails: string;
  encPassword: string = 'Bht235@$5';
  constructor(public route: Router,public dialog: MatDialog, public _service: LeaveMgmtService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }


  login() {
    let Encryptedpass = CryptoJS.AES.encrypt(this.signInForm.controls['password'].value.trim(), this.encPassword.trim()).toString(); 
    
    this.signInForm.controls['password'].setValue(Encryptedpass) ;
    
    this._service.getEmployeeInfo(this.signInForm.value).subscribe(
      (details) => {
     
      if (details) {
        sessionStorage.setItem('employee', JSON.stringify(details));
        sessionStorage.setItem('empType', details.typeId);
        console.log(details.typeId);
      }
      
      if (details.typeId == 1){
        this.route.navigateByUrl('admin-home');
      }
      else if (details.typeId == 2 || details.typeId == 3){
        this.route.navigateByUrl('employee-home');
      }
      else{
        this._service.openSnackBar("Invalid Login Details","Login Again")
      }
    });
  }
  confirmEmail(){
   this.dialog.open(ForgotPasswordComponent, {
      width: '30%',
      height: '35%',
    });
    
   
  }
  newLogin(){
    this.dialog.open(NewLoginComponent,{
      width: '30%',
      height: '45%',
    });
  }
}

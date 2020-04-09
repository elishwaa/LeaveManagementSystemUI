import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SignInPageComponent } from 'src/app/sign-in-page/sign-in-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {

  newLoginForm:FormGroup;
  passwordRegEx;
  incorrectPassword;
  constructor(public dialogRef: MatDialogRef<SignInPageComponent>, public _service: LeaveMgmtService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    this.newLoginForm = new FormGroup({
      employeeId: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15)]))
    });
  }

  newLogin() {
   
    let data = { ...this.newLoginForm.value, employeeId: parseInt(this.newLoginForm.value.employeeId) }
    if(this.passwordRegEx.test(data.password)){
      this._service.addLogin(data).subscribe(
        data => {
          if (data) {
            this.onNoClick();
            this._service.openSnackBar("New Login Added", "Successfully")
          }
          else{
            this._service.openSnackBar("Failed to add new login", "Operation Failed!!")
          }
        },
        err => {
          if (err.status == 500){
            this._service.openSnackBar("Failed to add new login", "Operation Failed!!")
          }
        }
      );
    }
      else{
        this.incorrectPassword = true;
        this._service.openSnackBar("Invalid password", "Check your password")

      }
 
   
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}

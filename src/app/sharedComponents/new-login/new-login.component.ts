import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SignInPageComponent } from 'src/app/sign-in-page/sign-in-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {

  employeeId: number;
  username: string;
  password: string;

  newLoginForm:FormGroup;
  Error: boolean = false;
  constructor(public dialogRef: MatDialogRef<SignInPageComponent>, public _service: LeaveMgmtService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.newLoginForm = new FormGroup({
      employeeId: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  newLogin() {
    let data = { ...this.newLoginForm.value, employeeId: parseInt(this.newLoginForm.value.employeeId) }

    this._service.addLogin(data).subscribe(
      data => {
        if (data.value == true) {
          this.onNoClick();
          this._service.openSnackBar("New Login Added", "Success!!")
        }
        else{
          this._service.openSnackBar("Invalid Details", "Failed")
        }
      },
      err => {
        if (err.status == 500){
          this._service.openSnackBar("Error", "Failed")
        }
      }
    );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}

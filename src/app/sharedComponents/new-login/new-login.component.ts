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
  constructor(public dialogRef: MatDialogRef<SignInPageComponent>, public _service: LeaveMgmtService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.newLoginForm = new FormGroup({
      employeeId: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(10)]))
    });
  }

  newLogin() {
    let data = { ...this.newLoginForm.value, employeeId: parseInt(this.newLoginForm.value.employeeId) }

    this._service.addLogin(data).subscribe(
      data => {
        if (data) {
          this.onNoClick();
          this._service.openSnackBar("New Login Added", "Successfully")
        }
      },
      err => {
        if (err.status == 500){
          this._service.openSnackBar("New login", "Operation Failed!!")
        }
      }
    );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}

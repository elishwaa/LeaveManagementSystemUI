import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForgotPasswordComponent } from 'src/app/sharedComponents/forgot-password/forgot-password.component';
import { EmployeeHomePageComponent } from '../employee-home-page/employee-home-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

@Component({
  selector: 'app-change-password-pop-up',
  templateUrl: './change-password-pop-up.component.html',
  styleUrls: ['./change-password-pop-up.component.css']
})
export class ChangePasswordPopUpComponent implements OnInit {
  incorrectPassword;
  password1;
  password2;
  empId;
  constructor(public dialogRef: MatDialogRef<EmployeeHomePageComponent, ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _service:LeaveMgmtService) { }

  ngOnInit() {
    this.password1 = this.data.passwordOne ;
    this.password2 = this.data.passwordTwo;
    this.empId = this.data.empId;
    this.incorrectPassword = this._service.incorrectPassword
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  changePassword(password1, password2){
    if (password1 == password2) {
      let passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if(passwordRegEx.test(password2)){
        this._service.changePassword(this.empId,password2).subscribe(
          data => {
            if (data) {
              this._service.openSnackBar("Password updated", "Successfully");
              this.onNoClick();
            }
          })
      }
      else {
        this.incorrectPassword = true;
        this._service.openSnackBar("Invalid password", "Check your password")
     } 
  }
  else{
    this._service.openSnackBar("Password Mismatch", "Check your password")
  }
  }
}
      

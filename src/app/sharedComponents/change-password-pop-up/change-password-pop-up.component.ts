import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from 'src/app/Employee/edit-details/edit-details.component';
import { EmployeeHomePageComponent } from 'src/app/Employee/employee-home-page/employee-home-page.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-change-password-pop-up',
  templateUrl: './change-password-pop-up.component.html',
  styleUrls: ['./change-password-pop-up.component.css']
})
export class ChangePasswordPopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeHomePageComponent, ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

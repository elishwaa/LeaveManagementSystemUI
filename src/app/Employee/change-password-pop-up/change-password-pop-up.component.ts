import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForgotPasswordComponent } from 'src/app/sharedComponents/forgot-password/forgot-password.component';
import { EmployeeHomePageComponent } from '../employee-home-page/employee-home-page.component';

@Component({
  selector: 'app-change-password-pop-up',
  templateUrl: './change-password-pop-up.component.html',
  styleUrls: ['./change-password-pop-up.component.css']
})
export class ChangePasswordPopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeHomePageComponent, ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

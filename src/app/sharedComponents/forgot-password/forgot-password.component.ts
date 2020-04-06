import { Component, OnInit, Inject } from '@angular/core';
import { SignInPageComponent } from 'src/app/sign-in-page/sign-in-page.component';
import { MatDialogRef} from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  employeeId: any;
  emailId: string;
  Error: boolean = false;
  constructor(public dialogRef: MatDialogRef<SignInPageComponent>, public _service: LeaveMgmtService, public httpClient: HttpClient) { }

  ngOnInit() {
  }

  forgotPassword() {
    let params = new HttpParams().set('emailId', this.emailId)
    this._service.getEmail({ params })
      .subscribe(
        data => {
          if (data) {
            this.employeeId = data;
            this.onNoClick();
            this._service.openChangePassDialog(this.employeeId)
          }
          else {
            this.Error = true;
          }
        }
      );

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

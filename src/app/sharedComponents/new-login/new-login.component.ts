import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SignInPageComponent } from 'src/app/sign-in-page/sign-in-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent implements OnInit {

  employeeId:number;
  username:string;
  password:string;

  Error:boolean = false;
  constructor(public dialogRef: MatDialogRef<SignInPageComponent>, public _service: LeaveMgmtService, public httpClient:HttpClient){}

  ngOnInit() {
  }

  newLogin(){
    // let params = new HttpParams().set('employeeId',this.employeeId.toString()) .set('username',this.username) .set('password',this.password)
    this.httpClient.post(environment.apiUrl+'Login/newLogin', {employeeId:Number(this.employeeId),username: this.username, password: this.password}).subscribe(
      data =>{
        if(data){
          this.onNoClick();
          this._service.openSnackBar("New Login Added","Success!!")
          debugger
        }
        else{
          this.Error = true;
        }
      }
    );
  
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  

}

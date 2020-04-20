import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { LeaveMgmtService } from './services/leave-mgmt.service';
import { CookieService } from 'ngx-cookie-service';
import {AdalService} from 'adal-angular4'
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LeaveManagementSystem';


  constructor( public _service: LeaveMgmtService, public cookieService: CookieService, public cdRef : ChangeDetectorRef, public adalService: AdalService) {

  }
 
  visible :boolean = false;
  back: boolean = false;
  signInForm: FormGroup;
  ngOnInit(){

    this.adalService.init(environment.authConfig);
    this.adalService.handleWindowCallback();
    if(!this.adalService.userInfo.authenticated)
    this.adalService.login();

    this.signInForm = new FormGroup({
      username: new FormControl(),
      // password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(10)]))
    });

    if(this.adalService.userInfo.userName){
      this.signInForm.value.username = this.adalService.userInfo.userName;
      this.login();
    }
    if(this.cookieService.get('LoggedIn')){
      this.visible = true;
    }
    this._service.visible.subscribe(
      data=>{
        if('LoggedInStatus' in data){
          this.visible = data.LoggedInStatus;
        }
      }
    );
    this._service.back.subscribe(
      data=>{
        if('back' in data){
          this.back = data.back;
          this.cdRef.detectChanges();
        }
      }
    );
    
  }
  logout(){
    this._service.logout();
  }
  home(){
    let type = JSON.parse(localStorage.getItem('empType'));
    this._service.routeToHome(type);
  }
  goBack(){
    this._service.goBack();
  }
  
  login() {
    this._service.getEmployeeInfo(this.signInForm.value).subscribe(
      (data) => {
        if (data.id != 0) {
          this.cookieService.set('LoggedIn', data.typeName,0.25);
          localStorage.setItem('employee', JSON.stringify(data));
          localStorage.setItem('empType', data.typeId);
          this._service.routeToHome(data.typeId);
          this._service.visible.emit({ LoggedInStatus: true });
        }
        else {
          this._service.openSnackBar("Invalid Login Details", "Login again")
        }
      });
  }
}



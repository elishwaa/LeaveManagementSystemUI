import { Component, ChangeDetectorRef } from '@angular/core';
import { LeaveMgmtService } from './services/leave-mgmt.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeaveManagementSystem';

  constructor(public _service: LeaveMgmtService, public cookieService: CookieService, public cdRef : ChangeDetectorRef) {
  }
 
  visible :boolean = false;
  back: boolean = false;
  ngOnInit(){
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
}



import { Component } from '@angular/core';
import { LeaveMgmtService } from './services/leave-mgmt.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeaveManagementSystem';

  constructor(public _service: LeaveMgmtService) {
  }
 
  visible :boolean = false;
  ngOnInit(){
    this._service.visible.subscribe(
      data=>{
        if('LoggedInStatus' in data){
          this.visible = data.LoggedInStatus;
        }
      }
    );
    console.log(this.visible);
    
  }
  logout(){
    this._service.Logout();
  }
  Home(){
    let type = JSON.parse(localStorage.getItem('empType'));
    this._service.RouteToHome(type);
  }
}



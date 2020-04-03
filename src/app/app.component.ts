import { Component } from '@angular/core';
import { LeaveMgmtService } from './services/leave-mgmt.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LeaveManagementSystem';

  // constructor(public _service: LeaveMgmtService) {
  
  // }
  // visible: boolean;
  // ngOnInit(){
  //   this.visible = this._service.visible;
  // }
  // logout(){
  //   this._service.Logout();
  // }
}



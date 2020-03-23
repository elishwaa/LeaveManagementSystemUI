import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from '../../services/leave-mgmt.service';
import { LoginParameters } from '../../models/LoginParameters'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  loginparameters: LoginParameters
  constructor(public _service: LeaveMgmtService, public route: Router) { }

  ngOnInit() {

    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));
  }

  AllLeaveRequests(){
    this._service.AllLeaveRequests(this.loginparameters.id).subscribe((details) => {
      debugger;
      console.log(details);
      if (details) {
        sessionStorage.setItem('AllLeaveRequests', JSON.stringify(details));
      }
      this.route.navigateByUrl('all-leave-requests');
    });
  }
  getAllEmployees(){
    this._service.getAllEmployees();
    this.route.navigateByUrl('all-employees')
  }
}

import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from '../../services/leave-mgmt.service';
import { LoginParameters } from '../../models/LoginParameters'

@Component({
  selector: 'app-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  loginparameters: LoginParameters[]
  constructor(public _service: LeaveMgmtService) { }

  ngOnInit() {

    // this._service.getEmployeeInfo()
    //   .subscribe
    //   (
    //     data => {
    //       this.loginparameters = data;
    //     }
    //   )

  }

}

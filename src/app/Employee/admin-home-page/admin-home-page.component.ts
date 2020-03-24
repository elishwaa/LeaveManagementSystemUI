import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from '../../services/leave-mgmt.service';
import { LoginParameters } from '../../models/LoginParameters'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEmployeeComponent } from 'src/app/Admin/new-employee/new-employee.component';
import { NewDesignationComponent } from 'src/app/Admin/new-designation/new-designation.component';
import { NewLeaveTypeComponent } from 'src/app/Admin/new-leave-type/new-leave-type.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  loginparameters: LoginParameters
  constructor(public _service: LeaveMgmtService, public route: Router, public dialog: MatDialog) { }

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
  logout() {
    this.route.navigateByUrl('');
  }
  AddNewEmployee() :void {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '30%',
      height: '75%',
    });
  }
  AddNewLeaveType(){
    this.dialog.open(NewLeaveTypeComponent,{
      width: '30%',
      height: '35%',
    });
  }
  AddNewDesignation(){
    this.dialog.open(NewDesignationComponent,{
      width: '30%',
      height: '35%',
    });
  }

}

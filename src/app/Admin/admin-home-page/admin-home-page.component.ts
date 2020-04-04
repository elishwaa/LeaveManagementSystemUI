import { Component, OnInit } from '@angular/core';
import { LeaveMgmtService } from '../../services/leave-mgmt.service';
import { LoginParameters } from '../../models/LoginParameters'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewEmployeeComponent } from 'src/app/Admin/new-employee/new-employee.component';
import { NewDesignationComponent } from 'src/app/Admin/new-designation/new-designation.component';
import { NewLeaveTypeComponent } from 'src/app/Admin/new-leave-type/new-leave-type.component';
import { NewLocationComponent } from 'src/app/Admin/new-location/new-location.component';
import { NewProjectComponent } from 'src/app/Admin/new-project/new-project.component';
import { AuditComponent } from 'src/app/Admin/audit/audit.component';
import { TransactionListingComponent } from 'src/app/sharedComponents/transaction-listing/transaction-listing.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  loginparameters: LoginParameters
  hideComponent:boolean = false;
  constructor(public _service: LeaveMgmtService, public route: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this._service.visible.emit({LoggedInStatus: true});
    if(localStorage.getItem('employee') != null){
      this.loginparameters = JSON.parse(localStorage.getItem('employee'));
      this.hideComponent = true;
    }
    this._service.visible.subscribe(
      data=>{
        if('LoggedIn' in data){
          data = data.LoggedIn;
        }
      }
    );
  }

  AllLeaveRequests(){
    this._service.AllLeaveRequests(this.loginparameters.id).subscribe(
      (details) => {
      if (details[0]!= null) {
        localStorage.setItem('AllLeaveRequests', JSON.stringify(details));
        this.route.navigateByUrl('all-leave-requests');
      }
      else{
        this._service.OpenSnackBar("No Leave Requests to show","Have a nice day")
      }
  
    });
  }
  getAllEmployees(){
    this._service.GetAllEmployees();
    this.route.navigateByUrl('all-employees')
  }
  logout() {
    this._service.Logout();
  }
  AddNewEmployee() :void {
    this.dialog.open(NewEmployeeComponent, {
      width: '25%',
      height: '80%',
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
  AddNewLocation(){
    this.dialog.open(NewLocationComponent,{
      width: '30%',
      height: '35%',
    });
  }
  AddNewProject(){
    this.dialog.open(NewProjectComponent,{
      width: '30%',
      height: '35%',
    }
      )
  }
  Report():void {
    this.route.navigateByUrl('/report');
  }
  Audit(){
    this.dialog.open(AuditComponent,{
      width: '30%',
      height: '55%',
    })
  }

}

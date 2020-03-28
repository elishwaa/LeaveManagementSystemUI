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
import { TransactionListingComponent } from '../transaction-listing/transaction-listing.component';

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
      if (details[0]!= null) {
        sessionStorage.setItem('AllLeaveRequests', JSON.stringify(details));
        this.route.navigateByUrl('all-leave-requests');
      }
      else{
        this._service.openSnackBar("No Leave Requests to show","Have a nice day")
      }
  
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
    this.dialog.open(NewEmployeeComponent, {
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
  //   this._service.TransactionListing(this.loginparameters.id).subscribe(
  //     data =>{
  //       console.log(data);
        
  //       if(data[0]!= null){
  //         this.dialog.open(TransactionListingComponent,{
  //           width: '80%',
  //           height: '75%',
  //           data: data
  //         });
  //       }
  //       else{
  //         this._service.openSnackBar("No Transactions yet","Have a nice day")
  //       }
  //     }
  //   )
    this.dialog.open(TransactionListingComponent,{
                width: '80%',
                height: '75%'
              });
            
  }
}

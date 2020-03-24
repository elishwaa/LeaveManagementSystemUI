import { Component, OnInit } from '@angular/core';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubmitLeaveComponent } from 'src/app/sharedComponents/submit-leave/submit-leave.component';
import { stringify } from 'querystring';
import { LeaveRequests } from 'src/app/models/leaveRequests';

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.css']
})
export class EmployeeHomePageComponent implements OnInit {
  loginparameters: LoginParameters;
  leaveRequests: LeaveRequests;
  loginEmpId: number;
  Type: boolean = false;
  success:boolean =false;
  employeeType: any;
  LRStatus: any;
  returnData: any;
  newPassword:string ;
  reEnterdpassword:string ;
  constructor(public _service: LeaveMgmtService,private _snackBar: MatSnackBar, 
    public httpClient: HttpClient, public route: Router, public dialog: MatDialog) { }

  ngOnInit() {
    
    this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));
    console.log(this.loginparameters);
    

    this.employeeType = sessionStorage.getItem('empType')
    if (this.employeeType == 3) {
      this.Type = true;
    }
  }
  getLeaveRequests() {

    this._service.getLeaveRequests(this.loginparameters.id).subscribe((details) => {
      debugger;
      console.log(details);
      if (details) {
        sessionStorage.setItem('leaveRequests', JSON.stringify(details));
      }
      this.route.navigateByUrl('cancel-leave');
    });
  }
  openSubmitLeave(id:number): void{
     this.dialog.open(SubmitLeaveComponent, {
      width: '30%',
      height: '75%',
      data: {
        empId: id
      }
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EditDetailsComponent, {
      width: '30%',
      height: '75%',
      data: {
        id: this.loginparameters.id, typeId: this.loginparameters.typeId,typeName:this.loginparameters.typeName, firstName: this.loginparameters.firstName,
        middleName: this.loginparameters.middleName, lastName: this.loginparameters.lastName, email: this.loginparameters.email,
        salary: this.loginparameters.salary, username: this.loginparameters.username, locationId:this.loginparameters.locationId, locationName:this.loginparameters.locationName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = { ...result, id: parseInt(result.id), typeId: parseInt(result.typeId), salary: parseInt(result.salary) }
        this.httpClient.post(environment.apiUrl + 'LeaveRequest/Edit', data).subscribe(
          data => {
            if (data) {
              this._service.updateSessionStorage(result);
              this.loginparameters = result;
            }
          }
        )
      }
    });

  }
  openChangePassDialog(id:number){
    this._service.openChangePassDialog(id);
  }
  
  logout() {
    this.route.navigateByUrl('');
  }

  AllLeaveRequests(){
    this._service.AllLeaveRequests(this.loginparameters.id).subscribe((details) => {
      debugger;
      console.log(details);
      if (details) {
        sessionStorage.setItem('AllLeaveRequests', JSON.stringify(details));
        // this._service.allLeaveRequests[] = details;
      }
      this.route.navigateByUrl('all-leave-requests');
    });
   
  }
 
}
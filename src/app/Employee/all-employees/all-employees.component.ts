import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { MatPaginator, MatDialog } from '@angular/material';
import { EditDetailsComponent } from '../edit-details/edit-details.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubmitLeaveComponent } from 'src/app/sharedComponents/submit-leave/submit-leave.component';
import { TransactionListingComponent } from '../transaction-listing/transaction-listing.component';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName',,'type','email','salary',
  'username','manager','project','location','employeeInfo','transactions','leaveRequests','addLeaveRequest'];
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  employeeInfo: LoginParameters[];
  constructor(public _service: LeaveMgmtService,public dialog: MatDialog,public httpClient: HttpClient,public route:Router) { }

  ngOnInit() {
    this._service.getAllEmployees().subscribe(
      data=>{
        this.employeeInfo = data;
        console.log(this.employeeInfo);
        
      }
    )
  }
  Edit(employeeInfo:LoginParameters): void {
      const dialogRef = this.dialog.open(EditDetailsComponent, {
        width: '30%',
        height: '75%',
        data: {
          id: employeeInfo.id , typeId: employeeInfo.typeId, firstName: employeeInfo.firstName,
          middleName: employeeInfo.middleName, lastName: employeeInfo.lastName, email: employeeInfo.email,
          salary: employeeInfo.salary, username: employeeInfo.username, locationId:employeeInfo.locationId, locationName:employeeInfo.locationName
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          debugger
          let data = { ...result, id: parseInt(result.id), typeId: parseInt(result.typeId), locationId: parseInt(result.locationId), salary: parseInt(result.salary) }
          this.httpClient.post(environment.apiUrl + 'LeaveRequest/Edit', data).subscribe(
            data => {
              if (data) {
                this._service.updateSessionStorage(result);
                this.employeeInfo = result;
                window.location.reload();
              }
            }
          )
        }
      });
  
    }
    EmployeeleaveRequests(employee: LoginParameters ){
      this._service.getLeaveRequests(employee.id).subscribe((details) => {
        debugger;
        console.log(details);
        if (details) {
          sessionStorage.setItem('leaveRequests', JSON.stringify(details));
        }
        this.route.navigateByUrl('cancel-leave');
      });
    }

    AddLeaveRequest(employee: LoginParameters):void{
        const dialogRef = this.dialog.open(SubmitLeaveComponent, {
          width: '30%',
          height: '75%',
          data: {
            empId: employee.id
          }
        });
    
    }
    ShowTransactions(employee:LoginParameters):void {
      this._service.TransactionListing(employee.id).subscribe(
        data =>{
          if(data){
            this.dialog.open(TransactionListingComponent,{
              width: '80%',
              height: '75%',
              data: data
            });
          }
          else{
            // ******************
          }
        }
      )
      
    }
  
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { MatPaginator, MatDialog } from '@angular/material';
import { EditDetailsComponent } from '../../Employee/edit-details/edit-details.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubmitLeaveComponent } from 'src/app/sharedComponents/submit-leave/submit-leave.component';
import { TransactionListingComponent } from '../../sharedComponents/transaction-listing/transaction-listing.component';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'middleName', 'lastName', 'type', 'email', 'salary',
    'username', 'manager', 'project', 'location', 'info', 'transactions', 'leaveRequests', 'addLeaveRequest'];
  employeeInfo: LoginParameters[];
  constructor(public _service: LeaveMgmtService, public dialog: MatDialog, public httpClient: HttpClient, public route: Router) { }

  ngOnInit() {
    this._service.getAllEmployees().subscribe(
      data => {
        this.employeeInfo = data;
        console.log(this.employeeInfo);

      }
    )
  }
  edit(employeeInfo: LoginParameters): void {
    const dialogRef = this.dialog.open(EditDetailsComponent, {
      width: '30%',
      height: '75%',
      data: {
        id: employeeInfo.id, typeId: employeeInfo.typeId, firstName: employeeInfo.firstName,
        middleName: employeeInfo.middleName, lastName: employeeInfo.lastName, email: employeeInfo.email,
        salary: employeeInfo.salary, username: employeeInfo.username, projectId: employeeInfo.projectId, projectName: employeeInfo.projectName,
        managerId: employeeInfo.managerId, manager: employeeInfo.manager, locationId: employeeInfo.locationId, locationName: employeeInfo.locationName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        debugger
        let data = {
          ...result, id: parseInt(result.id), typeId: parseInt(result.typeId), projectId: parseInt(result.projectId),
          locationId: parseInt(result.locationId), salary: parseInt(result.salary)
        }

        this._service.editEmployee(data).subscribe(
          data => {
            if (data) {

              this.employeeInfo = result;
              window.location.reload();
            }
            (error: HttpErrorResponse) => {
              if (!error.ok) {
                this._service.openSnackBar("", "Failed")
              }
            }
          }
        )
      }
    });

  }
  employeeleaveRequests(employee: LoginParameters) {
    this._service.getLeaveRequests(employee.id).subscribe((details) => {
      debugger;
      console.log(details);
      if (details[0] != null) {
        localStorage.setItem('leaveRequests', JSON.stringify(details));
        this.route.navigateByUrl('cancel-leave');
      }
      else {
        this._service.openSnackBar("No leave requests to show", "Have a nice day")
      }
    });
  }

  addLeaveRequest(employee: LoginParameters): void {
    const dialogRef = this.dialog.open(SubmitLeaveComponent, {
      width: '30%',
      height: '75%',
      data: {
        empId: employee.id
      }
    });

  }
  showTransactions(employee: LoginParameters): void {
    this._service.transactionListing(employee.id).subscribe(
      data => {
        if (data) {
          this.dialog.open(TransactionListingComponent, {
            width: '90%',
            height: '90%',
            data: data
          });
        }
        else {
          this._service.openSnackBar("No transactions to show", "Sorry!!")
        }
      }
    )

  }

}

import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { LoginParameters } from '../models/LoginParameters';
import { environment } from '../../environments/environment'
import { MatSnackBar, MatDialog } from '@angular/material';
import { LeaveRequests } from '../models/leaveRequests';
import { ChangePasswordPopUpComponent } from '../Employee/change-password-pop-up/change-password-pop-up.component';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LeaveMgmtService {
  loginparameters: LoginParameters;
  empId: number;
  startDate: Date;
  endDate: Date;
  leaveType: string;
  reason: string;
  newPassword: any;
  reEnterdpassword: any;
  allLeaveRequests: LeaveRequests[];
  leaverequestId: number;
  visible: boolean = true;

  constructor(public route: Router, public httpClient: HttpClient, private injector: Injector,
    private _snackBar: MatSnackBar, public dialog: MatDialog, public cookieService: CookieService) {

  }
  getEmpType(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Employee/GetType')
  }
  getLocation(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Location/Get')
  }
  GetLeaveBalance(Id): Observable<any> {
    let params = new HttpParams().set('id', Id.toString())
    return this.httpClient.get(environment.apiUrl + 'Leave/GetLeaveBalance', { params: params })
  }
  getManager(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Employee/GetManagers')
  }
  getProjects(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Project/Get')
  }

  getEmployeeInfo(loginDetails): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Login/Get', loginDetails);
  }
  getLeaves(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Leave/Get');
  }

  GetLeaveRequests(empId: number): Observable<any> {
    let params = new HttpParams().set('id', empId.toString())
    return this.httpClient.get(environment.apiUrl + 'Leave/GetRequest', { params: params });
  }
  AllLeaveRequests(empId: number): Observable<any> {
    let params = new HttpParams().set('id', empId.toString())
    return this.httpClient.get(environment.apiUrl + 'Leave/GetAllRequest', { params: params });
  }
  AddLeaveRequest(data): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/AddRequest', data)
  }
  // UpdateLocalStorage(data: any) {
  //   localStorage.setItem('employee', JSON.stringify(data))
  // }
  ChangePassword(id, Encryptedpass): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Employee/EditPassword', { id, password: Encryptedpass });
  }
  CancelLeave(index: number): Observable<any> {
    let params = new HttpParams().set('id', index.toString())
    return this.httpClient.delete(environment.apiUrl + 'Leave/Delete', { params: params })
  }
  TransactionListing(empId): Observable<any> {
    let params = new HttpParams().set('id', empId)
    return this.httpClient.get(environment.apiUrl + 'Leave/Transactions', { params: params })
  }
  AddLogin(data): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Login/newLogin', data)
  }
  OpenSnackBar(message: string, action: string) {
    console.log(123);

    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  GetEmail(data):Observable<any>{
    return this.httpClient.get(environment.apiUrl+'Employee/GetEmail', data )
  }
  GetAllEmployees(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Employee/GetAll')
  }
  ApproveRequest(leaveRequest) {
    return this.httpClient.post(environment.apiUrl + 'Leave/Approve', leaveRequest)
  }
  SaveEmployee(employee): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Employee/Add', employee)

  }
  EditEmployee(data):Observable<any>{
    return this.httpClient.post(environment.apiUrl + 'Employee/Edit', data)
  }
  AddNewDesignation(designation): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Employee/AddDesignation', { designation: designation })
  }
  AddNewLeave(leave): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/Add', { leave: leave })
  }
  AddNewLocation(location): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Location/Add', { location: location })
  }
  AddNewProject(project): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Project/Add', { Name: project })
  }
  Audit(auditData): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/Audit', auditData);
  }
  UpdatedLeaveBalance(updatedLeaveBalance): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/EditLeaveBalance', updatedLeaveBalance);
  }

  Logout() {
    this.route.navigateByUrl('');
    localStorage.clear();
    this.cookieService.delete('LoggedIn');
  }
  openChangePassDialog(id): void {

    const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
      width: '25%',
      height: '40%',
      data: {
        password1: this.newPassword, password2: this.reEnterdpassword
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && (result.passwordOne == result.passwordTwo)) {
        this.ChangePassword(id, result.passwordOne).subscribe(
          data => {
            debugger
            if (data) {
              console.log(data);
              this.OpenSnackBar("Password updation", "Success!!");
            }
          }
        )
      }
      else {
        this.OpenSnackBar("Password mismatch", "Operation Failed!!");
      }
    });
  }
}

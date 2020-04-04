import { Injectable, Injector, EventEmitter } from '@angular/core';
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
import { __spread } from 'tslib';

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
  // allLeaveRequests: LeaveRequests[];
  leaverequestId: number;
  visible: EventEmitter<any> = new EventEmitter();

  constructor(public route: Router, public httpClient: HttpClient, private injector: Injector,
    private _snackBar: MatSnackBar, public dialog: MatDialog, public cookieService: CookieService) {

  }
  getEmpType(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Employee/GetType')
  }
  getLocation(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Location/Get')
  }
  getLeaveBalance(Id): Observable<any> {
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

  getLeaveRequests(empId: number): Observable<any> {
    let params = new HttpParams().set('id', empId.toString())
    return this.httpClient.get(environment.apiUrl + 'Leave/GetRequest', { params: params });
  }
  allLeaveRequests(empId: number): Observable<any> {
    let params = new HttpParams().set('id', empId.toString())
    return this.httpClient.get(environment.apiUrl + 'Leave/GetAll', { params: params });
  }
  addLeaveRequest(data): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/AddRequest', data)
  }

  changePassword(id, Encryptedpass): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Login/EditPassword', { id, password: Encryptedpass });
  }
  cancelLeave(index: number): Observable<any> {
    let params = new HttpParams().set('id', index.toString())
    return this.httpClient.delete(environment.apiUrl + 'Leave/Delete', { params: params })
  }
  transactionListing(empId): Observable<any> {
    let params = new HttpParams().set('id', empId)
    return this.httpClient.get(environment.apiUrl + 'Leave/Transactions', { params: params })
  }
  addLogin(data): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Login/Login', data)
  }
  openSnackBar(message: string, action: string) {
    console.log(123);

    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getEmail(data):Observable<any>{
    return this.httpClient.get(environment.apiUrl+'Employee/GetEmail', data )
  }
  getAllEmployees(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Employee/GetAll')
  }
  approveRequest(leaveRequest) {
    return this.httpClient.post(environment.apiUrl + 'Leave/Approve', leaveRequest)
  }
  saveEmployee(addEmployee): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Employee/Add', {employee :addEmployee})

  }
  editEmployee(data):Observable<any>{
    return this.httpClient.post(environment.apiUrl + 'Employee/Edit', data)
  }
  addNewDesignation(designation): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Employee/AddDesignation', { designation: designation })
  }
  addNewLeave(leave): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/Add', { leave: leave })
  }
  addNewLocation(location): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Location/Add', { location: location })
  }
  addNewProject(project): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Project/Add', { Name: project })
  }
  audit(auditData): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/Audit', auditData);
  }
  updatedLeaveBalance(updatedLeaveBalance): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Leave/EditLeaveBalance', updatedLeaveBalance);
  }

  logout() {
    this.route.navigateByUrl('');
    localStorage.clear();
    this.cookieService.delete('LoggedIn');
    this.visible.emit({LoggedInStatus: false});
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
        this.changePassword(id, result.passwordOne).subscribe(
          data => {
            debugger
            if (data) {
              console.log(data);
              this.openSnackBar("Password updation", "Success!!");
            }
          }
        )
      }
      else {
        this.openSnackBar("Password mismatch", "Operation Failed!!");
      }
    });
  }
  routeToHome(type){
    if (type == 1 ) {
      this.route.navigateByUrl('admin-home');
    }
    else if(type!= 1){
      this.route.navigateByUrl('employee-home');
    }
  }
}

import { Injectable, Injector, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'
import { EmployeeInfo } from '../models/employeeInfo';
import { environment } from '../../environments/environment'
import { MatSnackBar, MatDialog } from '@angular/material';
import { ChangePasswordPopUpComponent } from '../Employee/change-password-pop-up/change-password-pop-up.component';
import { CookieService } from 'ngx-cookie-service';
import { __spread } from 'tslib';
import { Location } from '@angular/common';
import { AdalService } from 'adal-angular4';

@Injectable({
  providedIn: 'root'
})
export class LeaveMgmtService {
  loginparameters: EmployeeInfo;
  newPassword: any;
  incorrectPassword:any;
  reEnterdpassword: any;
  visible: EventEmitter<any> = new EventEmitter();
  back: EventEmitter<any> = new EventEmitter();
  constructor(public route: Router, public httpClient: HttpClient,
    private _snackBar: MatSnackBar, public dialog: MatDialog, public cookieService: CookieService, public location: Location, public adalService: AdalService) {

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
  allLeaveRequests(empId: number) {
    let params = new HttpParams().set('id', empId.toString())
    this.httpClient.get(environment.apiUrl + 'Leave/GetAll', { params: params }).subscribe(
      (details) => {
        if (details[0] != null) {
          localStorage.setItem('AllLeaveRequests', JSON.stringify(details));
          this.back.emit({ back: true });
          this.route.navigateByUrl('all-leave-requests');
        }
        else {
          this.openSnackBar("No leave requests", "Have a nice day")
        }

      });
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
    return this.httpClient.post(environment.apiUrl + 'Login/Add', data)
  }
  openSnackBar(message: string, action: string) {

    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getEmail(data): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Employee/GetEmail', data)
  }
  getAllEmployees(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'Employee/GetAll')
  }
  approveRequest(leaveRequest) {
    return this.httpClient.post(environment.apiUrl + 'Leave/Approve', leaveRequest)
  }
  saveEmployee(employee): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'Employee/Add', employee)
  }
  editEmployee(data): Observable<any> {
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
    this.adalService.logOut();
    localStorage.clear();
    this.cookieService.delete('LoggedIn');
    this.visible.emit({ LoggedInStatus: false });
  }
  goBack() {
    this.location.back();
    this.visible.emit({ back: false });
  }
  openChangePassDialog(id): void {

    this.dialog.open(ChangePasswordPopUpComponent, {
      width: '30%',
      height: '45%',
      data: {
        empId: id, password1: this.newPassword, password2: this.reEnterdpassword
      }
    });
  }
  routeToHome(type) {
    if (type == 1) {
      this.route.navigateByUrl('admin-home');
    }
    else if (type != 1) {
      this.route.navigateByUrl('employee-home');
    }
  }
}

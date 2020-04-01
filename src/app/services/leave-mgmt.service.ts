import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { LoginParameters } from '../models/LoginParameters';
import { environment} from '../../environments/environment'
import { ChangePasswordPopUpComponent } from '../sharedComponents/change-password-pop-up/change-password-pop-up.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LeaveRequests } from '../models/leaveRequests';

@Injectable({
  providedIn: 'root'
})
export class LeaveMgmtService {
  loginparameters: LoginParameters;
  webApi = 'https://localhost:44398/api/Login/GetLogin';
  // employeeType: number;
  empId:number;
  startDate:Date;
  endDate:Date;
  leaveType:string;
  reason:string;
  newPassword: any;
  reEnterdpassword: any;
  allLeaveRequests: LeaveRequests[];
  leaverequestId:number;

  constructor(public route: Router, public httpClient: HttpClient,private injector: Injector,
    private _snackBar: MatSnackBar,public dialog: MatDialog ){

   }
   getEmpType() :Observable<any>
   {
     return this.httpClient.get(environment.apiUrl+'Login/GetEmpType')
   }
   getLocation():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/GetLocations')
   }
   GetLeaveBalance(Id):Observable<any>{
    let params = new HttpParams().set('id',Id.toString())
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/GetLeaveBalance',{params:params})
   }
   getManager():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/GetManagers')
   }
   getProjects():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/GetProjects')
   }
   
   getEmployeeInfo(loginDetails) : Observable<any>
   {
    return this.httpClient.post(environment.apiUrl+'Login/GetLogin',loginDetails);  
   }
   getLeaves():Observable<any>{
     return this.httpClient.get(environment.apiUrl+'LeaveRequest/GetLeaves');  
   }
   
   getLeaveRequests(empId:number):  Observable<any>
   {
    let params = new HttpParams().set('id',empId.toString())
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/GetLeaveRequests', {params: params });
   }
   AllLeaveRequests(empId:number): Observable<any>{
    let params = new HttpParams().set('id',empId.toString())
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/allLeaveRequests', {params: params });
   }
 
   updateSessionStorage(data:any){
     sessionStorage.setItem('employee',JSON.stringify(data) )
   }

   CancelLeave(index:number):Observable<any>{
    let params = new HttpParams().set('id',index.toString())
    return this.httpClient.delete(environment.apiUrl+'LeaveRequest/delete' ,{params:params} )
   }
   TransactionListing(empId):Observable<any>{
    let params = new HttpParams().set('id',empId)
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/Transactions',{params:params})
   }
   openChangePassDialog(id:number): void{

    const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
      width: '25%',
      height: '40%',
      data: {
        password1: this.newPassword  , password2:this.reEnterdpassword
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && (result.password1 == result.password2)) {
        this.httpClient.post(environment.apiUrl + 'LeaveRequest/ChangePassword', {id, password: result.password1}).subscribe(
          data => {
            debugger
            if (data) {
             console.log(data);
             this.openSnackBar("Password updation","Success!!");
            }
          }
        )
      }
      else{
        this.openSnackBar("Password mismatch","Operation Failed!!");
      }
    });
  }
  openSnackBar(message: string, action:string) {
    console.log(123);
    
    this._snackBar.open(message,action ,{
      duration: 2000,
    });
  }
  getAllEmployees(): Observable<any>{
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/allEmployees')
  }
  ApproveRequest(leaverequest){
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/Approve', leaverequest)
  }
  SaveEmployee(newEmployee): Observable<any>{
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/AddEmployee', newEmployee)

  }
  AddNewDesignation(designation): Observable<any>{
    // designation = JSON.stringify(designation)
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/NewDesignation' ,{designation: designation})
  }
  AddNewLeave(leave):Observable<any>{
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/NewLeave' ,{leave: leave})
  }
  AddNewLocation(location):Observable<any>{
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/NewLocation' ,{location:location})
  }
  AddNewProject(project):Observable<any>{
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/NewProject' ,{project:project})
  }
  Audit(auditData): Observable<any>{
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/audit', auditData);
  }
  UpdatedLeaveBalance(updatedLeaveBalance):Observable<any>{
    return this.httpClient.post(environment.apiUrl+'LeaveRequest/editLeaveBalance', updatedLeaveBalance);
  }
}

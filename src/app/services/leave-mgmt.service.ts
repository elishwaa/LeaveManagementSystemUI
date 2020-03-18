import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams} from '@angular/common/http'
import { LoginParameters } from '../models/LoginParameters';
import { environment} from '../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class LeaveMgmtService {
  loginparameters: LoginParameters;
  //loginparameters : any;
  webApi = 'https://localhost:44398/api/Login/GetLogin'
  // LRwebApi = 'https://localhost:44398/api/LeaveRequest/GetLeaveRequests'
  employeeType: number;
  empId:number;
  startDate:Date;
  endDate:Date;
  leaveType:string;
  reason:string;

  constructor(public route: Router, public httpClient: HttpClient,private injector: Injector ){

   }
   
   getEmployeeInfo(loginDetails) : Observable<any>
   {
    return this.httpClient.post(environment.apiUrl+'Login/GetLogin',loginDetails);  
   }
   
   getLeaveRequests(empId:number):  Observable<any>
   {
    let params = new HttpParams().set('id',empId.toString())
    return this.httpClient.get(environment.apiUrl+'LeaveRequest/GetLeaveRequests', {params: params });
   }
 
   updateSessionStorage(data:any){
     console.log(data);
     
     sessionStorage.setItem('employee',JSON.stringify(data) )
   }
}

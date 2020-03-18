import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { LeaveMgmtService } from '../services/leave-mgmt.service';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {

  // inputUsername: string;
  // inputPassword: string;
  // inputEmpType: number ;
  signInForm: FormGroup;
  empType = [
    {id: 1, name:'Admin'},
    {id: 2, name:'Employee'},
    {id: 3, name:'Manager'},
  ];

  loginDetails: string;
  constructor(public route: Router, public _service: LeaveMgmtService, public httpClient: HttpClient) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      empType: new FormControl()
    });
  }

  login() {
    console.log(this.signInForm.value);
   
    this._service.getEmployeeInfo({...this.signInForm.value, empType:parseInt(this.signInForm.value.empType)}).subscribe((details) => {
      debugger;
      console.log(details);
      if (details) {
        sessionStorage.setItem('employee', JSON.stringify(details));
        this._service.employeeType = details.typeId;
        
      }
      if (sessionStorage.getItem(details.empType = '1')){
        this.route.navigateByUrl('admin-home');
      }
      else if (sessionStorage.getItem(details.empType = '2')){
        this.route.navigateByUrl('employee-home');
      }
      else{
        this.route.navigateByUrl('employee-home');
      }
    });
  }
}

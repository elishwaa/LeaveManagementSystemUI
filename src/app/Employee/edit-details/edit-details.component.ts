import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeHomePageComponent } from '../employee-home-page/employee-home-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  returnData:any;
  loginparameters:LoginParameters
  employeeDetails:FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EmployeeHomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public httpClient:HttpClient, public router:Router) {}

  ngOnInit(): void {
  
    
    // this.loginparameters = JSON.parse(sessionStorage.getItem('employee'));

    // this.employeeDetails = new FormGroup({
    //   id: new FormControl(this.loginparameters.id) ,
    //   typeId: new FormControl(this.loginparameters.typeId) ,
    //   firstName: new FormControl(this.loginparameters.firstName),
    //   middleName: new FormControl(this.loginparameters.middleName),
    //   lastName: new FormControl(this.loginparameters.lastName),
    //   email: new FormControl(this.loginparameters.email),
    //   salary: new FormControl(this.loginparameters.salary),
    //   username: new FormControl(this.loginparameters.username)
    // });  
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
//   editEmployeeDetails(){
//     let data = {...this.employeeDetails.value, id:parseInt(this.employeeDetails.value.id), typeId:parseInt(this.employeeDetails.value.typeId),salary:parseInt(this.employeeDetails.value.salary)}
//     this.httpClient.post(environment.apiUrl + 'LeaveRequest/Edit',data ).subscribe(
//      data =>
//      {
//        this.returnData = data;
//        console.log(this.returnData);
//      }
//    )
//    return this.returnData;
   
//  }

}
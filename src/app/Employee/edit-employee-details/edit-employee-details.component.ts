import { Component, OnInit, Input } from '@angular/core';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment'
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-employee-details',
  templateUrl: './edit-employee-details.component.html',
  styleUrls: ['./edit-employee-details.component.css']
})
export class EditEmployeeDetailsComponent implements OnInit {
  @Input() appearance: MatFormFieldAppearance
  // returnData:any;
  // loginparameters:LoginParameters
  // employeeDetails:FormGroup;
  constructor(public httpClient:HttpClient) { }
  ngOnInit() {

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
    // });  }

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
  //  ReloadEmployeeInfo(){
     
    }
    
}

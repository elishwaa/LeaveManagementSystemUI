import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdminHomePageComponent } from 'src/app/Employee/admin-home-page/admin-home-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  newEmployeeForm: FormGroup;
  empType = [];
  locations =[];
  constructor(public dialogRef: MatDialogRef<AdminHomePageComponent>, public _service: LeaveMgmtService) { }

  ngOnInit() {
  this._service.getEmpType().subscribe(
    data =>{
      this.empType = data;
    }
  )
  this._service.getLocation().subscribe(
    data =>{
      this.locations = data;
      console.log(this.locations);
      
    } )

  this.newEmployeeForm = new FormGroup({
    firstName: new FormControl(),
    middleName: new FormControl("null"),
    lastName: new FormControl(),
    empType: new FormControl(),
    email: new FormControl(),
    salary: new FormControl(),
    location: new FormControl()
  });
  }
  SaveNewEmployee(){
     this._service.SaveEmployee({...this.newEmployeeForm.value, empType:parseInt(this.newEmployeeForm.value.empType),salary:parseInt(this.newEmployeeForm.value.salary),
    location:parseInt(this.newEmployeeForm.value.location)}).subscribe(
       data=>{
         if(data){
           console.log(data);

           this.onNoClick();
           this._service.openSnackBar("New Employee", "Added");
         }
       }
     )
    
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
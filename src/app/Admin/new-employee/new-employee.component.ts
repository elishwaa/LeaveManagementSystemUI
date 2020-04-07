import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  newEmployeeForm: FormGroup;
  empType = [];
  locations = [];
  managers = [];
  projects = [];
  selectedEmployeeType: number;
  constructor(public dialogRef: MatDialogRef<AdminHomePageComponent>, public _service: LeaveMgmtService) {

  }

  ngOnInit() {
    this._service.getEmpType().subscribe(
      data => {
        this.empType = data;
      }
    )
    this._service.getLocation().subscribe(
      data => {
        this.locations = data;
      })
    this._service.getManager().subscribe(
      data => {
        this.managers = data;
      }
    )
    this._service.getProjects().subscribe(
      data => {
        this.projects = data;
      }
    )

    this.newEmployeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      middleName: new FormControl(),
      lastName: new FormControl('', [Validators.required]),
      empType: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      manager: new FormControl('', [Validators.required]),
      project: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required])
    });
  }
  SaveNewEmployee() {
    let data = {
      ...this.newEmployeeForm.value, empType: parseInt(this.newEmployeeForm.value.empType), salary: parseInt(this.newEmployeeForm.value.salary),
      manager: parseInt(this.newEmployeeForm.value.manager), project: parseInt(this.newEmployeeForm.value.project),
      location: parseInt(this.newEmployeeForm.value.location)
    }
    this._service.saveEmployee(data).subscribe(
      data => {
        if (data) {
          this.onNoClick();
          this._service.openSnackBar("New employee added", "Succesfully");
        }
      },
      err => {
        if (err.status == 500)
          this._service.openSnackBar("Invalid employee details", "Operation Failed!!")
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

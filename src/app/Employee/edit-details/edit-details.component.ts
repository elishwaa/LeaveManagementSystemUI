import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeHomePageComponent } from '../employee-home-page/employee-home-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
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
  empType =[];
  locations =[];
  constructor(
    public dialogRef: MatDialogRef<EmployeeHomePageComponent>, public _service:LeaveMgmtService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this._service.getEmpType().subscribe(
      data =>{
        this.empType = data;
        console.log(this.empType);
        
      } )
    
    this._service.getLocation().subscribe(
      data =>{
        this.locations = data;
        console.log(this.locations);
        
      } )
    
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
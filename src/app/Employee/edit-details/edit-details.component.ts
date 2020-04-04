import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeHomePageComponent } from '../employee-home-page/employee-home-page.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginParameters } from 'src/app/models/LoginParameters';


@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  empType =[];
  locations =[];
  projects =[];
  managers = [];
  isAdmin:boolean = true;
  constructor(
    public dialogRef: MatDialogRef<EmployeeHomePageComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public _service:LeaveMgmtService,
   ) {}

  ngOnInit(): void {
   if(JSON.parse(localStorage.getItem('employee')).typeName != 'Admin'){
    this.isAdmin = false;
   }
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

      this._service.getProjects().subscribe(
        data=>{
          this.projects = data;
        }
      )
     this._service.getManager().subscribe(
       data =>{
         this.managers = data;
       }
     )
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
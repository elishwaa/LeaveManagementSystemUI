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
  constructor(
    public dialogRef: MatDialogRef<EmployeeHomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
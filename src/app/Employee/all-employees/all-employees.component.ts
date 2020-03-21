import { Component, OnInit, ViewChild } from '@angular/core';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName','email','salary','username','actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  employeeInfo: LoginParameters[]
  constructor(public _service: LeaveMgmtService) { }

  ngOnInit() {
    this._service.getAllEmployees().subscribe(
      data=>{
        this.employeeInfo = data;
        console.log(this.employeeInfo);
        
      }
    )
  }


}

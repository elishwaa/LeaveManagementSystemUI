import {  OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AllEmployeesComponent } from '../all-employees/all-employees.component';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { DialogData } from '../edit-details/edit-details.component';
import {Component,ViewChild, ElementRef} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transaction-listing',
  templateUrl: './transaction-listing.component.html',
  styleUrls: ['./transaction-listing.component.css']
})
export class TransactionListingComponent implements OnInit {

  @ViewChild ('TABLE', { static: false }) table: ElementRef;

  displayedColumns: string[] = [ 'name','leave', 'startdate','enddate','totaldays','status'];
  constructor(  public dialogRef: MatDialogRef<AllEmployeesComponent>, public _service:LeaveMgmtService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    console.log(this.data);
    
  }

  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
}

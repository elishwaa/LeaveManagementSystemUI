import { OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort } from '@angular/material';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { LoginParameters } from 'src/app/models/LoginParameters';
import { AllEmployeesComponent } from 'src/app/Admin/all-employees/all-employees.component';

@Component({
  selector: 'app-transaction-listing',
  templateUrl: './transaction-listing.component.html',
  styleUrls: ['./transaction-listing.component.css']
})
export class TransactionListingComponent implements OnInit {


  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  loginparameters: LoginParameters;
  displayedColumns: string[] = ['name', 'leave', 'startdate', 'enddate', 'totaldays', 'status'];
  constructor(public _service: LeaveMgmtService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

    if (this.data[0] != null) {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
    }
    else {
      this._service.openSnackBar("No Transactions yet", "Have a nice day")
    }


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}

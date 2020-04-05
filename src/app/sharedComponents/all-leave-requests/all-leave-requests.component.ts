import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { LeaveRequests } from 'src/app/models/leaveRequests';
import { LeaveMgmtService } from 'src/app/services/leave-mgmt.service';
import { MatDialog } from '@angular/material';
import { DeletePopUpComponent } from 'src/app/sharedComponents/delete-pop-up/delete-pop-up.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-leave-requests',
  templateUrl: './all-leave-requests.component.html',
  styleUrls: ['./all-leave-requests.component.css']
})
export class AllLeaveRequestsComponent implements OnInit {
  leaveRequests: LeaveRequests[];
  data;
  dataSource;


  displayedColumns: string[] = ['employeeName', 'startDate', 'endDate', 'leave', 'status', 'reason', 'approve', 'reject'];
  constructor(public httpClient: HttpClient, public dialog: MatDialog, public _service: LeaveMgmtService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.leaveRequests = JSON.parse(localStorage.getItem('AllLeaveRequests'));
    this.data = Object.assign(this.leaveRequests);
    this.dataSource = new MatTableDataSource<Element>(this.data);
  }
  approveRequest(employee: LeaveRequests, i: number) {
    this._service.approveRequest(employee).subscribe(
      data => {
        if (data) {
          this.data.splice(i, 1)
          this.dataSource = new MatTableDataSource<Element>(this.data);

        }
        else {
          this._service.openSnackBar("No Balance Leaves", "Failed!!");

        }
      },
      (err)=>{
        this._service.openSnackBar("No Balance Leaves", "Failed!!");
      }
    );
  }

  openConfirmDialog(element: LeaveRequests, i: number): void {
    const dialogRef = this.dialog.open(DeletePopUpComponent, {
      width: '25%',
      height: '25%',
      data: {
        message: "Are you sure want to Approve this request?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.approveRequest(element, i);
      }
    });
  }
  cancelLeave(index: number) {
    this._service.cancelLeave(this.leaveRequests[index].id).subscribe(
      (data) => {
        if (data) {
          this.data.splice(index, 1)
          this.dataSource = new MatTableDataSource<Element>(this.data);
        }
      },
      err => {
        if (err.status == 500)
          this._service.openSnackBar("Cancelation", "Failed")
      }
    );
  }
  openCancelDialog(element: LeaveRequests, i: number): void {

    const dialogRef = this.dialog.open(DeletePopUpComponent, {
      width: '25%',
      height: '25%',
      data: {
        message: "Are you sure want to delete this request?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelLeave(i);
      }
    });
  }

}


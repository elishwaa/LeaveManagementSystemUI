import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { LeaveMgmtService } from './services/leave-mgmt.service';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeHomePageComponent } from './Employee/employee-home-page/employee-home-page.component';
import { SubmitLeaveComponent } from './sharedComponents/submit-leave/submit-leave.component';
import { CancelLeaveComponent } from './sharedComponents/cancel-leave/cancel-leave.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import {MatInputModule, MatSnackBar, MatSnackBarModule, MatSortModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { EditDetailsComponent } from './Employee/edit-details/edit-details.component';
import { DeletePopUpComponent } from './sharedComponents/delete-pop-up/delete-pop-up.component';
import { ForgotPasswordComponent } from './sharedComponents/forgot-password/forgot-password.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { NewEmployeeComponent } from './Admin/new-employee/new-employee.component';
import { NewLeaveTypeComponent } from './Admin/new-leave-type/new-leave-type.component';
import {MatSelectModule} from '@angular/material/select';
import { NewDesignationComponent } from './Admin/new-designation/new-designation.component';
import { NewLocationComponent } from './Admin/new-location/new-location.component';
import { EditLeaveBalanceComponent } from './Admin/edit-leave-balance/edit-leave-balance.component';
import { LeaveBalancePopUpComponent } from './Admin/leave-balance-pop-up/leave-balance-pop-up.component';
import { NewProjectComponent } from './Admin/new-project/new-project.component';
import { NewLoginComponent } from './sharedComponents/new-login/new-login.component';
import { AuditComponent } from './Admin/audit/audit.component';
import {MatIconModule} from '@angular/material/icon';
import { AdminHomePageComponent } from './Admin/admin-home-page/admin-home-page.component';
import { TransactionListingComponent } from './sharedComponents/transaction-listing/transaction-listing.component';
import { AllEmployeesComponent } from './Admin/all-employees/all-employees.component';
import { AllLeaveRequestsComponent } from './sharedComponents/all-leave-requests/all-leave-requests.component';
import { ChangePasswordPopUpComponent } from './Employee/change-password-pop-up/change-password-pop-up.component';
import { CookieService } from 'ngx-cookie-service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AppComponent,
    AdminHomePageComponent,
    SignInPageComponent,
    EmployeeHomePageComponent,
    SubmitLeaveComponent,
    CancelLeaveComponent,
    EditDetailsComponent,
    DeletePopUpComponent,
    ChangePasswordPopUpComponent,
    ForgotPasswordComponent,
    AllLeaveRequestsComponent,
    AllEmployeesComponent,
    NewEmployeeComponent,
    NewLeaveTypeComponent,
    NewDesignationComponent,
    NewLocationComponent,
    EditLeaveBalanceComponent,
    LeaveBalancePopUpComponent,
    NewProjectComponent,
    TransactionListingComponent,
    NewLoginComponent,
    AuditComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatSortModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
     
  ],
  providers: [LeaveMgmtService,CookieService],
  bootstrap: [AppComponent],
  entryComponents: [EditDetailsComponent, DeletePopUpComponent,ChangePasswordPopUpComponent,
    ForgotPasswordComponent,NewLoginComponent,AuditComponent,NewProjectComponent,LeaveBalancePopUpComponent,NewEmployeeComponent,NewLeaveTypeComponent, NewDesignationComponent, NewLocationComponent]
})
export class AppModule { }

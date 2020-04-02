import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { EmployeeHomePageComponent } from './Employee/employee-home-page/employee-home-page.component';
import { SubmitLeaveComponent } from './sharedComponents/submit-leave/submit-leave.component';
import { CancelLeaveComponent } from './sharedComponents/cancel-leave/cancel-leave.component';
import { AllLeaveRequestsComponent } from './sharedComponents/all-leave-requests/all-leave-requests.component';
import { EditLeaveBalanceComponent } from './Admin/edit-leave-balance/edit-leave-balance.component';
import { AuditComponent } from './Admin/audit/audit.component';
import { AdminHomePageComponent } from './Admin/admin-home-page/admin-home-page.component';
import { AllEmployeesComponent } from './Admin/all-employees/all-employees.component';

const routes: Routes = [
  
  {
    path: '',
    component : SignInPageComponent
  },
  { 
    path : 'admin-home', 
    component: AdminHomePageComponent
  },
  { 
    path : 'employee-home', 
    component: EmployeeHomePageComponent
  },
  {
    path : 'submit-leave',
    component: SubmitLeaveComponent
  },
  { 
    path : 'cancel-leave', 
    component: CancelLeaveComponent
  },
  {
    path: 'all-leave-requests',
    component: AllLeaveRequestsComponent
  },
  {
    path: 'all-employees',
    component: AllEmployeesComponent
  },
  {
    path: 'edit-leave-balance',
    component: EditLeaveBalanceComponent
  },
  {
    path: 'audit',
    component: AuditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

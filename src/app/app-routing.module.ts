import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomePageComponent } from './Employee/admin-home-page/admin-home-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { EmployeeHomePageComponent } from './Employee/employee-home-page/employee-home-page.component';
import { SubmitLeaveComponent } from './sharedComponents/submit-leave/submit-leave.component';
import { CancelLeaveComponent } from './sharedComponents/cancel-leave/cancel-leave.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomePageComponent } from './Employee/admin-home-page/admin-home-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { LeaveMgmtService } from './services/leave-mgmt.service';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeHomePageComponent } from './Employee/employee-home-page/employee-home-page.component';
import { SubmitLeaveComponent } from './sharedComponents/submit-leave/submit-leave.component';
import { CancelLeaveComponent } from './sharedComponents/cancel-leave/cancel-leave.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';
import { EditDetailsComponent } from './Employee/edit-details/edit-details.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminHomePageComponent,
    SignInPageComponent,
    EmployeeHomePageComponent,
    SubmitLeaveComponent,
    CancelLeaveComponent,
    EditDetailsComponent
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
    MatButtonModule
  ],
  providers: [LeaveMgmtService],
  bootstrap: [AppComponent],
  entryComponents: [EditDetailsComponent]
})
export class AppModule { }

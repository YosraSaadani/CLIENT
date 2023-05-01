import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPatientRoutingModule } from './login-patient-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginPatientRoutingModule
  ]
})
export class LoginPatientModule { }

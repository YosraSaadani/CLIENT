import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPatientRoutingModule } from './login-patient-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginPatientRoutingModule
  ]
})
export class LoginPatientModule { }

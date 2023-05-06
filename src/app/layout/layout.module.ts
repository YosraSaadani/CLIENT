import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { LogindoctorComponent } from './logindoctor/logindoctor.component';
import { RegisterdoctorComponent } from './registerdoctor/registerdoctor.component';



@NgModule({
  declarations: [
    AdminComponent,
    PatientComponent,
    DoctorComponent,
    LogindoctorComponent,
    RegisterdoctorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class LayoutModule { }
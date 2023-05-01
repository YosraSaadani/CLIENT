import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';



@NgModule({
  declarations: [
    AdminComponent,
    PatientComponent,
    DoctorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
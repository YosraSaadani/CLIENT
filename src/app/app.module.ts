import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/patient/home/home.component';
import { DoctorsListComponent } from './Components/patient/doctors-list/doctors-list.component';
import { LayoutModule } from './layout/layout.module';
import { AboutusComponent } from './Components/patient/aboutus/aboutus.component';
import { ContactComponent } from './Components/patient/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectedDoctorComponent } from './Components/patient/selected-doctor/selected-doctor.component';
import { AdminPatientsListComponent } from './Components/admin/admin-patients-list/admin-patients-list.component';
import { AdminDoctorsListComponent } from './Components/admin/admin-doctors-list/admin-doctors-list.component';
import { DashboardComponent } from './Components/admin/dashboard/dashboard.component';

import { DoctorDashComponent } from './Components/doctor/doctor-dash/doctor-dash.component';
import { LoginPatientModule } from './Components/patient/login-patient/login-patient.module';
import { AdminLoginComponent } from './Components/admin/admin-login/admin-login.component';
import { ChangePasswordComponent } from './Components/patient/change-password/change-password.component';
import { ProfileComponent } from './Components/patient/profile/profile.component';
import { RegisterDoctorComponent } from './Components/doctor/loginDoctor/register-doctor/register-doctor.component';
import { LoginDoctorComponent } from './Components/doctor/loginDoctor/login-doctor/login-doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorsListComponent,
    AboutusComponent,
    ContactComponent,
    SelectedDoctorComponent,
    AdminPatientsListComponent,
    AdminDoctorsListComponent,
    DashboardComponent,
    DoctorDashComponent,
    AdminLoginComponent,
    ChangePasswordComponent,
    ProfileComponent,
    RegisterDoctorComponent,
    LoginDoctorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LoginPatientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './layout/patient/patient.component';
import { HomeComponent } from './Components/patient/home/home.component';
import { DoctorsListComponent } from './Components/patient/doctors-list/doctors-list.component';
import { AboutusComponent } from './Components/patient/aboutus/aboutus.component';
import { ContactComponent } from './Components/patient/contact/contact.component';
import { DoctorComponent } from './layout/doctor/doctor.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AdminDoctorsListComponent } from './Components/admin/admin-doctors-list/admin-doctors-list.component';
import { AdminPatientsListComponent } from './Components/admin/admin-patients-list/admin-patients-list.component';
import { DashboardComponent } from './Components/admin/dashboard/dashboard.component';
import { SelectedDoctorComponent } from './Components/patient/selected-doctor/selected-doctor.component';
import { LoginComponent } from './Components/patient/login-patient/login/login.component';
import { LogindoctorComponent } from './layout/logindoctor/logindoctor.component';
import { RegisterComponent } from './Components/patient/login-patient/register/register.component';
import { DoctorDashComponent } from './Components/doctor/doctor-dash/doctor-dash.component';
import { AdminLoginComponent } from './Components/admin/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    title: 'Patient',
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'list', component: DoctorsListComponent, title: 'Doctors List' },
      { path: 'aboutus', component: AboutusComponent, title: 'About us' },
      { path: 'contact', component: ContactComponent, title: 'Contact us' },
      {
        path: 'list/:id',
        component: SelectedDoctorComponent,
        title: 'Selected Doctor',
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  

  {
    path: 'doctor',
    component: DoctorComponent,
    title: 'Doctor',
    children: [
      {
        path: '',
        component: DoctorDashComponent,
        title: 'Doctor Dashboard',
      },
    ],
  },
  {
    path: 'logindoctor',
    component: LogindoctorComponent,
    title: 'Login Doctor',
  },
  {
    path:'loginadmin',
    component:AdminLoginComponent,
    title :'Login Admin'
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    children: [
      {
        path: 'doctorsList',
        component: AdminDoctorsListComponent,
        title: 'Doctors List',
      },
      {
        path: 'patientsList',
        component: AdminPatientsListComponent,
        title: 'Patients List',
      },
      { path: 'dashboard', 
      component: DashboardComponent,
       title: 'DashBoard' },
       { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

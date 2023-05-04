import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './layout/patient/patient.component';
import { HomeComponent } from './Components/patient/home/home.component';
import { DoctorsListComponent } from './Components/patient/doctors-list/doctors-list.component';
import { AboutusComponent } from './Components/patient/aboutus/aboutus.component';
import { ContactComponent } from './Components/patient/contact/contact.component';
import { DoctorComponent } from './layout/doctor/doctor.component';

const routes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    title: 'Patient',
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'list', component: DoctorsListComponent, title: 'Doctors List' },
      { path: 'aboutus', component: AboutusComponent, title: 'About us' },
      { path: 'contact', component: ContactComponent, title: 'Contact us' },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'patient' },
  {
    path: 'doctor',
    component: DoctorComponent,
    title: 'Doctor',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

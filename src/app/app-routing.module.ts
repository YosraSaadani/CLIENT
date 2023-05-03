import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './layout/patient/patient.component';
import { HomeComponent } from './Components/patient/home/home.component';
import { DoctorsListComponent } from './Components/patient/doctors-list/doctors-list.component';
import { AboutusComponent } from './Components/patient/aboutus/aboutus.component';
import { ContactComponent } from './Components/patient/contact/contact.component';
import { LoginComponent } from './Components/patient/login-patient/login/login.component';

const routes: Routes = [
  {path:"patient", component:PatientComponent,title:"Patient",
  children:[
    {path:"home", component:HomeComponent,title:"Home"},
    {path:"list",component:DoctorsListComponent,title:"Doctors List"},
    {path:"aboutus", component:AboutusComponent,title:"About us"},
    {path:"contact", component:ContactComponent,title:"Contact us"},
    {path:"Patientlogin",component:LoginComponent,title:'Login'},
    {path:'',pathMatch:'full',redirectTo:'home'}

    
  ]},
  {path:'',pathMatch:'full',redirectTo:'patient'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { RegisterComponent } from './Components/patient/login-patient/register/register.component';
import { DoctorDashComponent } from './Components/doctor/doctor-dash/doctor-dash.component';
import { AdminLoginComponent } from './Components/admin/admin-login/admin-login.component';
import { ChangePasswordComponent } from './Components/patient/change-password/change-password.component';
import { ProfileComponent } from './Components/patient/profile/profile.component';
import { LoginDoctorComponent } from './Components/doctor/loginDoctor/login-doctor/login-doctor.component';
import { RegisterDoctorComponent } from './Components/doctor/loginDoctor/register-doctor/register-doctor.component';
import { ChatComponent } from './Components/doctor/chat/chat.component';
import { ChatmessagesComponent } from './Components/doctor/chatmessages/chatmessages.component';
import { ChatMessagesComponent } from './Components/patient/chat-messages/chat-messages.component';
import { ChatsComponent } from './Components/patient/chats/chats.component';
import { ChangePasswordAdminComponent } from './Components/admin/change-password-admin/change-password-admin.component';
import { ConsultationComponent } from './Components/doctor/consultation/consultation.component';
import { ListAppointmentComponent } from './Components/doctor/list-appointment/list-appointment.component';
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
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
        title: 'Change Password',
      },
      {path:'messages',component:ChatsComponent,title:'Messages',
    children:[
      {path: ':id',component: ChatMessagesComponent,title:'Chat Messages'}
    ]
    },
      { path: 'profile', component: ProfileComponent, title: 'Profile' },
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
      {
        path: 'dashboard',
        component: DoctorDashComponent,
        title: 'Doctor Dashboard',
      },
      {
        path:'consultation',
        component:ConsultationComponent,
        title:'Consultation'
      },
      {
        path:'appointments',
        component:ListAppointmentComponent,
        title:'Appointments'
      },
      {
        path: 'chat',
        component: ChatComponent,
        title: 'Chat',
        children: [
          {
            path: ':id',
            component: ChatmessagesComponent,
            title: 'Chat Messages',
          },
        ],
      },
    ],
  },
  {
    path: 'logindoctor',
    component: LoginDoctorComponent,
    title: 'Login Doctor',
  },
  {
    path: 'registerdoctor',
    component: RegisterDoctorComponent,
    title: 'Register Doctor',
  },
  {
    path: 'loginadmin',
    component: AdminLoginComponent,
    title: 'Login Admin',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Admin',
      },

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
      {
        path: 'changePassword',
        component: ChangePasswordAdminComponent,
        title: 'Change Password',
      },
      { path: 'dashboard', component: DashboardComponent, title: 'DashBoard' },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

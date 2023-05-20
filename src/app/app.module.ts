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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './Components/doctor/chat/chat.component';
import { PlistComponent } from './Components/doctor/plist/plist.component';
import { ChatmessagesComponent } from './Components/doctor/chatmessages/chatmessages.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ChatMessagesComponent } from './Components/patient/chat-messages/chat-messages.component';
import { ChatsComponent } from './Components/patient/chats/chats.component';
import { PlistPatientComponent } from './Components/patient/plist-patient/plist-patient.component';
import { DialogDeleteConfirmationComponent } from './Components/admin/dialog-delete-confirmation/dialog-delete-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChangePasswordAdminComponent } from './Components/admin/change-password-admin/change-password-admin.component';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { ConsultationComponent } from './Components/doctor/consultation/consultation.component';
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
    ChatComponent,
    PlistComponent,
    ChatmessagesComponent,
    ChatMessagesComponent,
    ChatsComponent,
    PlistPatientComponent,
    DialogDeleteConfirmationComponent,
    ChangePasswordAdminComponent,
    ListAppointmentComponent,
    ConsultationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    LoginPatientModule,
    BrowserAnimationsModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

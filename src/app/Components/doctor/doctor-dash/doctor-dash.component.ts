import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/Entities/appointment';
import { Doctor } from 'src/app/Entities/doctor';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-doctor-dash',
  templateUrl: './doctor-dash.component.html',
  styleUrls: ['./doctor-dash.component.scss'],
})
export class DoctorDashComponent implements OnInit {
  Doct!: Doctor;
  RVs!: Appointment[];
  constructor(
    private router: Router,
    private auth: AuthService,
    private rvs: AppointmentService
  ) {}

  ngOnInit(): void {
    this.auth.getDoctor().subscribe((data) => {
      this.Doct = data;
    });
    this.rvs.getAppointmentsThisMonth().subscribe((data) => {
      this.RVs = data;
    });
  }
}

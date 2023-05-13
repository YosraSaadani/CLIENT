import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/Entities/appointment';
import { Doctor } from 'src/app/Entities/doctor';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { CalenderService } from 'src/app/services/calender.service';
import { DoctorService } from 'src/app/services/doctor.service';
@Component({
  selector: 'app-doctor-dash',
  templateUrl: './doctor-dash.component.html',
  styleUrls: ['./doctor-dash.component.scss'],
})
export class DoctorDashComponent implements OnInit {
  Doct!: Doctor;
  RVs!: Appointment[];
  RVsToday: Appointment[] = [];
  articles: any[] = [];
  AllApoi: any[] = [];
  selected: Date | null = new Date();
  availability: any[];

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
    this.calendS
      .getCalenderByDate({ date: this.selected })
      .subscribe((data: any) => {
        this.availability = data[0];
        console.log(this.availability);
      });
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private rvs: AppointmentService,
    private doccS: DoctorService,
    private calendS: CalenderService
  ) {}

  ngOnInit(): void {
    this.auth.getDoctor().subscribe((data) => {
      this.Doct = data;
    });
    this.rvs.getAppointmentsThisMonth().subscribe((data) => {
      this.RVs = data;
    });
    this.rvs.getAppointmentsToday().subscribe(
      (data) => {
        this.RVsToday = data;
      },
      (error: ErrorHandler) => {
        console.log(error);
      }
    );
    this.doccS.getMedicalNews().subscribe((data) => {
      this.articles = data.articles.slice(0, 10);
    });
    this.rvs.getSortedAppointments().subscribe((data) => {
      this.AllApoi = data.slice(0, 4);
      console.log(this.AllApoi);
    });
    this.calendS
      .getCalenderByDate({ date: this.selected })
      .subscribe((data: any) => {
        this.availability = data[0];
        console.log(this.availability);
      });
  }
}

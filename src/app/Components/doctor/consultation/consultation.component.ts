import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from 'src/app/Entities/patient';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { ConsultationService } from 'src/app/services/consultation.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  helper = new JwtHelperService();
  consultForm: FormGroup;
  selectedOption: any;
  constructor(
    private fb: FormBuilder,
    private rdv: AppointmentService,
    private cons: ConsultationService
  ) {}
  patients!: any[];
  ngOnInit(): void {
    this.rdv.getPastAppointments().subscribe((data) => {
      console.log(data);
      this.patients = data;
    });
    this.consultForm = this.fb.nonNullable.group({
      appoin: [''],
      marks: [''],
      medicine: [''],
    });
  }
  confirm() {
    console.log(this.consultForm.value['appoin'].Patient._id);
    this.cons
      .addConsultation({
        date: this.consultForm.value['appoin'].dateRV,
        patientId: this.consultForm.value['appoin'].Patient._id,
        marks: this.consultForm.value['marks'],
        medicine: this.consultForm.value['medicine'],
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}

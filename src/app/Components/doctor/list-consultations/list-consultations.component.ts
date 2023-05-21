import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultationService } from 'src/app/services/consultation.service';

@Component({
  selector: 'app-list-consultations',
  templateUrl: './list-consultations.component.html',
  styleUrls: ['./list-consultations.component.scss'],
})
export class ListConsultationsComponent implements OnInit {
  consus: any[];
  constructor(private consS: ConsultationService) {}
  getCons() {
    this.consS.getDoctorConsultation().subscribe(
      (data) => {
        this.consus = data;
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  ngOnInit(): void {
    this.getCons();
  }
}

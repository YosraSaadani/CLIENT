import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Entities/doctor';
import { DoctorService } from 'src/app/services/doctor.service';



@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
})
export class DoctorsListComponent implements OnInit {
  doctorsList!: Doctor[];
  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService
      .getDoctors()
      .subscribe((data) => (this.doctorsList = data));
  }
}

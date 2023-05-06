import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendrier } from 'src/app/Entities/calendrier';
import { Doctor } from 'src/app/Entities/doctor';
import { CalenderService } from 'src/app/services/calender.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-selected-doctor',
  templateUrl: './selected-doctor.component.html',
  styleUrls: ['./selected-doctor.component.scss']
})
export class SelectedDoctorComponent implements OnInit {
id!:number;
dates!: string[];
currentDoctor!:Doctor;
calenders!:Calendrier[]
  constructor(private activatedRoute:ActivatedRoute,private DoctorService:DoctorService
    ,private serviceCalendrier:CalenderService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.DoctorService.getDoctorById(this.id).subscribe(data=>{this.currentDoctor=data;console.log(this.currentDoctor)});
    this.dates = this.generateDates();
  }

  generateDates(): string[] {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const formattedDate = formatDate(date, 'dd MMM', 'en-US');
      dates.push(formattedDate);
    }
    return dates;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/Entities/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-selected-doctor',
  templateUrl: './selected-doctor.component.html',
  styleUrls: ['./selected-doctor.component.scss']
})
export class SelectedDoctorComponent implements OnInit {
id!:number;
currentDoctor!:Doctor;
  constructor(private activatedRoute:ActivatedRoute,private DoctorService:DoctorService) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.DoctorService.getDoctorById(this.id).subscribe(data=>{this.currentDoctor=data;console.log(this.currentDoctor)});
  }

}

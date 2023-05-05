import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-doctor',
  templateUrl: './selected-doctor.component.html',
  styleUrls: ['./selected-doctor.component.scss']
})
export class SelectedDoctorComponent implements OnInit {
id!:number;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
  }

}

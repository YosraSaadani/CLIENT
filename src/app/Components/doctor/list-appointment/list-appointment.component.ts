import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../Entities/appointment';
import { AppointmentService } from '../../../services/AppointmentService/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.scss']
})
export class ListAppointmentComponent implements OnInit {

  constructor(private appService:AppointmentService ) { }
  appoints:any[];

  getAppointements()
  {
    this.appService.getSortedAppointments().subscribe((res)=>{
      this.appoints=res;
      console.log(this.appoints);
      
    },
    (err:HttpErrorResponse)=>{
      console.log(err.message);
      
    })
  }


  ngOnInit(): void {
    this.getAppointements()
  }

}

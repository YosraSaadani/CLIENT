import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Appointment } from 'src/app/Entities/appointment';
import { Calendrier } from 'src/app/Entities/calendrier';
import { Doctor } from 'src/app/Entities/doctor';
import { Person } from 'src/app/Entities/person';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { CalenderService } from 'src/app/services/calender.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-selected-doctor',
  templateUrl: './selected-doctor.component.html',
  styleUrls: ['./selected-doctor.component.scss']
})
export class SelectedDoctorComponent implements OnInit {
id!:string;
dates!: string[];
currentDoctor!:Doctor;
currentDoctorPerson!:Person;
calenders!:Calendrier[];
testTime:boolean=false;
calender!:Calendrier;
selectedBox: HTMLElement;
testAvailability:boolean=true;
chosenDate:Date=new Date();
chosenTime!:number;
helper=new JwtHelperService();
appointment:any={'dateRV':new Date(),'heureRV':0,'doctor':'','Patient':''};
idCurrentPatient:string='';
  constructor(private activatedRoute:ActivatedRoute,private DoctorService:DoctorService
    ,private serviceCalendrier:CalenderService,private appointmentService:AppointmentService,
    
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    if(localStorage.getItem('patientToken'))
    {
     
      this.idCurrentPatient=this.helper.decodeToken(localStorage.getItem('patientToken'))._id;
     console.log(this.idCurrentPatient)

    }
    this.id=this.activatedRoute.snapshot.params['id'];
    this.DoctorService.getDoctorById(this.id).subscribe(data=>{this.currentDoctor=data;console.log(this.currentDoctor);
      this.currentDoctorPerson=data.person;
    });
    this.dates = this.generateDates();
    this.serviceCalendrier.getCalenderByDoctorId(this.id).subscribe(data=>{this.calenders=data; console.log("calendrier"+data)});
  }

  RendezVous()
  {
     this.appointment.dateRV=this.chosenDate;
     this.appointment.heureRV=this.chosenTime;
     this.appointment.doctor=this.id;
     this.appointment.Patient=this.idCurrentPatient;
     console.log(this.appointment)
     if(this.appointment.heureRV!=undefined)
    { this.appointmentService.createAppointment(this.appointment).subscribe(data=>console.log(data));
    }
    else {console.log('not disp')}
  }
  isDateAvailable(date: Calendrier): boolean {
    for (const slot of date.availability) {
      if (slot.isAvailable) {
        return true;
      }
    }
    return false;
  }
  
  showTime(c:Calendrier)
  {
    this.chosenDate=c.date;
    console.log(new Date(this.chosenDate))
    this.calender=c;
    this.testTime=true;
  }
  changeTime(c:number)
  {
    this.chosenTime=c
    console.log(this.chosenTime)
  }
  onBoxClick(event: Event) {
    const element = event.target as HTMLElement;
    const boxInfos = document.querySelectorAll('.boxInfo'); // récupère tous les éléments avec la classe 'boxInfo'
    boxInfos.forEach(box => {
      box.classList.remove('selectedC'); // supprime la classe 'selectedC' de tous les éléments 'boxInfo'
    });


    
    element.classList.add('selectedC'); // ajoute la classe 'selectedC' à l'élément DOM qui a été cliqué
  }


  change(event: Event) {
    const element = event.target as HTMLElement;
   
     
    const boxInfos = document.querySelectorAll('.boxInfo'); // récupère tous les éléments avec la classe 'boxInfo'
    boxInfos.forEach(box => {
      box.classList.remove('sel'); // supprime la classe 'selectedC' de tous les éléments 'boxInfo'
    });


    
    element.classList.add('sel'); // ajoute la classe 'selectedC' à l'élément DOM qui a été cliqué
  }


  generateDates(): string[] {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const formattedDate = formatDate(date, 'dd MMM', 'en-US');
      dates.push(formattedDate);
    }
    console.log(dates);
    return dates;
  }

}

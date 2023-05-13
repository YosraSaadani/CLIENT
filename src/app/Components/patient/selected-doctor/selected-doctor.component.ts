import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forkJoin } from 'rxjs';
import { Appointment } from 'src/app/Entities/appointment';
import { Calendrier } from 'src/app/Entities/calendrier';
import { Comment } from 'src/app/Entities/comment';
import { Doctor } from 'src/app/Entities/doctor';
import { Patient } from 'src/app/Entities/patient';
import { Person } from 'src/app/Entities/person';
import { AppointmentService } from 'src/app/services/AppointmentService/appointment.service';
import { CalenderService } from 'src/app/services/calender.service';
import { CommentService } from 'src/app/services/comment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

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
comments!:Comment[];
commentForm!:FormGroup;
currentPatientPerson!:Person;
  constructor(private activatedRoute:ActivatedRoute,
    private DoctorService:DoctorService,
    private patientService:PatientService
    ,private serviceCalendrier:CalenderService,
    private appointmentService:AppointmentService,
    private commentService:CommentService,
    private elementRef: ElementRef,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('patientToken'))
    {
     
      this.idCurrentPatient=this.helper.decodeToken(localStorage.getItem('patientToken'))._id;
     console.log(this.idCurrentPatient)
     this.patientService.getPatientById(this.idCurrentPatient).subscribe(data=>{
      this.currentPatientPerson=data.person;
     })
    }
    this.id=this.activatedRoute.snapshot.params['id'];
    this.DoctorService.getDoctorById(this.id).subscribe(data=>{this.currentDoctor=data;console.log(this.currentDoctor);
      this.currentDoctorPerson=data.person;
    });
    this.dates = this.generateDates();
    this.serviceCalendrier.getCalenderByDoctorId(this.id).subscribe(data=>{this.calenders=data; console.log("calendrier"+data)
   this.listerComments();
    })


this.commentForm=this.fb.nonNullable.group(
  {
text:[],
rating:[],
patient:[],
doctor:[],
date:[new Date()]
  }
);

  };
  
  listerComments()
  {
    this.commentService.getCommentsByDoctorId(this.id).subscribe(data=>{
      this.comments=data;

      console.log(this.comments)
    });
  }
  addComment()
  {

    this.commentForm.patchValue({
      patient: this.idCurrentPatient,
      doctor:this.id
    });    console.log(this.commentForm.value)
    this.commentService.addComment(this.commentForm.value).subscribe(data=>this.listerComments())
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

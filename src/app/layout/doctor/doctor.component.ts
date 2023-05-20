import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Entities/doctor';
import { Notifs } from 'src/app/Entities/notifs';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  Doct!: Doctor;
  notifications:Notifs[]

  constructor(private router: Router, private auth: AuthService, private serviceDoctor:DoctorService) {
    if (localStorage.getItem('doctorToken') == null) {
      this.router.navigate(['/logindoctor']);
    }
  }
  
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  getNotifs()
  {
    this.serviceDoctor.getNotification().subscribe((res)=>{
      this.notifications=res;
    },
    (err:HttpErrorResponse)=>{
      console.log(err.message);
    })
  }

  deleteNotif(id:string)
  {
    this.serviceDoctor.deleteNotif(id).subscribe(()=>{
      console.log("deleted");
      this.getNotifs();
    },
    (err:HttpErrorResponse)=>{
      console.log(err.message);

      
    })
  }

  deleteAll()
  {
    this.serviceDoctor.deleteAllNotif().subscribe(()=>{
      console.log("all deleted");
      this.getNotifs();
    },
    (err:HttpErrorResponse)=>{
      console.log(err.message);
    })
  }
  ngOnInit(): void {
    this.auth.getDoctor().subscribe((data) => {
      this.Doct = data;
    });

    this.getNotifs();
  }
}

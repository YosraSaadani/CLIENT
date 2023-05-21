import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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
  notifications: Notifs[];
  private config: MatSnackBarConfig = new MatSnackBarConfig();
  constructor(
    private router: Router,
    private auth: AuthService,
    private serviceDoctor: DoctorService,   
     private _snackBar: MatSnackBar
  ) {
    if (localStorage.getItem('doctorToken') == null) {
      this.router.navigate(['/logindoctor']);
    }
    this.config.duration = 5000;
      this.config.horizontalPosition = 'center';
    this.config.panelClass='success';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home']);
    this._snackBar.open('Logged Out Successfully','',{duration:5000,panelClass:'success'});
    
  }
  getNotifs(personId) {
    this.serviceDoctor.getNotification(personId).subscribe(
      (res) => {
        this.notifications = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  deleteNotif(id: string) {
    this.serviceDoctor.deleteNotif(id).subscribe(
      () => {
        console.log('deleted');
        this.getNotifs(this.Doct.person['_id']);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  deleteAll() {
    this.serviceDoctor.deleteAllNotif().subscribe(
      () => {
        console.log('all deleted');
        this.getNotifs(this.Doct.person['_id']);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  ngOnInit(): void {
    this.auth.getDoctor().subscribe((data: any) => {
      this.Doct = data;
      this.getNotifs(data.person._id);
    });
  }
}

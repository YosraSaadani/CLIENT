import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Notifs } from 'src/app/Entities/notifs';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private config: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private adminService:AdminService,private router:Router,private _snackBar: MatSnackBar) { 
    if (localStorage.getItem('adminToken') == null) {
      this.router.navigate(['/loginadmin']);
    }
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
  this.config.panelClass='success';
  }
  notifications:Notifs[]
  weather!:any;
  getWeather()
  {
    this.adminService.weatherapi().subscribe(
      res=>{
        this.weather=res;
        console.log(res);
      }
    )
  }
  getNotifs()
  {
    this.adminService.getNotification().subscribe((res)=>{
      this.notifications=res;
    },
    (err:HttpErrorResponse)=>{
      console.log(err.message);
    })
  }

  deleteNotif(id:string)
  {
    this.adminService.deleteNotif(id).subscribe(()=>{
      console.log("deleted");
      this.getNotifs();
    },
    (err:HttpErrorResponse)=>{
      console.log(err.message);      
    })
  }

  deleteAll()
  {
    this.adminService.deleteAllNotif().subscribe(()=>{
      console.log("all deleted");
      this.getNotifs();
    },
    (err:HttpErrorResponse)=>{
      console.log(err.message);
    })
  }

  ngOnInit(): void {
    this.getWeather(); 
    this.getNotifs();
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/loginadmin']);
    this._snackBar.open('Logged Out Successfully','',{duration:5000,panelClass:'success'});

  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notifs } from 'src/app/Entities/notifs';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService:AdminService,private router:Router) { 
    /*if (localStorage.getItem('adminToken') == null) {
      this.router.navigate(['/loginadmin']);
    }*/
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

  ngOnInit(): void {
    this.getWeather(); 
    this.getNotifs();
  }

}

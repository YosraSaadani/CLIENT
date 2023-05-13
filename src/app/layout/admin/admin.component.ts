import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ngOnInit(): void {
    this.getWeather(); 
  }

}

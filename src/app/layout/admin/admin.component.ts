import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService:AdminService) { }

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

import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Entities/doctor';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-doctors-list',
  templateUrl: './admin-doctors-list.component.html',
  styleUrls: ['./admin-doctors-list.component.scss']
})
export class AdminDoctorsListComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  doctors!:Doctor[];

  getDoctors()
  {
    this.adminService.getDoctors().subscribe(res=>{
      this.doctors=res;
    })
  }

  deleteDoctorById(id:string)
  {
    this.adminService.deleteDcotorById(id).subscribe(res=>{
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.getDoctors()
  }

}

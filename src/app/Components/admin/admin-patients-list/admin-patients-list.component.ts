import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-patients-list',
  templateUrl: './admin-patients-list.component.html',
  styleUrls: ['./admin-patients-list.component.scss']
})
export class AdminPatientsListComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  patients=[];

  getPatients()
  {
    this.adminService.getDoctors().subscribe(res=>{
      //this.patients=res;
    })
  }

  deletePatientById(id:string)
  {
    this.adminService.deleteDoctorById(id).subscribe(res=>{
      console.log(res);
    })
    this.getPatients();
  }
  ngOnInit(): void {
  }

}

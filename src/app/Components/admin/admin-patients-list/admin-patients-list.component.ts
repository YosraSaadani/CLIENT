import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/Entities/patient';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-patients-list',
  templateUrl: './admin-patients-list.component.html',
  styleUrls: ['./admin-patients-list.component.scss']
})
export class AdminPatientsListComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  patients:Patient[];

  getPatients()
  {
    this.adminService.getPatients().subscribe(res=>{
      this.patients=res;
      console.log(res);
      
    })
  }

  deletePatientById(id:string)
  {
    this.adminService.deletePatientById(id).subscribe(res=>{
      console.log(res);
    })
    this.getPatients();
  }
  ngOnInit(): void {
    this.getPatients();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from 'src/app/Entities/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  showPatientLogo=false;
  showSignin=true;
  helper=new JwtHelperService();
  id!:string;
  patient!:Patient;
  constructor(private router:Router,private servicePatient:PatientService) { }

  ngOnInit(): void {
    if(localStorage.getItem('patientToken'))
    {
      this.showPatientLogo=true;
      this.showSignin=false;
      this.id=this.helper.decodeToken(localStorage.getItem('patientToken'))._id;
      this.servicePatient.getPatientById(this.id).subscribe(data=>{this.patient=data;
        console.log(this.patient.person.image);
      });

    }
    if(!localStorage.getItem('patientToken'))
    {
      this.showPatientLogo=false;
      this.showSignin=true;
    }
  }

  disconnect()
  {
    localStorage.removeItem('patientToken');
    this.router.navigate(['/patient/home']);
    location.reload();
  }

}

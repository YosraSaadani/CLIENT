import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  showPatientLogo=false;
  showSignin=true;
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('patientToken'))
    {
      this.showPatientLogo=true;
      this.showSignin=false;
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

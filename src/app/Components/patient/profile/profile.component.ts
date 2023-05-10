import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from 'src/app/Entities/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  helper=new JwtHelperService();
  patient!:Patient;
  constructor(private servicePatient:PatientService,private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.servicePatient.getPatientById(this.helper.decodeToken(localStorage.getItem('patientToken'))._id).subscribe(data=>{this.patient=data
    console.log(this.patient);});
  }

}

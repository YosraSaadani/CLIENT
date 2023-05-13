import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  currentPatient!:Patient;
  formPatient!:FormGroup;
  birthDateinvalid="";
  birthDateValid="";
  dateParts=[]
  constructor(private servicePatient:PatientService,private fb:FormBuilder ) { }

initForm()
{
this.formPatient=this.fb.nonNullable.group({

  firstName:[this.currentPatient.person.firstName],
  lastName:[this.currentPatient.person.lastName],
  birthDate:[this.birthDateValid],
  gender:[this.currentPatient.person.gender],
  email:[this.currentPatient.person.email],
  height:[this.currentPatient.height],
  weight:[this.currentPatient.weight],
  bloodType:[this.currentPatient.bloodType],
  allergies:[this.currentPatient.allergies],

}

)
}

updatePatientInfos()
{

  this.servicePatient.updatePatient(this.currentPatient._id,this.formPatient.value).subscribe(data=>this.ngOnInit);
}

  ngOnInit(): void {

    this.servicePatient.getPatientById(this.helper.decodeToken(localStorage.getItem('patientToken'))._id).subscribe(data=>{this.currentPatient=data
    console.log(this.currentPatient);
    console.log(this.currentPatient.person.birthDate)
this.birthDateinvalid=(new Date(this.currentPatient.person.birthDate)).toLocaleDateString();
this.dateParts=this.birthDateinvalid.split("/");

   this.birthDateValid=this.dateParts[2]+'-'+this.dateParts[1].padStart(2, "0")+'-'+this.dateParts[0].padStart(2, "0");
console.log(this.birthDateValid)
  this.initForm();
  
  });

  }

}

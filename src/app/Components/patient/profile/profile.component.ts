import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject } from 'rxjs';
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

  firstName:[this.currentPatient.person.firstName,[Validators.required]],
  lastName:[this.currentPatient.person.lastName,[Validators.required]],
  birthDate:[this.birthDateValid,[Validators.required]],
  gender:[this.currentPatient.person.gender,[Validators.required]],
  email:[this.currentPatient.person.email,[Validators.required]],
  height:[this.currentPatient.height,[Validators.required]],
  weight:[this.currentPatient.weight,[Validators.required]],
  bloodType:[this.currentPatient.bloodType,[Validators.required]],
  allergies:[this.currentPatient.allergies],
  image:['']

});
}

get firstName()
{
  return this.formPatient.get('firstName');
}
get lastName()
{
  return this.formPatient.get('lastName');
}
get birthDate()
{
  return this.formPatient.get('birthDate');
}
get gender()
{
  return this.formPatient.get('gender');
}
get height()
{
  return this.formPatient.get('height');
}
get weight()
{
  return this.formPatient.get('weight');
}
get bloodType()
{
  return this.formPatient.get('bloodType');
}
get allergies()
{
  return this.formPatient.get('allergies');
}
get email()
{
  return this.formPatient.get('email');
}
get password()
{
  return this.formPatient.get('password');
}
updatePatientInfos()
{

  this.servicePatient.updatePatient(this.currentPatient._id,this.formPatient.value).subscribe(data=>{this.ngOnInit();
    console.log(this.formPatient.value)});
}

  ngOnInit(): void {

    this.servicePatient.getPatientById(this.helper.decodeToken(localStorage.getItem('patientToken'))._id).subscribe(data=>{this.currentPatient=data
    console.log(this.currentPatient);
    console.log(this.currentPatient.person.birthDate)
this.birthDateinvalid=(new Date(this.currentPatient.person.birthDate)).toLocaleDateString();
this.dateParts=this.birthDateinvalid.split("/");

   this.birthDateValid=this.dateParts[2]+'-'+this.dateParts[1].padStart(2, "0")+'-'+this.dateParts[0].padStart(2, "0");
this.image=this.currentPatient.person.image;
  this.initForm();
  
  });

  }



}

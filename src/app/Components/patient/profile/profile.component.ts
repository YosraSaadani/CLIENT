import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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
  private config: MatSnackBarConfig = new MatSnackBarConfig();
  dateParts=[]
  constructor(private servicePatient:PatientService,
    private _snackBar: MatSnackBar,

    private fb:FormBuilder ) { 
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
  this.config.panelClass='success';
    }

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

}

)
}

updatePatientInfos()
{

  this.servicePatient.updatePatient(this.currentPatient._id,this.formPatient.value).subscribe(data=>{this.ngOnInit();
    console.log(this.formPatient.value)
  this._snackBar.open('Your informations have been updated successfully', '', this.config);
  },
    (err:HttpErrorResponse)=>{console.log(err)
      this.config.panelClass='Error';
    this._snackBar.open(err.error.msg, '', this.config);
    }
    
    );
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
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Patient } from 'src/app/Entities/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passForm!:FormGroup;
  helper=new JwtHelperService();
  patient!:Patient;
  
  
  constructor(private fb:FormBuilder,private servicePatient:PatientService,
    private route:Router) { }

  ngOnInit(): void {
    this.passForm=this.fb.nonNullable.group({
      oldPassword:[''],
      newPassword:['']
    })
  }

  change()
  { 
    let pass={oldPassword:this.passForm.value.oldPassword,newPassword:this.passForm.value.newPassword}
    try{
    this.servicePatient.changePassword(this.helper.decodeToken(localStorage.getItem('patientToken'))._id,pass).subscribe(data=> { this.route.navigate(['/home']);
    });
   
    }
    catch(err)
    {
      console.log(err);
    }
  }

}

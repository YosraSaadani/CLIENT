import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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
    private route:Router,
    private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.passForm=this.fb.nonNullable.group({
      oldPassword:[''],
      newPassword:['']
    })
  }

  change()
  { 
    let oldPassword=this.passForm.value.oldPassword
    let newPassword=this.passForm.value.newPassword
   
    this.servicePatient.changePassword(this.helper.decodeToken(localStorage.getItem('patientToken'))._id,{oldPassword,newPassword})
    .subscribe(data=> { this.route.navigate(['/home']);
      this._snackbar.open('Password changed successfully','',{duration:5000,panelClass:'success'});
    },
    (err:HttpErrorResponse)=>this._snackbar.open("Invalid password",'',{duration:5000,panelClass:'Error'}
    ));
    
    
   
  }

}

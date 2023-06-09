import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  private config: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private fb:FormBuilder,
    private servicePatient:PatientService
    ,private router:Router,
    private _snackBar: MatSnackBar,
    ) {
      this.config.duration = 5000;
      this.config.horizontalPosition = 'center';
    this.config.panelClass='success';
     }

  ngOnInit(): void {
    this.loginForm=this.fb.nonNullable.group({
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',[Validators.required]]
    });
  }

  
  get email()
  {
    return this.loginForm.get('email');
  }
  get password()
  {
    return this.loginForm.get('password');
  }


  login(){
    this.servicePatient.loginPatient(this.loginForm.value).subscribe(data=>{
      localStorage.setItem('patientToken', data.token);
      this.router.navigate(['/home']);
      this._snackBar.open('Logged in successfully','',{duration:5000,panelClass:'success'});
    },
    (err:HttpErrorResponse)=>{console.log(err.error.msg);
      this._snackBar.open("Invalid login or password",'',{duration:5000,panelClass:'Error'});
    }
    );
  }
}

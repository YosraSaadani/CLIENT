import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private servicePatient:PatientService
    ,private router:Router) { }

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

    },
    (err:HttpErrorResponse)=>console.log(err.error.msg));
  }
}
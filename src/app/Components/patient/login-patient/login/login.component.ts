import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private servicePatient:PatientService
    ,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.nonNullable.group({
      email:[''],
      password:['']
    });
  }
  login(){
    this.servicePatient.loginPatient(this.loginForm.value).subscribe(data=>{
      localStorage.setItem('patientToken', data.token);
      this.router.navigate(['/home']);

    },
    (err:HttpErrorResponse)=>console.log(err.error.msg));
  }
}

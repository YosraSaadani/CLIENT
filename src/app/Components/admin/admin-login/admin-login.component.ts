import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private serviceAdmin:AdminService
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
    console.log("hgug");
    this.serviceAdmin.loginAdmin(this.loginForm.value).subscribe(data=>{
      
      localStorage.setItem('adminToken', data.token);
      
      this.router.navigate(['/admin']);
      console.log("test");

    },
    (err:HttpErrorResponse)=>console.log(err.error.msg));
  }
}
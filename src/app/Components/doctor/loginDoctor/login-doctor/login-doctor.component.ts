import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.scss']
})
export class LoginDoctorComponent implements OnInit {

  constructor(private fb:FormBuilder,private doctorService:DoctorService,private router:Router) { }

  loginForm:FormGroup;

  login()
  {
    this.doctorService.loginDoctor(this.loginForm.value).subscribe((res)=>{
      localStorage.setItem("doctorToken",res.token);
      this.router.navigate(['/doctor']);
    },
    (err)=>{
      console.log(err.message);
      
    })
  }
  
  ngOnInit(): void 
  {
    this.loginForm=this.fb.nonNullable.group({
      email:[''],
      password:['']
    });
  }

}

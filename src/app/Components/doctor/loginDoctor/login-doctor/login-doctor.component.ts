import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  get email()
  {
    return this.loginForm.get('email');
  }
  get password()
  {
    return this.loginForm.get('password');
  }


  ngOnInit(): void 
  {
    this.loginForm=this.fb.nonNullable.group({
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',[Validators.required]]
    });
  }

}

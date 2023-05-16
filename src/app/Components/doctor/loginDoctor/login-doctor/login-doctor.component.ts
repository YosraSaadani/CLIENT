import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.scss']
})
export class LoginDoctorComponent implements OnInit {
private config: MatSnackBarConfig = new MatSnackBarConfig();
  constructor(private fb:FormBuilder,
    private doctorService:DoctorService,
    private _snackBar: MatSnackBar,

    private router:Router) { 
      this.config.duration = 5000;
      this.config.horizontalPosition = 'center';
    this.config.panelClass='success';
    }

  loginForm:FormGroup;

  login()
  {
    this.doctorService.loginDoctor(this.loginForm.value).subscribe((res)=>{
      localStorage.setItem("doctorToken",res.token);
      this.router.navigate(['/doctor']);
      this._snackBar.open('Logged in successfully','',{duration:5000,panelClass:'success'});
    },
    (err)=>{
      console.log(err.message);
      this._snackBar.open("Invalid login or password",'',{duration:5000,panelClass:'Error'});
      
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

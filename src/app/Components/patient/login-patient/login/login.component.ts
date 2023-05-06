import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private servicePatient:PatientService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.nonNullable.group({
      email:[''],
      password:['']
    });
  }
  login(){
    this.servicePatient.registerPatient(this.loginForm.value).subscribe();
  }
}

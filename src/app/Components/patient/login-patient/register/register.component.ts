import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/Entities/person';
import { PatientService } from 'src/app/services/patient.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  person!:Person;
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder,private servicePatient:PatientService
    ,private personService:PersonService,
    private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.nonNullable.group({

      firstName:[],
      lastName:[],
      birthDate:[],
      gender:[],
      email:[],
      height:[],
      weight:[],
      bloodType:[],
      allergies:[],
      password:[]
      

      



    });
  }

  register()
  {
    this.person=new Person(this.registerForm.value['firstName'],
    this.registerForm.value['lastName'],this.registerForm.value['birthDate'],
    null,this.registerForm.value['gender'],"patient",this.registerForm.value['email'],
    this.registerForm.value['password']);
    console.log(this.person);
   this.personService.createPerson(this.person).subscribe(data=> {
    
    let person = data._id;
    let body={"person":person,"allergies":this.registerForm.value['allergies'],"bloodType":this.registerForm.value['bloodType'],
    "height":this.registerForm.value['height'],"weight":this.registerForm.value['weight'],"amount":200}
    this.servicePatient.registerPatient(body).subscribe(data=>{localStorage.setItem('patientToken',data.token);
    this.router.navigate(['/home']);
  },
  
    (err:HttpErrorResponse)=>console.log(err.error.msg));
    

   }) ;
  }


}
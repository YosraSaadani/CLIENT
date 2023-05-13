import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/Entities/person';
import { DoctorService } from 'src/app/services/doctor.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {

  constructor(private fb:FormBuilder,private doctorService:DoctorService,private personService:PersonService,private router:Router) { }
  registerForm:FormGroup;
  person:Person;
  register()
  {
    this.person=new Person(this.registerForm.value['firstName'],
    this.registerForm.value['lastName'],
    this.registerForm.value['birthDate'],null,
    this.registerForm.value['gender'],"doctor",
    this.registerForm.value['email'],
    this.registerForm.value['password']);
    console.log(this.person);
    this.personService.createPerson(this.person).subscribe(data=> 
      {
      let person = data._id;
      let body={"person":person,"specialty":this.registerForm.value['specialty'],"experience":this.registerForm.value['experience'],
      "price":this.registerForm.value['price'],"description":this.registerForm.value['description'],"location":this.registerForm.value['location'],"rating":0};
      this.doctorService.registerDoctor(body).subscribe((res=>{
        localStorage.setItem("doctorToken",res.token)
        this.router.navigate(['/doctor']);
      }))
      }
      ,(err:HttpErrorResponse)=>{
        console.log(err.message);
        
      })
  }

  get firstName()
  {
    return this.registerForm.get('firstName');
  }
  get lastName()
  {
    return this.registerForm.get('lastName');
  }
  get birthDate()
  {
    return this.registerForm.get('birthDate');
  }
  get gender()
  {
    return this.registerForm.get('gender');
  }
  get specialty()
  {
    return this.registerForm.get('specialty');
  }
  get experience()
  {
    return this.registerForm.get('experience');
  }
  get price()
  {
    return this.registerForm.get('price');
  }
  get description()
  {
    return this.registerForm.get('description');
  }
  get location()
  {
    return this.registerForm.get('location');
  }
  get email()
  {
    return this.registerForm.get('email');
  }
  get password()
  {
    return this.registerForm.get('password');
  }


  ngOnInit(): void 
  {
    this.registerForm = this.fb.nonNullable.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      birthDate:['',Validators.required],
      gender:['',Validators.required],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      specialty:['',Validators.required],
      location:['',Validators.required],
      experience:['',[Validators.required,Validators.min(5)]],
      price:['',[Validators.required,Validators.min(0)]],
      description:['',Validators.required],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }

}

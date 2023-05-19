import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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
  private config: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private fb:FormBuilder,
    private servicePatient:PatientService
    ,private personService:PersonService,
    private _snackBar: MatSnackBar,

    private router:Router) { 

      this.config.duration = 5000;
      this.config.horizontalPosition = 'center';
    this.config.panelClass='success';
    }

  ngOnInit(): void {
    this.registerForm = this.fb.nonNullable.group({

      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      birthDate:['',[Validators.required]],
      gender:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      height:['',[Validators.required,Validators.min(1)]],
      weight:['',[Validators.required,Validators.min(1)]],
      bloodType:['',[Validators.required]],
      allergies:['',[Validators.required]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]

    });
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
  get height()
  {
    return this.registerForm.get('height');
  }
  get weight()
  {
    return this.registerForm.get('weight');
  }
  get bloodType()
  {
    return this.registerForm.get('bloodType');
  }
  get allergies()
  {
    return this.registerForm.get('allergies');
  }
  get email()
  {
    return this.registerForm.get('email');
  }
  get password()
  {
    return this.registerForm.get('password');
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
    this._snackBar.open('Patient registered successfully', '',this.config);

    this.router.navigate(['/home']);
  },
  
    (err:HttpErrorResponse)=>
    {console.log(err.error.msg);
      this.config.panelClass='Error';
      this._snackBar.open(err.error.msg, '',this.config);
    
    });
    

   }) ;
  }


}
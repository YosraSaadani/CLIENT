import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.nonNullable.group({

      firstName:[''],
      lastName:[''],
      birthDate:[''],
      image:[''],
      gender:[''],
      role:[''],
      email:[''],
      password:['']
      

      



    });
  }

}

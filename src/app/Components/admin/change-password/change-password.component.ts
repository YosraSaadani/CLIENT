import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../patient/login-patient/login/login.component';
import { AdminComponent } from 'src/app/layout/admin/admin.component';
import { Person } from 'src/app/Entities/person';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passForm!:FormGroup;
  helper=new JwtHelperService();
  person!:Person;
  
  
  constructor(private fb:FormBuilder,private serviceAdmin:AdminService,
    private route:Router) { }

  ngOnInit(): void {
    this.passForm=this.fb.nonNullable.group({
      oldPassword:[''],
      newPassword:['']
    })
  }

  change()
  { 
    let pass={oldPassword:this.passForm.value.oldPassword,newPassword:this.passForm.value.newPassword}
    try{
    this.serviceAdmin.changePassword(this.helper.decodeToken(localStorage.getItem('personToken'))._id,pass).subscribe(data=> { this.route.navigate(['/home']);
    });
   
    }
    catch(err)
    {
      console.log(err);
    }
  }

}

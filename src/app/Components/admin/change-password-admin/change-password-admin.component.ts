import { Component, OnInit } from '@angular/core';
import { AdminComponent } from 'src/app/layout/admin/admin.component';
import { Person } from 'src/app/Entities/person';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-change-password-admin',
  templateUrl: './change-password-admin.component.html',
  styleUrls: ['./change-password-admin.component.scss']
})
export class ChangePasswordAdminComponent implements OnInit {

  passForm!:FormGroup;
  helper=new JwtHelperService();
  person!:Person;
  
  
  constructor(private fb:FormBuilder,private serviceAdmin:AdminService,
    private route:Router, private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.passForm=this.fb.nonNullable.group({
      oldPassword:[''],
      newPassword:['']
    })
  }



  change()
  {  
        let pass={oldPassword:this.passForm.value.oldPassword,newPassword:this.passForm.value.newPassword}
   console.log(this.helper.decodeToken(localStorage.getItem('adminToken')));
    this.serviceAdmin.changePassword(this.helper.decodeToken(localStorage.getItem('adminToken'))._id,pass).subscribe(data=> {
       this.route.navigate(['/loginadmin']);
       console.log(data);
      this._snackbar.open('Password changed successfully!','',{duration:5000,panelClass:'success'});
    },
    (err:HttpErrorResponse)=>this._snackbar.open("Invalid password",'',{duration:5000,panelClass:'Error'}
    ))
  }

}

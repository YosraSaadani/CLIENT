import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Doctor } from 'src/app/Entities/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-change-pass-doc',
  templateUrl: './change-pass-doc.component.html',
  styleUrls: ['./change-pass-doc.component.scss'],
})
export class ChangePassDocComponent implements OnInit {
  passForm!: FormGroup;
  helper = new JwtHelperService();
  doc!: Doctor;
  constructor(
    private fb: FormBuilder,
    private serviceDoc: DoctorService,
    private route: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.passForm = this.fb.nonNullable.group({
      oldPassword: [''],
      newPassword: [''],
    });
  }
  change() {
    let oldPassword = this.passForm.value.oldPassword;
    let newPassword = this.passForm.value.newPassword;

    this.serviceDoc
      .changePassword(
        this.helper.decodeToken(localStorage.getItem('doctorToken'))._id,
        { oldPassword, newPassword }
      )
      .subscribe(
        (data) => {
          this.route.navigate(['/doctor']);
          this._snackbar.open('Password changed successfully', '', {
            duration: 5000,
            panelClass: 'success',
          });
        },
        (err: HttpErrorResponse) =>
          this._snackbar.open('Invalid password', '', {
            duration: 5000,
            panelClass: 'Error',
          })
      );
  }
}

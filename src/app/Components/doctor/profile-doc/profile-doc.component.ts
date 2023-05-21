import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Doctor } from 'src/app/Entities/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-profile-doc',
  templateUrl: './profile-doc.component.html',
  styleUrls: ['./profile-doc.component.scss'],
})
export class ProfileDocComponent implements OnInit {
  helper = new JwtHelperService();
  currentDoc!: Doctor;
  formDoc!: FormGroup;
  birthDateinvalid = '';
  birthDateValid = '';
  private config: MatSnackBarConfig = new MatSnackBarConfig();

  dateParts = [];
  constructor(
    private serviceDoc: DoctorService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.panelClass = 'success';
  }
  initForm() {
    this.formDoc = this.fb.nonNullable.group({
      firstName: [this.currentDoc.person.firstName, [Validators.required]],
      lastName: [this.currentDoc.person.lastName, [Validators.required]],
      birthDate: [this.birthDateValid, [Validators.required]],
      gender: [this.currentDoc.person.gender, [Validators.required]],
      email: [this.currentDoc.person.email, [Validators.required]],
      description: [this.currentDoc.description, [Validators.required]],
      specialty: [this.currentDoc.specialty, [Validators.required]],
      location: [this.currentDoc.location, [Validators.required]],
      price: [this.currentDoc.price, [Validators.required]],
      experience: [this.currentDoc.experience, [Validators.required]],
    });
  }
  updateDocInfos() {
    this.serviceDoc
      .updateDoctor(this.currentDoc._id, this.formDoc.value)
      .subscribe(
        (data) => {
          this.ngOnInit();
          console.log(this.formDoc.value);
          this._snackBar.open(
            'Your informations have been updated successfully',
            '',
            this.config
          );
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.config.panelClass = 'Error';
          this._snackBar.open(err.error.msg, '', this.config);
        }
      );
  }

  ngOnInit(): void {
    this.serviceDoc
      .getDoctorById(
        this.helper.decodeToken(localStorage.getItem('doctorToken'))._id
      )
      .subscribe(
        (data) => {
          this.currentDoc = data;
          this.birthDateinvalid = new Date(
            this.currentDoc.person.birthDate
          ).toLocaleDateString();
          this.dateParts = this.birthDateinvalid.split('/');
          this.birthDateValid =
            this.dateParts[2] +
            '-' +
            this.dateParts[1] +
            '-' +
            this.dateParts[0];
          this.initForm();
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.config.panelClass = 'Error';
          this._snackBar.open(err.error.msg, '', this.config);
        }
      );
  }
}

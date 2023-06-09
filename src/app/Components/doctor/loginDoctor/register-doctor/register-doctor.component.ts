import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Person } from 'src/app/Entities/person';
import { DoctorService } from 'src/app/services/doctor.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss'],
})
export class RegisterDoctorComponent implements OnInit {
  private config: MatSnackBarConfig = new MatSnackBarConfig();
  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private personService: PersonService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.panelClass = 'success';
  }
  registerForm: FormGroup;
  person: Person;
  selectedImage: File;
  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
    }
  }
  register() {
    // this.person = new Person(
    //   this.registerForm.value['firstName'],
    //   this.registerForm.value['lastName'],
    //   this.registerForm.value['birthDate'],
    //   this.selectedImage,
    //   this.registerForm.value['gender'],
    //   'doctor',
    //   this.registerForm.value['email'],
    //   this.registerForm.value['password']
    // );
    // console.log(this.person);
    const formData = new FormData();
    formData.append('firstName', this.registerForm.value.firstName);
    formData.append('lastName', this.registerForm.value.lastName);
    formData.append('birthDate', this.registerForm.value.birthDate);
    formData.append('gender', this.registerForm.value.gender);
    formData.append('email', this.registerForm.value.email);
    formData.append('role', 'doctor');
    formData.append('password', this.registerForm.value.password);
    formData.append('image', this.selectedImage);

    console.log(formData);

    this.personService.createPerson(formData).subscribe(
      (data) => {
        console.log(data);
        let person = data._id;
        let body = {
          person: person,
          specialty: this.registerForm.value['specialty'],
          experience: this.registerForm.value['experience'],
          price: this.registerForm.value['price'],
          description: this.registerForm.value['description'],
          location: this.registerForm.value['location'],
          rating: 0,
        };
        this.doctorService.registerDoctor(body).subscribe((res) => {
          localStorage.setItem('doctorToken', res.token);
          this.router.navigate(['/doctor']);
          this._snackBar.open('Registered successfully', '', {
            duration: 5000,
            panelClass: 'success',
          });
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this._snackBar.open(err.error.msg, '', {
          duration: 5000,
          panelClass: 'Error',
        });
      }
    );
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get birthDate() {
    return this.registerForm.get('birthDate');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  get specialty() {
    return this.registerForm.get('specialty');
  }
  get experience() {
    return this.registerForm.get('experience');
  }
  get price() {
    return this.registerForm.get('price');
  }
  get description() {
    return this.registerForm.get('description');
  }
  get location() {
    return this.registerForm.get('location');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  ngOnInit(): void {
    this.registerForm = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      specialty: ['', Validators.required],
      location: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ],
      ],
    });
  }
}

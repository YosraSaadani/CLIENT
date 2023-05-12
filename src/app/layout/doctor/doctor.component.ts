import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Entities/doctor';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  Doct!: Doctor;
  constructor(private router: Router, private auth: AuthService) {
    if (localStorage.getItem('doctorToken') == null) {
      this.router.navigate(['/logindoctor']);
    }
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.auth.getDoctor().subscribe((data) => {
      this.Doct = data;
    });
  }
}

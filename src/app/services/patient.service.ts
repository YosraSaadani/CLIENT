import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../Entities/patient';
const url = 'http://localhost:5000/api/patient/';
@Injectable({
  providedIn: 'root'
})

export class PatientService {

  constructor(private http:HttpClient) { }

  registerPatient(patient:Patient):Observable<Patient> {
    return this.http.post<Patient>(url+'register',patient);
  }

  loginPatient(patient:Patient):Observable<Patient> {
    return this.http.post<Patient>(url+'login',patient);
  }
}

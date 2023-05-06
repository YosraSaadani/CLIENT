import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Entities/doctor';
import { Patient } from '../Entities/patient';

const url = 'http://localhost:5000/api/doctor/all';
const url2 = 'http://localhost:5000/api/patient/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url);
  }

  deleteDoctorById(id:string):Observable<Doctor>
  {
    return this.http.delete<Doctor>(url+id);
  }

  getPatients(): Observable<Patient[]> 
  {
    return this.http.get<Patient[]>(url2);
  }

  deletePatientById(id:string):Observable<Patient>
  {
    return this.http.delete<Patient>(url2+id);
  }

}

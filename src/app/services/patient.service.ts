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

  registerPatient(patient:any):Observable<any> {
    return this.http.post<any>(url+'register',patient);
  }

  loginPatient(patient:any):Observable<any> {
    return this.http.post<any>(url+'login',patient);
  }

  getPatientById(id:string):Observable<Patient> {
    return this.http.get<Patient>(url+id);
  }

updatePatient(id:string,p:Patient):Observable<Patient>
{
  return this.http.put<Patient>(url+id,p);
}

  changePassword(id:string,{oldPassword,newPassword}):Observable<any> {
    return this.http.put<any>(url+"changePassword/"+id,{oldPassword,newPassword});
  }
}

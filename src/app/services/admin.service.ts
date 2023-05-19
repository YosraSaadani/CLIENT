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

  weatherapi()
  {
    return this.http.get("http://api.weatherapi.com/v1/current.json?key=113cd87d435b4d4c98e125558230705&q=Tunis");
  }
  loginAdmin(admin:any):Observable<any> {
    return this.http.post<any>(url+'login',admin);
  }
  changePassword(id:string,{oldPassword,newPassword}):Observable<any> {
    return this.http.put<any>(url+"changePassword/"+id,{oldPassword,newPassword});
  }
  
}

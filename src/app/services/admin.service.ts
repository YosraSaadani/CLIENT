import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Entities/doctor';
import { Patient } from '../Entities/patient';
import { Notifs } from '../Entities/notifs';

const url = 'http://localhost:5000/api/doctor/';
const url2 = 'http://localhost:5000/api/patient/';
const url3 = 'http://localhost:5000/api/notificationAdmin/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url+"all");
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

  getNotification():Observable<Notifs[]>
  {
    return this.http.get<Notifs[]>(url3);
  }

  deleteNotif(id:string):Observable<Notifs>
  {
    return this.http.delete<Notifs>(url3+id);
  }

  deleteAllNotif():Observable<Notifs[]>
  {
    return this.http.delete<Notifs[]>(url3+"deleteall");
  }
  
  weatherapi()
  {
    return this.http.get("http://api.weatherapi.com/v1/current.json?key=113cd87d435b4d4c98e125558230705&q=Tunis");
  }

}

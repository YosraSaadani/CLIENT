import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Entities/doctor';
import { Notifs } from '../Entities/notifs';
const url = 'http://localhost:5000/api/doctor/';
const url2 = 'http://localhost:5000/api/notification/';

const NewsURL =
  'https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=2156c2b993eb4b16989dd2d80f5d4a29';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url + 'all');
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(url + id);
  }

  getDoctorsBySpeciality(specialty: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url + 'getBySpeciality/' + specialty);
  }

  getDoctorByFirstName(name: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url + 'getByFirstName/' + name);
  }
  
  getDoctorByLastName(name: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url + 'getByLastName/' + name);
  }
  getMedicalNews(): Observable<any> {
    return this.http.get<any>(NewsURL);
  }

  loginDoctor(doctor: any) {
    return this.http.post<any>(url + 'login', doctor);
  }

  registerDoctor(doctor: any) {
    return this.http.post<any>(url + 'register', doctor);
  }

  getPersonByDoctor(id: string): Observable<any> {
    return this.http.get<any>(url + 'getPersonId/' + id);
  }
  weatherapi() {
    return this.http.get(
      'http://api.weatherapi.com/v1/current.json?key=113cd87d435b4d4c98e125558230705&q=Tunis'
    );
  }
  deleteNotif(id: string): Observable<Notifs> {
    return this.http.delete<Notifs>(url2 + id);
  }
  deleteAllNotif(): Observable<Notifs[]> {
    return this.http.delete<Notifs[]>(url2 + 'deleteall');
  }
  getNotification(doctorId): Observable<Notifs[]> {
    return this.http.get<Notifs[]>(url2 + 'doctor/' + doctorId);
  }

  updateDoctor(id: string, doctor: any): Observable<any> {
    return this.http.put<any>(url + id, doctor);
  }
  changePassword(id: string, { oldPassword, newPassword }): Observable<any> {
    return this.http.put<any>(url + 'changePassword/' + id, {
      oldPassword,
      newPassword,
    });
  }
}

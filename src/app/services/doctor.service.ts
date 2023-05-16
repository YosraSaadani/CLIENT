import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Entities/doctor';
const url = 'http://localhost:5000/api/doctor/';
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

  getDoctorByName(name: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url + 'getByFirstName/' + name);
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
}

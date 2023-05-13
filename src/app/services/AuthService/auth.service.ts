import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/Entities/doctor';
const URL = 'http://localhost:5000/api/';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  registerDoctor(body: any): Observable<Doctor> {
    return this.http.post<Doctor>(`${URL}doctor/register`, body);
  }
  loginDoctor(body: any): Observable<Doctor> {
    return this.http.post<Doctor>(`${URL}doctor/login`, body);
  }
  getDoctor(): Observable<Doctor> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.get<Doctor>(`${URL}doctor`, { headers: reqHeader });
  }
}

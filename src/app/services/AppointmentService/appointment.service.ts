import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/Entities/appointment';

const URL = 'http://localhost:5000/api/rendezvous';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}
  getAppointmentsThisMonth(): Observable<Appointment[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.get<Appointment[]>(`${URL}/doctor/getMyRVThisMonth`, {
      headers: reqHeader,
    });
  }
  getAppointmentsToday(): Observable<Appointment[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.get<Appointment[]>(`${URL}/doctor/getMyRVToday`, {
      headers: reqHeader,
    });
  }
}

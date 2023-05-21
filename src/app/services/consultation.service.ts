import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultation } from '../Entities/consultation';
const url = 'http://localhost:5000/api/consultation';
@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  constructor(private http: HttpClient) {}

  getConsultations(): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(url + '/');
  }

  addConsultation(consultation: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.post<any>(url + '/add', consultation, {
      headers: reqHeader,
    });
  }
  getDoctorConsultation(): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.get<any>(url + '/doctor/getMyCons', {
      headers: reqHeader,
    });
  }
}

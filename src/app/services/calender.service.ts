import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from '../Entities/calendrier';

const url = 'http://localhost:5000/api/calender';
@Injectable({
  providedIn: 'root',
})
export class CalenderService {
  constructor(private http: HttpClient) {}

  getCalenderByDoctorId(id: string): Observable<Calendrier[]> {
    return this.http.get<Calendrier[]>(url + '/getByDoctorid/' + id);
  }
  getCalendarByDoctorIdAfterToday(id: string): Observable<Calendrier[]> {
    return this.http.get<Calendrier[]>(url + '/getAfterToday/' + id);
  }

  getCalenderByDate(body: any): Observable<Calendrier> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.post<Calendrier>(url + '/getAvailability', body, {
      headers: reqHeader,
    });
  }

  updateAvailability(body: any): Observable<Calendrier> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.post<Calendrier>(url + '/updateAvailability', body, {
      headers: reqHeader,
    });
  }
  addCalendar(body: any): Observable<Calendrier> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.post<Calendrier>(url + '/addCalender', body, {
      headers: reqHeader,
    });
  }
}

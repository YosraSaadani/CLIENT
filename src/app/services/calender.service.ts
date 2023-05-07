import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from '../Entities/calendrier';
const url = 'http://localhost:5000/api/calender';
@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http:HttpClient) { }

  getCalenderByDoctorId(id:string):Observable<Calendrier[]>{
    return this.http.get<Calendrier[]>(url+"/getByDoctorid/"+id);
  }

}

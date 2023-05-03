import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="http://localhost:5000/api/doctor/";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  getDoctors():Observable<Doctor[]>
  {
    return this.http.get<Doctor[]>(url);
  }
}

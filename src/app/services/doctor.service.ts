import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Entities/doctor';
const url = 'http://localhost:5000/api/doctor/';
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url);
  }

  getDoctorById(id:number):Observable<Doctor>
 
  {
 return this.http.get<Doctor>(URL+""+id);
  }
 
  getDoctorsBySpeciality(specialty: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url + 'getBySpeciality/' + specialty);
  }

  getDoctorByName(name: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url + 'getByFirstName/' + name);
  }
  
}

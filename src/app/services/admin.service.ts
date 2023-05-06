import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../Entities/doctor';

const url = 'http://localhost:5000/api/doctor/';
const url2 = 'http://localhost:5000/api/person/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(url);
  }

  deleteDcotorById(id:string):Observable<Doctor>
  {
    return this.http.delete<Doctor>(url+"/"+id);
  }

  
}

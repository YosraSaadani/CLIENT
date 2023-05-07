import { Injectable } from '@angular/core';
import { Person } from '../Entities/person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const url = 'http://localhost:5000/api/person/';
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  createPerson(person:any):Observable<any> {
    return this.http.post<any>(url+'register',person);
  }
    
  constructor(private http:HttpClient) { }
}

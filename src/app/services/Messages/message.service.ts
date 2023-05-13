import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:5000/api/message';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  doctortSendChatMessage(body: any): Observable<Object> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.post(`${url}/doctorSend`, body, { headers: reqHeader });
  }

  doctorGetChatMessages(body: any): Observable<Object> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
    });
    return this.http.post(`${url}/getmessagesDoctor`, body, {
      headers: reqHeader,
    });
  }

  constructor(private http: HttpClient) {}
}

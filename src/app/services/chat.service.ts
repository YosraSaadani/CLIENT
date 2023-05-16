import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';
const socketURL = 'http://localhost:5000';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  constructor(private http: HttpClient) {
    this.socket = io(socketURL);
  }
  connect(userId: String): void {
    this.socket = io(socketURL);
    this.socket.emit('add-user', userId);
  }
  sendMessage(data): void {
    this.socket.emit('send-msg', data);
  }
  getMessages(): Observable<any> {
    return new Observable<{
      from: String;
      to: String;
      message: String;
    }>((observer) => {
      this.socket.on('msg-recieve', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}

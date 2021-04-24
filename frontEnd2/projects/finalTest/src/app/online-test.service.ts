import { signUpformat } from './sign/signUpformat';
import { loginFormat } from './sign/loginFormat';
import { Observable, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class OnlineTestService {
  private socket: Socket;
  private token = localStorage.getItem('token');
  private authHeader = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(public http: HttpClient) {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }
  login(value: loginFormat): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login', value);
  }
  signUp(value: signUpformat): Observable<any> {
    return this.http.post('http://localhost:3000/api/users', value);
  }

  mockTest(value): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/Finaltest/${value}`,
      this.authHeader
    );
  }

  initial(subj,value): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/attemptTest/${subj}/${value}`,
      value,
      this.authHeader
    );
  }
  submitAns(value, routeV): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/userTest/ans/${routeV}`,
      value,
      this.authHeader
    );
  }
  fetchLink(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/link`, this.authHeader);
  }
  sendTestMessage(roomId, userID) {
    this.socket.emit('join-room', roomId, userID);
  }
  receiveID(){
    this.socket.on('user-connected', (ID) => {
      
      console.log("user ID"+ID);
    });
  }
}

import { signUpformat } from './sign/signUpformat';
import { loginFormat } from './sign/loginFormat';
import { Observable, throwError } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OnlineTestService {
  private token = localStorage.getItem('token');
  private authHeader = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(public http: HttpClient) {}
  login(value: loginFormat): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login', value);
  }
  signUp(value: signUpformat): Observable<any> {
    return this.http.post('http://localhost:3000/api/users', value);
  }

  mockTest(value): Observable<any> {
    return this.http.get(`http://localhost:3000/api/Finaltest${value}`);
  }

  initial(value): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/attemptTest${value}`,
      value
    );
  }
  submitAns(value, routeV): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/userTest/ans${routeV}`,
      value
    );
  }
}

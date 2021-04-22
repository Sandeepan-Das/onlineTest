import { addQuestion } from './shared-questionbank/addQuestion';
import { signUpformat } from './login/signUpformat';
import { testRequirements } from './create-test/testRequirements';

import { loginFormat } from './login/loginFormat';
import { Observable, throwError } from 'rxjs';
import { questionFormat } from './question-bank/question-bank';
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

  async addQuestion(value: questionFormat) {
    return await this.http
      .post('http://localhost:3000/api/questionBank', value, this.authHeader)
      .toPromise();
  }
  login(value: loginFormat): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login', value);
  }
  signUp(value: signUpformat): Observable<any> {
    return this.http.post('http://localhost:3000/api/users', value);
  }
  Fetchquestion( level): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/test/getquestion/${level}`,
      this.authHeader
    );
  }
  FetchMybank(year, branch, subject, level): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/test/getMyBank/${year}/${branch}/${subject}/${level}`,
      this.authHeader
    );
  }
  Fetchallquestion(year, subject, level): Observable<any> {
    console.log();
    return this.http.get(
      `http://localhost:3000/api/test/getallquestion/${year}/${subject}/${level}`,
      this.authHeader
    );
  }
  createTest(value: testRequirements): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/createTest',
      value,
      this.authHeader
    );
  }
  delQuestion(value): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/delFromUser',
      value,
      this.authHeader
    );
  }

  addQuestionToUser(value: addQuestion): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/addToUser',
      value,
      this.authHeader
    );
  }
  async getQuestionsFromApi(level) {
    const data = await this.http
      .get(
        `https://opentdb.com/api.php?amount=1&difficulty=${level}&type=multiple`
      )
      .toPromise();
    return data;
  }

  mockTest(): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/mockTest/testParameter',
      this.authHeader
    );
  }

  submitAns(value): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/mockTest/ans',
      value,
      this.authHeader
    );
  }
  submitStudList(value): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/AddStudList/${value}`,
      this.authHeader
    );
  }
  fetchMe():Observable<any>{
    return this.http.get(
      `http://localhost:3000/api/me`,
      this.authHeader
    );
  }
  fetchLink(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/link`, this.authHeader);
  }
}

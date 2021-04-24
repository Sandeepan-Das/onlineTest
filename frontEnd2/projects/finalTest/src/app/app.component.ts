import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'finalTest';
  public hide_login: boolean = true;
  public Login = true;
  public finalTest = false;
  constructor() {}

  ngOnInit(): void {
    console.log(window.location.pathname);
    const path = window.location.pathname;
    if (path == '/test' || window.location.pathname == '/student/test') {
      this.finalTest = true;
    } else {
      this.hide_login = true;
      if (localStorage.getItem('token')) {
        this.Login = false;
      }
    }
  }
  login() {
    this.hide_login = false;
  }
  logout() {
    this.hide_login = true;
    localStorage.removeItem('token');
    this.ngOnInit();
  }
}

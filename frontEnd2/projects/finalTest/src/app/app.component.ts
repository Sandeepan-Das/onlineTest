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
    
    if (window.location.pathname.split("/")[2] != 'test') {
      
      this.hide_login = true;
      if (localStorage.getItem('token')) {
        this.Login = false;
      }
    } else {
      this.finalTest = true;
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

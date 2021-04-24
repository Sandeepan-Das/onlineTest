import { Router } from '@angular/router';
import { signUpformat } from './signUpformat';
import { loginFormat } from './loginFormat';
import { Component, OnInit } from '@angular/core';
import { OnlineTestService } from '../online-test.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent implements OnInit {
  public hide = true;

  // public loading:boolean;
  public login = new loginFormat();
  public errorMessage;

  public signUp = new signUpformat();
  constructor(public service: OnlineTestService, public Router: Router) {}

  ngOnInit(): void {}
  submitSignup() {
    this.errorMessage = '';
    this.signUp.role = 'student'; //role student added in backEnd
    this.service.signUp(this.signUp).subscribe((arg) => {
      localStorage.setItem('token', arg.token);
      window.location.reload()
    });
  }

  submit() {
    this.errorMessage = '';
    this.login.role = 'student';
    this.service.login(this.login).subscribe(
      (arg) => {
        localStorage.setItem('token', arg.token);

        this.navigate_token();
      },
      (error) => {
        this.errorMessage = 'Wrong Email or password';
      }
    );
  }
  showpassword() {
    this.hide = false;
  }

  public navigate_token() {
    if (localStorage.getItem('token') != null) {
      window.location.href="/";
    }
  }
}

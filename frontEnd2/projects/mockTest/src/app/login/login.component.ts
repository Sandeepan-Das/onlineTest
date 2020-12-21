import { loginFormat } from './loginFormat';
import { OnlineTestService } from './../online-test.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide = true;

  // public loading:boolean;
  public login = new loginFormat();
  public errorMessage
  constructor(public service: OnlineTestService, public Router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    //  this.loading=true;
    this.errorMessage = "";


    this.service.login(this.login)
      .subscribe((arg) => {
        localStorage.setItem("token", arg.token);
        this.navigate_token()
      }, (error) => {
        
        this.errorMessage = "Wrong Email or password";

      });

  }
  showpassword() {
    this.hide = false;
  }

  public navigate_token() {
    if (localStorage.getItem("token") != null) {
      this.Router.navigate(["/"])

    }
  }

}

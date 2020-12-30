import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public hide_login: boolean = true;
  public Login = true;
  constructor() { }

  ngOnInit(): void {
    
    this.hide_login = true;
    if(localStorage.getItem("token"))
    {
      this.Login = false;
    }
  }
  login() {
    this.hide_login = false;
  }
  logout(){
    this.hide_login = true;
    localStorage.removeItem("token")
    this.ngOnInit();
  }


}

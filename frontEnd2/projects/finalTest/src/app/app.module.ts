import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestFormatComponent } from './test-format/test-format.component';
import { SignComponent } from './sign/sign.component';
import { LinkComponent } from './link/link.component';
// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {path:"api"} };

@NgModule({
  declarations: [
    AppComponent,
    TestFormatComponent,
    SignComponent,
    LinkComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    // SocketIoModule.forRoot(config),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

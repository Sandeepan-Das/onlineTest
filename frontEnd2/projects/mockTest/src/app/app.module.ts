// import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,FormGroup, FormControl, Validators } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuestionBankComponent } from './question-bank/question-bank.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { MockTestComponent } from './mock-test/mock-test.component';
import { StudListComponent } from './stud-list/stud-list.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionBankComponent,
    LoginComponent,
    ViewQuestionsComponent,
    CreateTestComponent,
    MockTestComponent,
    StudListComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

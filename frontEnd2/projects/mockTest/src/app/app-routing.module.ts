import { VideoComponent } from './video/video.component';
import { SharedQuestionbankComponent } from './shared-questionbank/shared-questionbank.component';
import { StudListComponent } from './stud-list/stud-list.component';
import { MockTestComponent } from './mock-test/mock-test.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'add-question', component: QuestionBankComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'FetchQuestion', component: ViewQuestionsComponent },
  { path: 'FetchMybank', component: ViewQuestionsComponent },
  { path: 'createTest', component: CreateTestComponent },
  { path: 'mockTest', component: MockTestComponent },
  { path: 'AddStudents', component: StudListComponent },
  { path: 'shareQuestion', component: SharedQuestionbankComponent },
  { path: 'studentMonitor', component: VideoComponent },
  { path: '', component: StudListComponent },
  { path: ' ', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

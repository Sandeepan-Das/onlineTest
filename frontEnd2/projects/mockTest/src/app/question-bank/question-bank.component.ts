import { OnlineTestService } from './../online-test.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { questionFormat } from './question-bank';
@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css'],
})
export class QuestionBankComponent implements OnInit {
  public questionPattern = new questionFormat();
  public saveOptions = true;
  constructor(private service: OnlineTestService, private Router: Router) {}

  ngOnInit(): void {
    this.wipe_board();
  }
  async submit() {
    this.saveOptions = true;
    console.log(this.saveOptions)
    if (this.questionPattern.difficultyLevel == "Hard") {   // As in backEnd i have saved the parameter as difficult
      this.questionPattern.difficultyLevel = "Difficult"
    }
    const arg = await this.service.addQuestion(this.questionPattern)

    //Refresh the page
    this.Router.navigateByUrl("/", { skipLocationChange: true }).then(() => {

      this.Router.navigate(["/add-question"])
    })
  }

  difficultyLevel(event: any) {
    this.questionPattern.difficultyLevel = event.target.value;
    console.log(this.questionPattern.difficultyLevel);
  }
  wipe_board() {
    this.questionPattern.OptA = '';
    this.questionPattern.OptB = '';
    this.questionPattern.OptC = '';
    this.questionPattern.OptD = '';

    this.questionPattern.difficultyLevel = '';
    this.questionPattern.question = '';
  }

  async fromApi() {
    const arg = await this.service.getQuestionsFromApi(
      this.questionPattern.difficultyLevel.toLocaleLowerCase()
    );
    let rand = this.getRandomInt(0, 3);
    this.apiFormpattern(arg, rand);
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  apiFormpattern(arg, rand) {
    arg.results[0].incorrect_answers.splice(
      rand,
      0,
      arg.results[0].correct_answer
    );

    this.questionPattern.question = arg.results[0].question;
    this.questionPattern.ans = rand;
    this.questionPattern.OptA = arg.results[0].incorrect_answers[0];
    this.questionPattern.OptB = arg.results[0].incorrect_answers[1];
    this.questionPattern.OptC = arg.results[0].incorrect_answers[2];
    this.questionPattern.OptD = arg.results[0].incorrect_answers[3];
  }
}

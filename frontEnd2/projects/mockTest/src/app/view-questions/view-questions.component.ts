import { addQuestion } from './../shared-questionbank/addQuestion';
import { OnlineTestService } from './../online-test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  public display_data = [];
  public questinArray = [];
  public Level;
  public expression = false;
  public expression2 = false;
  public addQuestion = new addQuestion();
  constructor(private service: OnlineTestService) {}

  ngOnInit(): void {}
  difficultyLevel(event) {
    this.display_data = [];
    this.Level = event.target.value;
    if (window.location.pathname == '/FetchMybank') {
      this.expression2 = true;
      this.service.FetchMybank(event.target.value).subscribe((data) => {
        data.forEach((element) => {
          console.log(element);
          this.display_data.push(element);
        });
      });
    } else {
      this.expression = true;
      this.service.Fetchquestion(event.target.value).subscribe((data) => {
        data.forEach((element) => {
          console.log(element);
          this.display_data.push(element);
        });
      });
    }
  }
  checkbox() {
    this.addQuestion.arr = this.getTheid();
    this.addQuestion.level = this.Level;
    this.service.addQuestionToUser(this.addQuestion).subscribe(() => {});
  }
  checkbox2() {
    this.addQuestion.arr = this.getTheid();
    this.addQuestion.level = this.Level;
    this.service.delQuestion(this.addQuestion).subscribe(() => {});
  }
  public getTheid() {
    var Arr = [];
    for (let index = 0; index < this.display_data.length; index++) {
      var htmlElem = <HTMLInputElement>(
        document.getElementById(index.toString())
      );
      if (htmlElem.checked) Arr.push(htmlElem.value);
    }
    return Arr;
  }
}

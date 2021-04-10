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
  public level: String;
  public yearS: String;
  public branch: String;
  public subject: String;
  public expression = false;
  public expression2 = false;
  public expression3 = true;
  public onlyBank = false;
  public addQuestion = new addQuestion();
  constructor(private service: OnlineTestService) {}

  ngOnInit(): void {
    if (window.location.pathname == '/FetchMybank') {
      this.onlyBank = true;
      this.expression3 = true;
    }
  }
  difficultyLevel(event) {
    this.reset();
    this.display_data = [];
    this.level = event.target.value;
    if (window.location.pathname != '/FetchMybank') {
      this.expression = true;
      this.service
        .Fetchquestion(this.level)
        .subscribe((data) => {
          data.forEach((element) => {
            console.log(element);
            this.display_data.push(element);
          });
        });
    }
  }
  public reset() {
    this.expression3 = true;
    this.expression2 = false;
    this.expression = false;
    this.display_data = [];
  }
  fetchData() {
    this.expression3 = false;

    this.expression2 = true;
    this.service
      .FetchMybank(this.yearS, this.branch, this.subject, this.level)
      .subscribe((data) => {
        data.forEach((element) => {
          console.log(element);
          this.display_data.push(element);
        });
      });
  }

  year(event: any) {
    this.reset();
    this.yearS = event.target.value;
  }
  checkbox() {
    this.addQuestion.arr = this.getTheid();
    this.addQuestion.level = this.level;
    this.service.addQuestionToUser(this.addQuestion).subscribe(() => {});
    location.reload;
  }
  checkbox2() {
    this.addQuestion.arr = this.getTheid();
    this.addQuestion.level = this.level;
    this.service.delQuestion(this.addQuestion).subscribe(() => {});
    location.reload;
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

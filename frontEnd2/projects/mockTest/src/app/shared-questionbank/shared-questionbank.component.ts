import { addQuestion } from './addQuestion';
import { Component, OnInit } from '@angular/core';
import { OnlineTestService } from '../online-test.service';

@Component({
  selector: 'app-shared-questionbank',
  templateUrl: './shared-questionbank.component.html',
  styleUrls: ['./shared-questionbank.component.css'],
})
export class SharedQuestionbankComponent implements OnInit {
  public display_data = [];
  constructor(private service: OnlineTestService) {}
  public questinArray = [];
  public level: String;
  public yearS: String;
  // public branch: String;
  public subject: String;
  public addQuestion = new addQuestion();
  public expression = true;

  ngOnInit(): void {}
  difficultyLevel(event) {
    this.reset();
    this.level = event.target.value;
  }
  year(event: any) {
    this.reset();
    this.yearS = event.target.value;
  }
  fetchData() {
    this.expression = false
    this.display_data=[];
    this.service.Fetchallquestion(this.yearS,this.subject,this.level).subscribe((data) => {
      data.forEach((element) => {
        this.display_data.push(element);
      });
    });

  }
  public reset(){
    this.expression = true;
    this.display_data=[];
  }
  checkbox() {
    this.addQuestion.arr = this.getTheid();
    this.addQuestion.level = this.level;
    this.service.addQuestionToUser(this.addQuestion).subscribe(() => {});
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

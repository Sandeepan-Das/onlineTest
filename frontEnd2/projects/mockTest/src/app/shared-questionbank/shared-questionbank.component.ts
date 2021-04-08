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
  public Level: String;
  public addQuestion = new addQuestion();

  ngOnInit(): void {}
  difficultyLevel(event) {
    this.display_data = [];
    this.Level = event.target.value;
    console.log(this.Level);
    this.service.Fetchallquestion(event.target.value).subscribe((data) => {
      data.forEach((element) => {
        // console.log(element)
        this.display_data.push(element);
      });
    });
  }
 

  checkbox() {
    this.addQuestion.arr = this.getTheid();
    this.addQuestion.level = this.Level;
    this.service.addQuestionToUser(this.addQuestion).subscribe(()=>{
      
    })
   
    
  }
  public getTheid(){
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

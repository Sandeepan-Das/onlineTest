import { OnlineTestService } from './../online-test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  public display_data = [];
  public questinArray = [];
  public Level;
  constructor(private service:OnlineTestService) { }

  ngOnInit(): void {
  }
  difficultyLevel(event){
    this.display_data=[];
    this.Level = event.target.value;
    this.service.Fetchquestion(event.target.value).subscribe((data)=>{
        data.forEach(element => {
          console.log(element)
          this.display_data.push(element);
        });
    })

  }
  checkbox() {
    this.questinArray = this.getTheid();
    if (this.Level == 'Easy') {
      
    } else if (this.Level == 'Medium') {
    } else if (this.Level == 'Difficult') {
    }
   console.log(this.questinArray);
   
    
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

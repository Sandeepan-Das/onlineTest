import { OnlineTestService } from './../online-test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  public display_data = [];
  constructor(private service:OnlineTestService) { }

  ngOnInit(): void {
  }
  difficultyLevel(event){
    this.display_data=[];
    
    this.service.Fetchquestion(event.target.value).subscribe((data)=>{
        data.forEach(element => {
          console.log(element)
          this.display_data.push(element);
        });
    })

  }

}

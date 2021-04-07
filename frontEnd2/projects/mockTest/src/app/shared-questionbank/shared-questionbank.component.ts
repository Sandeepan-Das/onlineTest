
import { Component, OnInit } from '@angular/core';
import { OnlineTestService } from '../online-test.service';

@Component({
  selector: 'app-shared-questionbank',
  templateUrl: './shared-questionbank.component.html',
  styleUrls: ['./shared-questionbank.component.css']
})
export class SharedQuestionbankComponent implements OnInit {

  public display_data = [];
  constructor(private service:OnlineTestService) { }

  ngOnInit(): void {
  }
  difficultyLevel(event){
    this.display_data=[];
    
    this.service.Fetchallquestion(event.target.value).subscribe((data)=>{
        data.forEach(element => {
          console.log(element)
          this.display_data.push(element);
        });
    })
    

  }

}

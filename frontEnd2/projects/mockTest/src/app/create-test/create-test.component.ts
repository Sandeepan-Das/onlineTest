import { OnlineTestService } from './../online-test.service';
import { testRequirements } from './testRequirements';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  public test = new testRequirements();

  constructor(private service: OnlineTestService) { }

  ngOnInit(): void {

  }
  submit() {
    //  this.test.totalQuestions = parseInt(this.test.totalQuestions) 
    console.log(this.test)
    this.service.createTest(this.test).subscribe(arg => {

    });
  }

}

import { questionFormat } from './pattern';
import { OnlineTestService } from './../online-test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mock-test',
  templateUrl: './mock-test.component.html',
  styleUrls: ['./mock-test.component.css']
})
export class MockTestComponent implements OnInit {

  public pattern = new questionFormat();
  public errorMessage;
  public alert = false;
  public time = 0;
  public interval;
  public answer = [];
  public selectedAns;
  public displayMark = false;
  public finalMark;
  constructor(private service: OnlineTestService) { }


  ngOnInit(): void {
    this.setUp()
  }
  submit() {
    console.log(this.selectedAns)
    this.answer.push(Number(this.selectedAns))

    // this.service.submitAns(this.answer).subscribe((arg) => {

    // })
    this.setUp()
  }
  setUp() {

    clearInterval(this.interval)

    this.service.mockTest().subscribe((arg) => {
      this.importing_values(arg)
      this.interval = setInterval(() => {
        this.submit()

      }, this.time);
    }, (error) => {
      this.service.submitAns(this.answer).subscribe((marks) => {
        console.log(marks)
        this.finalMark = marks.marks;
      })
      this.alert = true;
      clearInterval(this.interval)

    })
  }
  importing_values(arg) {
    this.pattern.question = arg.questionDetails.question;
    this.pattern.OptA = arg.questionDetails.OptA
    this.pattern.OptB = arg.questionDetails.OptB
    this.pattern.OptC = arg.questionDetails.OptC
    this.pattern.OptD = arg.questionDetails.OptD
    this.pattern.marks = arg.marks;
    this.pattern.timeLimit = arg.timeLimit
    this.time = Number(this.pattern.timeLimit) * 1000;
  }
  onSelect(event) {
    this.selectedAns = event;

  }
  printMark(){
    this.displayMark = true;
  }
}

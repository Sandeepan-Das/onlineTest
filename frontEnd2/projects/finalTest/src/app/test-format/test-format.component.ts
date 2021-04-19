import { OnlineTestService } from './../online-test.service';
import { questionFormat } from './pattern';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-format',
  templateUrl: './test-format.component.html',
  styleUrls: ['./test-format.component.css'],
})
export class TestFormatComponent implements OnInit {
  public pattern = new questionFormat();
  public errorMessage;
  public alert = false;
  public main = false;
  public time = 0;
  public interval;
  public answer = [];
  public selectedAns;
  public displayMark = false;
  public finalMark;
  public initial = true;
  constructor(private service: OnlineTestService) {}

  ngOnInit(): void {
    this.initial = true;
    this.service.initial(window.location.pathname.split("/")[3]).subscribe((arg) => {});
  }
  submit() {
    console.log(this.answer);
    this.answer.push(Number(this.selectedAns));

    // this.service.submitAns(this.answer).subscribe((arg) => {

    // })
    this.setUp();
  }
  setUp() {
    clearInterval(this.interval);

    this.service.mockTest(window.location.pathname.split("/")[3]).subscribe(
      (arg) => {
        this.importing_values(arg);
        this.interval = setInterval(() => {
          this.submit();
        }, this.time);
      },
      (error) => {
        this.service
          .submitAns(this.answer, window.location.pathname.split("/")[3])
          .subscribe((marks) => {
            this.finalMark = marks.marks;
          });

        this.main = false;
        this.alert = true;

        clearInterval(this.interval);
      }
    );
  }
  importing_values(arg) {
    this.pattern.question = arg.questionDetails.question;
    this.pattern.OptA = arg.questionDetails.OptA;
    this.pattern.OptB = arg.questionDetails.OptB;
    this.pattern.OptC = arg.questionDetails.OptC;
    this.pattern.OptD = arg.questionDetails.OptD;
    this.pattern.marks = arg.marks;
    this.pattern.timeLimit = arg.timeLimit;
    this.time = Number(this.pattern.timeLimit) * 1000;
  }
  onSelect(event) {
    this.selectedAns = event;
  }
  printMark() {
    this.displayMark = true;
  }

  initial_exam() {
    this.main = true;
    this.initial = false;
    this.setUp();
  }
}

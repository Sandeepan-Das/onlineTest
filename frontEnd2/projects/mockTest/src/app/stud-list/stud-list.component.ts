import { OnlineTestService } from './../online-test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stud-list',
  templateUrl: './stud-list.component.html',
  styleUrls: ['./stud-list.component.css'],
})
export class StudListComponent implements OnInit {
  public studEmail;
  constructor(public service:OnlineTestService) {}

  ngOnInit(): void {}

  addStud() {
    this.service.submitStudList(this.studEmail).subscribe(()=>{

    })
    // this.service.submitStudList(this.studEmail).subscribe((data)=>{

    // })
  }
}

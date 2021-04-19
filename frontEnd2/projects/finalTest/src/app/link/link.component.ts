import { OnlineTestService } from './../online-test.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  public data=[];
  constructor(public service:OnlineTestService) { }

  ngOnInit(): void {
    this.service.fetchLink().subscribe((params)=>{
      this.data=params
    })
  }

}

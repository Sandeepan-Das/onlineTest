import { OnlineTestService } from './../online-test.service';
import { questionFormat } from './pattern';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
declare var Peer: any;

// import { Socket } from 'ngx-socket-io';
const mediaConstraint = {
  audio: true,
  video: {
    width: 220,
    height: 220,
  },
};
@Component({
  selector: 'app-test-format',
  templateUrl: './test-format.component.html',
  styleUrls: ['./test-format.component.css'],
})
export class TestFormatComponent implements OnInit {
  public socket: Socket;
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
  public initial = false;
  public meetLink;
  public localStream: MediaStream;
  public peer;
  public UserID;
  public examDate;
  public examTime;
  public currDate;
  public currTime;
  public countDownTimerX;
  public miliDist;
  @ViewChild('videoGrid') video: ElementRef;

  constructor(
    private service: OnlineTestService,
    private Route: ActivatedRoute
  ) {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    this.service
      .initial(params.get('subj'), params.get('tcode'))
      .subscribe((arg) => {
        this.meetLink = arg.meetLink;
        this.examDate = arg.date;
        this.examTime = arg.startTime;

        this.checkDateandTime();
        this.requestMedia();
      });
  }
  submit() {
    this.answer.push(Number(this.selectedAns));

    // this.service.submitAns(this.answer).subscribe((arg) => {

    // })
    this.setUp();
  }
  setUp() {
    clearInterval(this.interval);

    this.service.mockTest(window.location.pathname.split('/')[3]).subscribe(
      (arg) => {
        this.importing_values(arg);
        this.interval = setInterval(() => {
          this.miliDist = this.miliDist - 1000;
          this.calcVal(this.miliDist);

          if (this.miliDist <= 0) {
            this.submit();
            clearInterval(this.interval);
          }
        }, 1000);
      },
      (error) => {
        this.service
          .submitAns(this.answer, window.location.pathname.split('/')[3])
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
    this.time =
      Number(arg.timeLimit.split(':')[0]) * 60 * 60 * 1000 +
      Number(arg.timeLimit.split(':')[1]) * 60 * 1000 +
      Number(arg.timeLimit.split(':')[2]) * 1000;
    this.miliDist = this.time;
    this.calcVal(this.miliDist);
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

  private requestMedia() {
    const videoElem = document.createElement('video');
    videoElem.muted = true;
    navigator.mediaDevices.getUserMedia(mediaConstraint).then((data) => {
      this.localStream = data;
      this.setUppeer();
      this.appendVideo(videoElem, this.localStream);
    });
  }
  private appendVideo(videoElem, stream) {
    videoElem.srcObject = stream;
    videoElem.addEventListener('loadedmetadata', () => {
      videoElem.play();
    });

    this.video.nativeElement.append(videoElem);
  }
  public newUserMedia() {
    const videoElem = document.createElement('video');
    videoElem.muted = true;
    const call = this.peer.call(this.UserID, this.localStream);

    // call.on('stream', (userVideoStream) => {
    //   this.appendVideo(videoElem, userVideoStream);
    // });
    // call.on('close', () => {
    //   videoElem.remove();
    // });
  }
  public setUppeer() {
    this.peer = new Peer(undefined, {
      host: '/',
      port: 9000,
    });
    this.peer.on('open', (id) => {
      this.service.sendTestMessage(this.meetLink, id);
      this.socket.on('user-connected', (useruniqID) => {
        this.UserID = useruniqID;

        this.newUserMedia();
      });
      // this.service.receiveID()
    });
    this.peer.on('call', (call) => {
      call.answer(this.localStream);
      const videoElem = document.createElement('video');
      videoElem.muted = true;
      // call.on('stream', (userVideoStream) => {
      //   this.appendVideo(videoElem, userVideoStream);
      // });
    });
  }
  public checkDateandTime() {
    const examD = new Date(
      this.examDate.split('-')[0],
      Number(this.examDate.split('-')[1]) - 1,
      this.examDate.split('-')[2],
      this.examTime.split(':')[0],
      this.examTime.split(':')[1]
    ).getTime();

    this.countDownTimerX = setInterval(() => {
      var now = new Date().getTime();
      var distance = examD - now;
      if (distance < 0) {
        this.initial = true;
        clearInterval(this.countDownTimerX);
      } else {
        this.calcVal(distance);
      }
    }, 1000);
  }
  public calcVal(distance) {
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById('demo').innerHTML =
      days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
  }
}

import { OnlineTestService } from './../online-test.service';
import { questionFormat } from './pattern';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { io, Socket } from 'socket.io-client';
declare var Peer: any;
// import { Socket } from 'ngx-socket-io';
const mediaConstraint = {
  audio: true,
  video: {
    width: 120,
    height: 120,
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
  public initial = true;
  public meetLink;
  public localStream: MediaStream;
  public peer;
  public UserID;
  @ViewChild('videoGrid') video: ElementRef;

  constructor(private service: OnlineTestService) {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }

  ngOnInit(): void {
    this.initial = true;
    
    this.service
      .initial(window.location.pathname.split('/')[3])
      .subscribe((arg) => {
        this.meetLink = arg.meetLink;
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
          this.submit();
        }, this.time);
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
      console.log('my id' + id);
      this.service.sendTestMessage(this.meetLink, id);
      this.socket.on('user-connected', (useruniqID) => {
        this.UserID = useruniqID;
        console.log(useruniqID)
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

    console.log('peer');
  }
  public addStream() {}
}

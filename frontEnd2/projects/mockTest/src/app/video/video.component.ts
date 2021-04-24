import { OnlineTestService } from './../online-test.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { io, Socket } from 'socket.io-client';
declare var Peer: any;
const mediaConstraint = {
  audio: true,
  video: true,
};
const peersObj = {

}
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  @ViewChild('videoGrid') video: ElementRef;
  public socket: Socket;
  public roomLink;
  public peer;
  public UserID;
  public localStream: MediaStream;
  constructor(public service: OnlineTestService) {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }

  ngOnInit(): void {
    console.log(window.location.pathname);
    this.service.fetchMe().subscribe((data) => {
      this.roomLink = data.unique;

      this.userVideo();
    });
  }
  public userVideo() {
    navigator.mediaDevices.getUserMedia(mediaConstraint).then((data) => {
      this.localStream = data;
      this.localStream.getTracks().forEach((track) => {
        console.log('stop');
        track.stop();
      });
      this.setUpPeer();
    });
  }
  public newUserMedia() {
    const videoElem = document.createElement('video');
    videoElem.muted = true;
    const call = this.peer.call(this.UserID, this.localStream);
    console.log(call);
    call.on('stream', (userVideoStream) => {
      this.appendVideo(videoElem, userVideoStream);
    });
    call.on('close', () => {
      videoElem.remove();
    });
    peersObj[this.UserID] = call
  }
  private appendVideo(videoElem, stream) {
    videoElem.srcObject = stream;
    videoElem.addEventListener('loadedmetadata', () => {
      videoElem.play();
    });

    this.video.nativeElement.append(videoElem);
  }
  public setUpPeer() {
    this.peer = new Peer(undefined, {
      host: '/',
      port: 9000,
    });

    this.peer.on('open', (id) => {
      console.log('user is' + id);
      this.socket.emit('join-room', this.roomLink, id);
      this.socket.on('user-connected', (useruniqID) => {
        this.UserID = useruniqID;
        console.log(useruniqID);
        this.newUserMedia();
      });
      this.socket.on("user-disconnected",(useruniqID)=>{
        if(peersObj[useruniqID]) peersObj[useruniqID].close()
      })
      this.peer.on('call', (call) => {
        call.answer();
        const videoElem = document.createElement('video');
        videoElem.muted = true;
        call.on('stream', (userVideoStream) => {
          this.appendVideo(videoElem, userVideoStream);
        });

      });
      // this.service.receiveID()
    });
  }
}

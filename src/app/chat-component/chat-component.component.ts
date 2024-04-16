import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';
import {Message} from "../models/Message";
import {ProfileService} from "../services/profile.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat-component.component.html',
  styleUrls: ['chat-component.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  userProfile: any;
  private socket!: WebSocket;
  SentMessage: Message = {
    senderName:  "",
    receiverName: "you",
    date:   "10-10-1990",
    status:   "Leave",
    message: "",
  }


  constructor(private chatService : WebSocketService,private profileService: ProfileService) {

  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (profile: any) => {
        this.userProfile = profile;
        this.SentMessage.senderName=this.userProfile.firstName
        localStorage.setItem("idUser",profile.id)

      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
    this.chatService.initializeWebSocketConnection();
    this.chatService.getMessageSubject().subscribe((message: Message) => {
      this.messages.push(message);
    });
  }



  sendMessage(message: string) {
    this.SentMessage.date= new Date().toDateString();
    this.SentMessage.message = message;
    this.chatService.sendMessage(this.SentMessage)
    this.SentMessage.message = "";
  }


}

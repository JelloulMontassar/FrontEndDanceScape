import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';
import { Message } from "../models/Message";
import { ProfileService } from "../services/profile.service";

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {
  @Input() recipientUsername: string | undefined;
  privateMessages: Message[] = [];
  newMessage: string | undefined;
  userProfile: any;
  userId: any;
  onlineUsers: string[] = [];
  selectedUser: string | undefined;

  constructor(private webSocketService: WebSocketService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (profile: any) => {
        this.userProfile = profile;
        this.userId = this.userProfile?.email;
        this.recipientUsername = this.userId;
        this.fetchOnlineUsers();
        this.webSocketService.initializeWebSocketConnectionPrivate(this.userId);
        this.webSocketService.getMessageSubject().subscribe((message: Message) => {
          if (message.senderName === this.recipientUsername || message.receiverName === this.recipientUsername) {
            this.privateMessages.push(message);
          }
        });
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  fetchOnlineUsers() {
    if (!this.userId) {
      console.error('User profile not loaded.');
      return;
    }

    this.profileService.getOnlineUsers().subscribe(
      (users: string[]) => {
        // Filter out the logged-in user
        this.onlineUsers = users.filter(user => user !== this.userId);
      },
      (error: any) => {
        console.error('Error fetching online users:', error);
      }
    );
  }

  sendMessage() {
    if (!this.selectedUser || !this.newMessage) {
      console.error('Please select a user and enter a message.');
      return;
    }

    const message: Message = {
      message: this.newMessage,
      senderName: this.userProfile?.email || '',
      receiverName: this.selectedUser,
      date: new Date().toISOString(),
      status: "Join"
    };

    this.webSocketService.sendPrivateMessage(message, message.receiverName);

    this.privateMessages.push(message);

    this.newMessage = '';
  }

  selectUser(user: string) {
    this.selectedUser = user;
  }

  getMessagesForSelectedUser(): Message[] {
    return this.privateMessages.filter(msg =>
      (msg.senderName === this.selectedUser && msg.receiverName === this.userProfile?.email) ||
      (msg.receiverName === this.selectedUser && msg.senderName === this.userProfile?.email)
    );
  }
}

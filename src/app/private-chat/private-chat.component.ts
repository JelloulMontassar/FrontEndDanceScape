import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from '../services/WebSocketService';
import { Message } from "../models/Message";
import { ProfileService } from "../services/profile.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ExchangedMessage} from "../models/ExchangedMessage";
import {ToastrService} from "ngx-toastr";
import {User} from "../models/User.model";

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
  exchangedMessage : ExchangedMessage[]=[];
  friends: User[] = [];
  friendsEmails: string[] = [];
  constructor(private http: HttpClient,private webSocketService: WebSocketService, private profileService: ProfileService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (profile: any) => {
        this.userProfile = profile;
        this.getFriendList().subscribe(
          (emails: string[]) => {
            this.friendsEmails = emails;
          },
          error => {
            console.error('Error fetching friends\' emails:', error);
          }
        );
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
  convertMessageToExchangedMessage(message: Message): ExchangedMessage {
    return {
      sender: { email: message.senderName },
      receiver: { email: message.receiverName },
      sentTime: message.date,
      content: message.message,
      status: message.status
    };
  }

  // Conversion function: ExchangedMessage to Message
  convertExchangedMessageToMessage(exchangedMessage: ExchangedMessage): Message {
    return {
      senderName: exchangedMessage.sender.email,
      receiverName: exchangedMessage.receiver.email,
      date: exchangedMessage.sentTime,
      message: exchangedMessage.content,
      status: exchangedMessage.status
    };
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
    this.http.get<boolean>(`http://localhost:8088/relationships/can-send-message/${this.userProfile?.id}/${this.selectedUser}`).subscribe(
      canSend => {
        if (!canSend) {
          this.toastr.error('', 'Cannot send messages to this user. Friend request must be accepted first !');
          return;
        }
        const message: Message = {
          message: this.newMessage || '',
          senderName: this.userProfile?.email || '',
          receiverName: this.selectedUser || '',
          date: new Date().toISOString(),
          status: "Join"
        };

        this.webSocketService.sendPrivateMessage(message, message.receiverName);

        this.privateMessages.push(message);

        this.newMessage = '';
      },
    error => {
      console.error('Error checking relationship status:', error);
    }
  );
  }
  getExchangedMessages(): Observable<ExchangedMessage[]> {
    return this.http.get<ExchangedMessage[]>(`http://localhost:8088/ExchangedMessages/exchanged/${this.userProfile?.email}/${this.selectedUser}`);
  }
  selectUser(user: string) {
    this.selectedUser = user;
    this.getExchangedMessages().subscribe(messages => {
      this.exchangedMessage = messages.map(message => ({
        ...message,
        sender: { email: message.sender.email },
        receiver: { email: message.receiver.email },
        sentTime: message.sentTime,
        content: message.content,
        status: message.status
      }));
    });
    console.log(this.exchangedMessage)
  }

  getMessagesForSelectedUser(): Message[] {
    return this.privateMessages.filter(msg =>
      (msg.senderName === this.selectedUser && msg.receiverName === this.userProfile?.email) ||
      (msg.receiverName === this.selectedUser && msg.senderName === this.userProfile?.email)
    );
  }

  getCombinedMessages(privateMessages: Message[], exchangedMessages: ExchangedMessage[]): Message[] {
    const convertedExchangedMessages = exchangedMessages.map(this.convertExchangedMessageToMessage);

    // Combine privateMessages and convertedExchangedMessages
    const combinedMessages = [...privateMessages, ...convertedExchangedMessages];

    // Sort combined messages by date in ascending order
    combinedMessages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return combinedMessages;
  }
  displayMessages(): Message[] {
    return this.getCombinedMessages(this.privateMessages, this.exchangedMessage);
  }
  getFriendList(): Observable<string[]> {
    return this.http.get<User[]>(`http://localhost:8088/ExchangedMessages/friends/${this.userProfile.id}`).pipe(
      map((friends: User[]) => {
        return friends.map(friend => friend.email);
      })
    );
  }

  sendFriendRequest(userToSendRequest: string) {
    this.http.post(`http://localhost:8088/relationships/friend-request/${this.userProfile?.id}/${userToSendRequest}`, null).subscribe(
      () => {
        console.log('Friend request sent successfully');
        this.toastr.success('', 'Friend request sent successfully !');
      },
      error => {
        this.toastr.error('', 'Friend request already sent !');

        console.error('Error sending friend request:', error);
      }
    );
  }

}

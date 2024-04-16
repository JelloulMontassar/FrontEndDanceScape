import { Injectable } from '@angular/core';
import  {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient:any;
  private notificationsSubject:Subject<any> = new Subject<any>();
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() { }
  connect() {
    const socket = new SockJS('//localhost:8088/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/notifications', (message: any) => {
        this.notificationsSubject.next(JSON.parse(message.body));

      });


    });
  }

  getNotifications() {
    return this.notificationsSubject.asObservable();
  }
  initializeWebSocketConnection() {
    const socket = new SockJS('//localhost:8088/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/chatroom/public', (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });


    });
  }
  initializeWebSocketConnectionPrivate(userId:string) {
    const socket = new SockJS('//localhost:8088/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/chatroom/public', (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
      this.stompClient.subscribe('/user/'+userId+'/private', (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });

    });
  }

  sendMessage(message: any) {
    this.stompClient.send('/app/message', {}, JSON.stringify(message));
  }

  sendPrivateMessage(message: any, username: string | undefined) {
    this.stompClient.send(`/app/private-message/${username}`, {}, JSON.stringify(message));
  }
  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}

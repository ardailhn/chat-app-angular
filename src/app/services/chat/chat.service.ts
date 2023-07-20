import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public message$: BehaviorSubject<any> = new BehaviorSubject('');

  messagesUrl = environment.apiUrl + '/messages';
  constructor(private httppClient: HttpClient) {
    const socket = io(environment.apiUrl);
    socket.on('message', (message) => {
      console.log('socket message: ', message);
      this.message$.next(message);
    });
  }

  public sendMessage(message: any) {
    return this.httppClient.post(this.messagesUrl, message);
  }

  public getMessages() {
    return this.httppClient.get(this.messagesUrl);
  }

  public getNewMessage = () => {
    return this.message$.asObservable();
  };
}

import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  newMessage = '';
  messageList: any[] = [];
  name: string = 'angular';
  username: string = 'unknown';
  constructor(private chatService: ChatService,private authService:AuthService) { }

  ngOnInit() {
    this.getMessages();
    this.chatService.getNewMessage().subscribe((message: string) => {
      console.log('message: ', message);
      this.messageList.push(message);
    })
    this.idk();
    this.username = this.authService.getParsedAccessToken().UserInfo.username;
  }

  async getMessages() {
    this.chatService.getMessages().subscribe((messages: any) => {
      this.messageList = messages;
    })
  }

  async sendMessage() {
    const send$ = this.chatService.sendMessage({ message: this.newMessage });
    try {
      await lastValueFrom(send$);
    } catch (error) {
      console.error('error: ', error);
    }
    this.newMessage = '';
  }

  idk() {
    const chat: any = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  }
}

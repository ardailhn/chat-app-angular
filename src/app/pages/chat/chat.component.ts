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
  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.getMessages();
    this.chatService.getNewMessage().subscribe((message: string) => {
      if (message) {
        this.messageList.push(message);
      }
    })
    this.username = this.authService.getParsedAccessToken().UserInfo.username;
  }

  async getMessages() {
    const messages:any = await lastValueFrom(this.chatService.getMessages());
    this.messageList = messages;
    setTimeout(() => {
      this.idk();
    }, 0);
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

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
    console.log('messageList: ', this.messageList);
  }

  idk() {
    const chat = document.getElementById('chat');
    if (typeof chat === 'undefined' || !chat) return;
    chat.scrollIntoView();
  }
}

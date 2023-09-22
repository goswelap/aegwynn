import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { OpenaiService } from '../shared/openai.service';

import { Conversation } from '../shared/conversation.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private conversationSub!: Subscription;
  conversation = new Conversation({ 'user': [], 'assistant': [] });
  userMessage = '';
  response = '';

  constructor(private openaiService: OpenaiService) { }

  ngOnInit() {
    this.conversationSub = this.openaiService.convo.subscribe(convo => {
      this.conversation = convo;
    });
  }

  send() {
    this.openaiService.prompt(this.userMessage).subscribe(response => {
      this.response = response;
    });
  }

  getDialogue(): { role: string, content: string }[] {
    const flattened: { role: string, content: string }[] = [];
    const userMessages = this.conversation.user;
    const assistantMessages = this.conversation.assistant;

    const maxLength = Math.max(userMessages.length, assistantMessages.length);

    for (let i = 0; i < maxLength; i++) {
      if (userMessages[i]) {
        flattened.push({ role: 'User', content: userMessages[i] });
      }
      if (assistantMessages[i]) {
        flattened.push({ role: 'Assistant', content: assistantMessages[i] });
      }
    }
    return flattened;
  }

}

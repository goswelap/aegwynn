import { Component, ElementRef, Renderer2, ViewChild, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { OpenaiService } from '../../shared/openai.service';

import { Conversation } from '../../shared/conversation.model';
import { ConversationService } from '../../shared/conversation.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit, AfterViewChecked {
  private conversationSub!: Subscription;
  @ViewChild('lastMessage', { read: ElementRef }) private lastMessage!: ElementRef;
  // @ViewChild('.assistant-container', { read: ElementRef }) private messageContainer!: ElementRef;
  conversation = new Conversation({ 'user': [], 'assistant': [] });
  userMessage = '';
  response = '';

  constructor(
    private openaiService: OpenaiService,
    private conversationService: ConversationService
  ) { }

  ngOnInit() {
    this.conversation = this.conversationService.getConversation();
    this.conversationService.conversationChanged.subscribe(newConversation => {
      this.conversation = newConversation;
    });
    // this.conversationSub = this.openaiService.convo.subscribe(convo => {
    //   this.conversation = convo;
    // });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.lastMessage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch(err) { }
  }

  send() {
    this.conversationService.addUserMessage(this.userMessage);
    this.openaiService.prompt(this.userMessage).subscribe(response => {
      this.response = response;
      this.conversationService.addAssistantMessage(this.response);
    });

    // this.conversation.user.push(this.userMessage);
    // this.openaiService.prompt(this.userMessage).subscribe(response => {
    //   this.response = response;
    // });
    // this.conversationService.updateConversation(this.conversation);
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

import { Injectable } from '@angular/core';
import { Conversation } from './conversation.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private conversation = new Conversation({ 'user': [], 'assistant': [] });
  conversationChanged = new Subject<Conversation>();

  getConversation() {
    return this.conversation;
  }

  updateConversation(newConversation: Conversation) {
    this.conversation = newConversation;
    this.conversationChanged.next(this.conversation);
  }

  addUserMessage(message: string) {
    this.conversation.user.push(message);
    this.conversationChanged.next(this.conversation);
  }

  addAssistantMessage(message: string) {
    this.conversation.assistant.push(message);
    this.conversationChanged.next(this.conversation);
  }
}

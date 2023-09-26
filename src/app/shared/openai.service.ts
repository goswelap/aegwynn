import { Injectable } from '@angular/core';
import { from, filter, map, pipe } from 'rxjs';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Conversation } from './conversation.model';

import { AgendaItem } from '../agenda/agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from '../shared/agenda.service';

@Injectable()
export class OpenaiService {
  private serverEndpoint = 'http://134.209.65.11:3000/openai-prompt';
  conversation: { 'user': string[], 'assistant': string[] } = { 'user': [], 'assistant': [] };
  convo = new Subject<Conversation>();
  agendaSub!: Subscription;
  completedSub!: Subscription;

  agendaItems: AgendaItem[] = [];
  completedItems: AgendaItem[] = [];

  constructor(private http: HttpClient, private agendaServ: AgendaService) {
    this.agendaSub = this.agendaServ.agendaItemsChanged
      .subscribe(
        (agendaItems: AgendaItem[]) => {
          this.agendaItems = agendaItems;
        }
      );
    this.agendaItems = this.agendaServ.getAgendaItems();
    this.completedSub = this.agendaServ.completedItemsChanged
      .subscribe(
        (completedItems: AgendaItem[]) => {
          this.completedItems = completedItems;
        }
      );
    this.completedItems = this.agendaServ.getCompletedItems();
  }

  prompt(userMessage: string): Observable<string> {
    this.conversation['user'].push(userMessage);
    return this.http.post<{ response: string }>(this.serverEndpoint, { agendaItems: this.agendaItems, completedItems: this.completedItems, conversation: this.conversation }).pipe(
      map(resp => {
        this.conversation['assistant'].push(resp.response);
        this.convo.next(new Conversation(this.conversation));
        return resp.response;
      })
    );
  }
}


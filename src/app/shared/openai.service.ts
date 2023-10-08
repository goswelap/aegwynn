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
  private dataEndpoint = 'http://134.209.65.11:3000/agenda-item-handler';
  conversation: { 'user': string[], 'assistant': string[] } = { 'user': [], 'assistant': [] };
  convo = new Subject<Conversation>();
  agendaSub!: Subscription;
  completedSub!: Subscription;

  agendaItems: AgendaItem[] = [];
  completedItems: AgendaItem[] = [];

  constructor(private http: HttpClient, private agendaServ: AgendaService) {
    this.agendaItems = this.agendaServ.getAgendaItems();
    this.completedItems = this.agendaServ.getCompletedItems();

    this.agendaSub = this.agendaServ.agendaItemsChanged
      .subscribe(
        (agendaItems: AgendaItem[]) => {
          this.agendaItems = agendaItems;
          this.postAgendaItems().subscribe(
            response => console.log('Agenda items posted successfully'),
            error => console.error('Error:', error)
          );
        }
      );

    this.completedSub = this.agendaServ.completedItemsChanged
      .subscribe(
        (completedItems: AgendaItem[]) => {
          this.completedItems = completedItems;
          this.postCompletedItems().subscribe(
            response => console.log('Completed items posted successfully'),
            error => console.error('Error:', error)
          );
        }
      );
  }

  prompt(userMessage: string): Observable<string> {
    this.conversation['user'].push(userMessage);
    console.log("sending", this.conversation);
    return this.http.post<{ response: string }>(this.serverEndpoint, { agendaItems: this.agendaItems, completedItems: this.completedItems, conversation: this.conversation }).pipe(
      map(resp => {
        this.conversation['assistant'].push(resp.response);
        this.convo.next(new Conversation(this.conversation));
        return resp.response;
      })
    );
  }

  postAgendaItems(): Observable<string> {
    return this.http.post(this.dataEndpoint, { agendaItems: this.agendaItems }, { responseType: 'text' })
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  postCompletedItems(): Observable<string> {
    return this.http.post(this.dataEndpoint, { completedItems: this.completedItems }, { responseType: 'text' })
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}


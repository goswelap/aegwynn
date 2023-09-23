import { Injectable } from '@angular/core';
import { from, filter, map, pipe } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Conversation } from './conversation.model';

// import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai';

import { environment } from '../environments/environment.prod';

@Injectable()
export class OpenaiService {
  private serverEndpoint = 'http://134.209.65.11:3000/openai-prompt';
  conversation:{'user': string[], 'assistant': string[]} = {'user': [], 'assistant': []};
  convo = new Subject<Conversation>();

  constructor(private http: HttpClient) { }

  prompt(userMessage: string): Observable<string> {
    console.log("prompting: " + userMessage);
    this.conversation['user'].push(userMessage);
    return this.http.post<{ response: string }>(this.serverEndpoint, { conversation: this.conversation }).pipe(
      map(resp => {
        console.log(resp.response);
        this.conversation['assistant'].push(resp.response);
        this.convo.next(new Conversation(this.conversation));
        return resp.response;
      })
    );
  }
}


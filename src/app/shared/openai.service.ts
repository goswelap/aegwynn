import { Injectable } from '@angular/core';
import { from, filter, map, pipe } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai';

import { environment } from '../environments/environment.prod';

@Injectable()
export class OpenaiService {
  private serverEndpoint = 'http://134.209.65.11:3000/openai-prompt';

  constructor(private http: HttpClient) { }

  prompt(userMessage: string): Observable<string> {
    console.log("prompting: " + userMessage);
    return this.http.post<{ response: string }>(this.serverEndpoint, { message: userMessage }).pipe(
      map(resp => {
        console.log(resp.response);
        return resp.response;
      })
    );
  }
}


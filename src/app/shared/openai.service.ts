import { Injectable } from '@angular/core';
import { from, filter, map, pipe } from 'rxjs';
import { Observable } from 'rxjs';
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai';

import { environment } from '../environments/environment.prod';

@Injectable()
export class OpenaiService {
  private conversationHistory: { role: ChatCompletionRequestMessageRoleEnum, content: string }[] = [];
  readonly configuration = new Configuration({ apiKey: environment.openaiAPIKey });
  readonly openai = new OpenAIApi(this.configuration);

  constructor() { }

  prompt(userMessage: string): Observable<string> {
    this.conversationHistory.push({ role: 'user', content: userMessage });

    return from(this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: this.conversationHistory
    })).pipe(
      filter(resp => !!resp && !!resp.data),
      map(resp => resp.data),
      filter((data: any) => data.choices && data.choices.length > 0 && data.choices[0].message.content),
      map(data => {
        const response = data.choices[0].message.content.trim();
        this.conversationHistory.push({ role: 'assistant', content: response });
        return response;
      })
    );
  }
}

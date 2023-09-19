import { Component } from '@angular/core';
import { OpenaiService } from '../shared/openai.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    userMessage = '';
    response = '';

    constructor(private openaiService: OpenaiService) { }

    send() {
      console.log("sending: " + this.userMessage);
        this.openaiService.prompt(this.userMessage).subscribe(response => {
          this.response = response;
        });
    }
}

import { Component } from '@angular/core';

import { AgendaItem } from './agenda-item/agenda-item.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  agendaItems: AgendaItem[];
}

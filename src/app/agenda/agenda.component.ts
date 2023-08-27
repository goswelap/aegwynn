import { Component } from '@angular/core';

import { AgendaItem } from './agenda-item/agenda-item.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  agendaItems: AgendaItem[] = [
    new AgendaItem(
      new Date('2023-09-01'),
      'Test Course',
      'Test Assignment'
    ),
    new AgendaItem(
      new Date('2023-09-01'),
      'Test Course',
      'Test Assignment'
    ),
  ];
}

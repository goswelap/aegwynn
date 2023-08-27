import { Component, OnInit, Input } from '@angular/core';

import { AgendaItem } from './agenda-item.model';

@Component({
  selector: 'app-agenda-item',
  templateUrl: './agenda-item.component.html',
  styleUrls: ['./agenda-item.component.css']
})
export class AgendaItemComponent implements OnInit {
  @Input() agendaItem: AgendaItem;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }
}

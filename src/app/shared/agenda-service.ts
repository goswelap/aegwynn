import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AgendaItem } from '../agenda/agenda-item/agenda-item.model';
// import { Ingredient } from './ingredient.model';
// import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class AgendaService {
  agendaItemsChanged = new Subject<AgendaItem[]>();

  private agendaItems: AgendaItem[] = [
    new AgendaItem(
      new Date(2023, 7, 27),
      'Angular Application',
      'Replace up arrow with gear icon'
    ),
    new AgendaItem(
      new Date(2023, 7, 27),
      'Angular Application',
      'Add up / down arrows to agenda items to allow reordering'
    ),
  ];

  constructor() { }

  setAgendaItems(agendaItems: AgendaItem[]) {
    this.agendaItems = agendaItems;
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  getAgendaItems() {
    return this.agendaItems.slice();
  }

  getAgendaItem(index: number) {
    return this.agendaItems[index];
  }

  addAgendaItem(agendaItem: AgendaItem) {
    this.agendaItems.push(agendaItem);
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  updateAgendaItem(index: number, newAgendaItem: AgendaItem) {
    this.agendaItems[index] = newAgendaItem;
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  deleteAgendaItem(index: number) {
    this.agendaItems.splice(index, 1);
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }
}

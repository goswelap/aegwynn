import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AgendaItem } from '../agenda/agenda-list/agenda-item/agenda-item.model';
// import { Ingredient } from './ingredient.model';
// import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  agendaItemsChanged = new Subject<AgendaItem[]>();
  completedItemsChanged = new Subject<AgendaItem[]>();
  startedEditing = new Subject<number>();
  showCurrent = new Subject<boolean>();
  showCurrentValue: boolean = true;
  private agendaItems: AgendaItem[] = [];
  private completedItems: AgendaItem[] = [];

  // private agendaItems: AgendaItem[] = [
  //   new AgendaItem(
  //     new Date(2023, 7, 27),
  //     'Angular Application',
  //     'Replace up arrow with gear icon'
  //   ),
  //   new AgendaItem(
  //     new Date(2023, 7, 27),
  //     'Angular Application',
  //     'Add up / down arrows to agenda items to allow reordering'
  //   ),
  //   new AgendaItem(
  //     new Date(2023, 7, 27),
  //     'Angular Application',
  //     'Add ability to delete / mark agenda items complete'
  //   ),
  //   new AgendaItem(
  //     new Date(2023, 7, 27),
  //     'Angular Application',
  //     'Add \'current\' and \'compelted\' agenda item sections'
  //   ),
  // ];

  // completedItems: AgendaItem[] = [
  //   new AgendaItem(
  //     new Date(2023, 7, 27),
  //     'Angular Application',
  //     'Style agenda items'
  //   ),];

  constructor() { }

  setAgendaItems(agendaItems: AgendaItem[]) {
    this.agendaItems = agendaItems;
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  setCompletedItems(completedItems: AgendaItem[]) {
    this.completedItems = completedItems;
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  getAgendaItems() {
    return this.agendaItems.slice();
  }

  getCompletedItems() {
    return this.completedItems.slice();
  }

  getAgendaItem(index: number) {
    return this.agendaItems[index];
  }

  getCompletedItem(index: number) {
    return this.completedItems[index];
  }

  addAgendaItem(agendaItem: AgendaItem) {
    this.agendaItems.push(agendaItem);
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  addCompletedItem(completedItem: AgendaItem) {
    this.completedItems.push(completedItem);
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  toggleDisplay() {
    this.showCurrent.next(this.showCurrentValue = !this.showCurrentValue);
  }

  getShowCurrent() {
    return this.showCurrentValue;
  }

  markComplete(index: number) {
    const item = this.agendaItems.splice(index, 1)[0];
    this.completedItems.push(item);
    this.agendaItemsChanged.next(this.agendaItems.slice());
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  markIncomplete(index: number) {
    const item = this.completedItems.splice(index, 1)[0];
    this.agendaItems.push(item);
    this.agendaItemsChanged.next(this.agendaItems.slice());
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  updateAgendaItem(index: number, newAgendaItem: AgendaItem) {
    this.agendaItems[index] = newAgendaItem;
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  updateCompletedItem(index: number, newCompletedItem: AgendaItem) {
    this.completedItems[index] = newCompletedItem;
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  deleteAgendaItem(index: number) {
    this.agendaItems.splice(index, 1);
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  deleteCompletedItem(index: number) {
    this.completedItems.splice(index, 1);
    this.completedItemsChanged.next(this.completedItems.slice());
  }
}

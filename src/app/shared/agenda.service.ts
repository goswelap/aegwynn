import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

import { AgendaItem } from '../agenda/agenda-list/agenda-item/agenda-item.model';

@Injectable({ providedIn: 'root' })
export class AgendaService {
  agendaItemsChanged = new Subject<AgendaItem[]>();
  completedItemsChanged = new Subject<AgendaItem[]>();
  coursesChanged = new Subject<String[]>();
  // startedEditing = new Subject<number>();
  startedEditing = new ReplaySubject<number>(1);
  resetForm = new Subject<void>();
  // resetForm = new ReplaySubject<void>(1);


  showCurrent = new Subject<boolean>();
  showCurrentValue: boolean = true;
  private agendaItems: AgendaItem[] = [];
  private completedItems: AgendaItem[] = [];
  private courses: String[] = [];

  constructor() { }

  sortAgendaItems() {
    this.agendaItems = this.getAgendaItems().sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  }

  sortCompletedItems() {
    this.completedItems = this.getCompletedItems().sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  }

  setAgendaItems(agendaItems: AgendaItem[]) {
    this.agendaItems = agendaItems;
    this.sortAgendaItems();
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  setCompletedItems(completedItems: AgendaItem[]) {
    this.completedItems = completedItems;
    this.sortCompletedItems();
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  setCourses(courses: String[]) {
    this.courses = courses;
    this.coursesChanged.next(this.courses);
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

  getCourses() {
    return this.courses;
  }

  addAgendaItem(agendaItem: AgendaItem) {
    this.agendaItems.push(agendaItem);
    this.sortAgendaItems();
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  addCompletedItem(completedItem: AgendaItem) {
    this.completedItems.push(completedItem);
    this.sortCompletedItems();
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  addCourse(course: String) {
    this.courses.push(course);
    this.coursesChanged.next(this.courses);
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
    this.sortAgendaItems();
    this.sortCompletedItems();
    this.agendaItemsChanged.next(this.agendaItems.slice());
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  markIncomplete(index: number) {
    const item = this.completedItems.splice(index, 1)[0];
    this.agendaItems.push(item);
    this.sortAgendaItems();
    this.sortCompletedItems();
    this.agendaItemsChanged.next(this.agendaItems.slice());
    this.completedItemsChanged.next(this.completedItems.slice());
  }

  updateAgendaItem(index: number, newAgendaItem: AgendaItem) {
    this.agendaItems[index] = newAgendaItem;
    this.sortAgendaItems();
    this.agendaItemsChanged.next(this.agendaItems.slice());
  }

  updateCompletedItem(index: number, newCompletedItem: AgendaItem) {
    this.completedItems[index] = newCompletedItem;
    this.sortCompletedItems();
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

  removeCourse(courseName: String) {
    const index = this.courses.indexOf(courseName);
    if (index !== -1) {
        this.courses.splice(index, 1);
        this.coursesChanged.next(this.courses);
    }
}

}

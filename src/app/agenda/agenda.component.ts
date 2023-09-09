import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AgendaItem } from './agenda-item/agenda-item.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {
  displayCompleted: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  agendaItems: AgendaItem[] = [
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
    new AgendaItem(
      new Date(2023, 7, 27),
      'Angular Application',
      'Add ability to delete / mark agenda items complete'
    ),
    new AgendaItem(
      new Date(2023, 7, 27),
      'Angular Application',
      'Add \'current\' and \'compelted\' agenda item sections'
    ),
  ];
  completedItems: AgendaItem[] = [
    new AgendaItem(
      new Date(2023, 7, 27),
      'Angular Application',
      'Style agenda items'
    ),];

  onAddAgendaItem() {
    this.router.navigate(['new-item'], { relativeTo: this.route });
  }

  toggleDisplay() {
    this.displayCompleted = !this.displayCompleted;
  }

  toggleItemCompletion(index: number) {
    if (this.displayCompleted) {
      const item = this.completedItems.splice(index, 1)[0];
      this.agendaItems.push(item);
    } else {
      const item = this.agendaItems.splice(index, 1)[0];
      this.completedItems.push(item);
    }
  }

  deleteAgendaItem(index: number) {
    if (this.displayCompleted) {
      this.completedItems.splice(index, 1);
    } else {
      this.agendaItems.splice(index, 1);
    }
  }
}

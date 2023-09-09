import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AgendaItem } from './agenda-item/agenda-item.model';
import { AgendaService } from '../shared/agenda-service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  agendaSub!: Subscription;
  completedSub!: Subscription;
  displayCompleted: boolean = false;

  agendaItems: AgendaItem[] = [];
  completedItems: AgendaItem[] = [];

  constructor(private agendaServ: AgendaService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.agendaSub = this.agendaServ.agendaItemsChanged
      .subscribe(
        (agendaItems: AgendaItem[]) => {
          this.agendaItems = agendaItems;
        }
      );
    this.agendaItems = this.agendaServ.getAgendaItems();

    this.completedSub = this.agendaServ.completedItemsChanged
      .subscribe(
        (completedItems: AgendaItem[]) => {
          this.completedItems = completedItems;
        }
      );
      this.completedItems = this.agendaServ.getCompletedItems();
  }

  onAddAgendaItem() {
    this.router.navigate(['new-item'], { relativeTo: this.route });
  }

  toggleDisplay() {
    this.displayCompleted = !this.displayCompleted;
  }

  toggleItemCompletion(index: number) {
    if (this.displayCompleted) {
      this.agendaServ.markIncomplete(index);
    } else {
      this.agendaServ.markComplete(index);
    }
  }

  deleteAgendaItem(index: number) {
    if (this.displayCompleted) {
      this.agendaServ.deleteCompletedItem(index);
    } else {
      this.agendaServ.deleteAgendaItem(index);
    }
  }
}

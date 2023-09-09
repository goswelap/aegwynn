import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { AgendaItem } from '../agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from '../../shared/agenda-service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.css']
})
export class AgendaListComponent implements OnInit {
  agendaSub!: Subscription;
  completedSub!: Subscription;
  displaySub!: Subscription;

  showCurrent: boolean = true;

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

    this.displaySub = this.agendaServ.showCurrent.subscribe(
      (showCurrent: boolean) => {
        this.showCurrent = showCurrent;
      }
    )
  }

  toggleItemCompletion(index: number) {
    if (!this.showCurrent) {
      this.agendaServ.markIncomplete(index);
    } else {
      this.agendaServ.markComplete(index);
    }
  }

  deleteAgendaItem(index: number) {
    if (!this.showCurrent) {
      this.agendaServ.deleteCompletedItem(index);
    } else {
      this.agendaServ.deleteAgendaItem(index);
    }
  }

  editAgendaItem(index: number) {
    this.agendaServ.startedEditing.next(index);
  }
}

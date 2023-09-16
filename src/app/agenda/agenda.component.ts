import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { AgendaItem } from './agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from '../shared/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  displaySub!: Subscription;
  showCurrent: boolean = true;

  agendaItems: AgendaItem[] = [];
  completedItems: AgendaItem[] = [];

  constructor(private agendaServ: AgendaService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.displaySub = this.agendaServ.showCurrent.subscribe(
      (showCurrent: boolean) => {
        this.showCurrent = showCurrent;
      }
    )
  }

  onAddAgendaItem() {
    this.router.navigate(['new-item'], { relativeTo: this.route });
  }

  toggleDisplay() {
    // this.displayCompleted = !this.displayCompleted;
    this.agendaServ.toggleDisplay();
  }
}

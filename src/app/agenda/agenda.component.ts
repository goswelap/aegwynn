import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { AgendaItem } from './agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from '../shared/agenda.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  displaySub!: Subscription;
  showCurrent: boolean = true;

  constructor(private agendaServ: AgendaService,
    private dataStorageServ: DataStorageService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.displaySub = this.agendaServ.showCurrent.subscribe(
      (showCurrent: boolean) => {
        this.showCurrent = showCurrent;
      }
    )
    this.dataStorageServ.fetchAgendaItems().subscribe();
    this.dataStorageServ.fetchCompletedItems().subscribe();
  }

  onAddAgendaItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  toggleDisplay() {
    // this.displayCompleted = !this.displayCompleted;
    this.agendaServ.toggleDisplay();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { AgendaService } from '../shared/agenda.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, OnDestroy {
  displaySub!: Subscription;
  fetchAgendaItemsSub!: Subscription;
  fetchCompletedItemsSub!: Subscription;
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
    this.fetchAgendaItemsSub = this.dataStorageServ.fetchAgendaItems().subscribe();
    this.fetchCompletedItemsSub = this.dataStorageServ.fetchCompletedItems().subscribe();
  }

  onAddAgendaItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  toggleDisplay() {
    this.agendaServ.toggleDisplay();
  }

  ngOnDestroy() {
    this.displaySub.unsubscribe();
    this.fetchAgendaItemsSub.unsubscribe();
    this.fetchCompletedItemsSub.unsubscribe();
  }
}

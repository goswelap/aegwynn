import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';

import { AgendaService } from '../shared/agenda.service';
import { DataStorageService } from '../shared/data-storage.service';
import { OpenaiService } from '../shared/openai.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private agendaService: AgendaService,
    private dataStorageService: DataStorageService,
    private openaiService: OpenaiService
  ) {}


  ngOnInit() {
    this.dataStorageService.fetchAgendaItems().subscribe(
      agendaItems => {
        this.agendaService.setAgendaItems(agendaItems);
      }
    );
    this.dataStorageService.fetchCompletedItems().subscribe(
      completedItems => {
        this.agendaService.setCompletedItems(completedItems);
      }
    );

  }


}

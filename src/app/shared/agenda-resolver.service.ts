import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AgendaItem } from '../agenda/agenda-list/agenda-item/agenda-item.model';
import { DataStorageService } from '../shared/data-storage.service';
import { AgendaService } from './agenda.service';

@Injectable({ providedIn: 'root' })
export class AgendaResolverService implements Resolve<AgendaItem[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private agendaService: AgendaService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const agendaItems = this.agendaService.getAgendaItems();

    if (agendaItems.length === 0) {
      return this.dataStorageService.fetchAgendaItems();
    } else {
      return agendaItems;
    }
  }
}

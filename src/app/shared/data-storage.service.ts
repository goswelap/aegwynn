import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AgendaItem } from '../agenda/agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from './agenda.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
   constructor(
      private http: HttpClient,
      private agendaService: AgendaService,
      ) { }

   storeAgendaItems() {
      const agendaItems = this.agendaService.getAgendaItems();
      this.http
         .put(
            'https://aegwynn-c7092-default-rtdb.firebaseio.com/agendaItems.json',
            agendaItems
         )
         .subscribe(response => {
            console.log(response);
         });
   }

   fetchAgendaItems() {
      return this.http
         .get<AgendaItem[]>(
            'https://aegwynn-c7092-default-rtdb.firebaseio.com/agendaItems.json'
         )
         .pipe(
            map(agendaItems => {
               return agendaItems.map(agendaItem => {
                  return {
                     ...agendaItem
                  };
               });
            }),
            tap(agendaItems => {
               this.agendaService.setAgendaItems(agendaItems);
            })
         );
   }
}

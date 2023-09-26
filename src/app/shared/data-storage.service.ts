import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AgendaItem } from '../agenda/agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from './agenda.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
   private userId: string | null = null;
   constructor(
      private http: HttpClient,
      private agendaService: AgendaService,
      private authService: AuthService
   ) { }

   storeCourses() {
      const courses = this.agendaService.getCourses();
      const userId = this.authService.getLocalId();
      this.http
         .put(
            `https://aegwynn-c7092-default-rtdb.firebaseio.com/${userId}/courses.json`,
            courses
         )
         .subscribe(response => {
         });
   }

   storeAgendaItems() {
      const agendaItems = this.agendaService.getAgendaItems();
      const userId = this.authService.getLocalId();
      this.http
         .put(
            `https://aegwynn-c7092-default-rtdb.firebaseio.com/${userId}/agendaItems.json`,
            agendaItems
         )
         .subscribe(response => {
         });
   }

   storeCompletedItems() {
      const completedItems = this.agendaService.getCompletedItems();
      const userId = this.authService.getLocalId();
      this.http
         .put(
            `https://aegwynn-c7092-default-rtdb.firebaseio.com/${userId}/completedItems.json`,
            completedItems
         )
         .subscribe(response => {
         });
   }

   fetchCourses() {
      const userId = this.authService.getLocalId();
      return this.http
         .get<String[]>(
            `https://aegwynn-c7092-default-rtdb.firebaseio.com/${userId}/courses.json`
         )
         .pipe(
            map(courses => {
               return courses ? courses : [];
            }),
            tap(courses => {
               this.agendaService.setCourses(courses);
            })
         );
   }

   fetchAgendaItems() {
      const userId = this.authService.getLocalId();
      return this.http
         .get<AgendaItem[]>(
            `https://aegwynn-c7092-default-rtdb.firebaseio.com/${userId}/agendaItems.json`
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

   fetchCompletedItems() {
      const userId = this.authService.getLocalId();
      return this.http
         .get<AgendaItem[]>(
            `https://aegwynn-c7092-default-rtdb.firebaseio.com/${userId}/completedItems.json`
         )
         .pipe(
            map(completedItems => {
               return completedItems.map(completedItem => {
                  return {
                     ...completedItem
                  };
               });
            }),
            tap(completedItems => {
               this.agendaService.setCompletedItems(completedItems);
            })
         );
   }
}

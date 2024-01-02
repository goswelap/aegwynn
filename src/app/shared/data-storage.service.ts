import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { AgendaItem } from '../agenda/agenda-list/agenda-item/agenda-item.model';
import { AgendaService } from './agenda.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
   private SERVER_URL = 'http://127.0.0.1:3000'; // Replace with your server's URL

   constructor(
      private http: HttpClient,
      private agendaService: AgendaService,
      private authService: AuthService
   ) { }

   storeCourses() {
      const courses = this.agendaService.getCourses();
      const userId = this.authService.getLocalId();
      this.http
         .post(`${this.SERVER_URL}/store-courses/${userId}`, courses)
         .subscribe(response => {
            console.log('Courses stored successfully:', response);
         }, error => {
            console.error('Error storing courses:', error);
         });
   }

   storeAgendaItems() {
      const agendaItems = this.agendaService.getAgendaItems();
      const userId = this.authService.getLocalId();
      this.http
         .post(`${this.SERVER_URL}/store-agenda-items/${userId}`, agendaItems)
         .subscribe(response => {
            console.log('Agenda items stored successfully:', response);
         }, error => {
            console.error('Error storing agenda items:', error);
         });
   }

   storeCompletedItems() {
      const completedItems = this.agendaService.getCompletedItems();
      const userId = this.authService.getLocalId();
      this.http
         .post(`${this.SERVER_URL}/store-completed-items/${userId}`, completedItems)
         .subscribe(response => {
            console.log('Completed items stored successfully:', response);
         }, error => {
            console.error('Error storing completed items:', error);
         });
   }

   fetchCourses() {
      const userId = this.authService.getLocalId();
      return this.http
         .get<String[]>(`${this.SERVER_URL}/fetch-courses/${userId}`)
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
         .get<AgendaItem[]>(`${this.SERVER_URL}/fetch-agenda-items/${userId}`)
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
         .get<AgendaItem[]>(`${this.SERVER_URL}/fetch-completed-items/${userId}`)
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

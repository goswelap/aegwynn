import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaItemComponent } from './agenda-list/agenda-item/agenda-item.component';
import { AgendaItemEditComponent } from './agenda-item-edit/agenda-item-edit.component';
import { AgendaService } from '../shared/agenda.service';


@NgModule({
  declarations: [
    AgendaComponent,
    AgendaListComponent,
    AgendaItemComponent,
    AgendaItemEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgendaRoutingModule
  ],
  providers: [
    AgendaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }]
})
export class AgendaModule {}

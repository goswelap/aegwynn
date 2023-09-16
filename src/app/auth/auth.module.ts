import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AgendaService } from '../shared/agenda.service';
import { AuthService } from '../shared/auth.service';
import { AgendaComponent } from '../agenda/agenda.component';
import { AgendaItemComponent } from '../agenda/agenda-list/agenda-item/agenda-item.component';
import { AgendaListComponent } from '../agenda/agenda-list/agenda-list.component';
import { AgendaItemEditComponent } from '../agenda/agenda-item-edit/agenda-item-edit.component';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ]
})
export class AuthModule { }

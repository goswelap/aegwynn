import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda.component';
import { AgendaItemComponent } from './agenda-list/agenda-item/agenda-item.component';
import { AgendaListComponent } from './agenda-list/agenda-list.component';
import { AgendaItemEditComponent } from './agenda-item-edit/agenda-item-edit.component';
import { AgendaService } from '../shared/agenda.service';
import { AgendaResolverService } from '../shared/agenda-resolver.service';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AgendaComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: AgendaItemEditComponent },
      { path: 'list', component: AgendaListComponent },
      {
        path: ':id/edit',
        component: AgendaItemEditComponent,
        resolve: [AgendaResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule {}

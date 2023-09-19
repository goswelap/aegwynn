import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda.component';
import { AgendaItemEditComponent } from './agenda-item-edit/agenda-item-edit.component';
import { AgendaResolverService } from '../shared/agenda-resolver.service';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AgendaComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: AgendaItemEditComponent },
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda.component';
import { NewItemComponent } from './new-item/new-item.component';
import { AgendaResolverService } from '../shared/agenda-resolver.service';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AgendaComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: NewItemComponent },
      {
        path: ':id/edit',
        component: NewItemComponent,
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

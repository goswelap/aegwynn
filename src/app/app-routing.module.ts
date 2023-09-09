import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaItemEditComponent } from './agenda/agenda-item-edit/agenda-item-edit.component';

const routes: Routes = [
   // { path: "", redirectTo: "/dashboard", pathMatch: "full" },
   { path: "dashboard", component: DashboardComponent },
   { path: "agenda", component: AgendaComponent },
   { path: "agenda/new-item", component: AgendaItemEditComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }

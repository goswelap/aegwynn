import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AssistantComponent } from './assistant/assistant.component';

const routes: Routes = [
   // { path: "", redirectTo: "/dashboard", pathMatch: "full" },
   { path: "dashboard", component: DashboardComponent },
   { path: "assistant", component: AssistantComponent },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent},
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   {
      path: 'agenda',
      loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule)
   },
   {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }

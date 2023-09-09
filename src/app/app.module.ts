import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './header/nav/nav.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaItemComponent } from './agenda/agenda-item/agenda-item.component';
import { AgendaItemEditComponent } from './agenda/agenda-item-edit/agenda-item-edit.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      DashboardComponent,
      NavComponent,
      AgendaComponent,
      AgendaItemComponent,
      AgendaItemEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }

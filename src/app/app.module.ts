import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssistantComponent } from './assistant/assistant.component';
import { NavComponent } from './header/nav/nav.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      DashboardComponent,
      AssistantComponent,
      NavComponent
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

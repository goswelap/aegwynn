import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './header/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { OpenaiService } from './shared/openai.service';
import { AssistantComponent } from './dashboard/assistant/assistant.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      DashboardComponent,
      NavComponent,
      HomeComponent,
      SettingsComponent,
      AssistantComponent
      ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [OpenaiService],
   bootstrap: [AppComponent]
})
export class AppModule { }

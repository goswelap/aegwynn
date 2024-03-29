import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/auth.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   loadedFeature = 'dashboard';

   constructor(
      private authService: AuthService
   ) { }

   ngOnInit() {
      this.authService.autoLogin();
   }

   onNavigate(feature: Event) {
      this.loadedFeature = feature.toString();
   }
}

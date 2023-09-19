import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/auth.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
   private userSub!: Subscription;
   username: string | null = null;
   isAuthenticated = false;
   showDropdown = false;

   constructor(
      private router: Router,
      private authService: AuthService
   ) { }

   toggleDropdown() {
      this.showDropdown = !this.showDropdown;
   }

   ngOnInit() {
      this.userSub = this.authService.user.subscribe(user => {
         this.isAuthenticated = !!user;
         this.username = user ? user.email : null;
      });
   }

   logout() {
      this.showDropdown = false;
      this.authService.logout();
      this.username = null;
   }

   login() {
      this.showDropdown = false;
      this.router.navigate(['/auth']);
   }

   ngOnDestroy() {
      this.userSub.unsubscribe();
   }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// import { DataStorageService } from '../shared/data-storage.service';
// import { AuthService } from '../auth/auth.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   isAuthenticated = false;
   showDropdown = false;
   //   private userSub: Subscription;

   constructor(
      //  private dataStorageService: DataStorageService,
      //  private authService: AuthService
   ) { }

   toggleDropdown() {
      this.showDropdown = !this.showDropdown;
   }

   ngOnInit() {
      //  this.userSub = this.authService.user.subscribe(user => {
      //    this.isAuthenticated = !!user;
      //    console.log(!user);
      //    console.log(!!user);
      //  });
   }

   logout() {
      //  this.authService.logout();
   }
}

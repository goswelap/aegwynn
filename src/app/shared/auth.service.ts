import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
   kind: string;
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
   registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
   private signupEndpoint = 'http://127.0.0.1:3000/signup';
   private loginEndpoint = 'http://127.0.0.1:3000/login';

   private localId: string | null = null;
   user = new BehaviorSubject<User | null>(null);
   private tokenExpirationTimer: any;

   constructor(private http: HttpClient, private router: Router) { }

   signup(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
            this.signupEndpoint,
            {
               email: email,
               password: password,
               returnSecureToken: true
            }
         )
         .pipe(
            catchError(this.handleError),
            tap(resData => {
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               );
            })
         );
   }

   login(email: string, password: string) {
      return this.http
         .post<AuthResponseData>(
            this.loginEndpoint,
            {
               email: email,
               password: password,
               returnSecureToken: true
            }
         )
         .pipe(
            catchError(this.handleError),
            tap(resData => {
               this.localId = resData.localId; // Set the _localId here
            }),
            tap(resData => {
               this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
               );
            })
         );
   }

   autoLogin() {
      const storedData = localStorage.getItem('userData') ?? "{}";
      if (!storedData) {
         return;
      }
      const userData: {
         email: string;
         id: string;
         _token: string;
         _tokenExpirationDate: string;
      } = JSON.parse(storedData);

      const loadedUser = new User(
         userData.email,
         userData.id,
         userData._token,
         new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
         this.user.next(loadedUser);
         const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
         this.autoLogout(expirationDuration);
      }
      this.localId = userData.id;
   }

   logout() {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
         clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
   }

   autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
         this.logout();
      }, expirationDuration);
   }

   private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
   }

   private handleError(errorRes: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.error) {
         return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
         case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
         case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
         case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
      }
      return throwError(errorMessage);
   }

   getLocalId(): string | null {
      return this.localId;
   }
}

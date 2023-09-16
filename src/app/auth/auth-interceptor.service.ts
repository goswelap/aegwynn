import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
   constructor(private authService: AuthService) { }

   intercept(req: HttpRequest<any>, next: HttpHandler) {
      return this.authService.user.pipe(
         take(1),
         exhaustMap(user => {
            if (user && user.token) {
               req = req.clone({
                  params: new HttpParams().set('auth', user.token)
               });
            }
            return next.handle(req);
         })
      );
   }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const newReq = request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + user.token),
        });
        return next.handle(newReq);
      })
    );
  }
}

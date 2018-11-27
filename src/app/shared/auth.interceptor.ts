import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted', req);
    // by default requests are immutable
    // const copiedReq = req.clone({ headers: req.headers.append('', '') });
    const copiedReq = req.clone({ params: req.params.set('auth', this.authService.getToken()) });
    return next.handle(copiedReq);
    // return null
  }
}

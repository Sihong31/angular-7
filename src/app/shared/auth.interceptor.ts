import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/Rx';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // by default requests are immutable
    // const copiedReq = req.clone({ headers: req.headers.append('', '') });
    return this.store.select('auth')
      // switchMap to not wrap observable within another one
      .switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
        return next.handle(copiedReq);
      });
    // return null
  }
}

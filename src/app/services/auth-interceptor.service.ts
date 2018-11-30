import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
  let authReq = req;
  if (req.headers.has('Authorization')) {
    console.log('logowanie');
  } else if (this.token.getToken() != null) {
    console.log('nie logowanie');
    authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken()) });
  }
  return next.handle(authReq).pipe(
    tap((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log('Zakaz dostępu');
          this.router.navigate(['login']);
        }
      }
    }
    ));
}
}


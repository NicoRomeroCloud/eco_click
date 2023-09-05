import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiLogin: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.apiLogin.getToken();

    if(token){
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer '+token)
      })
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}


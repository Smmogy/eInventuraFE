import { HttpInterceptorFn, withInterceptors } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const customeInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

@Injectable()
export class CustomeInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('loginToken');
    let newCloneRequest = request;
    if (token != null) {
      newCloneRequest = request.clone({
        setHeaders: {
        
          Authorization: `Bearer ${token}`
        }
      })
    }
    return next.handle(newCloneRequest);
  }
}

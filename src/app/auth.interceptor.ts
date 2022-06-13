import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';

export const NoAuth = 'skip-auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const modifiedReq = req.clone({ 
        headers: req.headers
        .set("Authorization", 'Bearer ' + this.authService.token || "Bearer ")
        .set("Content-Type", "application/json") 
                 
      });
      
    return next.handle(modifiedReq)
    .pipe();
  }

  
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
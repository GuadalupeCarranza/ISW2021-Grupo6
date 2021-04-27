import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';

export class AuthInterceptor implements HttpInterceptor {

  constructor(@Inject(AuthService) private service, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: environment.apiUrl + request.url, setHeaders: {
        Authorization: 'Bearer ' + this.service.getToken()
      }
    });

    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      return event;
    }), catchError((error: HttpErrorResponse) => {

      if (error.status == 401) {
        this.router.navigate(['']);
      }
      return throwError(error);
    }));
  }

}

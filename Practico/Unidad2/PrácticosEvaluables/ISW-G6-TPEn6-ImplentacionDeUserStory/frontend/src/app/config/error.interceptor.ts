import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Inject} from "@angular/core";
import {NgxSpinnerService} from "ngx-spinner";

export class ErrorInterceptor implements HttpInterceptor {

  private requestCount = 0;


  constructor(@Inject(MatSnackBar) private snackBar, @Inject(NgxSpinnerService) private spinner) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request instanceof HttpRequest) this.requestCount++;
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) this.updateSpinner();
      return event;
    }), catchError((error: HttpErrorResponse) => {
      this.updateSpinner();
      if (error.status == 400) {
        console.log(error);
        this.snackBar.open(error.error, 'Cerrar', {
          duration: 10000, panelClass: ["snackbar-danger"]
        });
      }
      return throwError(error);
    }));
  }

  private updateSpinner() {
    this.requestCount--;
    if (this.requestCount == 0) {
      this.spinner.hide();
    } else {
      this.spinner.show();
    }
  }

}

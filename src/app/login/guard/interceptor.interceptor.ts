import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';


export const requestInterceptor: HttpInterceptorFn = (request, next) => {
  const router        = inject(Router);
  const token: string = localStorage.getItem('USER_INFO')!;
  let requestInter    = request;

  if(token) {
    requestInter = request.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });
  }


  return next(requestInter).pipe(
    catchError((err: HttpErrorResponse) => {
      if(err.status === 404) {
        if(router.url !== '/login') {
          router.navigate(['/login'], {replaceUrl: true});
        }
      }
      return throwError(() => err);
    })
  )

};


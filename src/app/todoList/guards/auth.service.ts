import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 public isLoggedIn: boolean  = false;



  isLooged() {
    const stateLogged = localStorage.getItem('USER_INFO') ? true : false;
    return of(stateLogged).pipe(tap(() => {
      return stateLogged}));

  }


}

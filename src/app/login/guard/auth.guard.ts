
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, of, tap } from 'rxjs';


export const authGuard = () => {
  const router = inject(Router);

  return isLooged().pipe(tap( (state) => {  !state ? router.navigate(['/login']) : true; }));
}

export const loginGuard = () => {
  const router = inject(Router);

  return isLooged().pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        router.navigate(['/home']);
        return false; // Usuario autenticado,
      } else {
        return true; // Usuario no autenticado,
      }
    })
  );
}


export function isLooged() {
  const stateLogged = localStorage.getItem('USER_INFO') ? true : false;
  return of(stateLogged).pipe(tap(() => {
    return stateLogged}));
}

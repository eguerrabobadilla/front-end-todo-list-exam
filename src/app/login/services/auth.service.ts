import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom} from 'rxjs';
import { LoginService } from './login.service';

@Injectable({providedIn: 'root'})
export class AuthService {

    authState = new BehaviorSubject(false);
    TokenTemporal = new BehaviorSubject(false);

  	constructor(private loginService: LoginService,
		private router: Router) {
		this.ifLoggedIn();
		this.initializeTokenTemporal();
	}

	private initializeTokenTemporal(): void {
		const tokenTemporalValue = localStorage.getItem('TokenTemporal') ? true : false;
		this.TokenTemporal.next(tokenTemporalValue);
	  }

	 ifLoggedIn() {
		if (localStorage.getItem("USER_INFO") !== null) {
      console.log("logueado")
			this.authState.next(true);
		}
	 }


	 async login(item: any) {

		try {

		  const response:any = await firstValueFrom(this.loginService.login(item));

		  localStorage.setItem('USER_INFO', response['token']);
		  this.authState.next(true);
		}
		catch(err: any) {
		  const error = err.status == 0 ? "Error con la conexión al servidor" : err.error;
		  throw error;
		}

	  }

	  logout() {
		var promise = new Promise((resolve, reject) => {
			this.authState.next(false);
			localStorage.clear();
			resolve(this.authState.value);
			this.router.navigate(['login']);
		  });

		  return promise;
	  }

	  isAuthenticated() {
		return this.authState.value;
	  }
}

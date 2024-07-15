import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

	url: string = 'https://www.alfalbs.app/ApiOmega';
	Ws: string;

  constructor(public http: HttpClient) {
    this.Ws = 'api/login';
   }

   login(item: any) {
    return this.http.post(`${this.url}/${this.Ws}`,item);
   }
}

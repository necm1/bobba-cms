import { Injectable } from '@angular/core';
import { config } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username, password) {
    return this.http.post<any>(`${config.apiEndpoint}/auth/login`, { username, password })
    .pipe(map(token => {
        return token;
    }), first());
  }
}

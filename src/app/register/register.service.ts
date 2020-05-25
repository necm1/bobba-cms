import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(username, password, mail, recaptcha) {
    return this.http.post<any>(`${config.apiEndpoint}/auth/register`, { username, password, mail, recaptcha });
  }
}

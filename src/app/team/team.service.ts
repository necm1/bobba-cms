import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  management() {
    return this.http.get<any>(`${config.apiEndpoint}/community/team/management`);
  }

  administration() {
    return this.http.get<any>(`${config.apiEndpoint}/community/team/administration`);
  }

  moderators() {
    return this.http.get<any>(`${config.apiEndpoint}/community/team/moderators`);
  }

  helpers() {
    return this.http.get<any>(`${config.apiEndpoint}/community/team/helpers`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  photos() {
    return this.http.get<any>(`${config.apiEndpoint}/community/photos/all`);
  }
}

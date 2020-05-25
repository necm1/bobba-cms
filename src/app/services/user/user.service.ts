import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../config';
import { User } from 'src/app/models/User/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('bobba-user')));
    this.user$ = this.userSubject.asObservable();
  }

  public get user(): User | null {
    return this.userSubject.value;
  }

  getUser(token?: string) {
    if (token) {
      const header = new HttpHeaders({ Authorization: `Bearer ${token}` });

      return this.http.get<any>(`${config.apiEndpoint}/user`, { headers: header }).pipe(map(user => {
        localStorage.setItem('bobba-token', token);
        localStorage.setItem('bobba-user', JSON.stringify(user.data));

        this.userSubject.next(user.data as User);
      }));
    }

    return this.http.get<any>(`${config.apiEndpoint}/user`).pipe(map(user => {
      localStorage.setItem('bobba-user', JSON.stringify(user.data));
      this.userSubject.next(user.data as User);

      return user.data;
    }));
  }

  getFriends() {
    return this.http.get<any>(`${config.apiEndpoint}/user/friends`)
                    .pipe(
                      map(friends => {
                        return friends.data;
                      })
                    );
  }

  get token(): string {
    return localStorage.getItem('bobba-token');
  }

  sso() {
    return this.http.put<any>(`${config.apiEndpoint}/user/update/sso`, {});
  }

  commands() {
    return this.http.get<any>(`${config.apiEndpoint}/user/commands`).pipe(map(response => {
      return response.data;
    }));
  }

  newFastFood(data: {id: string, username: string, look: string}) {
    const formData = new FormData();
    formData.append('api-key', '2C5A11-8142C4-71B2AE-0BE0EE-59D8AD');
    formData.append('user-id', data.id);
    formData.append('user-name', data.username);
    formData.append('user-avatar', data.look);
    formData.append('theme', 'default');

    return this.http.post<any>('https://api.thefastfoodgame.com/api', formData);
  }

  logout() {
    localStorage.removeItem('bobba-token');
  }
}

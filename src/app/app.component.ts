import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
import { Router } from '@angular/router';
import { LoaderComponent } from './layout/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loaderComponent = LoaderComponent;

  constructor(
    private userService: UserService,
    public router: Router,
  ) { }

  get isLoggedIn(): boolean {
    return (this.userService.token) ? true : false;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/User/user';
import { TitleService } from '../services/title.service';
import { UserService } from '../services/user/user.service';
import { LoaderService } from '../layout/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private title: TitleService,
              private userService: UserService,
              public loaderService: LoaderService) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.title.set(this.user.username);
  }

}

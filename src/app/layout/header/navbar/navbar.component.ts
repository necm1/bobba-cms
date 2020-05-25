import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}

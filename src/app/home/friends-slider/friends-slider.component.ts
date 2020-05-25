import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/models/User/friend';
import { UserService } from 'src/app/services/user/user.service';
import { LoaderService } from 'src/app/layout/loader/loader.service';

@Component({
  selector: 'app-home-friends-slider',
  templateUrl: './friends-slider.component.html',
  styleUrls: ['./friends-slider.component.scss'],
  providers: [LoaderService]
})
export class FriendsSliderComponent implements OnInit, OnDestroy {
  friendsStream: Subscription;
  friends: Friend[] = [];

  constructor(private userService: UserService,
              public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.friendsStream = this.userService.getFriends().subscribe(friends => {
      this.friends = friends.filter(u => u.friend.online === 1);
      this.loaderService.hide();
    });
  }

  ngOnDestroy(): void {
    if (this.friendsStream && !this.friendsStream.closed) {
      this.friendsStream.unsubscribe();
    }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from '../team.service';
import { LoaderService } from 'src/app/layout/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss'],
  providers: [LoaderService]
})
export class ModeratorsComponent implements OnInit, OnDestroy {
  moderatorStream: Subscription;

  moderators: [];

  constructor(public loader: LoaderService,
              private team: TeamService) { }

  ngOnInit(): void {
    this.moderatorStream = this.team.moderators().subscribe({
      next: (e)  => {
        this.moderators = e.data;
        this.loader.hide();
      },
      error: (e) => console.error(`Moderatoren konnte nicht geladen werden: ${e}`)
    });
  }

  ngOnDestroy(): void {
    if (this.moderatorStream && !this.moderatorStream.closed) {
      this.moderatorStream.unsubscribe();
    }
  }

}

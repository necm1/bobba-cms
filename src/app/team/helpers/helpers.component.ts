import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/layout/loader/loader.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.scss'],
  providers: [LoaderService]
})
export class HelpersComponent implements OnInit, OnDestroy {
  helperStream: Subscription;
  helpers: [];

  constructor(public loader: LoaderService,
              private team: TeamService) { }

  ngOnInit(): void {
    this.helperStream = this.team.helpers().subscribe({
      next: (e)  => {
        this.helpers = e.data;
        this.loader.hide();
      },
      error: (e) => console.error(`Moderatoren konnte nicht geladen werden: ${e}`)
    });
  }

  ngOnDestroy(): void {
    if (this.helperStream && !this.helperStream.closed) {
      this.helperStream.unsubscribe();
    }
  }

}

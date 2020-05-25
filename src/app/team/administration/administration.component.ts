import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/layout/loader/loader.service';
import { Subscription } from 'rxjs';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  providers: [LoaderService]
})
export class AdministrationComponent implements OnInit, OnDestroy {
  administrationStream: Subscription;
  administration: [];


  constructor(public loader: LoaderService,
              private team: TeamService) { }

  ngOnInit(): void {
    this.administrationStream = this.team.administration().subscribe({
      next: (e)  => {
        this.administration = e.data.filter(e => e.rank === 7);
        this.loader.hide();
      },
      error: (e) => console.error(`Administration konnte nicht geladen werden: ${e}`)
    });
  }

  ngOnDestroy(): void {
    if (this.administrationStream && !this.administrationStream.closed) {
      this.administrationStream.unsubscribe();
    }
  }

}

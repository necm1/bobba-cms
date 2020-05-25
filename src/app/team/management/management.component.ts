import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService } from '../team.service';
import { LoaderService } from 'src/app/layout/loader/loader.service';

@Component({
  selector: 'app-team-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  providers: [LoaderService]
})
export class ManagementComponent implements OnInit, OnDestroy {
  managementStream: Subscription;
  management: [];

  constructor(public loader: LoaderService,
              private team: TeamService) { }

  ngOnInit(): void {
    this.managementStream = this.team.helpers().subscribe({
      next: (e)  => {
        this.management = e.data;
        this.loader.hide();
      },
      error: (e) => console.error(`Management konnte nicht geladen werden: ${e}`)
    });
  }

  ngOnDestroy(): void {
    if (this.managementStream && !this.managementStream.closed) {
      this.managementStream.unsubscribe();
    }
  }

}
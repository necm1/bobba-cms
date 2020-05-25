import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { ManagementComponent } from './management/management.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamComponent } from './team.component';
import { LayoutModule } from '../layout/layout.module';
import { AdministrationComponent } from './administration/administration.component';
import { ModeratorsComponent } from './moderators/moderators.component';
import { HelpersComponent } from './helpers/helpers.component';


@NgModule({
  declarations: [ManagementComponent, TeamComponent, AdministrationComponent, ModeratorsComponent, HelpersComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    HttpClientModule,
    LayoutModule
  ]
})
export class TeamModule { }

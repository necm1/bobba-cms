import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { PhotosComponent } from './photos/photos.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../pipes/articles/search.pipe';


@NgModule({
  declarations: [PhotosComponent, HallOfFameComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    LayoutModule,
  ]
})
export class CommunityModule { }

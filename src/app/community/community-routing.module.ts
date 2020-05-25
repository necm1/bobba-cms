import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { AuthGuard } from '../guards/auth.guard';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';

const routes: Routes = [
  {
    path: 'photos',
    component: PhotosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'hall-of-fame',
    component: HallOfFameComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }

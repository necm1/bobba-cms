import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RedirectIfAuthenticatedGuard } from '../guards/redirect-if-authenticated.guard';

const routes: Routes = [{ path: '', component: AuthComponent, canActivate: [RedirectIfAuthenticatedGuard], }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { AuthGuard } from '../guards/auth.guard';
import { ArticleResolver } from '../resolvers/article.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }

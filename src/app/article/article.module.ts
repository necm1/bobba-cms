import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { LayoutModule } from '../layout/layout.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    LayoutModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class ArticleModule { }

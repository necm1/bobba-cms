import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { LayoutModule } from '../layout/layout.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/articles/search.pipe';


@NgModule({
  declarations: [ArticlesComponent, SearchPipe],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    LayoutModule,
    NgxPaginationModule,
    FormsModule,
    LayoutModule
  ]
})
export class ArticlesModule { }

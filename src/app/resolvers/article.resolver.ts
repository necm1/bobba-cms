import { Injectable } from '@angular/core';

import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article/article';
import { API } from '../models/api-response';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private articleService: ArticleService,
              private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.articleService.getArticle(route.paramMap.get('id'));
  }
}

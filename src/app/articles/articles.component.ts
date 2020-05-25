import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article/article';
import { Subscription } from 'rxjs';
import { TitleService } from '../services/title.service';
import { LoaderService } from '../layout/loader/loader.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [LoaderService]
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articleStream: Subscription;
  articles: Article[];

  firstArticle: Article;

  paginationNumber = 1;
  search: string;

  constructor(private articleService: ArticleService,
              private title: TitleService,
              public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.articleStream = this.articleService.all().subscribe(articles => {
      this.articles = articles;
      this.firstArticle = this.articles[0];

      this.loaderService.hide();
    });

    this.title.set('Alle Neugikeiten');
  }

  ngOnDestroy(): void {
    if (this.articleStream && !this.articleStream.closed) {
      this.articleStream.unsubscribe();
    }
  }

}

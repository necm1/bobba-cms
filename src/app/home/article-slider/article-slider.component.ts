import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/Article/article';
import { ArticleService } from 'src/app/services/article.service';
import { LoaderService } from 'src/app/layout/loader/loader.service';

@Component({
  selector: 'app-home-article-slider',
  templateUrl: './article-slider.component.html',
  styleUrls: ['./article-slider.component.scss'],
  providers: [LoaderService]
})
export class ArticleSliderComponent implements OnInit, OnDestroy {
  newsConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    autoplay: true
  };

  articleStream: Subscription;

  articles: Article[] = [];

  constructor(private articleService: ArticleService,
              public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.articleStream = this.articleService.getNewestArticles().subscribe(articles => {
      this.articles = articles;
      this.loaderService.hide();
    });
  }

  ngOnDestroy(): void {
    if (this.articleStream && !this.articleStream.closed) {
      this.articleStream.unsubscribe();
    }
  }

}

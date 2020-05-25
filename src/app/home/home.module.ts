import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SWIPER_CONFIG, SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FriendsSliderComponent } from './friends-slider/friends-slider.component';
import { ArticleSliderComponent } from './article-slider/article-slider.component';
import { LayoutModule } from '../layout/layout.module';
import { LoaderService } from '../layout/loader/loader.service';
import { BannerSliderComponent } from './banner-slider/banner-slider.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [HomeComponent, FriendsSliderComponent, ArticleSliderComponent, BannerSliderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwiperModule,
    LayoutModule
  ],
  entryComponents: [FriendsSliderComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
})
export class HomeModule { }

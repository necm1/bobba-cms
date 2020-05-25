import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { AppComponent } from './app.component';

import { UserResolver } from './resolvers/user.resolver';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ArticleResolver } from './resolvers/article.resolver';

import { registerLocaleData, } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { NgxPaginationModule } from 'ngx-pagination';
import { HotelComponent } from './hotel/hotel.component';
import { SearchPipe } from './pipes/hotel/commands/search.pipe';
// import { WebsocketService } from './services/websocket.service';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    NgHttpLoaderModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserResolver,
    ArticleResolver,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

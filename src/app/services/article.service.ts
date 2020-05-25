import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../config';
import { API } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticle(id: string | number) {
    return this.http.get<any>(`${config.apiEndpoint}/article/${id}`).pipe(map(article => {
      return article.data;
    }));
  }

  all() {
    return this.http.get<API>(`${config.apiEndpoint}/articles`).pipe(map(articles => {
      return articles.data;
    }));
  }

  getNewestArticles() {
    return this.http.get<any>(`${config.apiEndpoint}/articles/newest`).pipe(map(article => {
      return article.data;
    }));
  }

  vote(id: string | number) {
    return this.http.put<any>(`${config.apiEndpoint}/article/${id}/vote`, {});
  }

  comment(id: number, comment: string) {
    return this.http.put<any>(`${config.apiEndpoint}/article/${id}/comment`, { comment });
  }

  deleteComment(id: number) {
    return this.http.delete<any>(`${config.apiEndpoint}/article/comment/${id}/delete`);
  }
}

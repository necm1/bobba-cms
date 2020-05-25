import { Pipe, PipeTransform } from '@angular/core';
import { Article } from 'src/app/models/Article/article';

@Pipe({
  name: 'searchArticles'
})
export class SearchPipe implements PipeTransform {

  transform(items: Article[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    return items.filter(str => {
      return str[field].toLowerCase().includes(value.toLowerCase());
    });
   }

}

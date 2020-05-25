import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title: Title) { }

  public set(title: string): void {
    this.title.setTitle(`${config.app.name} - ${title}`);
  }

  public get(): string {
    return this.title.getTitle();
  }
}

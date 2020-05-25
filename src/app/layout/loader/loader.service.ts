import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader$ = true;

  constructor() {
  }

  public get loader(): boolean {
    return this.loader$;
  }

  show(): void {
    this.loader$ = true;
  }

  hide(): void {
    this.loader$ = false;
  }
}

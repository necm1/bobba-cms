import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PaginationControlsDirective, PaginationControlsComponent } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent extends PaginationControlsComponent {
  @Input('data') p: PaginationControlsDirective;

  constructor() {
    super();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/layout/loader/loader.service';
import { Photo } from 'src/app/models/community/photo';
import { Subscription } from 'rxjs';
import { CommunityService } from '../community.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  providers: [LoaderService]
})
export class PhotosComponent implements OnInit, OnDestroy {
  photos$: Photo[];

  photoStream: Subscription;
  paginationNumber = 1;

  constructor(public loaderService: LoaderService,
              private communityService: CommunityService,
              private title: TitleService) { }

  ngOnInit(): void {
    this.photoStream = this.communityService.photos().subscribe({
      next: (e) => {
        this.photos$ = e.data;
        this.loaderService.hide();
      }
    });

    this.title.set('Fotos');
  }

  ngOnDestroy(): void {
    if (this.photoStream && !this.photoStream.closed) {
      this.photoStream.unsubscribe();
    }
  }

}

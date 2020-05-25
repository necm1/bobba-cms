import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/Article/article';
import { TitleService } from 'src/app/services/title.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User/user';
import { Comment as ArticleComment } from 'src/app/models/article/comment';
import { ArticleService } from 'src/app/services/article.service';
import * as alertify from 'alertifyjs';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../layout/loader/loader.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [LoaderService]
})
export class ArticleComponent implements OnInit, OnDestroy {
  commentForm: FormGroup;
  isSubmitted = false;

  article: Article;
  user: User;
  comments: ArticleComment[];

  votes$ = 0;
  voteActive$ = false;

  paginationNumber = 1;

  articleStream: Subscription;
  voteStream: Subscription;
  deleteStream: Subscription;
  commentStream: Subscription;

  constructor(private route: ActivatedRoute,
              private title: TitleService,
              private userService: UserService,
              private articleService: ArticleService,
              private formBuilder: FormBuilder,
              public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.required, Validators.min(10), Validators.max(255)]],
    });

    this.user = this.userService.user;

    this.articleStream = this.articleService.getArticle(this.route.snapshot.params.id).subscribe(e => {
      console.log(e);
      this.article = e;

      this.comments = this.article.comments;

      this.votes = this.article.votes.length;
      this.voteActive$ = this.article.votes.filter(e => e.user.id === this.user.id).length === 1;

      this.title.set(this.article.title);

      this.loaderService.hide();
    });
  }

  get f(): any {
    return this.commentForm.controls;
  }

  get votes(): number {
    return this.votes$;
  }

  set votes(value: number) {
    this.votes$ = value;
  }

  get voteActive(): boolean {
    return this.voteActive$;
  }

  set voteActive(value: boolean) {
    this.voteActive$ = value;
  }

  onDelete(id: number): void {
    this.deleteStream = this.articleService.deleteComment(id).subscribe({
      next: (e) => {
        this.comments = this.comments.filter(comment => comment.id !== id);
        alertify.success(e.message);
      },
      error: (e) => {
        alertify.error(e);
      }
    });
  }

  onVote(id: number): void {
    const voteActive = this.voteActive;

    if (this.voteActive) {
      this.votes = this.votes - 1;
      this.voteActive = false;
    } else {
      this.votes = this.votes + 1;
      this.voteActive = true;
    }

    this.voteStream = this.articleService.vote(this.article.id).subscribe({
      next: () => {
        if (voteActive) {
          alertify.error('Abstimmung entfernt');
        } else {
          alertify.success('Erfolgreich abgestimmt!');
        }
      },
      error: () => {
        alertify.error('Etwas ist schiefgelaufen!');
      }
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.commentForm.invalid) {
      return;
    }

    this.commentStream = this.articleService.comment(this.article.id, this.f.comment.value).subscribe({
      next: (e) => {
        this.comments.unshift({
          id: e.data.id,
          content: e.data.content,
          created_at: e.data.created_at,
          updated_at: e.data.updated_at,
          user: this.user
        });

        alertify.success(e.message);
      },
      error: (e) => {
        alertify.error(e);

        this.f.comment.setErrors({
          incorrect: true
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.articleStream && !this.articleStream.closed) {
      this.articleStream.unsubscribe();
    }

    if (this.voteStream && !this.voteStream.closed) {
      this.voteStream.unsubscribe();
    }

    if (this.deleteStream && !this.deleteStream.closed) {
      this.deleteStream.unsubscribe();
    }

    if (this.commentStream && !this.commentStream.closed) {
      this.commentStream.unsubscribe();
    }
  }

}

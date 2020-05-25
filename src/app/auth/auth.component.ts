import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import * as alertify from 'alertifyjs';
import { UserService } from '../services/user/user.service';
import { first } from 'rxjs/operators';
import { TitleService } from '../services/title.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isSubmitted = false;

  authStream: Subscription;
  userStream: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private title: TitleService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.title.set('A World Connected');
    this.spinner.hide();
  }

  get f(): any {
    return this.authForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.authForm.invalid) {
      return;
    }

    this.authStream = this.authService.login(this.f.username.value, this.f.password.value)
    .subscribe({
      next: (data) => {
        this.userStream = this.userService.getUser(data.data.token)
                                          .pipe(first())
                                          .subscribe({
                                            complete: () => this.router.navigate(['/home']),
                                            error: (e) => {
                                              alertify.error(e);
                                            }
                                          });
      },
      error: (error) => {
        alertify.error(error);

        this.f.username.setErrors({
          incorrect: true
        });

        this.f.password.setErrors({
          incorrect: true
        });
      }
    });
  }

  validateInput() {
    this.f.username.setErrors(null);

    this.f.password.setErrors(null);
  }

  ngOnDestroy(): void {
    if (this.authStream && !this.authStream.closed) {
      this.authStream.unsubscribe();
    }

    if (this.userStream && !this.userStream.closed) {
      this.userStream.unsubscribe();
    }
  }

}
